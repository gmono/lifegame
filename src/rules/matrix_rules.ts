import * as tf from "@tensorflow/tfjs"
import { expandTo4D, equalMap, deleteDimTo2D } from "../matrix_tool";
import { range } from "../../libs/lib";
//这里需要做equal图缓存
//规则集合
function keep(K, S, P, v = 2) {
    let K2 = equalMap(K, v);
    return P.add(K2.mul(S));
}
//这里的v用于比较 如果相等则设置
function setOne(K: tf.Tensor2D, S: tf.Tensor2D, P: tf.Tensor2D, v = 3) {
    let K3 = tf.equal(K, v);
    //k3等于1的位置直接设置为1
    let res = tf.where(K3, tf.onesLike(P), P);
    return res;

}
//如果相等则设置为0
function setZero(K: tf.Tensor2D, S: tf.Tensor2D, P: tf.Tensor2D, v = 2) {
    let K3 = tf.equal(K, v);
    //k3等于1的位置直接设置为1
    let res = tf.where(K3, tf.zerosLike(P), P);
    return res;
}
//随机设置1 v为概率 
function random_set(K: tf.Tensor2D, S: tf.Tensor2D, P: tf.Tensor2D, v = 0.1) {
    let K3 = tf.randomUniform(K.shape, 0, 1, "float32").less(v);
    //k3等于1的位置直接设置为1
    let res = tf.where(K3, tf.onesLike(P), P);
    return res;
}
//伯努利采样 计算K as float32 /8 得到每个点的为1的概率 再把S*0.5来得到原始存活概率（也就是原来是1的地方继续是1的概率）
//然后叠加 经过sigmoid函数（或直接截断） 得到t
//然后以此概率图做随机采样 一般来说是直接生成一个随机图 叫x 做x<t 得到一个0 1 图 然后使用where 设置oneslike
//然后返回结果 这样可以让P以S为蓝本 通过周围系数K 来按概率设置存在状态

function b_random_sample(K: tf.Tensor2D, S: tf.Tensor2D, P: tf.Tensor2D, alive_ratio = 0.5, max_size = 8.0) {
    let K3 = K.asType("float32").div(max_size);
    let S3 = S.asType("float32").mul(alive_ratio);
    //为了让分布从0到1 变为-0.5到0.5 方便sigmoid函数
    let t = K3.sigmoid().sub(0.4);
    let x = tf.randomUniform(K.shape, 0, 1, "float32");
    let res = tf.where(x.less(t), tf.onesLike(P), tf.zerosLike(P));
    return res;
}

function use(K, S, P) {
    class funcs {

        protected K = K;
        protected S = S;
        protected P = P;
        //p被初始化为0 因此必须keep一次才能保持原样
        public keep = (v) => this.P = keep(this.K, this.S, this.P, v);
        public setOne = (v) => this.P = setOne(this.K, this.S, this.P, v);
        public setZero = (v) => this.P = setZero(this.K, this.S, this.P, v);
        public reset = (v) => this.P = tf.mul(tf.onesLike(this.P), v);
        public random_set = (v) => this.P = random_set(this.K, this.S, this.P, v);
        public b_random_sample = (alive_ratio = 0.5, max_size = 8.0) => this.P = b_random_sample(this.K, this.S, this.P, alive_ratio, max_size);
        public get() {
            return this.P;
        }
    }   
    return new funcs();
}
type RuleType = ReturnType<typeof use>;
//扫描原始图像获取基础过滤图
//两个问题 如何增大视野 并让越远的权重越低 如何让响应具有方向性或者说如何让几个格子联合起来形成更大的影响力
//可以增加能量层和稳定性层 以及有方向的影响层 
//数据类型改为int8
function basic(ts: tf.Tensor2D) {
    let ker = tf.tensor2d([
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ], undefined, "int32").expandDims(-1).expandDims(-1) as tf.Tensor4D;
    //测试训练用
    // ker=tf.variable(ker,true,"kernel","float32");
    //把ts变为4d
    //KSP K表示原始矩阵卷积ker之后 得到的周围影响因子 0到8之间
    let S = expandTo4D(ts);
    //S表示原始的存在矩阵 P表示一个0矩阵 用于保存下一个存在矩阵
    let K = S.conv2d(ker, 1, "same", "NHWC");
    //计算
    //叠加
    //这个是其他设0
    let P = tf.zerosLike(S);
    return { K, S, P };
}
export namespace Rules {
    //基本规则
    //表示 2的时候保持 3的时候稳定
    export function b3s23(rule: RuleType) {
        // rule.reset(0);
        // rule.keep(2);
        // rule.setOne(3);
        // rule.random_set(0.0001);
        rule.b_random_sample(0.2, 20.0);
    }
    export function b36s23(rule: RuleType) {
        b3s23(rule);
        rule.setOne(6);
    }
    export function b1s12(rule: RuleType) {
        rule.keep(2);
        rule.setOne(1);
    }
    export function b3678s34678(rule: RuleType) {
        rule.keep(4);
        rule.setOne(3);
        rule.setOne(6);
        rule.setOne(7);
        rule.setOne(8);
    }
    export function b35678s5678(rule: RuleType) {
        // rule.keep(4);
        rule.setOne(3);
        rule.setOne(5);
        rule.setOne(6);
        rule.setOne(7);
        rule.setOne(8);
    }
}

const opt = tf.train.rmsprop(0.01);
//理论上这个可以支持各种规则
export function matrix_rule(ts: tf.Tensor2D, ruleF: (rule: RuleType) => void = Rules.b3s23) {
    //生命游戏卷积 从一个feature map 得到下一个featuremap
    //原始 S 卷积得到K 然后K+S 得到P 然后对P使用equalMap3 得到二值化的下一个
    //featuremap
    let ret = tf.tidy(() => {
        let { K, S, P } = basic(ts);
        let rule = use(K, S, P);
        ruleF(rule);
        P = rule.get();
        //训练并输出loss
        let ret = deleteDimTo2D(P as tf.Tensor4D)
        //
        return ret;
    });
    //训练的额外的东西
    // trainRule(ts,ret);
    return ret;
}

export type Rule = typeof Rules.b3s23;

//考虑不改变规则而是训练卷积核，让最终得到的next frame的总和，接近50%,同时尽量与prev不同
//也就是 最大化 abs(A-B)^2


//得到一个神经网络  可以把matrixrule当作环境，把自己输出的frame当作结果
//单纯的根据激励大小增加结果，优化结果 也就是把自己的结果和实际结果 比价
//并且×自己输出的帧
//最终得到一个可以模拟b2s3规则的卷积网络 rnn 
//这里是通过上一帧输出下一帧的能力
//计算激励的时候肯定是二值化再计算的，否则就和直接计算loss 没啥区别了
//或者直接计算loss 只是输出的时候二值化

function initLayer(rsize = 8) {
    let layers = tf.sequential({
        layers: [
            tf.layers.conv2d({ inputShape: [1024 / rsize, 1024 / rsize, 1], kernelSize: 3, filters: 40, activation: "relu" }),
            tf.layers.conv2dTranspose({ kernelSize: 3, filters: 10, activation: "tanh" }),
            tf.layers.conv2d({ kernelSize: 3, filters: 20, activation: "tanh" }),
            tf.layers.conv2dTranspose({ kernelSize: 3, filters: 1 })
        ]
    })
    layers.compile({
        optimizer: "rmsprop",
        loss: tf.losses.sigmoidCrossEntropy,
        metrics: ["accuracy"]
    })
    return layers;
}

let xs = [], ys = []
export function trainRule(ts: tf.Tensor2D, ret: tf.Tensor2D) {
    //输入的是上一帧和下一帧
    //net的功能是从上一帧得到下一帧
    xs.push(tf.tidy(() => ts.clone().expandDims(2)));
    ys.push(tf.tidy(() => ret.clone().expandDims(2)));
    // console.log(xs[0])
}

let layers;
export async function train(rsize) {
    console.log("开始训练");
    layers = initLayer(rsize);
    layers.summary()
    // let nstart=xs[0].clone() as tf.Tensor3D;
    let x = tf.stack(xs, 0);
    xs.forEach(v => v.dispose())
    let y = tf.stack(ys, 0);
    ys.forEach(v => v.dispose())
    let info = await layers.fit(x, y, {
        epochs: 5, callbacks: {
            onBatchEnd(batch, logs) {
                console.log(logs)
            }
        }
    });
    console.log(info.history.acc)
    x.dispose();
    y.dispose();
    xs = []
    ys = []

}

export function useLayers(nstart: tf.Tensor2D): tf.Tensor2D {
    //显示神经网络演化 从第一帧开始
    let ret = tf.tidy(() => {
        let t = layers.predict(nstart.expandDims(2).expandDims(0)) as tf.Tensor4D;
        t = t.sigmoid()
        let tt = t.squeeze([0, 3]) as tf.Tensor2D;
        //二值化
        let bi = tf.greaterEqual(tt, 0.5);
        return bi;
    })
    return ret as tf.Tensor2D;
}
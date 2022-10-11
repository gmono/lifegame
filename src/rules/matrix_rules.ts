import * as tf from "@tensorflow/tfjs"
import { expandTo4D, equalMap, deleteDimTo2D } from "../matrix_tool";
import { range } from "../../libs/lib";
function keep(K,S,P,v=2)
{
    let K2 = equalMap(K, v);
    return P.add(K2.mul(S));
}
function setOne(K,S,P,v=3)
{
    let K3 = equalMap(K, v);
    return P.add(K3);
}
function use(K,S,P){
    class funcs
    {
        
        protected K=K;
        protected S=S;
        protected P=P;
        public keep=(v)=>this.P=keep(this.K,this.S,this.P,v);
        public setOne=(v)=>this.P=setOne(this.K,this.S,this.P,v);
        public get(){
            return this.P;
        }
    }
    return new funcs();
}
type RuleType=ReturnType<typeof use>;
function basic(ts:tf.Tensor2D){
    let ker = tf.tensor2d([
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]).expandDims(-1).expandDims(-1) as tf.Tensor4D;
    //测试训练用
    // ker=tf.variable(ker,true,"kernel","float32");
    //把ts变为4d
    let S = expandTo4D(ts);
    let K = S.conv2d(ker, 1, "same", "NHWC");
    //计算
    //叠加
    //这个是其他设0
    let P = tf.zerosLike(S);
    return {K,S,P};
}
export namespace Rules
{
    //基本规则
    //表示 2的时候保持 3的时候稳定
    export function b3s23(rule:RuleType){
        rule.keep(2);
        rule.setOne(3);
    }
    export function b36s23(rule:RuleType){
        b3s23(rule);
        rule.setOne(6);
    }
    export function b1s12(rule:RuleType){
        rule.keep(2);
        rule.setOne(1);
    }
    export function b3678s34678(rule:RuleType){
        rule.keep(4);
        rule.setOne(3);
        rule.setOne(6);
        rule.setOne(7);
        rule.setOne(8);
    }
    export function b35678s5678(rule:RuleType){
        // rule.keep(4);
        rule.setOne(3);
        rule.setOne(5);
        rule.setOne(6);
        rule.setOne(7);
        rule.setOne(8);
    }
}

const opt=tf.train.rmsprop(0.01);
//理论上这个可以支持各种规则
export function matrix_rule(ts: tf.Tensor2D,ruleF:(rule:RuleType)=>void=Rules.b3s23) {
    //生命游戏卷积 从一个feature map 得到下一个featuremap
    //原始 S 卷积得到K 然后K+S 得到P 然后对P使用equalMap3 得到二值化的下一个
    //featuremap
    let ret=tf.tidy(()=>{
        let {K,S,P}=basic(ts);
        let rule=use(K,S,P);
        ruleF(rule);
        P=rule.get();
        //训练并输出loss
        let ret=deleteDimTo2D(P as tf.Tensor4D)
        //
        return ret;
    });
    //训练的额外的东西
    // trainRule(ts,ret);
    return ret;
}

export type Rule=typeof Rules.b3s23;

//考虑不改变规则而是训练卷积核，让最终得到的next frame的总和，接近50%,同时尽量与prev不同
//也就是 最大化 abs(A-B)^2


//得到一个神经网络  可以把matrixrule当作环境，把自己输出的frame当作结果
//单纯的根据激励大小增加结果，优化结果 也就是把自己的结果和实际结果 比价
//并且×自己输出的帧
//最终得到一个可以模拟b2s3规则的卷积网络 rnn 
//这里是通过上一帧输出下一帧的能力
//计算激励的时候肯定是二值化再计算的，否则就和直接计算loss 没啥区别了
//或者直接计算loss 只是输出的时候二值化

function initLayer(rsize=8){
    let layers=tf.sequential({
        layers:[
            tf.layers.conv2d({inputShape:[1024/rsize,1024/rsize,1],kernelSize:3,filters:40,activation:"relu"}),
            tf.layers.conv2dTranspose({kernelSize:3,filters:10,activation:"tanh"}),
            tf.layers.conv2d({kernelSize:3,filters:20,activation:"tanh"}),
            tf.layers.conv2dTranspose({kernelSize:3,filters:1})
        ]
    })
    layers.compile({
        optimizer:"rmsprop",
        loss:tf.losses.sigmoidCrossEntropy,
        metrics:["accuracy"]
    })
    return layers;
}

let xs=[],ys=[]
export function trainRule(ts:tf.Tensor2D,ret:tf.Tensor2D){
    //输入的是上一帧和下一帧
    //net的功能是从上一帧得到下一帧
    xs.push(tf.tidy(()=>ts.clone().expandDims(2)));
    ys.push(tf.tidy(()=>ret.clone().expandDims(2)));
    // console.log(xs[0])
}

let layers;
export async function train(rsize){
    console.log("开始训练");
    layers=initLayer(rsize);
    layers.summary()
    // let nstart=xs[0].clone() as tf.Tensor3D;
    let x=tf.stack(xs,0);
    xs.forEach(v=>v.dispose())
    let y=tf.stack(ys,0);
    ys.forEach(v=>v.dispose())
    let info=await layers.fit(x,y,{
        epochs:5,callbacks:{
            onBatchEnd(batch,logs){
                console.log(logs)
            }
        }
    });
    console.log(info.history.acc)
    x.dispose();
    y.dispose();
    xs=[]
    ys=[]

}

export function useLayers(nstart:tf.Tensor2D):tf.Tensor2D{
        //显示神经网络演化 从第一帧开始
        let ret=tf.tidy(()=>{
            let t=layers.predict(nstart.expandDims(2).expandDims(0)) as tf.Tensor4D;
            t=t.sigmoid()
            let tt=t.squeeze([0,3]) as tf.Tensor2D;
            //二值化
            let bi=tf.greaterEqual(tt,0.5);
            return bi;
        })
        return ret as tf.Tensor2D;
}
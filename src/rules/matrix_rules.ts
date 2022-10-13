import * as tf from "@tensorflow/tfjs";
import { Tensor } from "@tensorflow/tfjs";
import { deleteDimTo2D, equalMap, expandTo4D } from "../matrix_tool";
//元操作 0 1矩阵 注意下面的都可以用logicAnd or等来实现
/**
 * 实现多域的方法：将2d矩阵增加一个维度 使用卷积计算结果
 * 显示时分别显示多个图层或选择其中一个显示 或综合 合成一个图层显示
 * 需要改造显示系统 操作逻辑 basic
 * rule 和数据初始化
 */
/**
 * 取反 1 0对调
 * @param tensor
 */
function tf_reverse(tensor: Tensor) {
  //使用equal 0 也可以实现把 0变1 1 变0
  // return tf.tidy(()=>{
  // return tf.equal(tensor,0);
  // })
  return tf.tidy(() => {
    return tf
      .logicalXor(tensor.asType("bool"), tf.onesLike(tensor).asType("bool"))
      .asType("float32");
  });
  // return tf.tidy(() => {
  //     return tf.abs(tf.sub(tensor, 1));
  // })
}

/**
 * 设1 是设0的反面
 * @param tensor
 */
function tf_setOne(tensor: Tensor, setMap: Tensor) {
  return tf.tidy(() => {
    return tf
      .logicalOr(tensor.asType("bool"), setMap.asType("bool"))
      .asType("float32");
  });
  // return tf.tidy(() => {
  //     return tf_reverse(tf_setZero(tf_reverse(tensor), tf_reverse(setMap)));
  // })
}

/**
 * 设0 因为交换律 设置0的参数顺序不限
 * @param tensor 原始矩阵
 * @param setMap 设置矩阵 0表示要设0的位置 1 表示不变
 */
function tf_setZero(tensor: Tensor, setMap: Tensor) {
  return tf.tidy(() => {
    return tf
      .logicalAnd(tensor.asType("bool"), setMap.asType("bool"))
      .asType("float32");
  });
  // return tf.tidy(() => tf.mul(tensor, setMap));
}

//操作集 注意 如果一个规则中不设置任何规则 则全部设置为0
export const defaultDtype = "float32";
//Tensor的类型为bool
type CondFunc = (K, S, P) => Tensor;
/**
 * 如果周围有（v 两）个为1 则保持中心不变
 * 否则设置为0  也就是除了v之外的都会设置为0
 * @param K 卷积得到的结果表示周围格子对中心格子的影响，一般表示周围格子中1的个数
 * @param S 原始矩阵
 * @param P K+S的结果
 * @param v
 */
function keep(K, S, P, condFunc: CondFunc) {
  //把周围有两个格子的点 复制到结果中 如果周围不是两个格子 更多或更少 就不复制
  //复制不是叠加而是设置为1  如果对空结果执行 就是复制的意思 但如果对非空结果 就是 如果原始位置是1的话就设置 否则不改变
  //检测 如果为2  不设置zero 保持不变 如果不是2 则 全部设置为0
  let K2 = condFunc(K, S, P).asType("float32");
  //以叠加方式保存结果 以setOne结尾的话 不会消去任何东西
  return tf_setOne(P, tf_setZero(S, K2));
}

/**
 * 如果周围有（v 3）个为1 则设置中心为1
 * @param K 非0 1 矩阵
 * @param S 0 1 矩阵
 * @param P 0 1矩阵
 * @param v
 */
function setOne(K, S, P, condFunc: CondFunc) {
  //equalmap把非 0 1 变为 0 1
  let K3 = condFunc(K, S, P).asType("float32");
  //置1 原本是用 tf.add(P,K3) 因为假设P是全0  或者保证不重叠 因为 setOne(x)不可能用一个值调用两次
  //tf_setOne是可以同时调用多次而不会出现大于1的情况 而add会
  //因此没有
  return tf_setOne(P, K3);
}

/**
 * setOne的相反面 setZero
 * @param K
 * @param S
 * @param P
 * @param v
 */
function setZero(K, S, P, condFunc: CondFunc) {
  const T = tf_reverse(condFunc(K, S, P).asType("float32"));
  const res = tf_setZero(P, T);
  return res;
}

/**
 * 表示等于什么
 * @param v
 * @returns
 */
function condEqual(v): CondFunc {
  return (K, S, P) => {
    return equalMap(K, v);
  };
}

function condLess(v): CondFunc {
  return (K, S, P) => {
    return tf.less(K, v);
  };
}
function condNotEqual(v): CondFunc {
  return (K, S, P) => {
    return tf.notEqual(K, v);
  };
}
///操作集结束
function endPoint(
  target: Funcs,
  propkey: PropertyKey,
  descriptor: TypedPropertyDescriptor<(...args: any) => any>
) {
  debugger;
  const f = descriptor.value;
  descriptor.value = function (this: Funcs, ...args: any[]) {
    f.call(this, ...args);
    this.clearCond();
  };
}
type LinkType = "and" | "or";

class Funcs {
  constructor(protected K, protected S, protected P) {}
  protected conds: CondFunc[] = [];
  // protected cond: CondFunc = null;

  protected linkType: LinkType = "and";
  /**
   * 混合的条件 暂时使用第一个条件
   * @returns
   */
  protected getComposedCond(): CondFunc {
    return (K, S, P) => {
      return this.conds[0](K, S, P);
    };
  }
  //多次调用条件会自动使用and连接
  public whenEqual(v: number) {
    this.conds.push(condEqual(v));
    return this;
  }
  public whenLess(v: number) {
    this.conds.push(condLess(v));
    return this;
  }
  public whenNotEqual(v: number) {
    this.conds.push(condNotEqual(v));
    return this;
  }
  public clearCond() {
    this.conds = [];
  }
  @endPoint
  public keep() {
    this.P = keep(this.K, this.S, this.P, this.getComposedCond());
  }
  @endPoint
  public setOne() {
    this.P = setOne(this.K, this.S, this.P, this.getComposedCond());
  }
  @endPoint
  public setZero() {
    this.P = setZero(this.K, this.S, this.P, this.getComposedCond());
  }

  public get() {
    return this.P;
  }
  public calculate<T>(func: (K, S, P) => T) {
    return func(this.K, this.S, this.P);
  }
}

/**
 * 用于提供dsl 方便规则编写
 * @param K
 * @param S
 * @param P
 */
function use(K, S, P) {
  return new Funcs(K, S, P);
}

type RuleType = ReturnType<typeof use>;

function basic(ts: tf.Tensor2D) {
  //这里理论上可以考虑用其他kernel以以不同方式考虑周围值
  //这里可以用一个多通道卷积核来处理
  //统计一个格子周围的所有格子的值  权重都是1 但也可以不同  甚至可以考虑其他因素进去
  let ker = tf
    .tensor2d([
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ])
    .expandDims(-1)
    .expandDims(-1) as tf.Tensor4D;
  //测试训练用
  // ker=tf.variable(ker,true,"kernel",defaultDtype);
  //把ts变为4d
  //原始矩阵
  let S = expandTo4D(ts).asType(defaultDtype);
  //卷积计算后的矩阵
  let K = tf.conv2d(S, ker, 1, "same", "NHWC");
  //计算
  //叠加
  //这个是其他设0
  //初始为0的保存结果的矩阵
  let P = tf.zerosLike(S);
  return { K, S, P };
}

/**
 * 规则集 理论上可以添加：
 * 1.规则内在随机性 有小概率出现其他行为
 * 2. 使用除了keep和setOne之外的操作 如setZero
 */
export namespace Rules {
  //基本规则
  //不复制old的情况下 setZero是自动的 其他规则只是覆盖了全面的setZero 而 如果预先复制上帧 则setZero需要手动调用
  //注意默认情况下不是保持 除非复制 复制 则默认行为为保持 不复制默认行为为设0
  //表示 2的时候不变 3的时候活过来(设置为1)
  //由于没有复制的过程 每个点都是周围其他点的结果 因此setZERO会导致连锁反应
  //也就是说如果不设置规则 下一帧会自动清零 除了保持和设1的 其他都自动设0
  export function b3s23(rule: RuleType) {
    //活着难度
    rule.whenEqual(2).keep();
    // rule.keep(3);
    //出生难度
    // rule.setOne(2);
    rule.whenEqual(3).setOne();
    //6的时候死去 (拥挤规则) 因为除了keep的和setOne的 其他都会自动死去 所以这里调用和不调用一样
    // rule.setZero(6);
  }

  export function rev_b3s23(rule: RuleType) {
    rule.whenEqual(6).keep();
    rule.whenEqual(0).setOne();
    rule.whenEqual(1).setOne();
    rule.whenEqual(2).setOne();
    rule.whenEqual(3).setOne();
    rule.whenEqual(4).setOne();
    rule.whenEqual(7).setOne();
    rule.whenEqual(8).setOne();
  }

  export function b36s23(rule: RuleType) {
    b3s23(rule);
    rule.whenEqual(6).setOne();
  }

  export function b1s12(rule: RuleType) {
    rule.whenEqual(2).keep();
    rule.whenEqual(1).setOne();
  }

  export function b3678s34678(rule: RuleType) {
    rule.whenEqual(4).keep();
    rule.whenEqual(3).setOne();
    rule.whenEqual(6).setOne();
    rule.whenEqual(7).setOne();
    rule.whenEqual(8).setOne();
  }

  export function b35678s5678(rule: RuleType) {
    // rule.keep(4);
    const t = [3, 5, 6, 7, 8];
    for (let i of t) {
      rule.whenEqual(i).setOne();
    }
  }
}

/**
 *
 * 矩阵规则
 * 理论上这个可以支持各种规则
 * 可以支持在每次计算下一帧的时候进行记录（额外功能）
 *
 * S为0 1 矩阵 K是从0 1 矩阵卷积得到的值 表示了周围格子对中心格子的影响（卷积值） P为K+S的结果 表示
 * old和影响叠加后的产物 (综合产物） 然后去规范化
 */
export function useMatrixRule(
  ts: tf.Tensor2D,
  ruleF: (rule: RuleType) => void = Rules.b3s23,
  logHistory = false
) {
  //生命游戏卷积 从一个feature map 得到下一个featuremap
  //原始 S 卷积得到K 然后K+S 得到P 然后对P使用equalMap3 得到二值化的下一个
  //featuremap
  let ret = tf.tidy(() => {
    let { K, S, P } = basic(ts);
    let rule = use(K, S, P);
    ruleF(rule);
    P = rule.get();
    //训练并输出loss
    let ret = deleteDimTo2D(P as tf.Tensor4D);
    //
    return ret;
  });
  //训练的额外的东西
  if (logHistory) trainLog(ts, ret);
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
const opt = tf.train.rmsprop(0.01);

function initLayer(rsize = 8) {
  alert("初始化神经网络");
  let layers = tf.sequential({
    layers: [
      tf.layers.conv2d({
        inputShape: [1024 / rsize, 1024 / rsize, 1],
        kernelSize: 3,
        filters: 40,
        activation: "relu",
      }),
      tf.layers.conv2dTranspose({
        kernelSize: 3,
        filters: 10,
        activation: "tanh",
      }),
      tf.layers.conv2d({ kernelSize: 3, filters: 20, activation: "tanh" }),
      tf.layers.conv2dTranspose({ kernelSize: 3, filters: 1 }),
    ],
  });
  layers.compile({
    optimizer: "rmsprop",
    loss: tf.losses.sigmoidCrossEntropy,
    metrics: ["accuracy"],
  });
  return layers;
}

let xs = [],
  ys = [];

export function trainLog(ts: tf.Tensor2D, ret: tf.Tensor2D) {
  // console.log("记录样本")
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
  layers.summary();
  // let nstart=xs[0].clone() as tf.Tensor3D;
  console.log(`样本数:${xs.length}`);
  let x = tf.stack(xs, 0);
  xs.forEach((v) => v.dispose());
  let y = tf.stack(ys, 0);
  ys.forEach((v) => v.dispose());
  let info = await layers.fit(x, y, {
    epochs: 5,
    callbacks: {
      onBatchEnd(batch, logs) {
        console.log(`batch:${batch} -> ${logs}`);
      },
    },
  });
  console.log(info.history.acc);
  x.dispose();
  y.dispose();
  xs = [];
  ys = [];
}

export function useLayers(nstart: tf.Tensor2D): tf.Tensor2D {
  //显示神经网络演化 从第一帧开始
  let ret = tf.tidy(() => {
    let t = layers.predict(nstart.expandDims(2).expandDims(0)) as tf.Tensor4D;
    t = t.sigmoid();
    let tt = t.squeeze([0, 3]) as tf.Tensor2D;
    //二值化
    let bi = tf.greaterEqual(tt, 0.5);
    return bi;
  });
  return ret as tf.Tensor2D;
}

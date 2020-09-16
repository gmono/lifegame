import * as tf from "@tensorflow/tfjs"
import { expandTo4D, equalMap, deleteDimTo2D } from "../matrix_tool";
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
//理论上这个可以支持各种规则
export function matrix_rule(ts: tf.Tensor2D,ruleF:(rule:RuleType)=>void=Rules.b3s23) {
    //生命游戏卷积 从一个feature map 得到下一个featuremap
    //原始 S 卷积得到K 然后K+S 得到P 然后对P使用equalMap3 得到二值化的下一个
    //featuremap
    return tf.tidy(()=>{
        let {K,S,P}=basic(ts);
        let rule=use(K,S,P);
        ruleF(rule);
        P=rule.get();
        return deleteDimTo2D(P as tf.Tensor4D);
    });
    
}

export type Rule=typeof Rules.b3s23;

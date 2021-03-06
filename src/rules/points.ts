import * as tf from "@tensorflow/tfjs"
import { matrix_rule, Rules} from './matrix_rules';


export function init():tf.Tensor3D
{
    return null;
}
//points规则 传递进来的是n channel
export async function points(ts: tf.Tensor3D)
{
    let layers=ts.split(3,2) as tf.Tensor2D[];
    //3层  0 1 表示 粒子 能量子
    //2表示 能量值
    //直接扫描
    let zero=await layers[0].array();
    //调用b2s3
    let t=matrix_rule(layers[0],Rules.b3s23);
}

//处理如何绘制的问题 将3d tensor转换为 2dtensor 每个点表示一个像素 
//为rgba 32位的像素
import * as tf from "@tensorflow/tfjs"
import { expandTo4D, equalMap, deleteDimTo2D } from "./matrix_tool";
export function b2s3(ts: tf.Tensor2D) {
    //生命游戏卷积 从一个feature map 得到下一个featuremap
    //原始 S 卷积得到K 然后K+S 得到P 然后对P使用equalMap3 得到二值化的下一个
    //featuremap
    let ker = tf.tensor2d([
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]).expandDims(-1).expandDims(-1) as tf.Tensor4D;
    //把ts变为4d
    let S = expandTo4D(ts);
    let K = S.conv2d(ker, 1, "same", "NHWC");
    //计算
    let K2 = equalMap(K, 2);
    let K3 = equalMap(K, 3);
    //叠加
    let P = tf.zerosLike(S);
    P = P.add(K2.mul(S));
    P = P.add(K3);
    return deleteDimTo2D(P as tf.Tensor4D);
}

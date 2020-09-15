import * as tf from "@tensorflow/tfjs"
//如果等于则为1 否则则为0
//相等比较
export function equalMap<T extends tf.Tensor>(ts: T, equto: number):T {
    // return ts.div(equto).sub(1).abs().lessEqual(0);
    return tf.equal(ts,equto).asType(ts.dtype) as T;
}
//此处应有大于比较  由此可得 所有比较判断

//1-0 变换 即not运算
export function reverseBool(ts: tf.Tensor) {
    return ts.sub(1).abs();
}
//0-1 变为  -1 1 符号化运算
export function symlize(ts: tf.Tensor) {
    return ts.mul(2).sub(1);
}
//此处应有与或非 异或 


export function expandTo4D(ts: tf.Tensor2D): tf.Tensor4D {
    //这个把2d featuremap变为4d可以直接进行卷积操作的featuremap或kernel
    //也就是直接对featuremap进行卷积
    //变成nhwc
    let s = ts.expandDims(0).expandDims(-1) as tf.Tensor4D;
    //扩展一个前面的n和一个后面的c
    return s;
}
export function deleteDimTo2D(ts: tf.Tensor4D): tf.Tensor2D {
    //这个把2d featuremap变为4d可以直接进行卷积操作的featuremap或kernel
    //也就是直接对featuremap进行卷积
    //变成nhwc
    let s = ts.squeeze([0, 3]) as tf.Tensor2D;
    //扩展一个前面的n和一个后面的c
    return s;
}

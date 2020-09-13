//实现简单生命
//概念系统
/**
 * 空间
 * 时间
 * 存在（不同的物质形式有不同的规则）
 * 能量（贯穿始终的通用货币）
 * 能量子（一直向前 没有质量的携能粒子）
 * 运动（标准的二阶粒子运动系统，认为所有碰撞都是完全弹性碰撞）
 *         同时，在碰撞判定的时候，也考虑周围的相互作用
 * 全局规则有规划顺序，比如运动和碰撞规则应该在反应规则之后，以保证正常运行
 * 空间为2d 时间为step
 * 存在为onehot表示的不同的物质粒子
 * 能量为一个单独的域，实数值，能量规则最后，能量依赖物质存在
 * 能量只能和物质同时存在，即如果一个位置是zero 物质，即真空，那么
 * 认为没有能量，单独存在的能量是能量子
 * 能量子没有质量，并以这个世界中的最高速度前进
 * 为避免复杂性，不使用洛伦兹变换
 * 
 */
import * as tf from "@tensorflow/tfjs"

interface PointObject
{
    name:string;
    //观察临近情况 返回新的临近情况
    reaction(nearmat:PointObject[][]):PointObject[][];
    //额外的协商函数 传入冲突粒子和其位置 返回妥协概率
    //将两个妥协概率相加重整为1 则可决定使用哪个粒子的规则
}
//规则应用顺序 
//反应有限 运动其后 而考虑使用随机覆盖的顺序平衡粒子规则冲突
//这里假设所有粒子的规则都兼容


class ZeroPoint implements PointObject
{
    //0粒子 为真空的填充物 没有能量 没有速度
    name="zero";
    reaction=near=>near;
}

class BasicPoint implements PointObject
{
    
    //基本粒子，有一般的运动功能
    //具有速度属性 每次应用规则 使用速度向量添加自己的速度
    //基于动量定理处理碰撞逻辑
    //具有基于速度计算得到的动能
    //具有质量
    //允许反应函数进行动能加减 支持非弹性碰撞
    //可允许通过重置能量来重置速度的大小（不改变方向）(暂时不实现)
    name="basic"
    m=1; //质量
    v=[0,0]; //速度
    //速度大小
    get absv(){
        return tf.norm(this.v).arraySync() as number;
    }
    //动能
    get ve(){
        return 0.5*this.m*this.absv*this.absv;
    }
    //动量
    get p(){
        return tf.mul(this.m,this.v).arraySync() as number[];
    }
    //基本反应
    reaction(nearmat: PointObject[][]): PointObject[][] {
        throw new Error("Method not implemented.");
    }
}
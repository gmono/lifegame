import * as tf from "@tensorflow/tfjs"
import { reverseBool, equalMap, expandTo4D } from './matrix_tool';
export class Draw {
    ctx: CanvasRenderingContext2D;
    tctx: OffscreenCanvasRenderingContext2D;
    off: OffscreenCanvas;
    h: number;
    w: number;
    //pixedsize
    pixelsize:[number,number];
    constructor(public ele: HTMLCanvasElement, public rs: number, public cs: number) {
        //这里得到2d 上下文 计算格子大小
        let ctx = ele.getContext("2d");
        this.ctx = ctx;
        //计算格子大小
        this.h = ele.height;
        this.w = ele.width;
        this.ch = this.h / rs;
        this.cw = this.w / cs;
        //cache
        this.off = new OffscreenCanvas(this.w, this.h);
        this.tctx = this.off.getContext("2d");
        //
        
        this.pixelsize=[this.ch,this.cw];
        this.upsample=tf.layers.upSampling2d({size:this.pixelsize});
    }
    ch: number;
    cw: number;
    public drawPoint(x, y, c: string) {
        let rx: number, ry: number;
        rx = x * this.cw;
        ry = y * this.ch;
        //绘制 ???
        this.tctx.fillStyle = c;
        this.tctx.fillRect(rx, ry, this.cw, this.ch);
    }
    /**
     * 用于绘制01矩阵 用某个颜色表示1
     * 还需要绘制不同图层的方式 如用某些另一些颜色表示另一些东西 然后叠加
     * 还需要可以绘制实数矩阵的函数
     * @param ts 01矩阵
     */
    public async draw2D(ts: tf.Tensor2D) {
        this.tctx.clearRect(0,0,this.w,this.h);
        // this.tctx.fillStyle = "#ffffff";
        // this.tctx.fillRect(0, 0, this.w, this.h);
        //法1
        let rgbmat=await this.torgb(ts);  //0 ffffffff 1 00000000


        let img=this.tctx.putImageData(rgbmat,0,0);
        //法2
        // let arr = await ts.data();
        // arr.forEach((v, i) => {
        //     //绘制 0索引对应列
        //     let a = [, "#ff0000"];
        //     if (v == 1)
        //         this.drawPoint(i%ts.shape[0],Math.floor(i/ts.shape[0]), a[1]);
        // });
        // this.tctx.fill();
        //绘制到画布
        this.ctx.clearRect(0,0,this.w,this.h);
        this.ctx.drawImage(this.off, 0, 0);
    }
    private upsample: tf.layers.Layer;
    async torgb(t:tf.Tensor2D){
        
        //横纵扩展4倍 拉伸
        // function horexpand(t:tf.Tensor2D,v=4):tf.Tensor2D{
        //     return t.expandDims(2).tile([1,1,v]).reshape([t.shape[0],t.shape[1]*v])
        // }
        // function vorexpand(t:tf.Tensor2D,v=4):tf.Tensor2D{
        //     return horexpand(t.transpose(),v).transpose();
        // }

        let num=tf.tidy(()=>{
            //int32 然后×一个颜色
            let colored=t.mul(0xff0000ff|0) as typeof t;
            // let resized=vorexpand(horexpand(colored));
            
            let r=this.pixelsize[0]==this.pixelsize[0]&&this.pixelsize[0]==1? colored:this.upsample.call(expandTo4D(colored),{}) as tf.Tensor4D;
            let resized=r.squeeze([0,3]) as tf.Tensor2D;
            //进行rgba话 横向扩展4倍
            // let rgb=horexpand(resized,4);
            //颜色处理 把1 1 1 1的连续4个 变为 aaaaaaaa
            // let cor=rgb.mul(0xaa);
            let num=resized.asType("int32");
            return num;
        });
        
        //num转换为uint8
        let ar=await num.data();
        let pixeds=new Uint8ClampedArray(ar.buffer);
        num.dispose();
        return new ImageData(pixeds,num.shape[1],num.shape[0]);
    }
}

//把01矩阵转换为像素矩阵
const size=[4,4]

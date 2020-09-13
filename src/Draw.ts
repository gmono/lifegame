import * as tf from "@tensorflow/tfjs"
import { reverseBool, equalMap } from './matrix_tool';
export class Draw {
    ctx: CanvasRenderingContext2D;
    tctx: OffscreenCanvasRenderingContext2D;
    off: OffscreenCanvas;
    h: number;
    w: number;
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
    public async draw2D(ts: tf.Tensor2D) {
        this.tctx.clearRect(0,0,this.w,this.h);
        // this.tctx.fillStyle = "#ffffff";
        // this.tctx.fillRect(0, 0, this.w, this.h);
        //
        // let rgbmat=tf.tidy(()=>torgb(ts)) as tf.Tensor2D;  //0 ffffffff 1 00000000
        // let data=new Uint8ClampedArray((await rgbmat.data()));
        // let imgdata=new ImageData(data,ts.shape[0]*4,ts.shape[1]*4)

        // let img=this.tctx.putImageData(imgdata,0,0);
        // rgbmat.dispose();
        let arr = await ts.data();
        arr.forEach((v, i) => {
            //绘制 0索引对应列
            let a = [, "#ff0000"];
            if (v == 1)
                this.drawPoint(i%ts.shape[0],Math.floor(i/ts.shape[0]), a[1]);
        });
        this.tctx.fill();
        //绘制到画布
        this.ctx.clearRect(0,0,this.w,this.h);
        this.ctx.drawImage(this.off, 0, 0);
    }
}

function torgb(t:tf.Tensor2D){
    //横纵扩展4倍 拉伸
    function horexpand(t:tf.Tensor2D,v=4):tf.Tensor2D{
        return t.expandDims(2).tile([1,1,v]).reshape([t.shape[0],t.shape[1]*v])
    }
    function vorexpand(t:tf.Tensor2D,v=4):tf.Tensor2D{
        return horexpand(t.transpose(),v).transpose();
    }

    let resized=vorexpand(horexpand(t));
    //进行rgba话 横向扩展4倍
    let rgb=horexpand(resized,4);
    //颜色处理 把1 1 1 1的连续4个 变为 aaaaaaaa
    let cor=rgb.mul(0xaa);
    return cor;
}
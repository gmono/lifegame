import * as tf from "@tensorflow/tfjs"
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
        // this.tctx.clearRect(0,0,this.w,this.h);
        this.tctx.fillStyle = "#ffffff";
        this.tctx.fillRect(0, 0, this.w, this.h);
        let arr = await ts.array();
        arr.forEach((a, i) => a.forEach((v, j) => {
            //绘制 0索引对应列
            let a = [, "#ff0000"];
            if (v == 1)
                this.drawPoint(j, i, a[1]);
        }));
        this.tctx.fill();
        //绘制到画布
        this.ctx.drawImage(this.off, 0, 0);
    }
}

import * as tf from "@tensorflow/tfjs"
import { delay, int, float } from '../libs/lib';


//如果等于则为1 否则则为0
function equalMap<T extends tf.Tensor>(ts:T,equto:number){
    return ts.div(equto).sub(1).abs().lessEqual(0);
}


//1-0 变换
function reverseBool(ts:tf.Tensor){
    return ts.sub(1).abs();
}
//0-1 变为  -1 1
function symlize(ts:tf.Tensor){
    return ts.mul(2).sub(1);
}
function expandTo4D(ts:tf.Tensor2D):tf.Tensor4D{
    //这个把2d featuremap变为4d可以直接进行卷积操作的featuremap或kernel
    //也就是直接对featuremap进行卷积
    //变成nhwc
    let s=ts.expandDims(0).expandDims(-1) as tf.Tensor4D;
    //扩展一个前面的n和一个后面的c
    return s;

}
function deleteDimTo2D(ts:tf.Tensor4D):tf.Tensor2D{
    //这个把2d featuremap变为4d可以直接进行卷积操作的featuremap或kernel
    //也就是直接对featuremap进行卷积
    //变成nhwc
    let s=ts.squeeze([0,3]) as tf.Tensor2D;
    //扩展一个前面的n和一个后面的c
    return s;

}
function b2s3(ts:tf.Tensor2D){
    //生命游戏卷积 从一个feature map 得到下一个featuremap
    //原始 S 卷积得到K 然后K+S 得到P 然后对P使用equalMap3 得到二值化的下一个
    //featuremap
    let ker=tf.tensor2d([
        [1,1,1],
        [1,0,1],
        [1,1,1]
    ]).expandDims(-1).expandDims(-1) as tf.Tensor4D;
    //把ts变为4d
    let S=expandTo4D(ts);
    let K=S.conv2d(ker,1,"same","NHWC");
    //计算
    let K2=equalMap(K,2);
    let K3=equalMap(K,3);
    //叠加
    let P=tf.zerosLike(S);
    P=P.add(K2.mul(S));
    P=P.add(K3);
    return deleteDimTo2D(P as tf.Tensor4D);
}


class Draw{
    ctx:CanvasRenderingContext2D;
    tctx:OffscreenCanvasRenderingContext2D;
    off:OffscreenCanvas;
    h:number;w:number;
    constructor(public ele:HTMLCanvasElement,
                public rs:number,
                public cs:number)
    {
        //这里得到2d 上下文 计算格子大小
        let ctx=ele.getContext("2d");
        this.ctx=ctx;
        //计算格子大小
        this.h=ele.height;this.w=ele.width;
        this.ch=this.h/rs;
        this.cw=this.w/cs;
        //cache
        this.off=new OffscreenCanvas(this.w,this.h);
        this.tctx=this.off.getContext("2d");
    }
    ch:number;
    cw:number;
    public drawPoint(x,y,c:string){
        let rx: number,ry: number;
        rx=x*this.cw;
        ry=y*this.ch;
        //绘制 ???
        this.tctx.fillStyle=c;
        this.tctx.fillRect(rx,ry,this.cw,this.ch);
        
    }
    public async draw2D(ts:tf.Tensor2D){
        // this.tctx.clearRect(0,0,this.w,this.h);
        this.tctx.fillStyle="#ffffff";
        this.tctx.fillRect(0,0,this.w,this.h);
        let arr=await ts.array();
        arr.forEach((a,i)=>a.forEach((v,j)=>{
            //绘制 0索引对应列
            let a=[,"#ff0000"]
            if(v==1)
                this.drawPoint(j,i,a[1]);
        }));
        this.tctx.fill();
        //绘制到画布
        this.ctx.drawImage(this.off,0,0);
    }
}


//绘图 绘制到canvas
function drawFeatureMap(ts:tf.Tensor2D){

}
function getval(id:string){
    let e= document.querySelector(`input#${id}`) as HTMLInputElement;
    return e.value;
}
function get(id:string){
    return document.querySelector(`#${id}`) as HTMLElement;
}
async function main(){
    let ele=document.createElement("canvas");
    ele.height=2000;
    ele.width=2000;
    ele.id="ctx"
    document.body.appendChild(ele);
    let size=[1000,1000]
    let d=new Draw(ele,size[0],size[1]);

    let init=()=>tf.randomUniform(size,0,1,"float32").div(float(getval("rel"))).floor() as tf.Tensor2D
    let dt=init();

    d.draw2D(dt);
    console.log(dt);
    let p=true;
    let sl=false;
    let n=0;
    //loop
    async function loop(){
        let delayt=int(getval("delay"));
        for(;;){
            await delay(delayt);
            let old=dt;
            dt=tf.tidy(()=>b2s3(old));
            old.dispose();
            
            // console.log(dt);
            //非静默
            if(!sl)
                await d.draw2D(dt);
            //
            if(p) break;
            n++;
            //显示轮
            get("n").innerText=n.toString();
        }
    }
     //event
    get("start").onclick=async()=>{
        if(p){
            p=false;
            loop();
        }
        get("start").style.background="#111111"
        get("pause").style.background=""
    };
    
    get("pause").onclick=async()=>{
        p=true;
        get("start").style.background=""
        get("pause").style.background="#111111"
        d.draw2D(dt);
    }
    get("reset").onclick=async()=>{
        dt=init();
        d.draw2D(dt);
        n=0;
    }
    get("ctx").onclick=e=>{
        let x,y;
        x=e.offsetX;
        y=e.offsetY;
        if(x<0||y<0) return;
        let data=dt.arraySync();
        let tx,ty;
        tx=Math.floor(x/d.cw);
        ty=Math.floor(y/d.ch)
        data[ty][tx]=data[ty][tx]==0? 1:0;
        dt.dispose();
        dt=tf.tensor(data);
        d.draw2D(dt);
    }
    get("sl").onclick=()=>{
        sl=true;
    }
    get("nsl").onclick=()=>{
        sl=false;
    }
    
    
}
window.onload=main;
console.log("helloworld");

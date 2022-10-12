import * as tf from "@tensorflow/tfjs"
import {delay, int, float, str, randint, range} from '../libs/lib';
import { Draw } from "./Draw";
import {useMatrixRule, Rule, train, useLayers, defaultDtype} from './rules/matrix_rules';
import "@tensorflow/tfjs-backend-webgpu"
import "@tensorflow/tfjs-backend-wasm"
// tf.setBackend("webgl").then(r => )
function getval(id:string){
    let e= document.querySelector(`input#${id}`) as HTMLInputElement;
    return e.value;
}
function get<R extends keyof table>(id:string,tag:R=null):table[R]{
    return document.querySelector(`#${id}`) as table[R];
}
let a=get("hello")

type table={
    option:HTMLOptionElement,
    div:HTMLDivElement,
    input:HTMLInputElement,
    "*":HTMLElement,
    select:HTMLSelectElement
}
function create<T extends keyof table,R extends keyof table[T]>(tag: T,id:string,values:object):table[T]{
    let t= document.createElement(tag)
    t.id=id;
    //
    for(let k in values){
        if(k in t == false) continue;
        t[k]=values[k];
    }
    return t as unknown as table[T];
}

// let rules={
//     b3s23,
//     b1s12,
//     b3678s34678,
//     b36s23,
//     b35678s5678
// }
import {Rules as rules} from "./rules/matrix_rules"
import {setBackend} from "@tensorflow/tfjs";
import {debug} from "webpack";
function initSelection()
{

    for(let k in rules){
        get("rule").appendChild(create("option",k,{innerText:k,value:k}))
    }
}

function get_param(param:string){
    var query = location.search.substring(1).split('&');
    for(var i=0;i<query.length;i++){
        var kv = query[i].split('=');
        if(kv[0] == param){
            return kv[1];
        }
    }
    return null;
}

//是否需要训练神经网络测试
const usetrain=false;
async function main(){
    const s="webgl";
    const t=await tf.setBackend(s);
    alert(`后端:${s}${t?"成功":"失败"} 使用数据类型:${defaultDtype}`)
    initSelection();

    let ele=get("canvas") as HTMLCanvasElement;
    let hsize=[1024,1024]
    ele.height=hsize[0];
    ele.width=hsize[1];
    ele.id="ctx"
    const rsize=get_param("rsize")==null? 2:float(get_param("rsize"))
    get("rsize","input").value=rsize.toString();
    let size=[hsize[0]/rsize,hsize[1]/rsize]
    let d=new Draw(ele,size[0],size[1]);

    let init=()=>tf.randomUniform(size,0,1,defaultDtype).div(float(getval("rel"))).floor().equal(0).asType(defaultDtype) as tf.Tensor2D
    let dt=init();
    //输出
    get("info").innerText=`${dt.shape[0]}x${dt.shape[1]} (h*w) `
    get("cinfo").innerText=`${hsize[0]}x${hsize[1]} (h*w)`

    d.draw2D(dt);
    console.log(dt);
    //停止信号
    let p=true;
    //是否静默更新 不绘制
    let sl=false;
    //轮数
    let n=0;
    //绘制间隔 多少帧绘制一次
    let drawFreq=1;
    //loop 更新函数 从old计算得到new(帧矩阵）
    //更新函数默认使用矩阵规则 b3s23经典生命游戏
    let update=(old:tf.Tensor2D)=>useMatrixRule(old,rules.b3s23,usetrain)

    /**
     * 随机设置函数 用以随机添加点到画布上
     */
    function randomSet(count:number){
        for(var i of range(0,count)){
            setpoint(randint(hsize[0]),randint(hsize[1]))
        }
    }

    /**
     * 主循环 更新一帧 然后绘制
     */
    async function loop(){
        //输出大小
        let delayt=int(getval("delay"));
        
        for(;;){
            //随机添加点
            // randomSet()
            //正文
            await delay(delayt);
            let old=dt;
            dt=update(dt);
            old.dispose();
            
            // console.log(dt);
            //非静默 且 更细到了更新的时候 这里可以选择等待绘制完成或者不等待
            if(!sl&&n%drawFreq==0)
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
            //获取规则
            let ruleid=get("rule","select").selectedOptions[0].value;
            let rule=rules[ruleid] as Rule;
            //这里控制是否开启历史记录（持续消耗内存或显存）
            update=(old)=>useMatrixRule(old,rule,usetrain)
            //启动循环
            loop();
            get("start").style.background="red"
            get("start").innerText="暂停";
            get("train").style.display="none";
        }
        else{
            p=true;
            get("start").style.background=""
            get("start").innerText="启动";
            d.draw2D(dt);
            get("train").style.display="";
        }
        
    };
    get("train").onclick=async ()=>{
        await train(rsize);
        alert("训练成功,启动测试")
        //显示用网络实现的更新
        update=(old:tf.Tensor2D)=>useLayers(old);
        //启动测试，测试完成前请勿操作 
        //初始化
        dt=init();
        d.draw2D(dt);
        n=0;
        p=false;
        get("delay","input").value=str(200);
        await loop();
        //
        alert("测试完成");
    }
    

    get("reset").onclick=async()=>{
        dt=init();
        d.draw2D(dt);
        n=0;
    }

    function changepoint(x,y){
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
    function setpoint(x,y,v=1){
        if(x<0||y<0) return;
        let data=dt.arraySync();
        let tx,ty;
        tx=Math.floor(x/d.cw);
        ty=Math.floor(y/d.ch)
        data[ty][tx]=1;
        dt.dispose();
        dt=tf.tensor(data);
        d.draw2D(dt);
        //set
        // console.log(`set:${x},${y} = ${v}`)
    }
    get("ctx").onclick=e=>{
        if(e.button==0)
            changepoint(e.offsetX,e.offsetY);
    }
    get("ctx").onmousemove=e=>{
        if(e.buttons===1){
            setpoint(e.offsetX,e.offsetY,1);
        }
    }
    get("sl").onclick=()=>{
        sl=!sl;
        if(sl) get("sl").style.background="red";
        else get("sl").style.background="";
    }
    
    
}
window.onload=main;
console.log("helloworld");

const mod= (module as any);
if(mod.hot)
  mod.hot.accept();
console.log(mod.hot)
// mod.addDisposeHandler(()=>{
//     console.log("hello");
// })
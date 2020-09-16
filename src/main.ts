import * as tf from "@tensorflow/tfjs"
import { delay, int, float } from '../libs/lib';
import { Draw } from "./Draw";
import { matrix_rule, Rule} from './rules/matrix_rules';

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
function initSelection()
{
    for(let k in rules){
        get("rule").appendChild(create("option",k,{innerText:k,value:k}))
    }
}
async function main(){
    initSelection();

    let ele=document.createElement("canvas");
    let hsize=[1024,1024]
    ele.height=hsize[0];
    ele.width=hsize[1];
    ele.id="ctx"
    document.body.appendChild(ele);
    let size=[hsize[0]/4,hsize[1]/4]
    let d=new Draw(ele,size[0],size[1]);

    let init=()=>tf.randomUniform(size,0,1,"float32").div(float(getval("rel"))).floor().equal(0).asType("int32") as tf.Tensor2D
    let dt=init();

    d.draw2D(dt);
    console.log(dt);
    let p=true;
    let sl=false;
    let n=0;
    //loop
    async function loop(){
        let delayt=int(getval("delay"));
        //获取规则
        let ruleid=get("rule","select").selectedOptions[0].value;
        let rule=rules[ruleid] as Rule;
        for(;;){
            await delay(delayt);
            let old=dt;
            dt=matrix_rule(old,rule);
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
            get("start").style.background="red"
            get("start").innerText="暂停";
        }
        else{
            p=true;
            get("start").style.background=""
            get("start").innerText="启动";
            d.draw2D(dt);
        }
        
    };
    

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
mod.addDisposeHandler(()=>{
    console.log("hello");
})
import * as tf from "@tensorflow/tfjs"
import { delay, int, float, str } from '../libs/lib';
import { Draw } from "./Draw";
import { matrix_rule, Rule, train, useLayers } from './rules/matrix_rules';
tf.setBackend("webgl").then(v => {
    if (v) {
        alert("初始化webgl后端成功")
        
    }
})

function getval(id: string) {
    let e = document.querySelector(`input#${id}`) as HTMLInputElement;
    return e.value;
}
function get<R extends keyof table>(id: string, tag: R = null): table[R] {
    return document.querySelector(`#${id}`) as table[R];
}
let a = get("hello")

type table = {
    option: HTMLOptionElement,
    div: HTMLDivElement,
    input: HTMLInputElement,
    "*": HTMLElement,
    select: HTMLSelectElement
}
function create<T extends keyof table, R extends keyof table[T]>(tag: T, id: string, values: object): table[T] {
    let t = document.createElement(tag)
    t.id = id;
    //
    for (let k in values) {
        if (k in t == false) continue;
        t[k] = values[k];
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
import { Rules as rules } from "./rules/matrix_rules"
function initSelection() {
    for (let k in rules) {
        get("rule").appendChild(create("option", k, { innerText: k, value: k }))
    }
}

function get_param(param: string) {
    var query = location.search.substring(1).split('&');
    for (var i = 0; i < query.length; i++) {
        var kv = query[i].split('=');
        if (kv[0] == param) {
            return kv[1];
        }
    }
    return null;
}

async function main() {
    initSelection();

    let ele = get("canvas") as HTMLCanvasElement;
    let hsize = [1024, 1024]
    ele.height = hsize[0];
    ele.width = hsize[1];
    ele.id = "ctx"
    const rsize = get_param("rsize") == null ? 0.25 : float(get_param("rsize"))
    get("rsize", "input").value = rsize.toString();
    let size = [hsize[0] / rsize, hsize[1] / rsize]
    let d = new Draw(ele, size[0], size[1]);

    let init = () => tf.tidy(() => tf.randomUniform(size, 0, 1, "float32").div(float(getval("rel"))).floor().equal(0).asType("int32") as tf.Tensor2D)
    let dt = init();
    //输出
    get("info").innerText = `${dt.shape[0]}x${dt.shape[1]} (h*w) `
    get("cinfo").innerText = `${hsize[0]}x${hsize[1]} (h*w)`

    d.draw2D(dt);
    console.log(dt);
    let p = true;
    let sl = false;
    let n = 0;
    //loop
    let update = (old: tf.Tensor2D) => matrix_rule(old, rules.b3s23)
    async function loop() {
        //输出大小
        let delayt = int(getval("delay"));

        for (; ;) {
            await delay(delayt);
            let old = dt;
            dt = update(dt);
            old.dispose();

            // console.log(dt);
            //非静默
            if (!sl)
                await d.draw2D(dt);
            //
            if (p) break;
            n++;
            //显示轮
            get("n").innerText = n.toString();
        }
    }
    //event
    get("start").onclick = async () => {
        if (p) {
            p = false;
            //获取规则
            let ruleid = get("rule", "select").selectedOptions[0].value;
            let rule = rules[ruleid] as Rule;
            update = (old) => matrix_rule(old, rule)
            //启动循环
            loop();
            get("start").style.background = "red"
            get("start").innerText = "暂停";
            get("train").style.display = "none";
        }
        else {
            p = true;
            get("start").style.background = ""
            get("start").innerText = "启动";
            d.draw2D(dt);
            get("train").style.display = "";
        }

    };
    get("train").onclick = async () => {
        await train(rsize);
        alert("训练成功,启动测试")
        //显示用网络实现的更新
        update = (old: tf.Tensor2D) => useLayers(old);
        //启动测试，测试完成前请勿操作 
        //初始化
        dt = init();
        d.draw2D(dt);
        n = 0;
        p = false;
        get("delay", "input").value = str(200);
        await loop();
        //
        alert("测试完成");
    }


    get("reset").onclick = async () => {
        dt = init();
        d.draw2D(dt);
        n = 0;
    }

    function changepoint(x, y) {
        if (x < 0 || y < 0) return;
        let data = dt.arraySync();
        let tx, ty;
        tx = Math.floor(x / d.cw);
        ty = Math.floor(y / d.ch)
        data[ty][tx] = data[ty][tx] == 0 ? 1 : 0;
        dt.dispose();
        dt = tf.tensor(data, undefined, "int32");
        d.draw2D(dt);
    }
    function setpoint(x, y, v = 1) {
        if (x < 0 || y < 0) return;
        let data = dt.arraySync();
        let tx, ty;
        tx = Math.floor(x / d.cw);
        ty = Math.floor(y / d.ch)
        data[ty][tx] = 1;
        dt.dispose();
        dt = tf.tensor(data, undefined, "int32");
        d.draw2D(dt);
    }
    get("ctx").onclick = e => {
        if (e.button == 0)
            changepoint(e.offsetX, e.offsetY);
    }
    get("ctx").onmousemove = e => {
        if (e.buttons === 1) {
            setpoint(e.offsetX, e.offsetY, 1);
        }
    }
    get("sl").onclick = () => {
        sl = !sl;
        if (sl) get("sl").style.background = "red";
        else get("sl").style.background = "";
    }


}
window.onload = main;
console.log("helloworld");

const mod = ((window as any).module as any);
if (mod.hot)
    mod.hot.accept();
console.log(mod.hot)
mod.addDisposeHandler(() => {
    console.log("hello");
})
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

    let init = () => tf.tidy(() =>
        tf.randomUniform(size, 0, 1, "float32")
            .div(float(getval("rel")))
            .floor()
            .equal(0)
            .asType("int32") as tf.Tensor2D)
    //第一层 存在层
    let dt = init();
    let engobj_layer=tf.tidy(()=>{
        //能量物质层 主要表示地图上的能量物质 如食物等 
    })
    //光能层 光能需要被特殊物质来吸收 
    let light_layer=tf.onesLike(dt).asType("float32").mul(0.01);
    let yls_layer=tf.zerosLike(dt).asType("float32"); //叶绿素层 用于吸收光能

    //--
    let mass_eng_layer=tf.zerosLike(dt); //物质能量层 需要和dt物质层相乘才能得到实际能量
    //能量必须存在于物质之中


    //规则：光能恒定不变 叶绿素层会在有光能的地方通过相乘得到吸收的能量 并存储到本格子的能量物质层中
    //也就是叶绿素所在的地方 能量物质的值会不断上升 实际上 能量物质是float 连续变化 没有上限
    //关于死物质的运动 所谓死物质就是能量物质 叶绿素等非生命物质
    //其变化基于堆积规则 每个格子都会受到周围格子的物质的影响 
    //每个物质的格子 堆积到一定量 会向外溢出
    //具体来说为s=log((x-threshold)) 外溢层压力系数为这个系数y=s*x  其中threshold为一个常量 作为一个系数
    //计算时 以接收者为中心 其会接收周围的8个格子里的所有物质 按溢出量/8 来计算
    //其会使用中心为0 周围为0.125的卷积核 对应到y
    //第二层为中间为1 周围为0 的卷积核 对应到本体x
    //计算时把x作为第二层 y作为第一层 使用这个双层卷积核做计算 结果是单通道 作为新的x存在
    //每轮一次

    //这是所谓的物质基本规则 优先级0 所有float类型的（表示密度或强度）的物质层都用这个算法
    //光能层则完全恒定 不会变化
    //叶绿素层本身也是物质层 同时叶绿素层会进行光能吸收计算 并将产生的能量物质加到对应坐标的
    //能量物质层的格子中
    //关于次级能量物质也就是ATP层 这一层可以被消费物质层或者叫线粒体层使用
    //线粒体层会消耗周围所处位置的能量物质 并将其转换为ATP层的物质 ATP层的物质也是普通物质  参与上述算法
    //关于宏观物体的界限 这里涉及到界限和附着的问题
    //附着基于极性物质 墙壁物质和极性物质附着到其他物质的格子上的情况 
    //极性物质是一种普通物质 但同时其也是一种附着物质 其可以附着在任何物质上 
    //极性物质有一层 正数为阳性 负数为阴性 阴性和阳性物质会抵消 如果在同一个格子 其实就是相加
    //墙壁物质是一种会阻碍基本物质规则运行的物质 具体来说 墙壁物质会阻止物质向周围扩散
    //这里有一个判定规则 （而非抵消规则） 墙壁物质格子的存在会直接让其他物质无法扩散到整个位置
    //除非扩散压力系数s的强度超出墙壁物质的强度（这里数值要对齐） 一旦墙壁物质被突破
    //墙壁物质会被转换为能量 这里e表示转换系数 变成能量物质加到能量物质层里


    //关于布朗运动规则 这里支持布朗运动 任何物质层都会发现随机飘逸 也就是s会有一个非常小的随机量 
    //通过物质外溢规则进行小的外溢 即使在没有达到阈值的情况下 依然存在这种外溢 这会让各层的物质逐渐填满整个空间
    //关于边缘的问题 边缘看成是无限大的墙壁物质 且不可被附着 也不会被转换为能量
    
    //关系信号物质和光能传感器等传感器物质 
    //信号物质可以被传感器物质产生 产生信号物质也需要能量传感器物质也是一种光能接收物质 
    //其会和同位置的叶绿体物质按比例吸收光能但其光能吸收系数非常小  而叶绿体是0.2 先计算浓度比例
    //然后计算吸收系数 

    //信号物质会有不同的信号物质 其也遵循普通物质的规则 每种信号物质都有对应的信号接收物质 接收后会进行一个特定行为
    //每种接收器能接收的信号物质和其行为都不一样

    //关于基因和转录的问题
    //由于生命太复杂 这里设计一个生命核心 这个核心可以管理遗传和转录问题 
    //简单来说 dna格子是一个复杂的对象格子 其中存储了复杂的序列信息 转录器格子可以和dna格子重合
    //产生rna格子  rna格子可以和核糖体格子重合并由核糖体格子产生一系列转录的复杂性为（当然同时要和atp格子重合）
    //核糖体格子是一个状态机 其每次得到一个atp就会执行一步
    //并消耗atp为虚无
    //生命核心消耗一定能量是可以制造出来的制造出来的时候要指定一个父核心 也可以多个核心 做混杂

    //物质属性层这里认为 存在层只是质量 而质量是能量的集中结果 能量会等效转换为质量
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
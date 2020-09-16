(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["commons~main"],{

/***/ "./libs/lib.ts":
/*!*********************!*\
  !*** ./libs/lib.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.len = exports.keys = exports.set = exports.map = exports.mapToObj = exports.list = exports.float = exports.int = exports.insert = exports.max = exports.min = exports.sample = exports.extract = exports.byIdx = exports.sorted = exports.shuffle = exports.zip = exports.print = exports.all = exports.any = exports.enumerate = exports.range = exports.delay = exports.randint = void 0;
function randint(max) {
    return Math.floor(Math.random() * max) % max;
}
exports.randint = randint;
async function delay(mis) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, mis);
    });
}
exports.delay = delay;
//仿python基础设施
function* range(start, space, end) {
    //允许 range(a,c,b) range(b) range(a,b)
    if (space == null && end == null) {
        //1
        yield* range(0, 1, start);
    }
    else if (end == null) {
        //2
        yield* range(start, 1, space);
    }
    else {
        //3
        for (let i = start; i < end; i += space) {
            yield i;
        }
    }
}
exports.range = range;
function* enumerate(arraylike) {
    let now = 0;
    for (let a of arraylike) {
        yield [now++, a];
    }
}
exports.enumerate = enumerate;
function any(arraylike) {
    for (let a of arraylike) {
        if (a)
            return true;
    }
    return false;
}
exports.any = any;
function all(arraylike) {
}
exports.all = all;
function print(data) {
    console.log(data);
}
exports.print = print;
function* zip(...arraylikes) {
    let itors = arraylikes.map(v => v[Symbol.iterator]());
    for (;;) {
        //对所有itor取next 如果全部成功则yield 否则返回
        let ress = itors.map(v => v.next());
        // print(ress);
        //如果有一个结束
        if (any(ress.map(v => v.done))) {
            //返回
            return undefined;
        }
        else
            yield ress.map(v => v.value);
    }
}
exports.zip = zip;
//基本操作
function shuffle(arl) {
    let a = list(arl);
    let r = new Array(len(a));
    for (let t of a) {
        //随机填空
        let idx = randint(len(a));
        r[idx] = t;
    }
    return r;
}
exports.shuffle = shuffle;
function sorted(arl, key = null) {
    let ret = list(arl).sort((a, b) => {
        let [k, kk] = [key(a), key(b)];
        return k - kk;
    });
    return ret;
}
exports.sorted = sorted;
function byIdx(arl, idxs) {
    let l = list(arl);
    let ret = idxs.map(v => l[v]);
    return ret;
}
exports.byIdx = byIdx;
//不放回采样
function extract(arl, count) {
    //从一个列表中采样 不放回
    let a = list(arl);
    let idx = shuffle(range(len(a))).slice(0, count);
    print(idx);
    return byIdx(a, idx);
}
exports.extract = extract;
//有放回采样
function sample(arl, count) {
    //从一个列表中采样 有放回
    let a = list(arl);
    let idx = list(range(len(a))).map(v => randint(len(a)));
    return byIdx(a, idx);
}
exports.sample = sample;
//数学
exports.min = Math.min;
exports.max = Math.max;
/**
 * 插入
 * @param arl 数组
 * @param point 插入位置 插入到这个位置的元素前面 为 0-len(arl) 的值
 * @param val 插入值
 */
function insert(arl, point, val) {
    let newar = [];
    let a = list(arl);
    a.forEach((v, idx) => {
        if (point == idx)
            newar.push(val);
        newar.push(v);
    });
    if (len(a) == point)
        newar.push(val);
    return newar;
}
exports.insert = insert;
function int(other) {
    if (typeof other == "string")
        return parseInt(other);
    else if (typeof other == "number")
        return other | 0;
    else if ("toInt" in other) {
        return other.toInt();
    }
    else
        return 0;
}
exports.int = int;
function float(other) {
    if (typeof other == "string")
        return parseFloat(other);
    else if (typeof other == "number")
        return other;
    else if ("toFloat" in other) {
        return other.toFloat();
    }
    else
        return 0;
}
exports.float = float;
//数据容器构造区域
function list(iter) {
    if (iter == null)
        return list([]);
    let ret = [];
    for (let a of iter) {
        ret.push(a);
    }
    return ret;
}
exports.list = list;
//融合对象 
function mapToObj(map) {
    //
    let r = new Proxy({}, {
        get(target, p, receiver) {
            return map.get(p);
        },
        set(target, p, value, receive) {
            map.set(p, value);
            return true;
        },
        has(target, p) {
            return map.has(p);
        },
        deleteProperty(target, p) {
            return map.delete(p);
        },
        defineProperty(target, p, attributes) {
            map.set(p, attributes.value);
            return true;
        },
        enumerate(target) {
            return list(map.keys());
        },
        ownKeys(target) {
            return list(map.keys());
        }
        // apply (target, thisArg: any, argArray?: any): any
        // {
        // },
        // construct (target, argArray: any, newTarget?: any): object
        // {
        // }
    });
    return r;
}
exports.mapToObj = mapToObj;
function map(arl) {
    return new Map(arl);
}
exports.map = map;
function set(arl) {
    return new Set(arl);
}
exports.set = set;
//数据操作
function* keys(obj) {
    //取对象的key或map的所有key 枚举
    if (obj instanceof Map) {
        //枚举
        for (let a of obj.keys()) {
            yield a;
        }
    }
    else if (typeof obj == "object") {
        for (let k in obj) {
            yield k;
        }
    }
}
exports.keys = keys;
//以下为调用协议
function len(obj) {
    if ("length" in obj) {
        return obj.length;
    }
    else if ("size" in obj) {
        return obj.size;
    }
    else if ("count" in obj) {
        return obj.count;
    }
    else if ("__len__" in obj) {
        return obj.__len__();
    }
    else if (typeof obj == "object") {
        let sum = 0;
        for (let k in obj) {
            sum++;
        }
        return sum;
    }
}
exports.len = len;
// //类型函数把一个类型映射为另一个类型
// //对象映射函数，把一个对象中的每个属性使用一个mapper映射
// //递归对象映射函数，把一个对象中的所有非对象属性使用mapper映射，对象递归映射
// type Mapper<A,B>=[A,B];
// type MapTo<T extends Mapper<any,any>,C>=C extends T[0]? T[1]:never;
// type Switch<T, U extends any> =
//     T extends keyof U ? U[T] : U["default"];
// // 获取第一个元素
// export type Head<T> = T extends { 0: infer H } ? H : never;
// // 移除第一个元素
// export type Tail<T> = (
//     (...a: T extends any[] ? T : never) => void
// ) extends (a: any, ...b: infer R) => void ? R : never;
// export type Unshift<T, A> = (
//     (a: A, ...b: T extends any[] ? T : never) => void
// ) extends (...a: infer R) => void ? R : never;
// // 在尾部加入一个元素
// export type Copy<T, S extends any> = { [P in keyof T]: S[P] };
// export type Push<T, A> = Copy<Unshift<T, any>, T & Record<string, A>>;
// type MultiMapTo<T extends any[],C,k="stuff">=T["length"] extends 0? MapTo<T[0],C>:
//                                                 C extends T[0][0]? T[0][1]:Switch<k,{
//                                                     stuff:MultiMapTo<Tail<T>,C,k>
//                                                 }>;
// type ObjectTypeMap<C extends Mapper<any,any>[],T extends object>={[P in keyof T]:MultiMapTo<C,T[P]>};
// //实现递归性 尚未实现
// type ObjectMapper<T extends object,C extends Mapper<any, any>[]>=[T,ObjectTypeMap<C,T>]
// type s=[[number,string],[string,number],ObjectMapper<object,s>];
// type o={
//     a:string,
//     b:number,
//     c:{
//         d:string,
//         e:number
//     }
// };
// type r=ObjectTypeMap<s,o>;
// //值化类型定义
// //类型判断用
// type TypeRep<T,V=string>={
//     value:V,
//     type:T
// };
// //程序用的
// let type_array="array";
// let type_number="number";
// let type_string="string";
// //值部分
// function getarray<T>(value:T):TypeRep<"array",T>{
//     return {
//         value:value,
//         type:"array"
//     }
// }
// function getnumber<T>(value:T):TypeRep<"number",T>{
//     return {
//         value:value,
//         type:"number"
//     }
// }
// function getstring<T>(value:T):TypeRep<"string",T>{
//     return {
//         value:value,
//         type:"string"
//     }
// }
// //映射部分
// //映射器
// type RepMap<A,B>=Mapper<TypeRep<A>,B>;
// //类型映射器
// type RepMappers=[RepMap<"string",string>,
//                 RepMap<"number",number>,
//                 RepMap<"array",any[]>]
// //映射rep类型到正常类型
// type Extract<Rep>=MultiMapTo<RepMappers,Rep>;
// //映射model 到 parse后类型
// type MapModel<ModelType extends {[P in keyof ModelType]:TypeRep<any>}>=ObjectTypeMap<RepMappers,ModelType>
// let model={
//     title:getstring(".title"),
//     list:getarray(".array")
// }
// type a=MapModel<typeof model>;
// function parse(body,model:object):MapModel<typeof model>{
//     return null;
// }


/***/ }),

/***/ "./src/Draw.ts":
/*!*********************!*\
  !*** ./src/Draw.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draw = void 0;
const tf = __importStar(__webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js"));
const matrix_tool_1 = __webpack_require__(/*! ./matrix_tool */ "./src/matrix_tool.ts");
class Draw {
    constructor(ele, rs, cs) {
        this.ele = ele;
        this.rs = rs;
        this.cs = cs;
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
        this.pixelsize = [this.ch, this.cw];
        this.upsample = tf.layers.upSampling2d({ size: this.pixelsize });
    }
    drawPoint(x, y, c) {
        let rx, ry;
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
    async draw2D(ts) {
        this.tctx.clearRect(0, 0, this.w, this.h);
        // this.tctx.fillStyle = "#ffffff";
        // this.tctx.fillRect(0, 0, this.w, this.h);
        //法1
        let rgbmat = await this.torgb(ts); //0 ffffffff 1 00000000
        let img = this.tctx.putImageData(rgbmat, 0, 0);
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
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.ctx.drawImage(this.off, 0, 0);
    }
    async torgb(t) {
        //横纵扩展4倍 拉伸
        // function horexpand(t:tf.Tensor2D,v=4):tf.Tensor2D{
        //     return t.expandDims(2).tile([1,1,v]).reshape([t.shape[0],t.shape[1]*v])
        // }
        // function vorexpand(t:tf.Tensor2D,v=4):tf.Tensor2D{
        //     return horexpand(t.transpose(),v).transpose();
        // }
        let num = tf.tidy(() => {
            //int32 然后×一个颜色
            let colored = t.mul(0xff0000ff | 0);
            // let resized=vorexpand(horexpand(colored));
            let r = this.pixelsize[0] == this.pixelsize[0] && this.pixelsize[0] == 1 ? matrix_tool_1.expandTo4D(colored) : this.upsample.call(matrix_tool_1.expandTo4D(colored), {});
            let resized = r.squeeze([0, 3]);
            //进行rgba话 横向扩展4倍
            // let rgb=horexpand(resized,4);
            //颜色处理 把1 1 1 1的连续4个 变为 aaaaaaaa
            // let cor=rgb.mul(0xaa);
            let num = resized.asType("int32");
            return num;
        });
        //num转换为uint8
        let ar = await num.data();
        let pixeds = new Uint8ClampedArray(ar.buffer);
        num.dispose();
        return new ImageData(pixeds, num.shape[1], num.shape[0]);
    }
}
exports.Draw = Draw;
//把01矩阵转换为像素矩阵
const size = [4, 4];


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tf = __importStar(__webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js"));
const lib_1 = __webpack_require__(/*! ../libs/lib */ "./libs/lib.ts");
const Draw_1 = __webpack_require__(/*! ./Draw */ "./src/Draw.ts");
const matrix_rules_1 = __webpack_require__(/*! ./rules/matrix_rules */ "./src/rules/matrix_rules.ts");
function getval(id) {
    let e = document.querySelector(`input#${id}`);
    return e.value;
}
function get(id, tag = null) {
    return document.querySelector(`#${id}`);
}
let a = get("hello");
function create(tag, id, values) {
    let t = document.createElement(tag);
    t.id = id;
    //
    for (let k in values) {
        if (k in t == false)
            continue;
        t[k] = values[k];
    }
    return t;
}
// let rules={
//     b3s23,
//     b1s12,
//     b3678s34678,
//     b36s23,
//     b35678s5678
// }
const matrix_rules_2 = __webpack_require__(/*! ./rules/matrix_rules */ "./src/rules/matrix_rules.ts");
function initSelection() {
    for (let k in matrix_rules_2.Rules) {
        get("rule").appendChild(create("option", k, { innerText: k, value: k }));
    }
}
function get_param(param) {
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
    let ele = get("canvas");
    let hsize = [1024, 1024];
    ele.height = hsize[0];
    ele.width = hsize[1];
    ele.id = "ctx";
    const rsize = get_param("rsize") == null ? 0.25 : lib_1.float(get_param("rsize"));
    get("rsize", "input").value = rsize;
    let size = [hsize[0] / rsize, hsize[1] / rsize];
    let d = new Draw_1.Draw(ele, size[0], size[1]);
    let init = () => tf.randomUniform(size, 0, 1, "float32").div(lib_1.float(getval("rel"))).floor().equal(0).asType("int32");
    let dt = init();
    //输出
    get("info").innerText = `${dt.shape[0]}x${dt.shape[1]} (h*w) `;
    get("cinfo").innerText = `${hsize[0]}x${hsize[1]} (h*w)`;
    d.draw2D(dt);
    console.log(dt);
    let p = true;
    let sl = false;
    let n = 0;
    //loop
    async function loop() {
        //输出大小
        let delayt = lib_1.int(getval("delay"));
        //获取规则
        let ruleid = get("rule", "select").selectedOptions[0].value;
        let rule = matrix_rules_2.Rules[ruleid];
        for (;;) {
            await lib_1.delay(delayt);
            let old = dt;
            dt = matrix_rules_1.matrix_rule(old, rule);
            old.dispose();
            // console.log(dt);
            //非静默
            if (!sl)
                await d.draw2D(dt);
            //
            if (p)
                break;
            n++;
            //显示轮
            get("n").innerText = n.toString();
        }
    }
    //event
    get("start").onclick = async () => {
        if (p) {
            p = false;
            loop();
            get("start").style.background = "red";
            get("start").innerText = "暂停";
        }
        else {
            p = true;
            get("start").style.background = "";
            get("start").innerText = "启动";
            d.draw2D(dt);
        }
    };
    get("reset").onclick = async () => {
        dt = init();
        d.draw2D(dt);
        n = 0;
    };
    function changepoint(x, y) {
        if (x < 0 || y < 0)
            return;
        let data = dt.arraySync();
        let tx, ty;
        tx = Math.floor(x / d.cw);
        ty = Math.floor(y / d.ch);
        data[ty][tx] = data[ty][tx] == 0 ? 1 : 0;
        dt.dispose();
        dt = tf.tensor(data);
        d.draw2D(dt);
    }
    function setpoint(x, y, v = 1) {
        if (x < 0 || y < 0)
            return;
        let data = dt.arraySync();
        let tx, ty;
        tx = Math.floor(x / d.cw);
        ty = Math.floor(y / d.ch);
        data[ty][tx] = 1;
        dt.dispose();
        dt = tf.tensor(data);
        d.draw2D(dt);
    }
    get("ctx").onclick = e => {
        if (e.button == 0)
            changepoint(e.offsetX, e.offsetY);
    };
    get("ctx").onmousemove = e => {
        if (e.buttons === 1) {
            setpoint(e.offsetX, e.offsetY, 1);
        }
    };
    get("sl").onclick = () => {
        sl = !sl;
        if (sl)
            get("sl").style.background = "red";
        else
            get("sl").style.background = "";
    };
}
window.onload = main;
console.log("helloworld");
const mod = module;
if (mod.hot)
    mod.hot.accept();
console.log(mod.hot);
mod.addDisposeHandler(() => {
    console.log("hello");
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/matrix_tool.ts":
/*!****************************!*\
  !*** ./src/matrix_tool.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDimTo2D = exports.expandTo4D = exports.symlize = exports.reverseBool = exports.equalMap = void 0;
const tf = __importStar(__webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js"));
//如果等于则为1 否则则为0
//相等比较
function equalMap(ts, equto) {
    // if(equto!=0) return ts.div(equto).sub(1).abs().lessEqual(0);
    return tf.equal(ts, equto).asType(ts.dtype);
}
exports.equalMap = equalMap;
//此处应有大于比较  由此可得 所有比较判断
//1-0 变换 即not运算
function reverseBool(ts) {
    return ts.sub(1).abs();
}
exports.reverseBool = reverseBool;
//0-1 变为  -1 1 符号化运算
function symlize(ts) {
    return ts.mul(2).sub(1);
}
exports.symlize = symlize;
//此处应有与或非 异或 
function expandTo4D(ts) {
    //这个把2d featuremap变为4d可以直接进行卷积操作的featuremap或kernel
    //也就是直接对featuremap进行卷积
    //变成nhwc
    let s = ts.expandDims(0).expandDims(-1);
    //扩展一个前面的n和一个后面的c
    return s;
}
exports.expandTo4D = expandTo4D;
function deleteDimTo2D(ts) {
    //这个把2d featuremap变为4d可以直接进行卷积操作的featuremap或kernel
    //也就是直接对featuremap进行卷积
    //变成nhwc
    let s = ts.squeeze([0, 3]);
    //扩展一个前面的n和一个后面的c
    return s;
}
exports.deleteDimTo2D = deleteDimTo2D;


/***/ }),

/***/ "./src/rules/matrix_rules.ts":
/*!***********************************!*\
  !*** ./src/rules/matrix_rules.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matrix_rule = exports.Rules = void 0;
const tf = __importStar(__webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js"));
const matrix_tool_1 = __webpack_require__(/*! ../matrix_tool */ "./src/matrix_tool.ts");
function keep(K, S, P, v = 2) {
    let K2 = matrix_tool_1.equalMap(K, v);
    return P.add(K2.mul(S));
}
function setOne(K, S, P, v = 3) {
    let K3 = matrix_tool_1.equalMap(K, v);
    return P.add(K3);
}
function use(K, S, P) {
    class funcs {
        constructor() {
            this.K = K;
            this.S = S;
            this.P = P;
            this.keep = (v) => this.P = keep(this.K, this.S, this.P, v);
            this.setOne = (v) => this.P = setOne(this.K, this.S, this.P, v);
        }
        get() {
            return this.P;
        }
    }
    return new funcs();
}
function basic(ts) {
    let ker = tf.tensor2d([
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]).expandDims(-1).expandDims(-1);
    //把ts变为4d
    let S = matrix_tool_1.expandTo4D(ts);
    let K = S.conv2d(ker, 1, "same", "NHWC");
    //计算
    //叠加
    //这个是其他设0
    let P = tf.zerosLike(S);
    return { K, S, P };
}
var Rules;
(function (Rules) {
    //基本规则
    //表示 2的时候保持 3的时候稳定
    function b3s23(rule) {
        rule.keep(2);
        rule.setOne(3);
    }
    Rules.b3s23 = b3s23;
    function b36s23(rule) {
        b3s23(rule);
        rule.setOne(6);
    }
    Rules.b36s23 = b36s23;
    function b1s12(rule) {
        rule.keep(2);
        rule.setOne(1);
    }
    Rules.b1s12 = b1s12;
    function b3678s34678(rule) {
        rule.keep(4);
        rule.setOne(3);
        rule.setOne(6);
        rule.setOne(7);
        rule.setOne(8);
    }
    Rules.b3678s34678 = b3678s34678;
    function b35678s5678(rule) {
        // rule.keep(4);
        rule.setOne(3);
        rule.setOne(5);
        rule.setOne(6);
        rule.setOne(7);
        rule.setOne(8);
    }
    Rules.b35678s5678 = b35678s5678;
})(Rules = exports.Rules || (exports.Rules = {}));
//理论上这个可以支持各种规则
function matrix_rule(ts, ruleF = Rules.b3s23) {
    //生命游戏卷积 从一个feature map 得到下一个featuremap
    //原始 S 卷积得到K 然后K+S 得到P 然后对P使用equalMap3 得到二值化的下一个
    //featuremap
    return tf.tidy(() => {
        let { K, S, P } = basic(ts);
        let rule = use(K, S, P);
        ruleF(rule);
        P = rule.get();
        return matrix_tool_1.deleteDimTo2D(P);
    });
}
exports.matrix_rule = matrix_rule;


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** node-fetch (ignored) ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!********************************!*\
  !*** string_decoder (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWJzL2xpYi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJhdy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0cml4X3Rvb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hdHJpeF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vbm9kZS1mZXRjaCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3V0aWwgKGlnbm9yZWQpIiwid2VicGFjazovLy9jcnlwdG8gKGlnbm9yZWQpIiwid2VicGFjazovLy9zdHJpbmdfZGVjb2RlciAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2ZzIChpZ25vcmVkKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsU0FBZ0IsT0FBTyxDQUFDLEdBQVc7SUFDL0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDakQsQ0FBQztBQUZELDBCQUVDO0FBSU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxHQUFHO0lBQzNCLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUMsRUFBRTtRQUNoQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDLENBQUM7QUFDTixDQUFDO0FBTkQsc0JBTUM7QUFHRCxhQUFhO0FBQ2IsUUFBZ0IsQ0FBQyxNQUFLLENBQUMsS0FBWSxFQUFDLEtBQWEsRUFBQyxHQUFXO0lBQ3pELHFDQUFxQztJQUNyQyxJQUFHLEtBQUssSUFBRSxJQUFJLElBQUUsR0FBRyxJQUFFLElBQUksRUFBQztRQUN0QixHQUFHO1FBQ0gsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7U0FD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Q2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBUGUsaUJBQVcsY0FPMUI7QUFDTCxDQUFDLEVBL0JnQixLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUErQnJCO0FBQ0QsZUFBZTtBQUNmLFNBQWdCLFdBQVcsQ0FBQyxFQUFlLEVBQUMsUUFBNEIsS0FBSyxDQUFDLEtBQUs7SUFDL0UsdUNBQXVDO0lBQ3ZDLGdEQUFnRDtJQUNoRCxZQUFZO0lBQ1osT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUUsRUFBRTtRQUNmLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxHQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QixJQUFJLElBQUksR0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDWixDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTywyQkFBYSxDQUFDLENBQWdCLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztBQUVQLENBQUM7QUFaRCxrQ0FZQzs7Ozs7Ozs7Ozs7O0FDeEZELGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZSIsImZpbGUiOiJjb21tb25zfm1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJhbmRpbnQobWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICUgbWF4O1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxheShtaXMpe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKT0+e1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSwgbWlzKTtcclxuICAgIH0pICAgXHJcbn1cclxuXHJcblxyXG4vL+S7v3B5dGhvbuWfuuehgOiuvuaWvVxyXG5leHBvcnQgZnVuY3Rpb24gKnJhbmdlKHN0YXJ0Om51bWJlcixzcGFjZT86bnVtYmVyLGVuZD86bnVtYmVyKTpJdGVyYWJsZTxudW1iZXI+e1xyXG4gICAgLy/lhYHorrggcmFuZ2UoYSxjLGIpIHJhbmdlKGIpIHJhbmdlKGEsYilcclxuICAgIGlmKHNwYWNlPT1udWxsJiZlbmQ9PW51bGwpe1xyXG4gICAgICAgIC8vMVxyXG4gICAgICAgIHlpZWxkKiByYW5nZSgwLDEsc3RhcnQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbmQ9PW51bGwpe1xyXG4gICAgICAgIC8vMlxyXG4gICAgICAgIHlpZWxkKiByYW5nZShzdGFydCwxLHNwYWNlKTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgLy8zXHJcbiAgICAgICAgZm9yKGxldCBpPXN0YXJ0O2k8ZW5kO2krPXNwYWNlKXtcclxuICAgICAgICAgICAgeWllbGQgaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiogZW51bWVyYXRlPFQ+KGFycmF5bGlrZTpJdGVyYWJsZTxUPik6SXRlcmFibGU8W251bWJlcixUXT57XHJcbiAgICBsZXQgbm93PTA7XHJcbiAgICBmb3IobGV0IGEgb2YgYXJyYXlsaWtlKXtcclxuICAgICAgICB5aWVsZCBbbm93KyssYV1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFueShhcnJheWxpa2U6SXRlcmFibGU8YW55Pilcclxue1xyXG4gICAgZm9yKGxldCBhIG9mIGFycmF5bGlrZSl7XHJcbiAgICAgICAgaWYoYSkgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFsbChhcnJheWxpa2U6SXRlcmFibGU8YW55Pilcclxue1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJpbnQoZGF0YTphbnkpe1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uICp6aXAoLi4uYXJyYXlsaWtlczpJdGVyYWJsZTxhbnk+W10pe1xyXG4gICAgbGV0IGl0b3JzPWFycmF5bGlrZXMubWFwKHY9PnZbU3ltYm9sLml0ZXJhdG9yXSgpKTtcclxuICAgIGZvcig7Oyl7XHJcbiAgICAgICAgLy/lr7nmiYDmnIlpdG9y5Y+WbmV4dCDlpoLmnpzlhajpg6jmiJDlip/liJl5aWVsZCDlkKbliJnov5Tlm55cclxuICAgICAgICBsZXQgcmVzcz1pdG9ycy5tYXAodj0+di5uZXh0KCkpO1xyXG4gICAgICAgIC8vIHByaW50KHJlc3MpO1xyXG4gICAgICAgIC8v5aaC5p6c5pyJ5LiA5Liq57uT5p2fXHJcbiAgICAgICAgaWYoYW55KHJlc3MubWFwKHY9PnYuZG9uZSkpKXtcclxuICAgICAgICAgICAgLy/ov5Tlm55cclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB5aWVsZCByZXNzLm1hcCh2PT52LnZhbHVlKTtcclxuICAgIH1cclxufVxyXG4vL+WfuuacrOaTjeS9nFxyXG5leHBvcnQgZnVuY3Rpb24gc2h1ZmZsZTxUPihhcmw6SXRlcmFibGU8VD4pOlRbXXtcclxuICAgIGxldCBhPWxpc3QoYXJsKTtcclxuICAgIGxldCByPW5ldyBBcnJheShsZW4oYSkpO1xyXG4gICAgZm9yKGxldCB0IG9mIGEpe1xyXG4gICAgICAgIC8v6ZqP5py65aGr56m6XHJcbiAgICAgICAgbGV0IGlkeD1yYW5kaW50KGxlbihhKSk7XHJcbiAgICAgICAgcltpZHhdPXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc29ydGVkPFQ+KGFybDpJdGVyYWJsZTxUPixrZXk6KHY6VCk9Pm51bWJlcj1udWxsKXtcclxuICAgIGxldCByZXQ9bGlzdChhcmwpLnNvcnQoKGEsYik9PntcclxuICAgICAgICBsZXQgW2ssa2tdPVtrZXkoYSksa2V5KGIpXVxyXG4gICAgICAgIHJldHVybiBrLWtrO1xyXG4gICAgfSlcclxuICAgIHJldHVybiByZXQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJ5SWR4PFQ+KGFybDpJdGVyYWJsZTxUPixpZHhzOm51bWJlcltdKXtcclxuICAgIGxldCBsPWxpc3QoYXJsKTtcclxuICAgIGxldCByZXQ9aWR4cy5tYXAodj0+bFt2XSk7XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcbi8v5LiN5pS+5Zue6YeH5qC3XHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0PFQ+KGFybDpJdGVyYWJsZTxUPixjb3VudDpudW1iZXIpOlRbXXtcclxuICAgIC8v5LuO5LiA5Liq5YiX6KGo5Lit6YeH5qC3IOS4jeaUvuWbnlxyXG4gICAgbGV0IGE9bGlzdChhcmwpO1xyXG4gICAgbGV0IGlkeD1zaHVmZmxlKHJhbmdlKGxlbihhKSkpLnNsaWNlKDAsY291bnQpO1xyXG4gICAgcHJpbnQoaWR4KTtcclxuICAgIHJldHVybiBieUlkeChhLGlkeCk7XHJcbn1cclxuLy/mnInmlL7lm57ph4fmoLdcclxuZXhwb3J0IGZ1bmN0aW9uIHNhbXBsZTxUPihhcmw6SXRlcmFibGU8VD4sY291bnQ6bnVtYmVyKTpUW117XHJcbiAgICAvL+S7juS4gOS4quWIl+ihqOS4remHh+agtyDmnInmlL7lm55cclxuICAgIGxldCBhPWxpc3QoYXJsKTtcclxuICAgIGxldCBpZHg9bGlzdChyYW5nZShsZW4oYSkpKS5tYXAodj0+cmFuZGludChsZW4oYSkpKTtcclxuICAgIHJldHVybiBieUlkeChhLGlkeCk7XHJcbn1cclxuLy/mlbDlraZcclxuZXhwb3J0IGxldCBtaW49TWF0aC5taW47XHJcbmV4cG9ydCBsZXQgbWF4PU1hdGgubWF4O1xyXG5cclxuLyoqXHJcbiAqIOaPkuWFpVxyXG4gKiBAcGFyYW0gYXJsIOaVsOe7hFxyXG4gKiBAcGFyYW0gcG9pbnQg5o+S5YWl5L2N572uIOaPkuWFpeWIsOi/meS4quS9jee9rueahOWFg+e0oOWJjemdoiDkuLogMC1sZW4oYXJsKSDnmoTlgLxcclxuICogQHBhcmFtIHZhbCDmj5LlhaXlgLxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnQ8VD4oYXJsOkl0ZXJhYmxlPFQ+LHBvaW50Om51bWJlcix2YWw6VCk6VFtde1xyXG4gICAgbGV0IG5ld2FyPVtdXHJcbiAgICBsZXQgYT1saXN0KGFybCk7XHJcbiAgICBhLmZvckVhY2goKHYsaWR4KT0+e1xyXG4gICAgICAgIGlmKHBvaW50PT1pZHgpIG5ld2FyLnB1c2godmFsKTtcclxuICAgICAgICBuZXdhci5wdXNoKHYpO1xyXG4gICAgfSk7XHJcbiAgICBpZihsZW4oYSk9PXBvaW50KSBuZXdhci5wdXNoKHZhbCk7XHJcbiAgICByZXR1cm4gbmV3YXI7XHJcbn1cclxuXHJcbi8v5Z+65pys5pWw5o2uXHJcbmludGVyZmFjZSBBc0ludHtcclxuICAgIHRvSW50KCk6bnVtYmVyO1xyXG59XHJcbmludGVyZmFjZSBBc0Zsb2F0e1xyXG4gICAgdG9GbG9hdCgpOm51bWJlcjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaW50KG90aGVyOnN0cmluZ3xudW1iZXJ8QXNJbnQpe1xyXG4gICAgaWYodHlwZW9mIG90aGVyPT1cInN0cmluZ1wiKSByZXR1cm4gcGFyc2VJbnQob3RoZXIpO1xyXG4gICAgZWxzZSBpZih0eXBlb2Ygb3RoZXI9PVwibnVtYmVyXCIpIHJldHVybiBvdGhlcnwwO1xyXG4gICAgZWxzZSBpZihcInRvSW50XCIgaW4gb3RoZXIpe1xyXG4gICAgICAgIHJldHVybiBvdGhlci50b0ludCgpXHJcbiAgICB9ZWxzZSByZXR1cm4gMDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZmxvYXQob3RoZXI6c3RyaW5nfG51bWJlcnxBc0Zsb2F0KXtcclxuICAgIGlmKHR5cGVvZiBvdGhlcj09XCJzdHJpbmdcIikgcmV0dXJuIHBhcnNlRmxvYXQob3RoZXIpO1xyXG4gICAgZWxzZSBpZih0eXBlb2Ygb3RoZXI9PVwibnVtYmVyXCIpIHJldHVybiBvdGhlcjtcclxuICAgIGVsc2UgaWYoXCJ0b0Zsb2F0XCIgaW4gb3RoZXIpe1xyXG4gICAgICAgIHJldHVybiBvdGhlci50b0Zsb2F0KClcclxuICAgIH1lbHNlIHJldHVybiAwO1xyXG59XHJcbi8v5pWw5o2u5a655Zmo5p6E6YCg5Yy65Z+fXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGlzdDxUPihpdGVyPzpJdGVyYWJsZTxUPik6QXJyYXk8VD57XHJcbiAgICBpZihpdGVyPT1udWxsKSByZXR1cm4gbGlzdChbXSk7XHJcbiAgICBsZXQgcmV0PVtdXHJcbiAgICBmb3IobGV0IGEgb2YgaXRlcil7XHJcbiAgICAgICAgcmV0LnB1c2goYSlcclxuICAgIH1cclxuICAgIHJldHVybiByZXQ7XHJcbn1cclxuLy/ono3lkIjlr7nosaEgXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9PYmoobWFwOk1hcDxhbnksYW55Pil7XHJcbiAgICAvL1xyXG4gICAgbGV0IHI9bmV3IFByb3h5KHt9LHtcclxuICAgICAgICBnZXQodGFyZ2V0LHA6YW55LHJlY2VpdmVyKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcC5nZXQocCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQodGFyZ2V0LHA6YW55LHZhbHVlLHJlY2VpdmUpe1xyXG4gICAgICAgICAgICBtYXAuc2V0KHAsdmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhcyh0YXJnZXQscDphbnkpe1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwLmhhcyhwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbGV0ZVByb3BlcnR5ICh0YXJnZXQsIHApOiBib29sZWFue1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwLmRlbGV0ZShwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlZmluZVByb3BlcnR5ICh0YXJnZXQsIHAsIGF0dHJpYnV0ZXM6IFByb3BlcnR5RGVzY3JpcHRvcik6IGJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1hcC5zZXQocCxhdHRyaWJ1dGVzLnZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhdGUgKHRhcmdldCk6IGFueVtdXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdChtYXAua2V5cygpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG93bktleXMgKHRhcmdldCk6IGFueVtdXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdChtYXAua2V5cygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYXBwbHkgKHRhcmdldCwgdGhpc0FyZzogYW55LCBhcmdBcnJheT86IGFueSk6IGFueVxyXG4gICAgICAgIC8vIHtcclxuXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyBjb25zdHJ1Y3QgKHRhcmdldCwgYXJnQXJyYXk6IGFueSwgbmV3VGFyZ2V0PzogYW55KTogb2JqZWN0XHJcbiAgICAgICAgLy8ge1xyXG5cclxuICAgICAgICAvLyB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcDxLLFY+KGFybDpJdGVyYWJsZTxbSyxWXT4pe1xyXG4gICAgcmV0dXJuIG5ldyBNYXA8SyxWPihhcmwpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzZXQ8VD4oYXJsOkl0ZXJhYmxlPFQ+KVxyXG57XHJcbiAgICByZXR1cm4gbmV3IFNldDxUPihhcmwpO1xyXG59XHJcblxyXG4vL+aVsOaNruaTjeS9nFxyXG5leHBvcnQgZnVuY3Rpb24gKmtleXM8Sz1hbnksVj1hbnk+KG9iajpvYmplY3R8TWFwPEssVj4pXHJcbntcclxuICAgIC8v5Y+W5a+56LGh55qEa2V55oiWbWFw55qE5omA5pyJa2V5IOaemuS4vlxyXG4gICAgaWYob2JqIGluc3RhbmNlb2YgTWFwKXtcclxuICAgICAgICAvL+aemuS4vlxyXG4gICAgICAgIGZvcihsZXQgYSBvZiBvYmoua2V5cygpKXtcclxuICAgICAgICAgICAgeWllbGQgYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHR5cGVvZiBvYmogPT1cIm9iamVjdFwiKXtcclxuICAgICAgICBmb3IobGV0IGsgaW4gb2JqKXtcclxuICAgICAgICAgICAgeWllbGQgaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbnR5cGUgSGFzTGVuZ3RoPXtsZW5ndGg6bnVtYmVyfXx7c2l6ZTpudW1iZXJ9fHtjb3VudDpudW1iZXJ9fHtfX2xlbl9fKCk6bnVtYmVyfTtcclxuLy/ku6XkuIvkuLrosIPnlKjljY/orq5cclxuZXhwb3J0IGZ1bmN0aW9uIGxlbihvYmo6SXRlcmFibGU8YW55PnxIYXNMZW5ndGh8b2JqZWN0KXtcclxuICAgIGlmKFwibGVuZ3RoXCIgaW4gb2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqLmxlbmd0aFxyXG4gICAgfWVsc2UgaWYgKFwic2l6ZVwiIGluIG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iai5zaXplO1xyXG4gICAgfWVsc2UgaWYoXCJjb3VudFwiIGluIG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iai5jb3VudDtcclxuICAgIH1lbHNlIGlmKFwiX19sZW5fX1wiIGluIG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iai5fX2xlbl9fKClcclxuICAgIH1lbHNlIGlmKHR5cGVvZiBvYmo9PVwib2JqZWN0XCIpe1xyXG4gICAgICAgIGxldCBzdW09MDtcclxuICAgICAgICBmb3IobGV0IGsgaW4gb2JqKXtcclxuICAgICAgICAgICAgc3VtKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vLyAvL+exu+Wei+WHveaVsOaKiuS4gOS4quexu+Wei+aYoOWwhOS4uuWPpuS4gOS4quexu+Wei1xyXG4vLyAvL+WvueixoeaYoOWwhOWHveaVsO+8jOaKiuS4gOS4quWvueixoeS4reeahOavj+S4quWxnuaAp+S9v+eUqOS4gOS4qm1hcHBlcuaYoOWwhFxyXG4vLyAvL+mAkuW9kuWvueixoeaYoOWwhOWHveaVsO+8jOaKiuS4gOS4quWvueixoeS4reeahOaJgOaciemdnuWvueixoeWxnuaAp+S9v+eUqG1hcHBlcuaYoOWwhO+8jOWvueixoemAkuW9kuaYoOWwhFxyXG4vLyB0eXBlIE1hcHBlcjxBLEI+PVtBLEJdO1xyXG4vLyB0eXBlIE1hcFRvPFQgZXh0ZW5kcyBNYXBwZXI8YW55LGFueT4sQz49QyBleHRlbmRzIFRbMF0/IFRbMV06bmV2ZXI7XHJcbi8vIHR5cGUgU3dpdGNoPFQsIFUgZXh0ZW5kcyBhbnk+ID1cclxuLy8gICAgIFQgZXh0ZW5kcyBrZXlvZiBVID8gVVtUXSA6IFVbXCJkZWZhdWx0XCJdO1xyXG5cclxuLy8gLy8g6I635Y+W56ys5LiA5Liq5YWD57SgXHJcbi8vIGV4cG9ydCB0eXBlIEhlYWQ8VD4gPSBUIGV4dGVuZHMgeyAwOiBpbmZlciBIIH0gPyBIIDogbmV2ZXI7XHJcbi8vIC8vIOenu+mZpOesrOS4gOS4quWFg+e0oFxyXG4vLyBleHBvcnQgdHlwZSBUYWlsPFQ+ID0gKFxyXG4vLyAgICAgKC4uLmE6IFQgZXh0ZW5kcyBhbnlbXSA/IFQgOiBuZXZlcikgPT4gdm9pZFxyXG4vLyApIGV4dGVuZHMgKGE6IGFueSwgLi4uYjogaW5mZXIgUikgPT4gdm9pZCA/IFIgOiBuZXZlcjtcclxuLy8gZXhwb3J0IHR5cGUgVW5zaGlmdDxULCBBPiA9IChcclxuLy8gICAgIChhOiBBLCAuLi5iOiBUIGV4dGVuZHMgYW55W10gPyBUIDogbmV2ZXIpID0+IHZvaWRcclxuLy8gKSBleHRlbmRzICguLi5hOiBpbmZlciBSKSA9PiB2b2lkID8gUiA6IG5ldmVyO1xyXG4vLyAvLyDlnKjlsL7pg6jliqDlhaXkuIDkuKrlhYPntKBcclxuLy8gZXhwb3J0IHR5cGUgQ29weTxULCBTIGV4dGVuZHMgYW55PiA9IHsgW1AgaW4ga2V5b2YgVF06IFNbUF0gfTtcclxuLy8gZXhwb3J0IHR5cGUgUHVzaDxULCBBPiA9IENvcHk8VW5zaGlmdDxULCBhbnk+LCBUICYgUmVjb3JkPHN0cmluZywgQT4+O1xyXG5cclxuXHJcblxyXG4vLyB0eXBlIE11bHRpTWFwVG88VCBleHRlbmRzIGFueVtdLEMsaz1cInN0dWZmXCI+PVRbXCJsZW5ndGhcIl0gZXh0ZW5kcyAwPyBNYXBUbzxUWzBdLEM+OlxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDIGV4dGVuZHMgVFswXVswXT8gVFswXVsxXTpTd2l0Y2g8ayx7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHVmZjpNdWx0aU1hcFRvPFRhaWw8VD4sQyxrPlxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9PjtcclxuXHJcbi8vIHR5cGUgT2JqZWN0VHlwZU1hcDxDIGV4dGVuZHMgTWFwcGVyPGFueSxhbnk+W10sVCBleHRlbmRzIG9iamVjdD49e1tQIGluIGtleW9mIFRdOk11bHRpTWFwVG88QyxUW1BdPn07XHJcblxyXG4vLyAvL+WunueOsOmAkuW9kuaApyDlsJrmnKrlrp7njrBcclxuLy8gdHlwZSBPYmplY3RNYXBwZXI8VCBleHRlbmRzIG9iamVjdCxDIGV4dGVuZHMgTWFwcGVyPGFueSwgYW55PltdPj1bVCxPYmplY3RUeXBlTWFwPEMsVD5dXHJcblxyXG4vLyB0eXBlIHM9W1tudW1iZXIsc3RyaW5nXSxbc3RyaW5nLG51bWJlcl0sT2JqZWN0TWFwcGVyPG9iamVjdCxzPl07XHJcbi8vIHR5cGUgbz17XHJcbi8vICAgICBhOnN0cmluZyxcclxuLy8gICAgIGI6bnVtYmVyLFxyXG4vLyAgICAgYzp7XHJcbi8vICAgICAgICAgZDpzdHJpbmcsXHJcbi8vICAgICAgICAgZTpudW1iZXJcclxuLy8gICAgIH1cclxuLy8gfTtcclxuLy8gdHlwZSByPU9iamVjdFR5cGVNYXA8cyxvPjtcclxuXHJcblxyXG4vLyAvL+WAvOWMluexu+Wei+WumuS5iVxyXG5cclxuLy8gLy/nsbvlnovliKTmlq3nlKhcclxuLy8gdHlwZSBUeXBlUmVwPFQsVj1zdHJpbmc+PXtcclxuLy8gICAgIHZhbHVlOlYsXHJcbi8vICAgICB0eXBlOlRcclxuLy8gfTtcclxuLy8gLy/nqIvluo/nlKjnmoRcclxuLy8gbGV0IHR5cGVfYXJyYXk9XCJhcnJheVwiO1xyXG4vLyBsZXQgdHlwZV9udW1iZXI9XCJudW1iZXJcIjtcclxuLy8gbGV0IHR5cGVfc3RyaW5nPVwic3RyaW5nXCI7XHJcbi8vIC8v5YC86YOo5YiGXHJcblxyXG4vLyBmdW5jdGlvbiBnZXRhcnJheTxUPih2YWx1ZTpUKTpUeXBlUmVwPFwiYXJyYXlcIixUPntcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgdmFsdWU6dmFsdWUsXHJcbi8vICAgICAgICAgdHlwZTpcImFycmF5XCJcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBmdW5jdGlvbiBnZXRudW1iZXI8VD4odmFsdWU6VCk6VHlwZVJlcDxcIm51bWJlclwiLFQ+e1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICB2YWx1ZTp2YWx1ZSxcclxuLy8gICAgICAgICB0eXBlOlwibnVtYmVyXCJcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBmdW5jdGlvbiBnZXRzdHJpbmc8VD4odmFsdWU6VCk6VHlwZVJlcDxcInN0cmluZ1wiLFQ+e1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICB2YWx1ZTp2YWx1ZSxcclxuLy8gICAgICAgICB0eXBlOlwic3RyaW5nXCJcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyAvL+aYoOWwhOmDqOWIhlxyXG4vLyAvL+aYoOWwhOWZqFxyXG4vLyB0eXBlIFJlcE1hcDxBLEI+PU1hcHBlcjxUeXBlUmVwPEE+LEI+O1xyXG4vLyAvL+exu+Wei+aYoOWwhOWZqFxyXG4vLyB0eXBlIFJlcE1hcHBlcnM9W1JlcE1hcDxcInN0cmluZ1wiLHN0cmluZz4sXHJcbi8vICAgICAgICAgICAgICAgICBSZXBNYXA8XCJudW1iZXJcIixudW1iZXI+LFxyXG4vLyAgICAgICAgICAgICAgICAgUmVwTWFwPFwiYXJyYXlcIixhbnlbXT5dXHJcblxyXG4vLyAvL+aYoOWwhHJlcOexu+Wei+WIsOato+W4uOexu+Wei1xyXG4vLyB0eXBlIEV4dHJhY3Q8UmVwPj1NdWx0aU1hcFRvPFJlcE1hcHBlcnMsUmVwPjtcclxuLy8gLy/mmKDlsIRtb2RlbCDliLAgcGFyc2XlkI7nsbvlnotcclxuLy8gdHlwZSBNYXBNb2RlbDxNb2RlbFR5cGUgZXh0ZW5kcyB7W1AgaW4ga2V5b2YgTW9kZWxUeXBlXTpUeXBlUmVwPGFueT59Pj1PYmplY3RUeXBlTWFwPFJlcE1hcHBlcnMsTW9kZWxUeXBlPlxyXG5cclxuLy8gbGV0IG1vZGVsPXtcclxuLy8gICAgIHRpdGxlOmdldHN0cmluZyhcIi50aXRsZVwiKSxcclxuLy8gICAgIGxpc3Q6Z2V0YXJyYXkoXCIuYXJyYXlcIilcclxuLy8gfVxyXG4vLyB0eXBlIGE9TWFwTW9kZWw8dHlwZW9mIG1vZGVsPjtcclxuLy8gZnVuY3Rpb24gcGFyc2UoYm9keSxtb2RlbDpvYmplY3QpOk1hcE1vZGVsPHR5cGVvZiBtb2RlbD57XHJcbi8vICAgICByZXR1cm4gbnVsbDtcclxuLy8gfVxyXG4iLCJpbXBvcnQgKiBhcyB0ZiBmcm9tIFwiQHRlbnNvcmZsb3cvdGZqc1wiXHJcbmltcG9ydCB7IHJldmVyc2VCb29sLCBlcXVhbE1hcCwgZXhwYW5kVG80RCB9IGZyb20gJy4vbWF0cml4X3Rvb2wnO1xyXG5leHBvcnQgY2xhc3MgRHJhdyB7XHJcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIHRjdHg6IE9mZnNjcmVlbkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIG9mZjogT2Zmc2NyZWVuQ2FudmFzO1xyXG4gICAgaDogbnVtYmVyO1xyXG4gICAgdzogbnVtYmVyO1xyXG4gICAgLy9waXhlZHNpemVcclxuICAgIHBpeGVsc2l6ZTpbbnVtYmVyLG51bWJlcl07XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlOiBIVE1MQ2FudmFzRWxlbWVudCwgcHVibGljIHJzOiBudW1iZXIsIHB1YmxpYyBjczogbnVtYmVyKSB7XHJcbiAgICAgICAgLy/ov5nph4zlvpfliLAyZCDkuIrkuIvmlocg6K6h566X5qC85a2Q5aSn5bCPXHJcbiAgICAgICAgbGV0IGN0eCA9IGVsZS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XHJcbiAgICAgICAgLy/orqHnrpfmoLzlrZDlpKflsI9cclxuICAgICAgICB0aGlzLmggPSBlbGUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMudyA9IGVsZS53aWR0aDtcclxuICAgICAgICB0aGlzLmNoID0gdGhpcy5oIC8gcnM7XHJcbiAgICAgICAgdGhpcy5jdyA9IHRoaXMudyAvIGNzO1xyXG4gICAgICAgIC8vY2FjaGVcclxuICAgICAgICB0aGlzLm9mZiA9IG5ldyBPZmZzY3JlZW5DYW52YXModGhpcy53LCB0aGlzLmgpO1xyXG4gICAgICAgIHRoaXMudGN0eCA9IHRoaXMub2ZmLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucGl4ZWxzaXplPVt0aGlzLmNoLHRoaXMuY3ddO1xyXG4gICAgICAgIHRoaXMudXBzYW1wbGU9dGYubGF5ZXJzLnVwU2FtcGxpbmcyZCh7c2l6ZTp0aGlzLnBpeGVsc2l6ZX0pO1xyXG4gICAgfVxyXG4gICAgY2g6IG51bWJlcjtcclxuICAgIGN3OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZHJhd1BvaW50KHgsIHksIGM6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByeDogbnVtYmVyLCByeTogbnVtYmVyO1xyXG4gICAgICAgIHJ4ID0geCAqIHRoaXMuY3c7XHJcbiAgICAgICAgcnkgPSB5ICogdGhpcy5jaDtcclxuICAgICAgICAvL+e7mOWItiA/Pz9cclxuICAgICAgICB0aGlzLnRjdHguZmlsbFN0eWxlID0gYztcclxuICAgICAgICB0aGlzLnRjdHguZmlsbFJlY3QocngsIHJ5LCB0aGlzLmN3LCB0aGlzLmNoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog55So5LqO57uY5Yi2MDHnn6npmLUg55So5p+Q5Liq6aKc6Imy6KGo56S6MVxyXG4gICAgICog6L+Y6ZyA6KaB57uY5Yi25LiN5ZCM5Zu+5bGC55qE5pa55byPIOWmgueUqOafkOS6m+WPpuS4gOS6m+minOiJsuihqOekuuWPpuS4gOS6m+S4nOilvyDnhLblkI7lj6DliqBcclxuICAgICAqIOi/mOmcgOimgeWPr+S7pee7mOWItuWunuaVsOefqemYteeahOWHveaVsFxyXG4gICAgICogQHBhcmFtIHRzIDAx55+p6Zi1XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBkcmF3MkQodHM6IHRmLlRlbnNvcjJEKSB7XHJcbiAgICAgICAgdGhpcy50Y3R4LmNsZWFyUmVjdCgwLDAsdGhpcy53LHRoaXMuaCk7XHJcbiAgICAgICAgLy8gdGhpcy50Y3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIC8vIHRoaXMudGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLncsIHRoaXMuaCk7XHJcbiAgICAgICAgLy/ms5UxXHJcbiAgICAgICAgbGV0IHJnYm1hdD1hd2FpdCB0aGlzLnRvcmdiKHRzKTsgIC8vMCBmZmZmZmZmZiAxIDAwMDAwMDAwXHJcblxyXG5cclxuICAgICAgICBsZXQgaW1nPXRoaXMudGN0eC5wdXRJbWFnZURhdGEocmdibWF0LDAsMCk7XHJcbiAgICAgICAgLy/ms5UyXHJcbiAgICAgICAgLy8gbGV0IGFyciA9IGF3YWl0IHRzLmRhdGEoKTtcclxuICAgICAgICAvLyBhcnIuZm9yRWFjaCgodiwgaSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAvL+e7mOWItiAw57Si5byV5a+55bqU5YiXXHJcbiAgICAgICAgLy8gICAgIGxldCBhID0gWywgXCIjZmYwMDAwXCJdO1xyXG4gICAgICAgIC8vICAgICBpZiAodiA9PSAxKVxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5kcmF3UG9pbnQoaSV0cy5zaGFwZVswXSxNYXRoLmZsb29yKGkvdHMuc2hhcGVbMF0pLCBhWzFdKTtcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvLyB0aGlzLnRjdHguZmlsbCgpO1xyXG4gICAgICAgIC8v57uY5Yi25Yiw55S75biDXHJcbiAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsMCx0aGlzLncsdGhpcy5oKTtcclxuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5vZmYsIDAsIDApO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cHNhbXBsZTogdGYubGF5ZXJzLkxheWVyO1xyXG4gICAgYXN5bmMgdG9yZ2IodDp0Zi5UZW5zb3IyRCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/mqKrnurXmianlsZU05YCNIOaLieS8uFxyXG4gICAgICAgIC8vIGZ1bmN0aW9uIGhvcmV4cGFuZCh0OnRmLlRlbnNvcjJELHY9NCk6dGYuVGVuc29yMkR7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB0LmV4cGFuZERpbXMoMikudGlsZShbMSwxLHZdKS5yZXNoYXBlKFt0LnNoYXBlWzBdLHQuc2hhcGVbMV0qdl0pXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGZ1bmN0aW9uIHZvcmV4cGFuZCh0OnRmLlRlbnNvcjJELHY9NCk6dGYuVGVuc29yMkR7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBob3JleHBhbmQodC50cmFuc3Bvc2UoKSx2KS50cmFuc3Bvc2UoKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGxldCBudW09dGYudGlkeSgoKT0+e1xyXG4gICAgICAgICAgICAvL2ludDMyIOeEtuWQjsOX5LiA5Liq6aKc6ImyXHJcbiAgICAgICAgICAgIGxldCBjb2xvcmVkPXQubXVsKDB4ZmYwMDAwZmZ8MCkgYXMgdHlwZW9mIHQ7XHJcbiAgICAgICAgICAgIC8vIGxldCByZXNpemVkPXZvcmV4cGFuZChob3JleHBhbmQoY29sb3JlZCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHI9dGhpcy5waXhlbHNpemVbMF09PXRoaXMucGl4ZWxzaXplWzBdJiZ0aGlzLnBpeGVsc2l6ZVswXT09MT8gZXhwYW5kVG80RChjb2xvcmVkKTp0aGlzLnVwc2FtcGxlLmNhbGwoZXhwYW5kVG80RChjb2xvcmVkKSx7fSkgYXMgdGYuVGVuc29yNEQ7XHJcbiAgICAgICAgICAgIGxldCByZXNpemVkPXIuc3F1ZWV6ZShbMCwzXSkgYXMgdGYuVGVuc29yMkQ7XHJcbiAgICAgICAgICAgIC8v6L+b6KGMcmdiYeivnSDmqKrlkJHmianlsZU05YCNXHJcbiAgICAgICAgICAgIC8vIGxldCByZ2I9aG9yZXhwYW5kKHJlc2l6ZWQsNCk7XHJcbiAgICAgICAgICAgIC8v6aKc6Imy5aSE55CGIOaKijEgMSAxIDHnmoTov57nu6005LiqIOWPmOS4uiBhYWFhYWFhYVxyXG4gICAgICAgICAgICAvLyBsZXQgY29yPXJnYi5tdWwoMHhhYSk7XHJcbiAgICAgICAgICAgIGxldCBudW09cmVzaXplZC5hc1R5cGUoXCJpbnQzMlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvL251bei9rOaNouS4unVpbnQ4XHJcbiAgICAgICAgbGV0IGFyPWF3YWl0IG51bS5kYXRhKCk7XHJcbiAgICAgICAgbGV0IHBpeGVkcz1uZXcgVWludDhDbGFtcGVkQXJyYXkoYXIuYnVmZmVyKTtcclxuICAgICAgICBudW0uZGlzcG9zZSgpO1xyXG4gICAgICAgIHJldHVybiBuZXcgSW1hZ2VEYXRhKHBpeGVkcyxudW0uc2hhcGVbMV0sbnVtLnNoYXBlWzBdKTtcclxuICAgIH1cclxufVxyXG5cclxuLy/mioowMeefqemYtei9rOaNouS4uuWDj+e0oOefqemYtVxyXG5jb25zdCBzaXplPVs0LDRdXHJcbiIsImltcG9ydCAqIGFzIHRmIGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCJcclxuaW1wb3J0IHsgZGVsYXksIGludCwgZmxvYXQgfSBmcm9tICcuLi9saWJzL2xpYic7XHJcbmltcG9ydCB7IERyYXcgfSBmcm9tIFwiLi9EcmF3XCI7XHJcbmltcG9ydCB7IG1hdHJpeF9ydWxlLCBSdWxlfSBmcm9tICcuL3J1bGVzL21hdHJpeF9ydWxlcyc7XHJcblxyXG5mdW5jdGlvbiBnZXR2YWwoaWQ6c3RyaW5nKXtcclxuICAgIGxldCBlPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dCMke2lkfWApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICByZXR1cm4gZS52YWx1ZTtcclxufVxyXG5mdW5jdGlvbiBnZXQ8UiBleHRlbmRzIGtleW9mIHRhYmxlPihpZDpzdHJpbmcsdGFnOlI9bnVsbCk6dGFibGVbUl17XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCkgYXMgdGFibGVbUl07XHJcbn1cclxubGV0IGE9Z2V0KFwiaGVsbG9cIilcclxuXHJcbnR5cGUgdGFibGU9e1xyXG4gICAgb3B0aW9uOkhUTUxPcHRpb25FbGVtZW50LFxyXG4gICAgZGl2OkhUTUxEaXZFbGVtZW50LFxyXG4gICAgaW5wdXQ6SFRNTElucHV0RWxlbWVudCxcclxuICAgIFwiKlwiOkhUTUxFbGVtZW50LFxyXG4gICAgc2VsZWN0OkhUTUxTZWxlY3RFbGVtZW50XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlPFQgZXh0ZW5kcyBrZXlvZiB0YWJsZSxSIGV4dGVuZHMga2V5b2YgdGFibGVbVF0+KHRhZzogVCxpZDpzdHJpbmcsdmFsdWVzOm9iamVjdCk6dGFibGVbVF17XHJcbiAgICBsZXQgdD0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpXHJcbiAgICB0LmlkPWlkO1xyXG4gICAgLy9cclxuICAgIGZvcihsZXQgayBpbiB2YWx1ZXMpe1xyXG4gICAgICAgIGlmKGsgaW4gdCA9PSBmYWxzZSkgY29udGludWU7XHJcbiAgICAgICAgdFtrXT12YWx1ZXNba107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdCBhcyB1bmtub3duIGFzIHRhYmxlW1RdO1xyXG59XHJcblxyXG4vLyBsZXQgcnVsZXM9e1xyXG4vLyAgICAgYjNzMjMsXHJcbi8vICAgICBiMXMxMixcclxuLy8gICAgIGIzNjc4czM0Njc4LFxyXG4vLyAgICAgYjM2czIzLFxyXG4vLyAgICAgYjM1Njc4czU2NzhcclxuLy8gfVxyXG5pbXBvcnQge1J1bGVzIGFzIHJ1bGVzfSBmcm9tIFwiLi9ydWxlcy9tYXRyaXhfcnVsZXNcIlxyXG5mdW5jdGlvbiBpbml0U2VsZWN0aW9uKClcclxue1xyXG4gICAgZm9yKGxldCBrIGluIHJ1bGVzKXtcclxuICAgICAgICBnZXQoXCJydWxlXCIpLmFwcGVuZENoaWxkKGNyZWF0ZShcIm9wdGlvblwiLGsse2lubmVyVGV4dDprLHZhbHVlOmt9KSlcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X3BhcmFtKHBhcmFtOnN0cmluZyl7XHJcbiAgICB2YXIgcXVlcnkgPSBsb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KCcmJyk7XHJcbiAgICBmb3IodmFyIGk9MDtpPHF1ZXJ5Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgIHZhciBrdiA9IHF1ZXJ5W2ldLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgaWYoa3ZbMF0gPT0gcGFyYW0pe1xyXG4gICAgICAgICAgICByZXR1cm4ga3ZbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG1haW4oKXtcclxuICAgIGluaXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICBsZXQgZWxlPWdldChcImNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIGxldCBoc2l6ZT1bMTAyNCwxMDI0XVxyXG4gICAgZWxlLmhlaWdodD1oc2l6ZVswXTtcclxuICAgIGVsZS53aWR0aD1oc2l6ZVsxXTtcclxuICAgIGVsZS5pZD1cImN0eFwiXHJcbiAgICBjb25zdCByc2l6ZT1nZXRfcGFyYW0oXCJyc2l6ZVwiKT09bnVsbD8gMC4yNTpmbG9hdChnZXRfcGFyYW0oXCJyc2l6ZVwiKSlcclxuICAgIGdldChcInJzaXplXCIsXCJpbnB1dFwiKS52YWx1ZT1yc2l6ZTtcclxuICAgIGxldCBzaXplPVtoc2l6ZVswXS9yc2l6ZSxoc2l6ZVsxXS9yc2l6ZV1cclxuICAgIGxldCBkPW5ldyBEcmF3KGVsZSxzaXplWzBdLHNpemVbMV0pO1xyXG5cclxuICAgIGxldCBpbml0PSgpPT50Zi5yYW5kb21Vbmlmb3JtKHNpemUsMCwxLFwiZmxvYXQzMlwiKS5kaXYoZmxvYXQoZ2V0dmFsKFwicmVsXCIpKSkuZmxvb3IoKS5lcXVhbCgwKS5hc1R5cGUoXCJpbnQzMlwiKSBhcyB0Zi5UZW5zb3IyRFxyXG4gICAgbGV0IGR0PWluaXQoKTtcclxuICAgIC8v6L6T5Ye6XHJcbiAgICBnZXQoXCJpbmZvXCIpLmlubmVyVGV4dD1gJHtkdC5zaGFwZVswXX14JHtkdC5zaGFwZVsxXX0gKGgqdykgYFxyXG4gICAgZ2V0KFwiY2luZm9cIikuaW5uZXJUZXh0PWAke2hzaXplWzBdfXgke2hzaXplWzFdfSAoaCp3KWBcclxuXHJcbiAgICBkLmRyYXcyRChkdCk7XHJcbiAgICBjb25zb2xlLmxvZyhkdCk7XHJcbiAgICBsZXQgcD10cnVlO1xyXG4gICAgbGV0IHNsPWZhbHNlO1xyXG4gICAgbGV0IG49MDtcclxuICAgIC8vbG9vcFxyXG4gICAgYXN5bmMgZnVuY3Rpb24gbG9vcCgpe1xyXG4gICAgICAgIC8v6L6T5Ye65aSn5bCPXHJcbiAgICAgICAgbGV0IGRlbGF5dD1pbnQoZ2V0dmFsKFwiZGVsYXlcIikpO1xyXG4gICAgICAgIC8v6I635Y+W6KeE5YiZXHJcbiAgICAgICAgbGV0IHJ1bGVpZD1nZXQoXCJydWxlXCIsXCJzZWxlY3RcIikuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xyXG4gICAgICAgIGxldCBydWxlPXJ1bGVzW3J1bGVpZF0gYXMgUnVsZTtcclxuICAgICAgICBmb3IoOzspe1xyXG4gICAgICAgICAgICBhd2FpdCBkZWxheShkZWxheXQpO1xyXG4gICAgICAgICAgICBsZXQgb2xkPWR0O1xyXG4gICAgICAgICAgICBkdD1tYXRyaXhfcnVsZShvbGQscnVsZSk7XHJcbiAgICAgICAgICAgIG9sZC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkdCk7XHJcbiAgICAgICAgICAgIC8v6Z2e6Z2Z6buYXHJcbiAgICAgICAgICAgIGlmKCFzbClcclxuICAgICAgICAgICAgICAgIGF3YWl0IGQuZHJhdzJEKGR0KTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgaWYocCkgYnJlYWs7XHJcbiAgICAgICAgICAgIG4rKztcclxuICAgICAgICAgICAgLy/mmL7npLrova5cclxuICAgICAgICAgICAgZ2V0KFwiblwiKS5pbm5lclRleHQ9bi50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAvL2V2ZW50XHJcbiAgICBnZXQoXCJzdGFydFwiKS5vbmNsaWNrPWFzeW5jKCk9PntcclxuICAgICAgICBpZihwKXtcclxuICAgICAgICAgICAgcD1mYWxzZTtcclxuICAgICAgICAgICAgbG9vcCgpO1xyXG4gICAgICAgICAgICBnZXQoXCJzdGFydFwiKS5zdHlsZS5iYWNrZ3JvdW5kPVwicmVkXCJcclxuICAgICAgICAgICAgZ2V0KFwic3RhcnRcIikuaW5uZXJUZXh0PVwi5pqC5YGcXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHA9dHJ1ZTtcclxuICAgICAgICAgICAgZ2V0KFwic3RhcnRcIikuc3R5bGUuYmFja2dyb3VuZD1cIlwiXHJcbiAgICAgICAgICAgIGdldChcInN0YXJ0XCIpLmlubmVyVGV4dD1cIuWQr+WKqFwiO1xyXG4gICAgICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfTtcclxuICAgIFxyXG5cclxuICAgIGdldChcInJlc2V0XCIpLm9uY2xpY2s9YXN5bmMoKT0+e1xyXG4gICAgICAgIGR0PWluaXQoKTtcclxuICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICAgICAgbj0wO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoYW5nZXBvaW50KHgseSl7XHJcbiAgICAgICAgaWYoeDwwfHx5PDApIHJldHVybjtcclxuICAgICAgICBsZXQgZGF0YT1kdC5hcnJheVN5bmMoKTtcclxuICAgICAgICBsZXQgdHgsdHk7XHJcbiAgICAgICAgdHg9TWF0aC5mbG9vcih4L2QuY3cpO1xyXG4gICAgICAgIHR5PU1hdGguZmxvb3IoeS9kLmNoKVxyXG4gICAgICAgIGRhdGFbdHldW3R4XT1kYXRhW3R5XVt0eF09PTA/IDE6MDtcclxuICAgICAgICBkdC5kaXNwb3NlKCk7XHJcbiAgICAgICAgZHQ9dGYudGVuc29yKGRhdGEpO1xyXG4gICAgICAgIGQuZHJhdzJEKGR0KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldHBvaW50KHgseSx2PTEpe1xyXG4gICAgICAgIGlmKHg8MHx8eTwwKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGRhdGE9ZHQuYXJyYXlTeW5jKCk7XHJcbiAgICAgICAgbGV0IHR4LHR5O1xyXG4gICAgICAgIHR4PU1hdGguZmxvb3IoeC9kLmN3KTtcclxuICAgICAgICB0eT1NYXRoLmZsb29yKHkvZC5jaClcclxuICAgICAgICBkYXRhW3R5XVt0eF09MTtcclxuICAgICAgICBkdC5kaXNwb3NlKCk7XHJcbiAgICAgICAgZHQ9dGYudGVuc29yKGRhdGEpO1xyXG4gICAgICAgIGQuZHJhdzJEKGR0KTtcclxuICAgIH1cclxuICAgIGdldChcImN0eFwiKS5vbmNsaWNrPWU9PntcclxuICAgICAgICBpZihlLmJ1dHRvbj09MClcclxuICAgICAgICAgICAgY2hhbmdlcG9pbnQoZS5vZmZzZXRYLGUub2Zmc2V0WSk7XHJcbiAgICB9XHJcbiAgICBnZXQoXCJjdHhcIikub25tb3VzZW1vdmU9ZT0+e1xyXG4gICAgICAgIGlmKGUuYnV0dG9ucz09PTEpe1xyXG4gICAgICAgICAgICBzZXRwb2ludChlLm9mZnNldFgsZS5vZmZzZXRZLDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldChcInNsXCIpLm9uY2xpY2s9KCk9PntcclxuICAgICAgICBzbD0hc2w7XHJcbiAgICAgICAgaWYoc2wpIGdldChcInNsXCIpLnN0eWxlLmJhY2tncm91bmQ9XCJyZWRcIjtcclxuICAgICAgICBlbHNlIGdldChcInNsXCIpLnN0eWxlLmJhY2tncm91bmQ9XCJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbn1cclxud2luZG93Lm9ubG9hZD1tYWluO1xyXG5jb25zb2xlLmxvZyhcImhlbGxvd29ybGRcIik7XHJcblxyXG5jb25zdCBtb2Q9IChtb2R1bGUgYXMgYW55KTtcclxuaWYobW9kLmhvdClcclxuICBtb2QuaG90LmFjY2VwdCgpO1xyXG5jb25zb2xlLmxvZyhtb2QuaG90KVxyXG5tb2QuYWRkRGlzcG9zZUhhbmRsZXIoKCk9PntcclxuICAgIGNvbnNvbGUubG9nKFwiaGVsbG9cIik7XHJcbn0pIiwiaW1wb3J0ICogYXMgdGYgZnJvbSBcIkB0ZW5zb3JmbG93L3RmanNcIlxyXG4vL+WmguaenOetieS6juWImeS4ujEg5ZCm5YiZ5YiZ5Li6MFxyXG4vL+ebuOetieavlOi+g1xyXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxNYXA8VCBleHRlbmRzIHRmLlRlbnNvcj4odHM6IFQsIGVxdXRvOiBudW1iZXIpOlQge1xyXG4gICAgLy8gaWYoZXF1dG8hPTApIHJldHVybiB0cy5kaXYoZXF1dG8pLnN1YigxKS5hYnMoKS5sZXNzRXF1YWwoMCk7XHJcbiAgICByZXR1cm4gdGYuZXF1YWwodHMsZXF1dG8pLmFzVHlwZSh0cy5kdHlwZSkgYXMgVDtcclxufVxyXG4vL+atpOWkhOW6lOacieWkp+S6juavlOi+gyAg55Sx5q2k5Y+v5b6XIOaJgOacieavlOi+g+WIpOaWrVxyXG5cclxuLy8xLTAg5Y+Y5o2iIOWNs25vdOi/kOeul1xyXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZUJvb2wodHM6IHRmLlRlbnNvcikge1xyXG4gICAgcmV0dXJuIHRzLnN1YigxKS5hYnMoKTtcclxufVxyXG4vLzAtMSDlj5jkuLogIC0xIDEg56ym5Y+35YyW6L+Q566XXHJcbmV4cG9ydCBmdW5jdGlvbiBzeW1saXplKHRzOiB0Zi5UZW5zb3IpIHtcclxuICAgIHJldHVybiB0cy5tdWwoMikuc3ViKDEpO1xyXG59XHJcbi8v5q2k5aSE5bqU5pyJ5LiO5oiW6Z2eIOW8guaIliBcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhwYW5kVG80RCh0czogdGYuVGVuc29yMkQpOiB0Zi5UZW5zb3I0RCB7XHJcbiAgICAvL+i/meS4quaKijJkIGZlYXR1cmVtYXDlj5jkuLo0ZOWPr+S7peebtOaOpei/m+ihjOWNt+enr+aTjeS9nOeahGZlYXR1cmVtYXDmiJZrZXJuZWxcclxuICAgIC8v5Lmf5bCx5piv55u05o6l5a+5ZmVhdHVyZW1hcOi/m+ihjOWNt+enr1xyXG4gICAgLy/lj5jmiJBuaHdjXHJcbiAgICBsZXQgcyA9IHRzLmV4cGFuZERpbXMoMCkuZXhwYW5kRGltcygtMSkgYXMgdGYuVGVuc29yNEQ7XHJcbiAgICAvL+aJqeWxleS4gOS4quWJjemdoueahG7lkozkuIDkuKrlkI7pnaLnmoRjXHJcbiAgICByZXR1cm4gcztcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlRGltVG8yRCh0czogdGYuVGVuc29yNEQpOiB0Zi5UZW5zb3IyRCB7XHJcbiAgICAvL+i/meS4quaKijJkIGZlYXR1cmVtYXDlj5jkuLo0ZOWPr+S7peebtOaOpei/m+ihjOWNt+enr+aTjeS9nOeahGZlYXR1cmVtYXDmiJZrZXJuZWxcclxuICAgIC8v5Lmf5bCx5piv55u05o6l5a+5ZmVhdHVyZW1hcOi/m+ihjOWNt+enr1xyXG4gICAgLy/lj5jmiJBuaHdjXHJcbiAgICBsZXQgcyA9IHRzLnNxdWVlemUoWzAsIDNdKSBhcyB0Zi5UZW5zb3IyRDtcclxuICAgIC8v5omp5bGV5LiA5Liq5YmN6Z2i55qEbuWSjOS4gOS4quWQjumdoueahGNcclxuICAgIHJldHVybiBzO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIHRmIGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCJcclxuaW1wb3J0IHsgZXhwYW5kVG80RCwgZXF1YWxNYXAsIGRlbGV0ZURpbVRvMkQgfSBmcm9tIFwiLi4vbWF0cml4X3Rvb2xcIjtcclxuZnVuY3Rpb24ga2VlcChLLFMsUCx2PTIpXHJcbntcclxuICAgIGxldCBLMiA9IGVxdWFsTWFwKEssIHYpO1xyXG4gICAgcmV0dXJuIFAuYWRkKEsyLm11bChTKSk7XHJcbn1cclxuZnVuY3Rpb24gc2V0T25lKEssUyxQLHY9Mylcclxue1xyXG4gICAgbGV0IEszID0gZXF1YWxNYXAoSywgdik7XHJcbiAgICByZXR1cm4gUC5hZGQoSzMpO1xyXG59XHJcbmZ1bmN0aW9uIHVzZShLLFMsUCl7XHJcbiAgICBjbGFzcyBmdW5jc1xyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBLPUs7XHJcbiAgICAgICAgcHJvdGVjdGVkIFM9UztcclxuICAgICAgICBwcm90ZWN0ZWQgUD1QO1xyXG4gICAgICAgIHB1YmxpYyBrZWVwPSh2KT0+dGhpcy5QPWtlZXAodGhpcy5LLHRoaXMuUyx0aGlzLlAsdik7XHJcbiAgICAgICAgcHVibGljIHNldE9uZT0odik9PnRoaXMuUD1zZXRPbmUodGhpcy5LLHRoaXMuUyx0aGlzLlAsdik7XHJcbiAgICAgICAgcHVibGljIGdldCgpe1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5QO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgZnVuY3MoKTtcclxufVxyXG50eXBlIFJ1bGVUeXBlPVJldHVyblR5cGU8dHlwZW9mIHVzZT47XHJcbmZ1bmN0aW9uIGJhc2ljKHRzOnRmLlRlbnNvcjJEKXtcclxuICAgIGxldCBrZXIgPSB0Zi50ZW5zb3IyZChbXHJcbiAgICAgICAgWzEsIDEsIDFdLFxyXG4gICAgICAgIFsxLCAwLCAxXSxcclxuICAgICAgICBbMSwgMSwgMV1cclxuICAgIF0pLmV4cGFuZERpbXMoLTEpLmV4cGFuZERpbXMoLTEpIGFzIHRmLlRlbnNvcjREO1xyXG4gICAgLy/miop0c+WPmOS4ujRkXHJcbiAgICBsZXQgUyA9IGV4cGFuZFRvNEQodHMpO1xyXG4gICAgbGV0IEsgPSBTLmNvbnYyZChrZXIsIDEsIFwic2FtZVwiLCBcIk5IV0NcIik7XHJcbiAgICAvL+iuoeeul1xyXG4gICAgLy/lj6DliqBcclxuICAgIC8v6L+Z5Liq5piv5YW25LuW6K6+MFxyXG4gICAgbGV0IFAgPSB0Zi56ZXJvc0xpa2UoUyk7XHJcbiAgICByZXR1cm4ge0ssUyxQfTtcclxufVxyXG5leHBvcnQgbmFtZXNwYWNlIFJ1bGVzXHJcbntcclxuICAgIC8v5Z+65pys6KeE5YiZXHJcbiAgICAvL+ihqOekuiAy55qE5pe25YCZ5L+d5oyBIDPnmoTml7blgJnnqLPlrppcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBiM3MyMyhydWxlOlJ1bGVUeXBlKXtcclxuICAgICAgICBydWxlLmtlZXAoMik7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoMyk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gYjM2czIzKHJ1bGU6UnVsZVR5cGUpe1xyXG4gICAgICAgIGIzczIzKHJ1bGUpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDYpO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGIxczEyKHJ1bGU6UnVsZVR5cGUpe1xyXG4gICAgICAgIHJ1bGUua2VlcCgyKTtcclxuICAgICAgICBydWxlLnNldE9uZSgxKTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBiMzY3OHMzNDY3OChydWxlOlJ1bGVUeXBlKXtcclxuICAgICAgICBydWxlLmtlZXAoNCk7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoMyk7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoNik7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoNyk7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoOCk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gYjM1Njc4czU2NzgocnVsZTpSdWxlVHlwZSl7XHJcbiAgICAgICAgLy8gcnVsZS5rZWVwKDQpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDMpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDUpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDYpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDcpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDgpO1xyXG4gICAgfVxyXG59XHJcbi8v55CG6K665LiK6L+Z5Liq5Y+v5Lul5pSv5oyB5ZCE56eN6KeE5YiZXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXRyaXhfcnVsZSh0czogdGYuVGVuc29yMkQscnVsZUY6KHJ1bGU6UnVsZVR5cGUpPT52b2lkPVJ1bGVzLmIzczIzKSB7XHJcbiAgICAvL+eUn+WRvea4uOaIj+WNt+enryDku47kuIDkuKpmZWF0dXJlIG1hcCDlvpfliLDkuIvkuIDkuKpmZWF0dXJlbWFwXHJcbiAgICAvL+WOn+WniyBTIOWNt+enr+W+l+WIsEsg54S25ZCOSytTIOW+l+WIsFAg54S25ZCO5a+5UOS9v+eUqGVxdWFsTWFwMyDlvpfliLDkuozlgLzljJbnmoTkuIvkuIDkuKpcclxuICAgIC8vZmVhdHVyZW1hcFxyXG4gICAgcmV0dXJuIHRmLnRpZHkoKCk9PntcclxuICAgICAgICBsZXQge0ssUyxQfT1iYXNpYyh0cyk7XHJcbiAgICAgICAgbGV0IHJ1bGU9dXNlKEssUyxQKTtcclxuICAgICAgICBydWxlRihydWxlKTtcclxuICAgICAgICBQPXJ1bGUuZ2V0KCk7XHJcbiAgICAgICAgcmV0dXJuIGRlbGV0ZURpbVRvMkQoUCBhcyB0Zi5UZW5zb3I0RCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBSdWxlPXR5cGVvZiBSdWxlcy5iM3MyMztcclxuIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==
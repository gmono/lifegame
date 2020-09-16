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
            let r = this.pixelsize[0] == this.pixelsize[0] && this.pixelsize[0] == 1 ? colored : this.upsample.call(matrix_tool_1.expandTo4D(colored), {});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWJzL2xpYi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJhdy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0cml4X3Rvb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hdHJpeF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vbm9kZS1mZXRjaCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3V0aWwgKGlnbm9yZWQpIiwid2VicGFjazovLy9jcnlwdG8gKGlnbm9yZWQpIiwid2VicGFjazovLy9zdHJpbmdfZGVjb2RlciAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2ZzIChpZ25vcmVkKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsU0FBZ0IsT0FBTyxDQUFDLEdBQVc7SUFDL0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDakQsQ0FBQztBQUZELDBCQUVDO0FBSU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxHQUFHO0lBQzNCLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUMsRUFBRTtRQUNoQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDLENBQUM7QUFDTixDQUFDO0FBTkQsc0JBTUM7QUFHRCxhQUFhO0FBQ2IsUUFBZ0IsQ0FBQyxNQUFLLENBQUMsS0FBWSxFQUFDLEtBQWEsRUFBQyxHQUFXO0lBQ3pELHFDQUFxQztJQUNyQyxJQUFHLEtBQUssSUFBRSxJQUFJLElBQUUsR0FBRyxJQUFFLElBQUksRUFBQztRQUN0QixHQUFHO1FBQ0gsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7U0FD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QS9CZ0IsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBK0JyQjtBQUNELGVBQWU7QUFDZixTQUFnQixXQUFXLENBQUMsRUFBZSxFQUFDLFFBQTRCLEtBQUssQ0FBQyxLQUFLO0lBQy9FLHVDQUF1QztJQUN2QyxnREFBZ0Q7SUFDaEQsWUFBWTtJQUNaLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFFLEVBQUU7UUFDZixJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsR0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEIsSUFBSSxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNiLE9BQU8sMkJBQWEsQ0FBQyxDQUFnQixDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7QUFFUCxDQUFDO0FBWkQsa0NBWUM7Ozs7Ozs7Ozs7OztBQ3hGRCxlOzs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGUiLCJmaWxlIjoiY29tbW9uc35tYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiByYW5kaW50KG1heDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSAlIG1heDtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsYXkobWlzKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSk9PntcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0sIG1pcyk7XHJcbiAgICB9KSAgIFxyXG59XHJcblxyXG5cclxuLy/ku79weXRob27ln7rnoYDorr7mlr1cclxuZXhwb3J0IGZ1bmN0aW9uICpyYW5nZShzdGFydDpudW1iZXIsc3BhY2U/Om51bWJlcixlbmQ/Om51bWJlcik6SXRlcmFibGU8bnVtYmVyPntcclxuICAgIC8v5YWB6K64IHJhbmdlKGEsYyxiKSByYW5nZShiKSByYW5nZShhLGIpXHJcbiAgICBpZihzcGFjZT09bnVsbCYmZW5kPT1udWxsKXtcclxuICAgICAgICAvLzFcclxuICAgICAgICB5aWVsZCogcmFuZ2UoMCwxLHN0YXJ0KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZW5kPT1udWxsKXtcclxuICAgICAgICAvLzJcclxuICAgICAgICB5aWVsZCogcmFuZ2Uoc3RhcnQsMSxzcGFjZSk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIC8vM1xyXG4gICAgICAgIGZvcihsZXQgaT1zdGFydDtpPGVuZDtpKz1zcGFjZSl7XHJcbiAgICAgICAgICAgIHlpZWxkIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIGVudW1lcmF0ZTxUPihhcnJheWxpa2U6SXRlcmFibGU8VD4pOkl0ZXJhYmxlPFtudW1iZXIsVF0+e1xyXG4gICAgbGV0IG5vdz0wO1xyXG4gICAgZm9yKGxldCBhIG9mIGFycmF5bGlrZSl7XHJcbiAgICAgICAgeWllbGQgW25vdysrLGFdXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbnkoYXJyYXlsaWtlOkl0ZXJhYmxlPGFueT4pXHJcbntcclxuICAgIGZvcihsZXQgYSBvZiBhcnJheWxpa2Upe1xyXG4gICAgICAgIGlmKGEpIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhbGwoYXJyYXlsaWtlOkl0ZXJhYmxlPGFueT4pXHJcbntcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByaW50KGRhdGE6YW55KXtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiAqemlwKC4uLmFycmF5bGlrZXM6SXRlcmFibGU8YW55PltdKXtcclxuICAgIGxldCBpdG9ycz1hcnJheWxpa2VzLm1hcCh2PT52W1N5bWJvbC5pdGVyYXRvcl0oKSk7XHJcbiAgICBmb3IoOzspe1xyXG4gICAgICAgIC8v5a+55omA5pyJaXRvcuWPlm5leHQg5aaC5p6c5YWo6YOo5oiQ5Yqf5YiZeWllbGQg5ZCm5YiZ6L+U5ZueXHJcbiAgICAgICAgbGV0IHJlc3M9aXRvcnMubWFwKHY9PnYubmV4dCgpKTtcclxuICAgICAgICAvLyBwcmludChyZXNzKTtcclxuICAgICAgICAvL+WmguaenOacieS4gOS4que7k+adn1xyXG4gICAgICAgIGlmKGFueShyZXNzLm1hcCh2PT52LmRvbmUpKSl7XHJcbiAgICAgICAgICAgIC8v6L+U5ZueXHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeWllbGQgcmVzcy5tYXAodj0+di52YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuLy/ln7rmnKzmk43kvZxcclxuZXhwb3J0IGZ1bmN0aW9uIHNodWZmbGU8VD4oYXJsOkl0ZXJhYmxlPFQ+KTpUW117XHJcbiAgICBsZXQgYT1saXN0KGFybCk7XHJcbiAgICBsZXQgcj1uZXcgQXJyYXkobGVuKGEpKTtcclxuICAgIGZvcihsZXQgdCBvZiBhKXtcclxuICAgICAgICAvL+maj+acuuWhq+epulxyXG4gICAgICAgIGxldCBpZHg9cmFuZGludChsZW4oYSkpO1xyXG4gICAgICAgIHJbaWR4XT10O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRlZDxUPihhcmw6SXRlcmFibGU8VD4sa2V5Oih2OlQpPT5udW1iZXI9bnVsbCl7XHJcbiAgICBsZXQgcmV0PWxpc3QoYXJsKS5zb3J0KChhLGIpPT57XHJcbiAgICAgICAgbGV0IFtrLGtrXT1ba2V5KGEpLGtleShiKV1cclxuICAgICAgICByZXR1cm4gay1raztcclxuICAgIH0pXHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBieUlkeDxUPihhcmw6SXRlcmFibGU8VD4saWR4czpudW1iZXJbXSl7XHJcbiAgICBsZXQgbD1saXN0KGFybCk7XHJcbiAgICBsZXQgcmV0PWlkeHMubWFwKHY9Pmxbdl0pO1xyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG4vL+S4jeaUvuWbnumHh+agt1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdDxUPihhcmw6SXRlcmFibGU8VD4sY291bnQ6bnVtYmVyKTpUW117XHJcbiAgICAvL+S7juS4gOS4quWIl+ihqOS4remHh+agtyDkuI3mlL7lm55cclxuICAgIGxldCBhPWxpc3QoYXJsKTtcclxuICAgIGxldCBpZHg9c2h1ZmZsZShyYW5nZShsZW4oYSkpKS5zbGljZSgwLGNvdW50KTtcclxuICAgIHByaW50KGlkeCk7XHJcbiAgICByZXR1cm4gYnlJZHgoYSxpZHgpO1xyXG59XHJcbi8v5pyJ5pS+5Zue6YeH5qC3XHJcbmV4cG9ydCBmdW5jdGlvbiBzYW1wbGU8VD4oYXJsOkl0ZXJhYmxlPFQ+LGNvdW50Om51bWJlcik6VFtde1xyXG4gICAgLy/ku47kuIDkuKrliJfooajkuK3ph4fmoLcg5pyJ5pS+5ZueXHJcbiAgICBsZXQgYT1saXN0KGFybCk7XHJcbiAgICBsZXQgaWR4PWxpc3QocmFuZ2UobGVuKGEpKSkubWFwKHY9PnJhbmRpbnQobGVuKGEpKSk7XHJcbiAgICByZXR1cm4gYnlJZHgoYSxpZHgpO1xyXG59XHJcbi8v5pWw5a2mXHJcbmV4cG9ydCBsZXQgbWluPU1hdGgubWluO1xyXG5leHBvcnQgbGV0IG1heD1NYXRoLm1heDtcclxuXHJcbi8qKlxyXG4gKiDmj5LlhaVcclxuICogQHBhcmFtIGFybCDmlbDnu4RcclxuICogQHBhcmFtIHBvaW50IOaPkuWFpeS9jee9riDmj5LlhaXliLDov5nkuKrkvY3nva7nmoTlhYPntKDliY3pnaIg5Li6IDAtbGVuKGFybCkg55qE5YC8XHJcbiAqIEBwYXJhbSB2YWwg5o+S5YWl5YC8XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0PFQ+KGFybDpJdGVyYWJsZTxUPixwb2ludDpudW1iZXIsdmFsOlQpOlRbXXtcclxuICAgIGxldCBuZXdhcj1bXVxyXG4gICAgbGV0IGE9bGlzdChhcmwpO1xyXG4gICAgYS5mb3JFYWNoKCh2LGlkeCk9PntcclxuICAgICAgICBpZihwb2ludD09aWR4KSBuZXdhci5wdXNoKHZhbCk7XHJcbiAgICAgICAgbmV3YXIucHVzaCh2KTtcclxuICAgIH0pO1xyXG4gICAgaWYobGVuKGEpPT1wb2ludCkgbmV3YXIucHVzaCh2YWwpO1xyXG4gICAgcmV0dXJuIG5ld2FyO1xyXG59XHJcblxyXG4vL+WfuuacrOaVsOaNrlxyXG5pbnRlcmZhY2UgQXNJbnR7XHJcbiAgICB0b0ludCgpOm51bWJlcjtcclxufVxyXG5pbnRlcmZhY2UgQXNGbG9hdHtcclxuICAgIHRvRmxvYXQoKTpudW1iZXI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGludChvdGhlcjpzdHJpbmd8bnVtYmVyfEFzSW50KXtcclxuICAgIGlmKHR5cGVvZiBvdGhlcj09XCJzdHJpbmdcIikgcmV0dXJuIHBhcnNlSW50KG90aGVyKTtcclxuICAgIGVsc2UgaWYodHlwZW9mIG90aGVyPT1cIm51bWJlclwiKSByZXR1cm4gb3RoZXJ8MDtcclxuICAgIGVsc2UgaWYoXCJ0b0ludFwiIGluIG90aGVyKXtcclxuICAgICAgICByZXR1cm4gb3RoZXIudG9JbnQoKVxyXG4gICAgfWVsc2UgcmV0dXJuIDA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZsb2F0KG90aGVyOnN0cmluZ3xudW1iZXJ8QXNGbG9hdCl7XHJcbiAgICBpZih0eXBlb2Ygb3RoZXI9PVwic3RyaW5nXCIpIHJldHVybiBwYXJzZUZsb2F0KG90aGVyKTtcclxuICAgIGVsc2UgaWYodHlwZW9mIG90aGVyPT1cIm51bWJlclwiKSByZXR1cm4gb3RoZXI7XHJcbiAgICBlbHNlIGlmKFwidG9GbG9hdFwiIGluIG90aGVyKXtcclxuICAgICAgICByZXR1cm4gb3RoZXIudG9GbG9hdCgpXHJcbiAgICB9ZWxzZSByZXR1cm4gMDtcclxufVxyXG4vL+aVsOaNruWuueWZqOaehOmAoOWMuuWfn1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxpc3Q8VD4oaXRlcj86SXRlcmFibGU8VD4pOkFycmF5PFQ+e1xyXG4gICAgaWYoaXRlcj09bnVsbCkgcmV0dXJuIGxpc3QoW10pO1xyXG4gICAgbGV0IHJldD1bXVxyXG4gICAgZm9yKGxldCBhIG9mIGl0ZXIpe1xyXG4gICAgICAgIHJldC5wdXNoKGEpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcbi8v6J6N5ZCI5a+56LGhIFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvT2JqKG1hcDpNYXA8YW55LGFueT4pe1xyXG4gICAgLy9cclxuICAgIGxldCByPW5ldyBQcm94eSh7fSx7XHJcbiAgICAgICAgZ2V0KHRhcmdldCxwOmFueSxyZWNlaXZlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXAuZ2V0KHApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0KHRhcmdldCxwOmFueSx2YWx1ZSxyZWNlaXZlKXtcclxuICAgICAgICAgICAgbWFwLnNldChwLHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYXModGFyZ2V0LHA6YW55KXtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcC5oYXMocCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxldGVQcm9wZXJ0eSAodGFyZ2V0LCBwKTogYm9vbGVhbntcclxuICAgICAgICAgICAgcmV0dXJuIG1hcC5kZWxldGUocCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWZpbmVQcm9wZXJ0eSAodGFyZ2V0LCBwLCBhdHRyaWJ1dGVzOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiBib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtYXAuc2V0KHAsYXR0cmlidXRlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYXRlICh0YXJnZXQpOiBhbnlbXVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3QobWFwLmtleXMoKSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvd25LZXlzICh0YXJnZXQpOiBhbnlbXVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3QobWFwLmtleXMoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGFwcGx5ICh0YXJnZXQsIHRoaXNBcmc6IGFueSwgYXJnQXJyYXk/OiBhbnkpOiBhbnlcclxuICAgICAgICAvLyB7XHJcblxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gY29uc3RydWN0ICh0YXJnZXQsIGFyZ0FycmF5OiBhbnksIG5ld1RhcmdldD86IGFueSk6IG9iamVjdFxyXG4gICAgICAgIC8vIHtcclxuXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfSlcclxuICAgIHJldHVybiByO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYXA8SyxWPihhcmw6SXRlcmFibGU8W0ssVl0+KXtcclxuICAgIHJldHVybiBuZXcgTWFwPEssVj4oYXJsKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0PFQ+KGFybDpJdGVyYWJsZTxUPilcclxue1xyXG4gICAgcmV0dXJuIG5ldyBTZXQ8VD4oYXJsKTtcclxufVxyXG5cclxuLy/mlbDmja7mk43kvZxcclxuZXhwb3J0IGZ1bmN0aW9uICprZXlzPEs9YW55LFY9YW55PihvYmo6b2JqZWN0fE1hcDxLLFY+KVxyXG57XHJcbiAgICAvL+WPluWvueixoeeahGtleeaIlm1hcOeahOaJgOaciWtleSDmnprkuL5cclxuICAgIGlmKG9iaiBpbnN0YW5jZW9mIE1hcCl7XHJcbiAgICAgICAgLy/mnprkuL5cclxuICAgICAgICBmb3IobGV0IGEgb2Ygb2JqLmtleXMoKSl7XHJcbiAgICAgICAgICAgIHlpZWxkIGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0eXBlb2Ygb2JqID09XCJvYmplY3RcIil7XHJcbiAgICAgICAgZm9yKGxldCBrIGluIG9iail7XHJcbiAgICAgICAgICAgIHlpZWxkIGs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG50eXBlIEhhc0xlbmd0aD17bGVuZ3RoOm51bWJlcn18e3NpemU6bnVtYmVyfXx7Y291bnQ6bnVtYmVyfXx7X19sZW5fXygpOm51bWJlcn07XHJcbi8v5Lul5LiL5Li66LCD55So5Y2P6K6uXHJcbmV4cG9ydCBmdW5jdGlvbiBsZW4ob2JqOkl0ZXJhYmxlPGFueT58SGFzTGVuZ3RofG9iamVjdCl7XHJcbiAgICBpZihcImxlbmd0aFwiIGluIG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iai5sZW5ndGhcclxuICAgIH1lbHNlIGlmIChcInNpemVcIiBpbiBvYmope1xyXG4gICAgICAgIHJldHVybiBvYmouc2l6ZTtcclxuICAgIH1lbHNlIGlmKFwiY291bnRcIiBpbiBvYmope1xyXG4gICAgICAgIHJldHVybiBvYmouY291bnQ7XHJcbiAgICB9ZWxzZSBpZihcIl9fbGVuX19cIiBpbiBvYmope1xyXG4gICAgICAgIHJldHVybiBvYmouX19sZW5fXygpXHJcbiAgICB9ZWxzZSBpZih0eXBlb2Ygb2JqPT1cIm9iamVjdFwiKXtcclxuICAgICAgICBsZXQgc3VtPTA7XHJcbiAgICAgICAgZm9yKGxldCBrIGluIG9iail7XHJcbiAgICAgICAgICAgIHN1bSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy8gLy/nsbvlnovlh73mlbDmiorkuIDkuKrnsbvlnovmmKDlsITkuLrlj6bkuIDkuKrnsbvlnotcclxuLy8gLy/lr7nosaHmmKDlsITlh73mlbDvvIzmiorkuIDkuKrlr7nosaHkuK3nmoTmr4/kuKrlsZ7mgKfkvb/nlKjkuIDkuKptYXBwZXLmmKDlsIRcclxuLy8gLy/pgJLlvZLlr7nosaHmmKDlsITlh73mlbDvvIzmiorkuIDkuKrlr7nosaHkuK3nmoTmiYDmnInpnZ7lr7nosaHlsZ7mgKfkvb/nlKhtYXBwZXLmmKDlsITvvIzlr7nosaHpgJLlvZLmmKDlsIRcclxuLy8gdHlwZSBNYXBwZXI8QSxCPj1bQSxCXTtcclxuLy8gdHlwZSBNYXBUbzxUIGV4dGVuZHMgTWFwcGVyPGFueSxhbnk+LEM+PUMgZXh0ZW5kcyBUWzBdPyBUWzFdOm5ldmVyO1xyXG4vLyB0eXBlIFN3aXRjaDxULCBVIGV4dGVuZHMgYW55PiA9XHJcbi8vICAgICBUIGV4dGVuZHMga2V5b2YgVSA/IFVbVF0gOiBVW1wiZGVmYXVsdFwiXTtcclxuXHJcbi8vIC8vIOiOt+WPluesrOS4gOS4quWFg+e0oFxyXG4vLyBleHBvcnQgdHlwZSBIZWFkPFQ+ID0gVCBleHRlbmRzIHsgMDogaW5mZXIgSCB9ID8gSCA6IG5ldmVyO1xyXG4vLyAvLyDnp7vpmaTnrKzkuIDkuKrlhYPntKBcclxuLy8gZXhwb3J0IHR5cGUgVGFpbDxUPiA9IChcclxuLy8gICAgICguLi5hOiBUIGV4dGVuZHMgYW55W10gPyBUIDogbmV2ZXIpID0+IHZvaWRcclxuLy8gKSBleHRlbmRzIChhOiBhbnksIC4uLmI6IGluZmVyIFIpID0+IHZvaWQgPyBSIDogbmV2ZXI7XHJcbi8vIGV4cG9ydCB0eXBlIFVuc2hpZnQ8VCwgQT4gPSAoXHJcbi8vICAgICAoYTogQSwgLi4uYjogVCBleHRlbmRzIGFueVtdID8gVCA6IG5ldmVyKSA9PiB2b2lkXHJcbi8vICkgZXh0ZW5kcyAoLi4uYTogaW5mZXIgUikgPT4gdm9pZCA/IFIgOiBuZXZlcjtcclxuLy8gLy8g5Zyo5bC+6YOo5Yqg5YWl5LiA5Liq5YWD57SgXHJcbi8vIGV4cG9ydCB0eXBlIENvcHk8VCwgUyBleHRlbmRzIGFueT4gPSB7IFtQIGluIGtleW9mIFRdOiBTW1BdIH07XHJcbi8vIGV4cG9ydCB0eXBlIFB1c2g8VCwgQT4gPSBDb3B5PFVuc2hpZnQ8VCwgYW55PiwgVCAmIFJlY29yZDxzdHJpbmcsIEE+PjtcclxuXHJcblxyXG5cclxuLy8gdHlwZSBNdWx0aU1hcFRvPFQgZXh0ZW5kcyBhbnlbXSxDLGs9XCJzdHVmZlwiPj1UW1wibGVuZ3RoXCJdIGV4dGVuZHMgMD8gTWFwVG88VFswXSxDPjpcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQyBleHRlbmRzIFRbMF1bMF0/IFRbMF1bMV06U3dpdGNoPGsse1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZmY6TXVsdGlNYXBUbzxUYWlsPFQ+LEMsaz5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfT47XHJcblxyXG4vLyB0eXBlIE9iamVjdFR5cGVNYXA8QyBleHRlbmRzIE1hcHBlcjxhbnksYW55PltdLFQgZXh0ZW5kcyBvYmplY3Q+PXtbUCBpbiBrZXlvZiBUXTpNdWx0aU1hcFRvPEMsVFtQXT59O1xyXG5cclxuLy8gLy/lrp7njrDpgJLlvZLmgKcg5bCa5pyq5a6e546wXHJcbi8vIHR5cGUgT2JqZWN0TWFwcGVyPFQgZXh0ZW5kcyBvYmplY3QsQyBleHRlbmRzIE1hcHBlcjxhbnksIGFueT5bXT49W1QsT2JqZWN0VHlwZU1hcDxDLFQ+XVxyXG5cclxuLy8gdHlwZSBzPVtbbnVtYmVyLHN0cmluZ10sW3N0cmluZyxudW1iZXJdLE9iamVjdE1hcHBlcjxvYmplY3Qscz5dO1xyXG4vLyB0eXBlIG89e1xyXG4vLyAgICAgYTpzdHJpbmcsXHJcbi8vICAgICBiOm51bWJlcixcclxuLy8gICAgIGM6e1xyXG4vLyAgICAgICAgIGQ6c3RyaW5nLFxyXG4vLyAgICAgICAgIGU6bnVtYmVyXHJcbi8vICAgICB9XHJcbi8vIH07XHJcbi8vIHR5cGUgcj1PYmplY3RUeXBlTWFwPHMsbz47XHJcblxyXG5cclxuLy8gLy/lgLzljJbnsbvlnovlrprkuYlcclxuXHJcbi8vIC8v57G75Z6L5Yik5pat55SoXHJcbi8vIHR5cGUgVHlwZVJlcDxULFY9c3RyaW5nPj17XHJcbi8vICAgICB2YWx1ZTpWLFxyXG4vLyAgICAgdHlwZTpUXHJcbi8vIH07XHJcbi8vIC8v56iL5bqP55So55qEXHJcbi8vIGxldCB0eXBlX2FycmF5PVwiYXJyYXlcIjtcclxuLy8gbGV0IHR5cGVfbnVtYmVyPVwibnVtYmVyXCI7XHJcbi8vIGxldCB0eXBlX3N0cmluZz1cInN0cmluZ1wiO1xyXG4vLyAvL+WAvOmDqOWIhlxyXG5cclxuLy8gZnVuY3Rpb24gZ2V0YXJyYXk8VD4odmFsdWU6VCk6VHlwZVJlcDxcImFycmF5XCIsVD57XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIHZhbHVlOnZhbHVlLFxyXG4vLyAgICAgICAgIHR5cGU6XCJhcnJheVwiXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZnVuY3Rpb24gZ2V0bnVtYmVyPFQ+KHZhbHVlOlQpOlR5cGVSZXA8XCJudW1iZXJcIixUPntcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgdmFsdWU6dmFsdWUsXHJcbi8vICAgICAgICAgdHlwZTpcIm51bWJlclwiXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZnVuY3Rpb24gZ2V0c3RyaW5nPFQ+KHZhbHVlOlQpOlR5cGVSZXA8XCJzdHJpbmdcIixUPntcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgdmFsdWU6dmFsdWUsXHJcbi8vICAgICAgICAgdHlwZTpcInN0cmluZ1wiXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gLy/mmKDlsITpg6jliIZcclxuLy8gLy/mmKDlsITlmahcclxuLy8gdHlwZSBSZXBNYXA8QSxCPj1NYXBwZXI8VHlwZVJlcDxBPixCPjtcclxuLy8gLy/nsbvlnovmmKDlsITlmahcclxuLy8gdHlwZSBSZXBNYXBwZXJzPVtSZXBNYXA8XCJzdHJpbmdcIixzdHJpbmc+LFxyXG4vLyAgICAgICAgICAgICAgICAgUmVwTWFwPFwibnVtYmVyXCIsbnVtYmVyPixcclxuLy8gICAgICAgICAgICAgICAgIFJlcE1hcDxcImFycmF5XCIsYW55W10+XVxyXG5cclxuLy8gLy/mmKDlsIRyZXDnsbvlnovliLDmraPluLjnsbvlnotcclxuLy8gdHlwZSBFeHRyYWN0PFJlcD49TXVsdGlNYXBUbzxSZXBNYXBwZXJzLFJlcD47XHJcbi8vIC8v5pig5bCEbW9kZWwg5YiwIHBhcnNl5ZCO57G75Z6LXHJcbi8vIHR5cGUgTWFwTW9kZWw8TW9kZWxUeXBlIGV4dGVuZHMge1tQIGluIGtleW9mIE1vZGVsVHlwZV06VHlwZVJlcDxhbnk+fT49T2JqZWN0VHlwZU1hcDxSZXBNYXBwZXJzLE1vZGVsVHlwZT5cclxuXHJcbi8vIGxldCBtb2RlbD17XHJcbi8vICAgICB0aXRsZTpnZXRzdHJpbmcoXCIudGl0bGVcIiksXHJcbi8vICAgICBsaXN0OmdldGFycmF5KFwiLmFycmF5XCIpXHJcbi8vIH1cclxuLy8gdHlwZSBhPU1hcE1vZGVsPHR5cGVvZiBtb2RlbD47XHJcbi8vIGZ1bmN0aW9uIHBhcnNlKGJvZHksbW9kZWw6b2JqZWN0KTpNYXBNb2RlbDx0eXBlb2YgbW9kZWw+e1xyXG4vLyAgICAgcmV0dXJuIG51bGw7XHJcbi8vIH1cclxuIiwiaW1wb3J0ICogYXMgdGYgZnJvbSBcIkB0ZW5zb3JmbG93L3RmanNcIlxyXG5pbXBvcnQgeyByZXZlcnNlQm9vbCwgZXF1YWxNYXAsIGV4cGFuZFRvNEQgfSBmcm9tICcuL21hdHJpeF90b29sJztcclxuZXhwb3J0IGNsYXNzIERyYXcge1xyXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICB0Y3R4OiBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBvZmY6IE9mZnNjcmVlbkNhbnZhcztcclxuICAgIGg6IG51bWJlcjtcclxuICAgIHc6IG51bWJlcjtcclxuICAgIC8vcGl4ZWRzaXplXHJcbiAgICBwaXhlbHNpemU6W251bWJlcixudW1iZXJdO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZTogSFRNTENhbnZhc0VsZW1lbnQsIHB1YmxpYyByczogbnVtYmVyLCBwdWJsaWMgY3M6IG51bWJlcikge1xyXG4gICAgICAgIC8v6L+Z6YeM5b6X5YiwMmQg5LiK5LiL5paHIOiuoeeul+agvOWtkOWkp+Wwj1xyXG4gICAgICAgIGxldCBjdHggPSBlbGUuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xyXG4gICAgICAgIC8v6K6h566X5qC85a2Q5aSn5bCPXHJcbiAgICAgICAgdGhpcy5oID0gZWxlLmhlaWdodDtcclxuICAgICAgICB0aGlzLncgPSBlbGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5jaCA9IHRoaXMuaCAvIHJzO1xyXG4gICAgICAgIHRoaXMuY3cgPSB0aGlzLncgLyBjcztcclxuICAgICAgICAvL2NhY2hlXHJcbiAgICAgICAgdGhpcy5vZmYgPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHRoaXMudywgdGhpcy5oKTtcclxuICAgICAgICB0aGlzLnRjdHggPSB0aGlzLm9mZi5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBpeGVsc2l6ZT1bdGhpcy5jaCx0aGlzLmN3XTtcclxuICAgICAgICB0aGlzLnVwc2FtcGxlPXRmLmxheWVycy51cFNhbXBsaW5nMmQoe3NpemU6dGhpcy5waXhlbHNpemV9KTtcclxuICAgIH1cclxuICAgIGNoOiBudW1iZXI7XHJcbiAgICBjdzogbnVtYmVyO1xyXG4gICAgcHVibGljIGRyYXdQb2ludCh4LCB5LCBjOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcng6IG51bWJlciwgcnk6IG51bWJlcjtcclxuICAgICAgICByeCA9IHggKiB0aGlzLmN3O1xyXG4gICAgICAgIHJ5ID0geSAqIHRoaXMuY2g7XHJcbiAgICAgICAgLy/nu5jliLYgPz8/XHJcbiAgICAgICAgdGhpcy50Y3R4LmZpbGxTdHlsZSA9IGM7XHJcbiAgICAgICAgdGhpcy50Y3R4LmZpbGxSZWN0KHJ4LCByeSwgdGhpcy5jdywgdGhpcy5jaCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeUqOS6jue7mOWItjAx55+p6Zi1IOeUqOafkOS4quminOiJsuihqOekujFcclxuICAgICAqIOi/mOmcgOimgee7mOWItuS4jeWQjOWbvuWxgueahOaWueW8jyDlpoLnlKjmn5Dkupvlj6bkuIDkupvpopzoibLooajnpLrlj6bkuIDkupvkuJzopb8g54S25ZCO5Y+g5YqgXHJcbiAgICAgKiDov5jpnIDopoHlj6/ku6Xnu5jliLblrp7mlbDnn6npmLXnmoTlh73mlbBcclxuICAgICAqIEBwYXJhbSB0cyAwMeefqemYtVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZHJhdzJEKHRzOiB0Zi5UZW5zb3IyRCkge1xyXG4gICAgICAgIHRoaXMudGN0eC5jbGVhclJlY3QoMCwwLHRoaXMudyx0aGlzLmgpO1xyXG4gICAgICAgIC8vIHRoaXMudGN0eC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcclxuICAgICAgICAvLyB0aGlzLnRjdHguZmlsbFJlY3QoMCwgMCwgdGhpcy53LCB0aGlzLmgpO1xyXG4gICAgICAgIC8v5rOVMVxyXG4gICAgICAgIGxldCByZ2JtYXQ9YXdhaXQgdGhpcy50b3JnYih0cyk7ICAvLzAgZmZmZmZmZmYgMSAwMDAwMDAwMFxyXG5cclxuXHJcbiAgICAgICAgbGV0IGltZz10aGlzLnRjdHgucHV0SW1hZ2VEYXRhKHJnYm1hdCwwLDApO1xyXG4gICAgICAgIC8v5rOVMlxyXG4gICAgICAgIC8vIGxldCBhcnIgPSBhd2FpdCB0cy5kYXRhKCk7XHJcbiAgICAgICAgLy8gYXJyLmZvckVhY2goKHYsIGkpID0+IHtcclxuICAgICAgICAvLyAgICAgLy/nu5jliLYgMOe0ouW8leWvueW6lOWIl1xyXG4gICAgICAgIC8vICAgICBsZXQgYSA9IFssIFwiI2ZmMDAwMFwiXTtcclxuICAgICAgICAvLyAgICAgaWYgKHYgPT0gMSlcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuZHJhd1BvaW50KGkldHMuc2hhcGVbMF0sTWF0aC5mbG9vcihpL3RzLnNoYXBlWzBdKSwgYVsxXSk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gdGhpcy50Y3R4LmZpbGwoKTtcclxuICAgICAgICAvL+e7mOWItuWIsOeUu+W4g1xyXG4gICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLDAsdGhpcy53LHRoaXMuaCk7XHJcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMub2ZmLCAwLCAwKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgdXBzYW1wbGU6IHRmLmxheWVycy5MYXllcjtcclxuICAgIGFzeW5jIHRvcmdiKHQ6dGYuVGVuc29yMkQpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5qiq57q15omp5bGVNOWAjSDmi4nkvLhcclxuICAgICAgICAvLyBmdW5jdGlvbiBob3JleHBhbmQodDp0Zi5UZW5zb3IyRCx2PTQpOnRmLlRlbnNvcjJEe1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdC5leHBhbmREaW1zKDIpLnRpbGUoWzEsMSx2XSkucmVzaGFwZShbdC5zaGFwZVswXSx0LnNoYXBlWzFdKnZdKVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBmdW5jdGlvbiB2b3JleHBhbmQodDp0Zi5UZW5zb3IyRCx2PTQpOnRmLlRlbnNvcjJEe1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gaG9yZXhwYW5kKHQudHJhbnNwb3NlKCksdikudHJhbnNwb3NlKCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBsZXQgbnVtPXRmLnRpZHkoKCk9PntcclxuICAgICAgICAgICAgLy9pbnQzMiDnhLblkI7Dl+S4gOS4quminOiJslxyXG4gICAgICAgICAgICBsZXQgY29sb3JlZD10Lm11bCgweGZmMDAwMGZmfDApIGFzIHR5cGVvZiB0O1xyXG4gICAgICAgICAgICAvLyBsZXQgcmVzaXplZD12b3JleHBhbmQoaG9yZXhwYW5kKGNvbG9yZWQpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCByPXRoaXMucGl4ZWxzaXplWzBdPT10aGlzLnBpeGVsc2l6ZVswXSYmdGhpcy5waXhlbHNpemVbMF09PTE/IGNvbG9yZWQ6dGhpcy51cHNhbXBsZS5jYWxsKGV4cGFuZFRvNEQoY29sb3JlZCkse30pIGFzIHRmLlRlbnNvcjREO1xyXG4gICAgICAgICAgICBsZXQgcmVzaXplZD1yLnNxdWVlemUoWzAsM10pIGFzIHRmLlRlbnNvcjJEO1xyXG4gICAgICAgICAgICAvL+i/m+ihjHJnYmHor50g5qiq5ZCR5omp5bGVNOWAjVxyXG4gICAgICAgICAgICAvLyBsZXQgcmdiPWhvcmV4cGFuZChyZXNpemVkLDQpO1xyXG4gICAgICAgICAgICAvL+minOiJsuWkhOeQhiDmiooxIDEgMSAx55qE6L+e57utNOS4qiDlj5jkuLogYWFhYWFhYWFcclxuICAgICAgICAgICAgLy8gbGV0IGNvcj1yZ2IubXVsKDB4YWEpO1xyXG4gICAgICAgICAgICBsZXQgbnVtPXJlc2l6ZWQuYXNUeXBlKFwiaW50MzJcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBudW07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9udW3ovazmjaLkuLp1aW50OFxyXG4gICAgICAgIGxldCBhcj1hd2FpdCBudW0uZGF0YSgpO1xyXG4gICAgICAgIGxldCBwaXhlZHM9bmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGFyLmJ1ZmZlcik7XHJcbiAgICAgICAgbnVtLmRpc3Bvc2UoKTtcclxuICAgICAgICByZXR1cm4gbmV3IEltYWdlRGF0YShwaXhlZHMsbnVtLnNoYXBlWzFdLG51bS5zaGFwZVswXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5oqKMDHnn6npmLXovazmjaLkuLrlg4/ntKDnn6npmLVcclxuY29uc3Qgc2l6ZT1bNCw0XVxyXG4iLCJpbXBvcnQgKiBhcyB0ZiBmcm9tIFwiQHRlbnNvcmZsb3cvdGZqc1wiXHJcbmltcG9ydCB7IGRlbGF5LCBpbnQsIGZsb2F0IH0gZnJvbSAnLi4vbGlicy9saWInO1xyXG5pbXBvcnQgeyBEcmF3IH0gZnJvbSBcIi4vRHJhd1wiO1xyXG5pbXBvcnQgeyBtYXRyaXhfcnVsZSwgUnVsZX0gZnJvbSAnLi9ydWxlcy9tYXRyaXhfcnVsZXMnO1xyXG5cclxuZnVuY3Rpb24gZ2V0dmFsKGlkOnN0cmluZyl7XHJcbiAgICBsZXQgZT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXQjJHtpZH1gKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcmV0dXJuIGUudmFsdWU7XHJcbn1cclxuZnVuY3Rpb24gZ2V0PFIgZXh0ZW5kcyBrZXlvZiB0YWJsZT4oaWQ6c3RyaW5nLHRhZzpSPW51bGwpOnRhYmxlW1Jde1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApIGFzIHRhYmxlW1JdO1xyXG59XHJcbmxldCBhPWdldChcImhlbGxvXCIpXHJcblxyXG50eXBlIHRhYmxlPXtcclxuICAgIG9wdGlvbjpIVE1MT3B0aW9uRWxlbWVudCxcclxuICAgIGRpdjpIVE1MRGl2RWxlbWVudCxcclxuICAgIGlucHV0OkhUTUxJbnB1dEVsZW1lbnQsXHJcbiAgICBcIipcIjpIVE1MRWxlbWVudCxcclxuICAgIHNlbGVjdDpIVE1MU2VsZWN0RWxlbWVudFxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZTxUIGV4dGVuZHMga2V5b2YgdGFibGUsUiBleHRlbmRzIGtleW9mIHRhYmxlW1RdPih0YWc6IFQsaWQ6c3RyaW5nLHZhbHVlczpvYmplY3QpOnRhYmxlW1Rde1xyXG4gICAgbGV0IHQ9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKVxyXG4gICAgdC5pZD1pZDtcclxuICAgIC8vXHJcbiAgICBmb3IobGV0IGsgaW4gdmFsdWVzKXtcclxuICAgICAgICBpZihrIGluIHQgPT0gZmFsc2UpIGNvbnRpbnVlO1xyXG4gICAgICAgIHRba109dmFsdWVzW2tdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQgYXMgdW5rbm93biBhcyB0YWJsZVtUXTtcclxufVxyXG5cclxuLy8gbGV0IHJ1bGVzPXtcclxuLy8gICAgIGIzczIzLFxyXG4vLyAgICAgYjFzMTIsXHJcbi8vICAgICBiMzY3OHMzNDY3OCxcclxuLy8gICAgIGIzNnMyMyxcclxuLy8gICAgIGIzNTY3OHM1Njc4XHJcbi8vIH1cclxuaW1wb3J0IHtSdWxlcyBhcyBydWxlc30gZnJvbSBcIi4vcnVsZXMvbWF0cml4X3J1bGVzXCJcclxuZnVuY3Rpb24gaW5pdFNlbGVjdGlvbigpXHJcbntcclxuICAgIGZvcihsZXQgayBpbiBydWxlcyl7XHJcbiAgICAgICAgZ2V0KFwicnVsZVwiKS5hcHBlbmRDaGlsZChjcmVhdGUoXCJvcHRpb25cIixrLHtpbm5lclRleHQ6ayx2YWx1ZTprfSkpXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldF9wYXJhbShwYXJhbTpzdHJpbmcpe1xyXG4gICAgdmFyIHF1ZXJ5ID0gbG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpO1xyXG4gICAgZm9yKHZhciBpPTA7aTxxdWVyeS5sZW5ndGg7aSsrKXtcclxuICAgICAgICB2YXIga3YgPSBxdWVyeVtpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgIGlmKGt2WzBdID09IHBhcmFtKXtcclxuICAgICAgICAgICAgcmV0dXJuIGt2WzFdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBtYWluKCl7XHJcbiAgICBpbml0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgbGV0IGVsZT1nZXQoXCJjYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBsZXQgaHNpemU9WzEwMjQsMTAyNF1cclxuICAgIGVsZS5oZWlnaHQ9aHNpemVbMF07XHJcbiAgICBlbGUud2lkdGg9aHNpemVbMV07XHJcbiAgICBlbGUuaWQ9XCJjdHhcIlxyXG4gICAgY29uc3QgcnNpemU9Z2V0X3BhcmFtKFwicnNpemVcIik9PW51bGw/IDAuMjU6ZmxvYXQoZ2V0X3BhcmFtKFwicnNpemVcIikpXHJcbiAgICBsZXQgc2l6ZT1baHNpemVbMF0vcnNpemUsaHNpemVbMV0vcnNpemVdXHJcbiAgICBsZXQgZD1uZXcgRHJhdyhlbGUsc2l6ZVswXSxzaXplWzFdKTtcclxuXHJcbiAgICBsZXQgaW5pdD0oKT0+dGYucmFuZG9tVW5pZm9ybShzaXplLDAsMSxcImZsb2F0MzJcIikuZGl2KGZsb2F0KGdldHZhbChcInJlbFwiKSkpLmZsb29yKCkuZXF1YWwoMCkuYXNUeXBlKFwiaW50MzJcIikgYXMgdGYuVGVuc29yMkRcclxuICAgIGxldCBkdD1pbml0KCk7XHJcbiAgICAvL+i+k+WHulxyXG4gICAgZ2V0KFwiaW5mb1wiKS5pbm5lclRleHQ9YCR7ZHQuc2hhcGVbMF19eCR7ZHQuc2hhcGVbMV19IChoKncpIGBcclxuICAgIGdldChcImNpbmZvXCIpLmlubmVyVGV4dD1gJHtoc2l6ZVswXX14JHtoc2l6ZVsxXX0gKGgqdylgXHJcblxyXG4gICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgY29uc29sZS5sb2coZHQpO1xyXG4gICAgbGV0IHA9dHJ1ZTtcclxuICAgIGxldCBzbD1mYWxzZTtcclxuICAgIGxldCBuPTA7XHJcbiAgICAvL2xvb3BcclxuICAgIGFzeW5jIGZ1bmN0aW9uIGxvb3AoKXtcclxuICAgICAgICAvL+i+k+WHuuWkp+Wwj1xyXG4gICAgICAgIGxldCBkZWxheXQ9aW50KGdldHZhbChcImRlbGF5XCIpKTtcclxuICAgICAgICAvL+iOt+WPluinhOWImVxyXG4gICAgICAgIGxldCBydWxlaWQ9Z2V0KFwicnVsZVwiLFwic2VsZWN0XCIpLnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcclxuICAgICAgICBsZXQgcnVsZT1ydWxlc1tydWxlaWRdIGFzIFJ1bGU7XHJcbiAgICAgICAgZm9yKDs7KXtcclxuICAgICAgICAgICAgYXdhaXQgZGVsYXkoZGVsYXl0KTtcclxuICAgICAgICAgICAgbGV0IG9sZD1kdDtcclxuICAgICAgICAgICAgZHQ9bWF0cml4X3J1bGUob2xkLHJ1bGUpO1xyXG4gICAgICAgICAgICBvbGQuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZHQpO1xyXG4gICAgICAgICAgICAvL+mdnumdmem7mFxyXG4gICAgICAgICAgICBpZighc2wpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkLmRyYXcyRChkdCk7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGlmKHApIGJyZWFrO1xyXG4gICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgIC8v5pi+56S66L2uXHJcbiAgICAgICAgICAgIGdldChcIm5cIikuaW5uZXJUZXh0PW4udG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgLy9ldmVudFxyXG4gICAgZ2V0KFwic3RhcnRcIikub25jbGljaz1hc3luYygpPT57XHJcbiAgICAgICAgaWYocCl7XHJcbiAgICAgICAgICAgIHA9ZmFsc2U7XHJcbiAgICAgICAgICAgIGxvb3AoKTtcclxuICAgICAgICAgICAgZ2V0KFwic3RhcnRcIikuc3R5bGUuYmFja2dyb3VuZD1cInJlZFwiXHJcbiAgICAgICAgICAgIGdldChcInN0YXJ0XCIpLmlubmVyVGV4dD1cIuaaguWBnFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBwPXRydWU7XHJcbiAgICAgICAgICAgIGdldChcInN0YXJ0XCIpLnN0eWxlLmJhY2tncm91bmQ9XCJcIlxyXG4gICAgICAgICAgICBnZXQoXCJzdGFydFwiKS5pbm5lclRleHQ9XCLlkK/liqhcIjtcclxuICAgICAgICAgICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH07XHJcbiAgICBcclxuXHJcbiAgICBnZXQoXCJyZXNldFwiKS5vbmNsaWNrPWFzeW5jKCk9PntcclxuICAgICAgICBkdD1pbml0KCk7XHJcbiAgICAgICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgICAgIG49MDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGFuZ2Vwb2ludCh4LHkpe1xyXG4gICAgICAgIGlmKHg8MHx8eTwwKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGRhdGE9ZHQuYXJyYXlTeW5jKCk7XHJcbiAgICAgICAgbGV0IHR4LHR5O1xyXG4gICAgICAgIHR4PU1hdGguZmxvb3IoeC9kLmN3KTtcclxuICAgICAgICB0eT1NYXRoLmZsb29yKHkvZC5jaClcclxuICAgICAgICBkYXRhW3R5XVt0eF09ZGF0YVt0eV1bdHhdPT0wPyAxOjA7XHJcbiAgICAgICAgZHQuZGlzcG9zZSgpO1xyXG4gICAgICAgIGR0PXRmLnRlbnNvcihkYXRhKTtcclxuICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRwb2ludCh4LHksdj0xKXtcclxuICAgICAgICBpZih4PDB8fHk8MCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBkYXRhPWR0LmFycmF5U3luYygpO1xyXG4gICAgICAgIGxldCB0eCx0eTtcclxuICAgICAgICB0eD1NYXRoLmZsb29yKHgvZC5jdyk7XHJcbiAgICAgICAgdHk9TWF0aC5mbG9vcih5L2QuY2gpXHJcbiAgICAgICAgZGF0YVt0eV1bdHhdPTE7XHJcbiAgICAgICAgZHQuZGlzcG9zZSgpO1xyXG4gICAgICAgIGR0PXRmLnRlbnNvcihkYXRhKTtcclxuICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICB9XHJcbiAgICBnZXQoXCJjdHhcIikub25jbGljaz1lPT57XHJcbiAgICAgICAgaWYoZS5idXR0b249PTApXHJcbiAgICAgICAgICAgIGNoYW5nZXBvaW50KGUub2Zmc2V0WCxlLm9mZnNldFkpO1xyXG4gICAgfVxyXG4gICAgZ2V0KFwiY3R4XCIpLm9ubW91c2Vtb3ZlPWU9PntcclxuICAgICAgICBpZihlLmJ1dHRvbnM9PT0xKXtcclxuICAgICAgICAgICAgc2V0cG9pbnQoZS5vZmZzZXRYLGUub2Zmc2V0WSwxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoXCJzbFwiKS5vbmNsaWNrPSgpPT57XHJcbiAgICAgICAgc2w9IXNsO1xyXG4gICAgICAgIGlmKHNsKSBnZXQoXCJzbFwiKS5zdHlsZS5iYWNrZ3JvdW5kPVwicmVkXCI7XHJcbiAgICAgICAgZWxzZSBnZXQoXCJzbFwiKS5zdHlsZS5iYWNrZ3JvdW5kPVwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG59XHJcbndpbmRvdy5vbmxvYWQ9bWFpbjtcclxuY29uc29sZS5sb2coXCJoZWxsb3dvcmxkXCIpO1xyXG5cclxuY29uc3QgbW9kPSAobW9kdWxlIGFzIGFueSk7XHJcbmlmKG1vZC5ob3QpXHJcbiAgbW9kLmhvdC5hY2NlcHQoKTtcclxuY29uc29sZS5sb2cobW9kLmhvdClcclxubW9kLmFkZERpc3Bvc2VIYW5kbGVyKCgpPT57XHJcbiAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpO1xyXG59KSIsImltcG9ydCAqIGFzIHRmIGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCJcclxuLy/lpoLmnpznrYnkuo7liJnkuLoxIOWQpuWImeWImeS4ujBcclxuLy/nm7jnrYnmr5TovoNcclxuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsTWFwPFQgZXh0ZW5kcyB0Zi5UZW5zb3I+KHRzOiBULCBlcXV0bzogbnVtYmVyKTpUIHtcclxuICAgIC8vIGlmKGVxdXRvIT0wKSByZXR1cm4gdHMuZGl2KGVxdXRvKS5zdWIoMSkuYWJzKCkubGVzc0VxdWFsKDApO1xyXG4gICAgcmV0dXJuIHRmLmVxdWFsKHRzLGVxdXRvKS5hc1R5cGUodHMuZHR5cGUpIGFzIFQ7XHJcbn1cclxuLy/mraTlpITlupTmnInlpKfkuo7mr5TovoMgIOeUseatpOWPr+W+lyDmiYDmnInmr5TovoPliKTmlq1cclxuXHJcbi8vMS0wIOWPmOaNoiDljbNub3Tov5DnrpdcclxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VCb29sKHRzOiB0Zi5UZW5zb3IpIHtcclxuICAgIHJldHVybiB0cy5zdWIoMSkuYWJzKCk7XHJcbn1cclxuLy8wLTEg5Y+Y5Li6ICAtMSAxIOespuWPt+WMlui/kOeul1xyXG5leHBvcnQgZnVuY3Rpb24gc3ltbGl6ZSh0czogdGYuVGVuc29yKSB7XHJcbiAgICByZXR1cm4gdHMubXVsKDIpLnN1YigxKTtcclxufVxyXG4vL+atpOWkhOW6lOacieS4juaIlumdniDlvILmiJYgXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4cGFuZFRvNEQodHM6IHRmLlRlbnNvcjJEKTogdGYuVGVuc29yNEQge1xyXG4gICAgLy/ov5nkuKrmiooyZCBmZWF0dXJlbWFw5Y+Y5Li6NGTlj6/ku6Xnm7TmjqXov5vooYzljbfnp6/mk43kvZznmoRmZWF0dXJlbWFw5oiWa2VybmVsXHJcbiAgICAvL+S5n+WwseaYr+ebtOaOpeWvuWZlYXR1cmVtYXDov5vooYzljbfnp69cclxuICAgIC8v5Y+Y5oiQbmh3Y1xyXG4gICAgbGV0IHMgPSB0cy5leHBhbmREaW1zKDApLmV4cGFuZERpbXMoLTEpIGFzIHRmLlRlbnNvcjREO1xyXG4gICAgLy/mianlsZXkuIDkuKrliY3pnaLnmoRu5ZKM5LiA5Liq5ZCO6Z2i55qEY1xyXG4gICAgcmV0dXJuIHM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZURpbVRvMkQodHM6IHRmLlRlbnNvcjREKTogdGYuVGVuc29yMkQge1xyXG4gICAgLy/ov5nkuKrmiooyZCBmZWF0dXJlbWFw5Y+Y5Li6NGTlj6/ku6Xnm7TmjqXov5vooYzljbfnp6/mk43kvZznmoRmZWF0dXJlbWFw5oiWa2VybmVsXHJcbiAgICAvL+S5n+WwseaYr+ebtOaOpeWvuWZlYXR1cmVtYXDov5vooYzljbfnp69cclxuICAgIC8v5Y+Y5oiQbmh3Y1xyXG4gICAgbGV0IHMgPSB0cy5zcXVlZXplKFswLCAzXSkgYXMgdGYuVGVuc29yMkQ7XHJcbiAgICAvL+aJqeWxleS4gOS4quWJjemdoueahG7lkozkuIDkuKrlkI7pnaLnmoRjXHJcbiAgICByZXR1cm4gcztcclxufVxyXG4iLCJpbXBvcnQgKiBhcyB0ZiBmcm9tIFwiQHRlbnNvcmZsb3cvdGZqc1wiXHJcbmltcG9ydCB7IGV4cGFuZFRvNEQsIGVxdWFsTWFwLCBkZWxldGVEaW1UbzJEIH0gZnJvbSBcIi4uL21hdHJpeF90b29sXCI7XHJcbmZ1bmN0aW9uIGtlZXAoSyxTLFAsdj0yKVxyXG57XHJcbiAgICBsZXQgSzIgPSBlcXVhbE1hcChLLCB2KTtcclxuICAgIHJldHVybiBQLmFkZChLMi5tdWwoUykpO1xyXG59XHJcbmZ1bmN0aW9uIHNldE9uZShLLFMsUCx2PTMpXHJcbntcclxuICAgIGxldCBLMyA9IGVxdWFsTWFwKEssIHYpO1xyXG4gICAgcmV0dXJuIFAuYWRkKEszKTtcclxufVxyXG5mdW5jdGlvbiB1c2UoSyxTLFApe1xyXG4gICAgY2xhc3MgZnVuY3NcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgSz1LO1xyXG4gICAgICAgIHByb3RlY3RlZCBTPVM7XHJcbiAgICAgICAgcHJvdGVjdGVkIFA9UDtcclxuICAgICAgICBwdWJsaWMga2VlcD0odik9PnRoaXMuUD1rZWVwKHRoaXMuSyx0aGlzLlMsdGhpcy5QLHYpO1xyXG4gICAgICAgIHB1YmxpYyBzZXRPbmU9KHYpPT50aGlzLlA9c2V0T25lKHRoaXMuSyx0aGlzLlMsdGhpcy5QLHYpO1xyXG4gICAgICAgIHB1YmxpYyBnZXQoKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuUDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IGZ1bmNzKCk7XHJcbn1cclxudHlwZSBSdWxlVHlwZT1SZXR1cm5UeXBlPHR5cGVvZiB1c2U+O1xyXG5mdW5jdGlvbiBiYXNpYyh0czp0Zi5UZW5zb3IyRCl7XHJcbiAgICBsZXQga2VyID0gdGYudGVuc29yMmQoW1xyXG4gICAgICAgIFsxLCAxLCAxXSxcclxuICAgICAgICBbMSwgMCwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDFdXHJcbiAgICBdKS5leHBhbmREaW1zKC0xKS5leHBhbmREaW1zKC0xKSBhcyB0Zi5UZW5zb3I0RDtcclxuICAgIC8v5oqKdHPlj5jkuLo0ZFxyXG4gICAgbGV0IFMgPSBleHBhbmRUbzREKHRzKTtcclxuICAgIGxldCBLID0gUy5jb252MmQoa2VyLCAxLCBcInNhbWVcIiwgXCJOSFdDXCIpO1xyXG4gICAgLy/orqHnrpdcclxuICAgIC8v5Y+g5YqgXHJcbiAgICAvL+i/meS4quaYr+WFtuS7luiuvjBcclxuICAgIGxldCBQID0gdGYuemVyb3NMaWtlKFMpO1xyXG4gICAgcmV0dXJuIHtLLFMsUH07XHJcbn1cclxuZXhwb3J0IG5hbWVzcGFjZSBSdWxlc1xyXG57XHJcbiAgICAvL+WfuuacrOinhOWImVxyXG4gICAgLy/ooajnpLogMueahOaXtuWAmeS/neaMgSAz55qE5pe25YCZ56iz5a6aXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gYjNzMjMocnVsZTpSdWxlVHlwZSl7XHJcbiAgICAgICAgcnVsZS5rZWVwKDIpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDMpO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGIzNnMyMyhydWxlOlJ1bGVUeXBlKXtcclxuICAgICAgICBiM3MyMyhydWxlKTtcclxuICAgICAgICBydWxlLnNldE9uZSg2KTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBiMXMxMihydWxlOlJ1bGVUeXBlKXtcclxuICAgICAgICBydWxlLmtlZXAoMik7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoMSk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gYjM2NzhzMzQ2NzgocnVsZTpSdWxlVHlwZSl7XHJcbiAgICAgICAgcnVsZS5rZWVwKDQpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDMpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDYpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDcpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDgpO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGIzNTY3OHM1Njc4KHJ1bGU6UnVsZVR5cGUpe1xyXG4gICAgICAgIC8vIHJ1bGUua2VlcCg0KTtcclxuICAgICAgICBydWxlLnNldE9uZSgzKTtcclxuICAgICAgICBydWxlLnNldE9uZSg1KTtcclxuICAgICAgICBydWxlLnNldE9uZSg2KTtcclxuICAgICAgICBydWxlLnNldE9uZSg3KTtcclxuICAgICAgICBydWxlLnNldE9uZSg4KTtcclxuICAgIH1cclxufVxyXG4vL+eQhuiuuuS4iui/meS4quWPr+S7peaUr+aMgeWQhOenjeinhOWImVxyXG5leHBvcnQgZnVuY3Rpb24gbWF0cml4X3J1bGUodHM6IHRmLlRlbnNvcjJELHJ1bGVGOihydWxlOlJ1bGVUeXBlKT0+dm9pZD1SdWxlcy5iM3MyMykge1xyXG4gICAgLy/nlJ/lkb3muLjmiI/ljbfnp68g5LuO5LiA5LiqZmVhdHVyZSBtYXAg5b6X5Yiw5LiL5LiA5LiqZmVhdHVyZW1hcFxyXG4gICAgLy/ljp/lp4sgUyDljbfnp6/lvpfliLBLIOeEtuWQjksrUyDlvpfliLBQIOeEtuWQjuWvuVDkvb/nlKhlcXVhbE1hcDMg5b6X5Yiw5LqM5YC85YyW55qE5LiL5LiA5LiqXHJcbiAgICAvL2ZlYXR1cmVtYXBcclxuICAgIHJldHVybiB0Zi50aWR5KCgpPT57XHJcbiAgICAgICAgbGV0IHtLLFMsUH09YmFzaWModHMpO1xyXG4gICAgICAgIGxldCBydWxlPXVzZShLLFMsUCk7XHJcbiAgICAgICAgcnVsZUYocnVsZSk7XHJcbiAgICAgICAgUD1ydWxlLmdldCgpO1xyXG4gICAgICAgIHJldHVybiBkZWxldGVEaW1UbzJEKFAgYXMgdGYuVGVuc29yNEQpO1xyXG4gICAgfSk7XHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUnVsZT10eXBlb2YgUnVsZXMuYjNzMjM7XHJcbiIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=
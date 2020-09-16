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
        let rgbmat = await torgb(ts); //0 ffffffff 1 00000000
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
}
exports.Draw = Draw;
//把01矩阵转换为像素矩阵
let upsample = tf.layers.upSampling2d({ size: [4, 4] });
async function torgb(t) {
    //int32 然后×一个颜色
    let colored = t.mul(0xff0000ff | 0);
    //横纵扩展4倍 拉伸
    function horexpand(t, v = 4) {
        return t.expandDims(2).tile([1, 1, v]).reshape([t.shape[0], t.shape[1] * v]);
    }
    function vorexpand(t, v = 4) {
        return horexpand(t.transpose(), v).transpose();
    }
    let num = tf.tidy(() => {
        // let resized=vorexpand(horexpand(colored));
        let r = upsample.call(matrix_tool_1.expandTo4D(colored), {});
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
async function main() {
    initSelection();
    let ele = document.createElement("canvas");
    let hsize = [1024, 1024];
    ele.height = hsize[0];
    ele.width = hsize[1];
    ele.id = "ctx";
    document.body.appendChild(ele);
    let size = [hsize[0] / 4, hsize[1] / 4];
    let d = new Draw_1.Draw(ele, size[0], size[1]);
    let init = () => tf.randomUniform(size, 0, 1, "float32").div(lib_1.float(getval("rel"))).floor().equal(0).asType("int32");
    let dt = init();
    d.draw2D(dt);
    console.log(dt);
    let p = true;
    let sl = false;
    let n = 0;
    //loop
    async function loop() {
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
    // return ts.div(equto).sub(1).abs().lessEqual(0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWJzL2xpYi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJhdy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0cml4X3Rvb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hdHJpeF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vbm9kZS1mZXRjaCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3V0aWwgKGlnbm9yZWQpIiwid2VicGFjazovLy9jcnlwdG8gKGlnbm9yZWQpIiwid2VicGFjazovLy9zdHJpbmdfZGVjb2RlciAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2ZzIChpZ25vcmVkKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsU0FBZ0IsT0FBTyxDQUFDLEdBQVc7SUFDL0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDakQsQ0FBQztBQUZELDBCQUVDO0FBSU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxHQUFHO0lBQzNCLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUMsRUFBRTtRQUNoQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDLENBQUM7QUFDTixDQUFDO0FBTkQsc0JBTUM7QUFHRCxhQUFhO0FBQ2IsUUFBZ0IsQ0FBQyxNQUFLLENBQUMsS0FBWSxFQUFDLEtBQWEsRUFBQyxHQUFXO0lBQ3pELHFDQUFxQztJQUNyQyxJQUFHLEtBQUssSUFBRSxJQUFJLElBQUUsR0FBRyxJQUFFLElBQUksRUFBQztRQUN0QixHQUFHO1FBQ0gsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7U0FD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Z0IsV0FBVyxDQUFDLElBQWE7UUFDckMsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFQZSxpQkFBVyxjQU8xQjtBQUNMLENBQUMsRUEvQmdCLEtBQUssR0FBTCxhQUFLLEtBQUwsYUFBSyxRQStCckI7QUFDRCxlQUFlO0FBQ2YsU0FBZ0IsV0FBVyxDQUFDLEVBQWUsRUFBQyxRQUE0QixLQUFLLENBQUMsS0FBSztJQUMvRSx1Q0FBdUM7SUFDdkMsZ0RBQWdEO0lBQ2hELFlBQVk7SUFDWixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO1FBQ2YsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEdBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RCLElBQUksSUFBSSxHQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNaLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLDJCQUFhLENBQUMsQ0FBZ0IsQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQztBQVpELGtDQVlDOzs7Ozs7Ozs7Ozs7QUN4RkQsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlIiwiZmlsZSI6ImNvbW1vbnN+bWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gcmFuZGludChtYXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgJSBtYXg7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGF5KG1pcyl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpPT57XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9LCBtaXMpO1xyXG4gICAgfSkgICBcclxufVxyXG5cclxuXHJcbi8v5Lu/cHl0aG9u5Z+656GA6K6+5pa9XHJcbmV4cG9ydCBmdW5jdGlvbiAqcmFuZ2Uoc3RhcnQ6bnVtYmVyLHNwYWNlPzpudW1iZXIsZW5kPzpudW1iZXIpOkl0ZXJhYmxlPG51bWJlcj57XHJcbiAgICAvL+WFgeiuuCByYW5nZShhLGMsYikgcmFuZ2UoYikgcmFuZ2UoYSxiKVxyXG4gICAgaWYoc3BhY2U9PW51bGwmJmVuZD09bnVsbCl7XHJcbiAgICAgICAgLy8xXHJcbiAgICAgICAgeWllbGQqIHJhbmdlKDAsMSxzdGFydCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGVuZD09bnVsbCl7XHJcbiAgICAgICAgLy8yXHJcbiAgICAgICAgeWllbGQqIHJhbmdlKHN0YXJ0LDEsc3BhY2UpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICAvLzNcclxuICAgICAgICBmb3IobGV0IGk9c3RhcnQ7aTxlbmQ7aSs9c3BhY2Upe1xyXG4gICAgICAgICAgICB5aWVsZCBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uKiBlbnVtZXJhdGU8VD4oYXJyYXlsaWtlOkl0ZXJhYmxlPFQ+KTpJdGVyYWJsZTxbbnVtYmVyLFRdPntcclxuICAgIGxldCBub3c9MDtcclxuICAgIGZvcihsZXQgYSBvZiBhcnJheWxpa2Upe1xyXG4gICAgICAgIHlpZWxkIFtub3crKyxhXVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYW55KGFycmF5bGlrZTpJdGVyYWJsZTxhbnk+KVxyXG57XHJcbiAgICBmb3IobGV0IGEgb2YgYXJyYXlsaWtlKXtcclxuICAgICAgICBpZihhKSByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYWxsKGFycmF5bGlrZTpJdGVyYWJsZTxhbnk+KVxyXG57XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmludChkYXRhOmFueSl7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gKnppcCguLi5hcnJheWxpa2VzOkl0ZXJhYmxlPGFueT5bXSl7XHJcbiAgICBsZXQgaXRvcnM9YXJyYXlsaWtlcy5tYXAodj0+dltTeW1ib2wuaXRlcmF0b3JdKCkpO1xyXG4gICAgZm9yKDs7KXtcclxuICAgICAgICAvL+WvueaJgOaciWl0b3Llj5ZuZXh0IOWmguaenOWFqOmDqOaIkOWKn+WImXlpZWxkIOWQpuWImei/lOWbnlxyXG4gICAgICAgIGxldCByZXNzPWl0b3JzLm1hcCh2PT52Lm5leHQoKSk7XHJcbiAgICAgICAgLy8gcHJpbnQocmVzcyk7XHJcbiAgICAgICAgLy/lpoLmnpzmnInkuIDkuKrnu5PmnZ9cclxuICAgICAgICBpZihhbnkocmVzcy5tYXAodj0+di5kb25lKSkpe1xyXG4gICAgICAgICAgICAvL+i/lOWbnlxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHlpZWxkIHJlc3MubWFwKHY9PnYudmFsdWUpO1xyXG4gICAgfVxyXG59XHJcbi8v5Z+65pys5pON5L2cXHJcbmV4cG9ydCBmdW5jdGlvbiBzaHVmZmxlPFQ+KGFybDpJdGVyYWJsZTxUPik6VFtde1xyXG4gICAgbGV0IGE9bGlzdChhcmwpO1xyXG4gICAgbGV0IHI9bmV3IEFycmF5KGxlbihhKSk7XHJcbiAgICBmb3IobGV0IHQgb2YgYSl7XHJcbiAgICAgICAgLy/pmo/mnLrloavnqbpcclxuICAgICAgICBsZXQgaWR4PXJhbmRpbnQobGVuKGEpKTtcclxuICAgICAgICByW2lkeF09dDtcclxuICAgIH1cclxuICAgIHJldHVybiByO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0ZWQ8VD4oYXJsOkl0ZXJhYmxlPFQ+LGtleToodjpUKT0+bnVtYmVyPW51bGwpe1xyXG4gICAgbGV0IHJldD1saXN0KGFybCkuc29ydCgoYSxiKT0+e1xyXG4gICAgICAgIGxldCBbayxra109W2tleShhKSxrZXkoYildXHJcbiAgICAgICAgcmV0dXJuIGsta2s7XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYnlJZHg8VD4oYXJsOkl0ZXJhYmxlPFQ+LGlkeHM6bnVtYmVyW10pe1xyXG4gICAgbGV0IGw9bGlzdChhcmwpO1xyXG4gICAgbGV0IHJldD1pZHhzLm1hcCh2PT5sW3ZdKTtcclxuICAgIHJldHVybiByZXQ7XHJcbn1cclxuLy/kuI3mlL7lm57ph4fmoLdcclxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3Q8VD4oYXJsOkl0ZXJhYmxlPFQ+LGNvdW50Om51bWJlcik6VFtde1xyXG4gICAgLy/ku47kuIDkuKrliJfooajkuK3ph4fmoLcg5LiN5pS+5ZueXHJcbiAgICBsZXQgYT1saXN0KGFybCk7XHJcbiAgICBsZXQgaWR4PXNodWZmbGUocmFuZ2UobGVuKGEpKSkuc2xpY2UoMCxjb3VudCk7XHJcbiAgICBwcmludChpZHgpO1xyXG4gICAgcmV0dXJuIGJ5SWR4KGEsaWR4KTtcclxufVxyXG4vL+acieaUvuWbnumHh+agt1xyXG5leHBvcnQgZnVuY3Rpb24gc2FtcGxlPFQ+KGFybDpJdGVyYWJsZTxUPixjb3VudDpudW1iZXIpOlRbXXtcclxuICAgIC8v5LuO5LiA5Liq5YiX6KGo5Lit6YeH5qC3IOacieaUvuWbnlxyXG4gICAgbGV0IGE9bGlzdChhcmwpO1xyXG4gICAgbGV0IGlkeD1saXN0KHJhbmdlKGxlbihhKSkpLm1hcCh2PT5yYW5kaW50KGxlbihhKSkpO1xyXG4gICAgcmV0dXJuIGJ5SWR4KGEsaWR4KTtcclxufVxyXG4vL+aVsOWtplxyXG5leHBvcnQgbGV0IG1pbj1NYXRoLm1pbjtcclxuZXhwb3J0IGxldCBtYXg9TWF0aC5tYXg7XHJcblxyXG4vKipcclxuICog5o+S5YWlXHJcbiAqIEBwYXJhbSBhcmwg5pWw57uEXHJcbiAqIEBwYXJhbSBwb2ludCDmj5LlhaXkvY3nva4g5o+S5YWl5Yiw6L+Z5Liq5L2N572u55qE5YWD57Sg5YmN6Z2iIOS4uiAwLWxlbihhcmwpIOeahOWAvFxyXG4gKiBAcGFyYW0gdmFsIOaPkuWFpeWAvFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydDxUPihhcmw6SXRlcmFibGU8VD4scG9pbnQ6bnVtYmVyLHZhbDpUKTpUW117XHJcbiAgICBsZXQgbmV3YXI9W11cclxuICAgIGxldCBhPWxpc3QoYXJsKTtcclxuICAgIGEuZm9yRWFjaCgodixpZHgpPT57XHJcbiAgICAgICAgaWYocG9pbnQ9PWlkeCkgbmV3YXIucHVzaCh2YWwpO1xyXG4gICAgICAgIG5ld2FyLnB1c2godik7XHJcbiAgICB9KTtcclxuICAgIGlmKGxlbihhKT09cG9pbnQpIG5ld2FyLnB1c2godmFsKTtcclxuICAgIHJldHVybiBuZXdhcjtcclxufVxyXG5cclxuLy/ln7rmnKzmlbDmja5cclxuaW50ZXJmYWNlIEFzSW50e1xyXG4gICAgdG9JbnQoKTpudW1iZXI7XHJcbn1cclxuaW50ZXJmYWNlIEFzRmxvYXR7XHJcbiAgICB0b0Zsb2F0KCk6bnVtYmVyO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbnQob3RoZXI6c3RyaW5nfG51bWJlcnxBc0ludCl7XHJcbiAgICBpZih0eXBlb2Ygb3RoZXI9PVwic3RyaW5nXCIpIHJldHVybiBwYXJzZUludChvdGhlcik7XHJcbiAgICBlbHNlIGlmKHR5cGVvZiBvdGhlcj09XCJudW1iZXJcIikgcmV0dXJuIG90aGVyfDA7XHJcbiAgICBlbHNlIGlmKFwidG9JbnRcIiBpbiBvdGhlcil7XHJcbiAgICAgICAgcmV0dXJuIG90aGVyLnRvSW50KClcclxuICAgIH1lbHNlIHJldHVybiAwO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmbG9hdChvdGhlcjpzdHJpbmd8bnVtYmVyfEFzRmxvYXQpe1xyXG4gICAgaWYodHlwZW9mIG90aGVyPT1cInN0cmluZ1wiKSByZXR1cm4gcGFyc2VGbG9hdChvdGhlcik7XHJcbiAgICBlbHNlIGlmKHR5cGVvZiBvdGhlcj09XCJudW1iZXJcIikgcmV0dXJuIG90aGVyO1xyXG4gICAgZWxzZSBpZihcInRvRmxvYXRcIiBpbiBvdGhlcil7XHJcbiAgICAgICAgcmV0dXJuIG90aGVyLnRvRmxvYXQoKVxyXG4gICAgfWVsc2UgcmV0dXJuIDA7XHJcbn1cclxuLy/mlbDmja7lrrnlmajmnoTpgKDljLrln59cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsaXN0PFQ+KGl0ZXI/Okl0ZXJhYmxlPFQ+KTpBcnJheTxUPntcclxuICAgIGlmKGl0ZXI9PW51bGwpIHJldHVybiBsaXN0KFtdKTtcclxuICAgIGxldCByZXQ9W11cclxuICAgIGZvcihsZXQgYSBvZiBpdGVyKXtcclxuICAgICAgICByZXQucHVzaChhKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG4vL+iejeWQiOWvueixoSBcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBUb09iaihtYXA6TWFwPGFueSxhbnk+KXtcclxuICAgIC8vXHJcbiAgICBsZXQgcj1uZXcgUHJveHkoe30se1xyXG4gICAgICAgIGdldCh0YXJnZXQscDphbnkscmVjZWl2ZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwLmdldChwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCh0YXJnZXQscDphbnksdmFsdWUscmVjZWl2ZSl7XHJcbiAgICAgICAgICAgIG1hcC5zZXQocCx2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzKHRhcmdldCxwOmFueSl7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXAuaGFzKHApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsZXRlUHJvcGVydHkgKHRhcmdldCwgcCk6IGJvb2xlYW57XHJcbiAgICAgICAgICAgIHJldHVybiBtYXAuZGVsZXRlKHApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVmaW5lUHJvcGVydHkgKHRhcmdldCwgcCwgYXR0cmlidXRlczogUHJvcGVydHlEZXNjcmlwdG9yKTogYm9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWFwLnNldChwLGF0dHJpYnV0ZXMudmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmF0ZSAodGFyZ2V0KTogYW55W11cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0KG1hcC5rZXlzKCkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3duS2V5cyAodGFyZ2V0KTogYW55W11cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0KG1hcC5rZXlzKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBhcHBseSAodGFyZ2V0LCB0aGlzQXJnOiBhbnksIGFyZ0FycmF5PzogYW55KTogYW55XHJcbiAgICAgICAgLy8ge1xyXG5cclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIGNvbnN0cnVjdCAodGFyZ2V0LCBhcmdBcnJheTogYW55LCBuZXdUYXJnZXQ/OiBhbnkpOiBvYmplY3RcclxuICAgICAgICAvLyB7XHJcblxyXG4gICAgICAgIC8vIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbWFwPEssVj4oYXJsOkl0ZXJhYmxlPFtLLFZdPil7XHJcbiAgICByZXR1cm4gbmV3IE1hcDxLLFY+KGFybCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldDxUPihhcmw6SXRlcmFibGU8VD4pXHJcbntcclxuICAgIHJldHVybiBuZXcgU2V0PFQ+KGFybCk7XHJcbn1cclxuXHJcbi8v5pWw5o2u5pON5L2cXHJcbmV4cG9ydCBmdW5jdGlvbiAqa2V5czxLPWFueSxWPWFueT4ob2JqOm9iamVjdHxNYXA8SyxWPilcclxue1xyXG4gICAgLy/lj5blr7nosaHnmoRrZXnmiJZtYXDnmoTmiYDmnIlrZXkg5p6a5Li+XHJcbiAgICBpZihvYmogaW5zdGFuY2VvZiBNYXApe1xyXG4gICAgICAgIC8v5p6a5Li+XHJcbiAgICAgICAgZm9yKGxldCBhIG9mIG9iai5rZXlzKCkpe1xyXG4gICAgICAgICAgICB5aWVsZCBhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYodHlwZW9mIG9iaiA9PVwib2JqZWN0XCIpe1xyXG4gICAgICAgIGZvcihsZXQgayBpbiBvYmope1xyXG4gICAgICAgICAgICB5aWVsZCBrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxudHlwZSBIYXNMZW5ndGg9e2xlbmd0aDpudW1iZXJ9fHtzaXplOm51bWJlcn18e2NvdW50Om51bWJlcn18e19fbGVuX18oKTpudW1iZXJ9O1xyXG4vL+S7peS4i+S4uuiwg+eUqOWNj+iurlxyXG5leHBvcnQgZnVuY3Rpb24gbGVuKG9iajpJdGVyYWJsZTxhbnk+fEhhc0xlbmd0aHxvYmplY3Qpe1xyXG4gICAgaWYoXCJsZW5ndGhcIiBpbiBvYmope1xyXG4gICAgICAgIHJldHVybiBvYmoubGVuZ3RoXHJcbiAgICB9ZWxzZSBpZiAoXCJzaXplXCIgaW4gb2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqLnNpemU7XHJcbiAgICB9ZWxzZSBpZihcImNvdW50XCIgaW4gb2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqLmNvdW50O1xyXG4gICAgfWVsc2UgaWYoXCJfX2xlbl9fXCIgaW4gb2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqLl9fbGVuX18oKVxyXG4gICAgfWVsc2UgaWYodHlwZW9mIG9iaj09XCJvYmplY3RcIil7XHJcbiAgICAgICAgbGV0IHN1bT0wO1xyXG4gICAgICAgIGZvcihsZXQgayBpbiBvYmope1xyXG4gICAgICAgICAgICBzdW0rKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vIC8v57G75Z6L5Ye95pWw5oqK5LiA5Liq57G75Z6L5pig5bCE5Li65Y+m5LiA5Liq57G75Z6LXHJcbi8vIC8v5a+56LGh5pig5bCE5Ye95pWw77yM5oqK5LiA5Liq5a+56LGh5Lit55qE5q+P5Liq5bGe5oCn5L2/55So5LiA5LiqbWFwcGVy5pig5bCEXHJcbi8vIC8v6YCS5b2S5a+56LGh5pig5bCE5Ye95pWw77yM5oqK5LiA5Liq5a+56LGh5Lit55qE5omA5pyJ6Z2e5a+56LGh5bGe5oCn5L2/55SobWFwcGVy5pig5bCE77yM5a+56LGh6YCS5b2S5pig5bCEXHJcbi8vIHR5cGUgTWFwcGVyPEEsQj49W0EsQl07XHJcbi8vIHR5cGUgTWFwVG88VCBleHRlbmRzIE1hcHBlcjxhbnksYW55PixDPj1DIGV4dGVuZHMgVFswXT8gVFsxXTpuZXZlcjtcclxuLy8gdHlwZSBTd2l0Y2g8VCwgVSBleHRlbmRzIGFueT4gPVxyXG4vLyAgICAgVCBleHRlbmRzIGtleW9mIFUgPyBVW1RdIDogVVtcImRlZmF1bHRcIl07XHJcblxyXG4vLyAvLyDojrflj5bnrKzkuIDkuKrlhYPntKBcclxuLy8gZXhwb3J0IHR5cGUgSGVhZDxUPiA9IFQgZXh0ZW5kcyB7IDA6IGluZmVyIEggfSA/IEggOiBuZXZlcjtcclxuLy8gLy8g56e76Zmk56ys5LiA5Liq5YWD57SgXHJcbi8vIGV4cG9ydCB0eXBlIFRhaWw8VD4gPSAoXHJcbi8vICAgICAoLi4uYTogVCBleHRlbmRzIGFueVtdID8gVCA6IG5ldmVyKSA9PiB2b2lkXHJcbi8vICkgZXh0ZW5kcyAoYTogYW55LCAuLi5iOiBpbmZlciBSKSA9PiB2b2lkID8gUiA6IG5ldmVyO1xyXG4vLyBleHBvcnQgdHlwZSBVbnNoaWZ0PFQsIEE+ID0gKFxyXG4vLyAgICAgKGE6IEEsIC4uLmI6IFQgZXh0ZW5kcyBhbnlbXSA/IFQgOiBuZXZlcikgPT4gdm9pZFxyXG4vLyApIGV4dGVuZHMgKC4uLmE6IGluZmVyIFIpID0+IHZvaWQgPyBSIDogbmV2ZXI7XHJcbi8vIC8vIOWcqOWwvumDqOWKoOWFpeS4gOS4quWFg+e0oFxyXG4vLyBleHBvcnQgdHlwZSBDb3B5PFQsIFMgZXh0ZW5kcyBhbnk+ID0geyBbUCBpbiBrZXlvZiBUXTogU1tQXSB9O1xyXG4vLyBleHBvcnQgdHlwZSBQdXNoPFQsIEE+ID0gQ29weTxVbnNoaWZ0PFQsIGFueT4sIFQgJiBSZWNvcmQ8c3RyaW5nLCBBPj47XHJcblxyXG5cclxuXHJcbi8vIHR5cGUgTXVsdGlNYXBUbzxUIGV4dGVuZHMgYW55W10sQyxrPVwic3R1ZmZcIj49VFtcImxlbmd0aFwiXSBleHRlbmRzIDA/IE1hcFRvPFRbMF0sQz46XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMgZXh0ZW5kcyBUWzBdWzBdPyBUWzBdWzFdOlN3aXRjaDxrLHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0dWZmOk11bHRpTWFwVG88VGFpbDxUPixDLGs+XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0+O1xyXG5cclxuLy8gdHlwZSBPYmplY3RUeXBlTWFwPEMgZXh0ZW5kcyBNYXBwZXI8YW55LGFueT5bXSxUIGV4dGVuZHMgb2JqZWN0Pj17W1AgaW4ga2V5b2YgVF06TXVsdGlNYXBUbzxDLFRbUF0+fTtcclxuXHJcbi8vIC8v5a6e546w6YCS5b2S5oCnIOWwmuacquWunueOsFxyXG4vLyB0eXBlIE9iamVjdE1hcHBlcjxUIGV4dGVuZHMgb2JqZWN0LEMgZXh0ZW5kcyBNYXBwZXI8YW55LCBhbnk+W10+PVtULE9iamVjdFR5cGVNYXA8QyxUPl1cclxuXHJcbi8vIHR5cGUgcz1bW251bWJlcixzdHJpbmddLFtzdHJpbmcsbnVtYmVyXSxPYmplY3RNYXBwZXI8b2JqZWN0LHM+XTtcclxuLy8gdHlwZSBvPXtcclxuLy8gICAgIGE6c3RyaW5nLFxyXG4vLyAgICAgYjpudW1iZXIsXHJcbi8vICAgICBjOntcclxuLy8gICAgICAgICBkOnN0cmluZyxcclxuLy8gICAgICAgICBlOm51bWJlclxyXG4vLyAgICAgfVxyXG4vLyB9O1xyXG4vLyB0eXBlIHI9T2JqZWN0VHlwZU1hcDxzLG8+O1xyXG5cclxuXHJcbi8vIC8v5YC85YyW57G75Z6L5a6a5LmJXHJcblxyXG4vLyAvL+exu+Wei+WIpOaWreeUqFxyXG4vLyB0eXBlIFR5cGVSZXA8VCxWPXN0cmluZz49e1xyXG4vLyAgICAgdmFsdWU6VixcclxuLy8gICAgIHR5cGU6VFxyXG4vLyB9O1xyXG4vLyAvL+eoi+W6j+eUqOeahFxyXG4vLyBsZXQgdHlwZV9hcnJheT1cImFycmF5XCI7XHJcbi8vIGxldCB0eXBlX251bWJlcj1cIm51bWJlclwiO1xyXG4vLyBsZXQgdHlwZV9zdHJpbmc9XCJzdHJpbmdcIjtcclxuLy8gLy/lgLzpg6jliIZcclxuXHJcbi8vIGZ1bmN0aW9uIGdldGFycmF5PFQ+KHZhbHVlOlQpOlR5cGVSZXA8XCJhcnJheVwiLFQ+e1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICB2YWx1ZTp2YWx1ZSxcclxuLy8gICAgICAgICB0eXBlOlwiYXJyYXlcIlxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGZ1bmN0aW9uIGdldG51bWJlcjxUPih2YWx1ZTpUKTpUeXBlUmVwPFwibnVtYmVyXCIsVD57XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIHZhbHVlOnZhbHVlLFxyXG4vLyAgICAgICAgIHR5cGU6XCJudW1iZXJcIlxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGZ1bmN0aW9uIGdldHN0cmluZzxUPih2YWx1ZTpUKTpUeXBlUmVwPFwic3RyaW5nXCIsVD57XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIHZhbHVlOnZhbHVlLFxyXG4vLyAgICAgICAgIHR5cGU6XCJzdHJpbmdcIlxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIC8v5pig5bCE6YOo5YiGXHJcbi8vIC8v5pig5bCE5ZmoXHJcbi8vIHR5cGUgUmVwTWFwPEEsQj49TWFwcGVyPFR5cGVSZXA8QT4sQj47XHJcbi8vIC8v57G75Z6L5pig5bCE5ZmoXHJcbi8vIHR5cGUgUmVwTWFwcGVycz1bUmVwTWFwPFwic3RyaW5nXCIsc3RyaW5nPixcclxuLy8gICAgICAgICAgICAgICAgIFJlcE1hcDxcIm51bWJlclwiLG51bWJlcj4sXHJcbi8vICAgICAgICAgICAgICAgICBSZXBNYXA8XCJhcnJheVwiLGFueVtdPl1cclxuXHJcbi8vIC8v5pig5bCEcmVw57G75Z6L5Yiw5q2j5bi457G75Z6LXHJcbi8vIHR5cGUgRXh0cmFjdDxSZXA+PU11bHRpTWFwVG88UmVwTWFwcGVycyxSZXA+O1xyXG4vLyAvL+aYoOWwhG1vZGVsIOWIsCBwYXJzZeWQjuexu+Wei1xyXG4vLyB0eXBlIE1hcE1vZGVsPE1vZGVsVHlwZSBleHRlbmRzIHtbUCBpbiBrZXlvZiBNb2RlbFR5cGVdOlR5cGVSZXA8YW55Pn0+PU9iamVjdFR5cGVNYXA8UmVwTWFwcGVycyxNb2RlbFR5cGU+XHJcblxyXG4vLyBsZXQgbW9kZWw9e1xyXG4vLyAgICAgdGl0bGU6Z2V0c3RyaW5nKFwiLnRpdGxlXCIpLFxyXG4vLyAgICAgbGlzdDpnZXRhcnJheShcIi5hcnJheVwiKVxyXG4vLyB9XHJcbi8vIHR5cGUgYT1NYXBNb2RlbDx0eXBlb2YgbW9kZWw+O1xyXG4vLyBmdW5jdGlvbiBwYXJzZShib2R5LG1vZGVsOm9iamVjdCk6TWFwTW9kZWw8dHlwZW9mIG1vZGVsPntcclxuLy8gICAgIHJldHVybiBudWxsO1xyXG4vLyB9XHJcbiIsImltcG9ydCAqIGFzIHRmIGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCJcclxuaW1wb3J0IHsgcmV2ZXJzZUJvb2wsIGVxdWFsTWFwLCBleHBhbmRUbzREIH0gZnJvbSAnLi9tYXRyaXhfdG9vbCc7XHJcbmV4cG9ydCBjbGFzcyBEcmF3IHtcclxuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgdGN0eDogT2Zmc2NyZWVuQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgb2ZmOiBPZmZzY3JlZW5DYW52YXM7XHJcbiAgICBoOiBudW1iZXI7XHJcbiAgICB3OiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlOiBIVE1MQ2FudmFzRWxlbWVudCwgcHVibGljIHJzOiBudW1iZXIsIHB1YmxpYyBjczogbnVtYmVyKSB7XHJcbiAgICAgICAgLy/ov5nph4zlvpfliLAyZCDkuIrkuIvmlocg6K6h566X5qC85a2Q5aSn5bCPXHJcbiAgICAgICAgbGV0IGN0eCA9IGVsZS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XHJcbiAgICAgICAgLy/orqHnrpfmoLzlrZDlpKflsI9cclxuICAgICAgICB0aGlzLmggPSBlbGUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMudyA9IGVsZS53aWR0aDtcclxuICAgICAgICB0aGlzLmNoID0gdGhpcy5oIC8gcnM7XHJcbiAgICAgICAgdGhpcy5jdyA9IHRoaXMudyAvIGNzO1xyXG4gICAgICAgIC8vY2FjaGVcclxuICAgICAgICB0aGlzLm9mZiA9IG5ldyBPZmZzY3JlZW5DYW52YXModGhpcy53LCB0aGlzLmgpO1xyXG4gICAgICAgIHRoaXMudGN0eCA9IHRoaXMub2ZmLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIH1cclxuICAgIGNoOiBudW1iZXI7XHJcbiAgICBjdzogbnVtYmVyO1xyXG4gICAgcHVibGljIGRyYXdQb2ludCh4LCB5LCBjOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcng6IG51bWJlciwgcnk6IG51bWJlcjtcclxuICAgICAgICByeCA9IHggKiB0aGlzLmN3O1xyXG4gICAgICAgIHJ5ID0geSAqIHRoaXMuY2g7XHJcbiAgICAgICAgLy/nu5jliLYgPz8/XHJcbiAgICAgICAgdGhpcy50Y3R4LmZpbGxTdHlsZSA9IGM7XHJcbiAgICAgICAgdGhpcy50Y3R4LmZpbGxSZWN0KHJ4LCByeSwgdGhpcy5jdywgdGhpcy5jaCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeUqOS6jue7mOWItjAx55+p6Zi1IOeUqOafkOS4quminOiJsuihqOekujFcclxuICAgICAqIOi/mOmcgOimgee7mOWItuS4jeWQjOWbvuWxgueahOaWueW8jyDlpoLnlKjmn5Dkupvlj6bkuIDkupvpopzoibLooajnpLrlj6bkuIDkupvkuJzopb8g54S25ZCO5Y+g5YqgXHJcbiAgICAgKiDov5jpnIDopoHlj6/ku6Xnu5jliLblrp7mlbDnn6npmLXnmoTlh73mlbBcclxuICAgICAqIEBwYXJhbSB0cyAwMeefqemYtVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZHJhdzJEKHRzOiB0Zi5UZW5zb3IyRCkge1xyXG4gICAgICAgIHRoaXMudGN0eC5jbGVhclJlY3QoMCwwLHRoaXMudyx0aGlzLmgpO1xyXG4gICAgICAgIC8vIHRoaXMudGN0eC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcclxuICAgICAgICAvLyB0aGlzLnRjdHguZmlsbFJlY3QoMCwgMCwgdGhpcy53LCB0aGlzLmgpO1xyXG4gICAgICAgIC8v5rOVMVxyXG4gICAgICAgIGxldCByZ2JtYXQ9YXdhaXQgdG9yZ2IodHMpOyAgLy8wIGZmZmZmZmZmIDEgMDAwMDAwMDBcclxuXHJcblxyXG4gICAgICAgIGxldCBpbWc9dGhpcy50Y3R4LnB1dEltYWdlRGF0YShyZ2JtYXQsMCwwKTtcclxuICAgICAgICAvL+azlTJcclxuICAgICAgICAvLyBsZXQgYXJyID0gYXdhaXQgdHMuZGF0YSgpO1xyXG4gICAgICAgIC8vIGFyci5mb3JFYWNoKCh2LCBpKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIC8v57uY5Yi2IDDntKLlvJXlr7nlupTliJdcclxuICAgICAgICAvLyAgICAgbGV0IGEgPSBbLCBcIiNmZjAwMDBcIl07XHJcbiAgICAgICAgLy8gICAgIGlmICh2ID09IDEpXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmRyYXdQb2ludChpJXRzLnNoYXBlWzBdLE1hdGguZmxvb3IoaS90cy5zaGFwZVswXSksIGFbMV0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8vIHRoaXMudGN0eC5maWxsKCk7XHJcbiAgICAgICAgLy/nu5jliLbliLDnlLvluINcclxuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwwLHRoaXMudyx0aGlzLmgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLm9mZiwgMCwgMCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5oqKMDHnn6npmLXovazmjaLkuLrlg4/ntKDnn6npmLVcclxubGV0IHVwc2FtcGxlPXRmLmxheWVycy51cFNhbXBsaW5nMmQoe3NpemU6WzQsNF19KTtcclxuYXN5bmMgZnVuY3Rpb24gdG9yZ2IodDp0Zi5UZW5zb3IyRCl7XHJcbiAgICAvL2ludDMyIOeEtuWQjsOX5LiA5Liq6aKc6ImyXHJcbiAgICBsZXQgY29sb3JlZD10Lm11bCgweGZmMDAwMGZmfDApIGFzIHR5cGVvZiB0O1xyXG4gICAgLy/mqKrnurXmianlsZU05YCNIOaLieS8uFxyXG4gICAgZnVuY3Rpb24gaG9yZXhwYW5kKHQ6dGYuVGVuc29yMkQsdj00KTp0Zi5UZW5zb3IyRHtcclxuICAgICAgICByZXR1cm4gdC5leHBhbmREaW1zKDIpLnRpbGUoWzEsMSx2XSkucmVzaGFwZShbdC5zaGFwZVswXSx0LnNoYXBlWzFdKnZdKVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdm9yZXhwYW5kKHQ6dGYuVGVuc29yMkQsdj00KTp0Zi5UZW5zb3IyRHtcclxuICAgICAgICByZXR1cm4gaG9yZXhwYW5kKHQudHJhbnNwb3NlKCksdikudHJhbnNwb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG51bT10Zi50aWR5KCgpPT57XHJcbiAgICAgICAgLy8gbGV0IHJlc2l6ZWQ9dm9yZXhwYW5kKGhvcmV4cGFuZChjb2xvcmVkKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IHI9dXBzYW1wbGUuY2FsbChleHBhbmRUbzREKGNvbG9yZWQpLHt9KSBhcyB0Zi5UZW5zb3I0RDtcclxuICAgICAgICBsZXQgcmVzaXplZD1yLnNxdWVlemUoWzAsM10pIGFzIHRmLlRlbnNvcjJEO1xyXG4gICAgICAgIC8v6L+b6KGMcmdiYeivnSDmqKrlkJHmianlsZU05YCNXHJcbiAgICAgICAgLy8gbGV0IHJnYj1ob3JleHBhbmQocmVzaXplZCw0KTtcclxuICAgICAgICAvL+minOiJsuWkhOeQhiDmiooxIDEgMSAx55qE6L+e57utNOS4qiDlj5jkuLogYWFhYWFhYWFcclxuICAgICAgICAvLyBsZXQgY29yPXJnYi5tdWwoMHhhYSk7XHJcbiAgICAgICAgbGV0IG51bT1yZXNpemVkLmFzVHlwZShcImludDMyXCIpO1xyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy9udW3ovazmjaLkuLp1aW50OFxyXG4gICAgbGV0IGFyPWF3YWl0IG51bS5kYXRhKCk7XHJcbiAgICBsZXQgcGl4ZWRzPW5ldyBVaW50OENsYW1wZWRBcnJheShhci5idWZmZXIpO1xyXG4gICAgbnVtLmRpc3Bvc2UoKTtcclxuICAgIHJldHVybiBuZXcgSW1hZ2VEYXRhKHBpeGVkcyxudW0uc2hhcGVbMV0sbnVtLnNoYXBlWzBdKTtcclxufSIsImltcG9ydCAqIGFzIHRmIGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCJcclxuaW1wb3J0IHsgZGVsYXksIGludCwgZmxvYXQgfSBmcm9tICcuLi9saWJzL2xpYic7XHJcbmltcG9ydCB7IERyYXcgfSBmcm9tIFwiLi9EcmF3XCI7XHJcbmltcG9ydCB7IG1hdHJpeF9ydWxlLCBSdWxlfSBmcm9tICcuL3J1bGVzL21hdHJpeF9ydWxlcyc7XHJcblxyXG5mdW5jdGlvbiBnZXR2YWwoaWQ6c3RyaW5nKXtcclxuICAgIGxldCBlPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dCMke2lkfWApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICByZXR1cm4gZS52YWx1ZTtcclxufVxyXG5mdW5jdGlvbiBnZXQ8UiBleHRlbmRzIGtleW9mIHRhYmxlPihpZDpzdHJpbmcsdGFnOlI9bnVsbCk6dGFibGVbUl17XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCkgYXMgdGFibGVbUl07XHJcbn1cclxubGV0IGE9Z2V0KFwiaGVsbG9cIilcclxuXHJcbnR5cGUgdGFibGU9e1xyXG4gICAgb3B0aW9uOkhUTUxPcHRpb25FbGVtZW50LFxyXG4gICAgZGl2OkhUTUxEaXZFbGVtZW50LFxyXG4gICAgaW5wdXQ6SFRNTElucHV0RWxlbWVudCxcclxuICAgIFwiKlwiOkhUTUxFbGVtZW50LFxyXG4gICAgc2VsZWN0OkhUTUxTZWxlY3RFbGVtZW50XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlPFQgZXh0ZW5kcyBrZXlvZiB0YWJsZSxSIGV4dGVuZHMga2V5b2YgdGFibGVbVF0+KHRhZzogVCxpZDpzdHJpbmcsdmFsdWVzOm9iamVjdCk6dGFibGVbVF17XHJcbiAgICBsZXQgdD0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpXHJcbiAgICB0LmlkPWlkO1xyXG4gICAgLy9cclxuICAgIGZvcihsZXQgayBpbiB2YWx1ZXMpe1xyXG4gICAgICAgIGlmKGsgaW4gdCA9PSBmYWxzZSkgY29udGludWU7XHJcbiAgICAgICAgdFtrXT12YWx1ZXNba107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdCBhcyB1bmtub3duIGFzIHRhYmxlW1RdO1xyXG59XHJcblxyXG4vLyBsZXQgcnVsZXM9e1xyXG4vLyAgICAgYjNzMjMsXHJcbi8vICAgICBiMXMxMixcclxuLy8gICAgIGIzNjc4czM0Njc4LFxyXG4vLyAgICAgYjM2czIzLFxyXG4vLyAgICAgYjM1Njc4czU2NzhcclxuLy8gfVxyXG5pbXBvcnQge1J1bGVzIGFzIHJ1bGVzfSBmcm9tIFwiLi9ydWxlcy9tYXRyaXhfcnVsZXNcIlxyXG5mdW5jdGlvbiBpbml0U2VsZWN0aW9uKClcclxue1xyXG4gICAgZm9yKGxldCBrIGluIHJ1bGVzKXtcclxuICAgICAgICBnZXQoXCJydWxlXCIpLmFwcGVuZENoaWxkKGNyZWF0ZShcIm9wdGlvblwiLGsse2lubmVyVGV4dDprLHZhbHVlOmt9KSlcclxuICAgIH1cclxufVxyXG5hc3luYyBmdW5jdGlvbiBtYWluKCl7XHJcbiAgICBpbml0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgbGV0IGVsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgbGV0IGhzaXplPVsxMDI0LDEwMjRdXHJcbiAgICBlbGUuaGVpZ2h0PWhzaXplWzBdO1xyXG4gICAgZWxlLndpZHRoPWhzaXplWzFdO1xyXG4gICAgZWxlLmlkPVwiY3R4XCJcclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlKTtcclxuICAgIGxldCBzaXplPVtoc2l6ZVswXS80LGhzaXplWzFdLzRdXHJcbiAgICBsZXQgZD1uZXcgRHJhdyhlbGUsc2l6ZVswXSxzaXplWzFdKTtcclxuXHJcbiAgICBsZXQgaW5pdD0oKT0+dGYucmFuZG9tVW5pZm9ybShzaXplLDAsMSxcImZsb2F0MzJcIikuZGl2KGZsb2F0KGdldHZhbChcInJlbFwiKSkpLmZsb29yKCkuZXF1YWwoMCkuYXNUeXBlKFwiaW50MzJcIikgYXMgdGYuVGVuc29yMkRcclxuICAgIGxldCBkdD1pbml0KCk7XHJcblxyXG4gICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgY29uc29sZS5sb2coZHQpO1xyXG4gICAgbGV0IHA9dHJ1ZTtcclxuICAgIGxldCBzbD1mYWxzZTtcclxuICAgIGxldCBuPTA7XHJcbiAgICAvL2xvb3BcclxuICAgIGFzeW5jIGZ1bmN0aW9uIGxvb3AoKXtcclxuICAgICAgICBsZXQgZGVsYXl0PWludChnZXR2YWwoXCJkZWxheVwiKSk7XHJcbiAgICAgICAgLy/ojrflj5bop4TliJlcclxuICAgICAgICBsZXQgcnVsZWlkPWdldChcInJ1bGVcIixcInNlbGVjdFwiKS5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XHJcbiAgICAgICAgbGV0IHJ1bGU9cnVsZXNbcnVsZWlkXSBhcyBSdWxlO1xyXG4gICAgICAgIGZvcig7Oyl7XHJcbiAgICAgICAgICAgIGF3YWl0IGRlbGF5KGRlbGF5dCk7XHJcbiAgICAgICAgICAgIGxldCBvbGQ9ZHQ7XHJcbiAgICAgICAgICAgIGR0PW1hdHJpeF9ydWxlKG9sZCxydWxlKTtcclxuICAgICAgICAgICAgb2xkLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGR0KTtcclxuICAgICAgICAgICAgLy/pnZ7pnZnpu5hcclxuICAgICAgICAgICAgaWYoIXNsKVxyXG4gICAgICAgICAgICAgICAgYXdhaXQgZC5kcmF3MkQoZHQpO1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBpZihwKSBicmVhaztcclxuICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICAvL+aYvuekuui9rlxyXG4gICAgICAgICAgICBnZXQoXCJuXCIpLmlubmVyVGV4dD1uLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgIC8vZXZlbnRcclxuICAgIGdldChcInN0YXJ0XCIpLm9uY2xpY2s9YXN5bmMoKT0+e1xyXG4gICAgICAgIGlmKHApe1xyXG4gICAgICAgICAgICBwPWZhbHNlO1xyXG4gICAgICAgICAgICBsb29wKCk7XHJcbiAgICAgICAgICAgIGdldChcInN0YXJ0XCIpLnN0eWxlLmJhY2tncm91bmQ9XCJyZWRcIlxyXG4gICAgICAgICAgICBnZXQoXCJzdGFydFwiKS5pbm5lclRleHQ9XCLmmoLlgZxcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcD10cnVlO1xyXG4gICAgICAgICAgICBnZXQoXCJzdGFydFwiKS5zdHlsZS5iYWNrZ3JvdW5kPVwiXCJcclxuICAgICAgICAgICAgZ2V0KFwic3RhcnRcIikuaW5uZXJUZXh0PVwi5ZCv5YqoXCI7XHJcbiAgICAgICAgICAgIGQuZHJhdzJEKGR0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG4gICAgXHJcblxyXG4gICAgZ2V0KFwicmVzZXRcIikub25jbGljaz1hc3luYygpPT57XHJcbiAgICAgICAgZHQ9aW5pdCgpO1xyXG4gICAgICAgIGQuZHJhdzJEKGR0KTtcclxuICAgICAgICBuPTA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hhbmdlcG9pbnQoeCx5KXtcclxuICAgICAgICBpZih4PDB8fHk8MCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBkYXRhPWR0LmFycmF5U3luYygpO1xyXG4gICAgICAgIGxldCB0eCx0eTtcclxuICAgICAgICB0eD1NYXRoLmZsb29yKHgvZC5jdyk7XHJcbiAgICAgICAgdHk9TWF0aC5mbG9vcih5L2QuY2gpXHJcbiAgICAgICAgZGF0YVt0eV1bdHhdPWRhdGFbdHldW3R4XT09MD8gMTowO1xyXG4gICAgICAgIGR0LmRpc3Bvc2UoKTtcclxuICAgICAgICBkdD10Zi50ZW5zb3IoZGF0YSk7XHJcbiAgICAgICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0cG9pbnQoeCx5LHY9MSl7XHJcbiAgICAgICAgaWYoeDwwfHx5PDApIHJldHVybjtcclxuICAgICAgICBsZXQgZGF0YT1kdC5hcnJheVN5bmMoKTtcclxuICAgICAgICBsZXQgdHgsdHk7XHJcbiAgICAgICAgdHg9TWF0aC5mbG9vcih4L2QuY3cpO1xyXG4gICAgICAgIHR5PU1hdGguZmxvb3IoeS9kLmNoKVxyXG4gICAgICAgIGRhdGFbdHldW3R4XT0xO1xyXG4gICAgICAgIGR0LmRpc3Bvc2UoKTtcclxuICAgICAgICBkdD10Zi50ZW5zb3IoZGF0YSk7XHJcbiAgICAgICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgfVxyXG4gICAgZ2V0KFwiY3R4XCIpLm9uY2xpY2s9ZT0+e1xyXG4gICAgICAgIGlmKGUuYnV0dG9uPT0wKVxyXG4gICAgICAgICAgICBjaGFuZ2Vwb2ludChlLm9mZnNldFgsZS5vZmZzZXRZKTtcclxuICAgIH1cclxuICAgIGdldChcImN0eFwiKS5vbm1vdXNlbW92ZT1lPT57XHJcbiAgICAgICAgaWYoZS5idXR0b25zPT09MSl7XHJcbiAgICAgICAgICAgIHNldHBvaW50KGUub2Zmc2V0WCxlLm9mZnNldFksMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KFwic2xcIikub25jbGljaz0oKT0+e1xyXG4gICAgICAgIHNsPSFzbDtcclxuICAgICAgICBpZihzbCkgZ2V0KFwic2xcIikuc3R5bGUuYmFja2dyb3VuZD1cInJlZFwiO1xyXG4gICAgICAgIGVsc2UgZ2V0KFwic2xcIikuc3R5bGUuYmFja2dyb3VuZD1cIlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufVxyXG53aW5kb3cub25sb2FkPW1haW47XHJcbmNvbnNvbGUubG9nKFwiaGVsbG93b3JsZFwiKTtcclxuXHJcbmNvbnN0IG1vZD0gKG1vZHVsZSBhcyBhbnkpO1xyXG5pZihtb2QuaG90KVxyXG4gIG1vZC5ob3QuYWNjZXB0KCk7XHJcbmNvbnNvbGUubG9nKG1vZC5ob3QpXHJcbm1vZC5hZGREaXNwb3NlSGFuZGxlcigoKT0+e1xyXG4gICAgY29uc29sZS5sb2coXCJoZWxsb1wiKTtcclxufSkiLCJpbXBvcnQgKiBhcyB0ZiBmcm9tIFwiQHRlbnNvcmZsb3cvdGZqc1wiXHJcbi8v5aaC5p6c562J5LqO5YiZ5Li6MSDlkKbliJnliJnkuLowXHJcbi8v55u4562J5q+U6L6DXHJcbmV4cG9ydCBmdW5jdGlvbiBlcXVhbE1hcDxUIGV4dGVuZHMgdGYuVGVuc29yPih0czogVCwgZXF1dG86IG51bWJlcik6VCB7XHJcbiAgICAvLyByZXR1cm4gdHMuZGl2KGVxdXRvKS5zdWIoMSkuYWJzKCkubGVzc0VxdWFsKDApO1xyXG4gICAgcmV0dXJuIHRmLmVxdWFsKHRzLGVxdXRvKS5hc1R5cGUodHMuZHR5cGUpIGFzIFQ7XHJcbn1cclxuLy/mraTlpITlupTmnInlpKfkuo7mr5TovoMgIOeUseatpOWPr+W+lyDmiYDmnInmr5TovoPliKTmlq1cclxuXHJcbi8vMS0wIOWPmOaNoiDljbNub3Tov5DnrpdcclxuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VCb29sKHRzOiB0Zi5UZW5zb3IpIHtcclxuICAgIHJldHVybiB0cy5zdWIoMSkuYWJzKCk7XHJcbn1cclxuLy8wLTEg5Y+Y5Li6ICAtMSAxIOespuWPt+WMlui/kOeul1xyXG5leHBvcnQgZnVuY3Rpb24gc3ltbGl6ZSh0czogdGYuVGVuc29yKSB7XHJcbiAgICByZXR1cm4gdHMubXVsKDIpLnN1YigxKTtcclxufVxyXG4vL+atpOWkhOW6lOacieS4juaIlumdniDlvILmiJYgXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV4cGFuZFRvNEQodHM6IHRmLlRlbnNvcjJEKTogdGYuVGVuc29yNEQge1xyXG4gICAgLy/ov5nkuKrmiooyZCBmZWF0dXJlbWFw5Y+Y5Li6NGTlj6/ku6Xnm7TmjqXov5vooYzljbfnp6/mk43kvZznmoRmZWF0dXJlbWFw5oiWa2VybmVsXHJcbiAgICAvL+S5n+WwseaYr+ebtOaOpeWvuWZlYXR1cmVtYXDov5vooYzljbfnp69cclxuICAgIC8v5Y+Y5oiQbmh3Y1xyXG4gICAgbGV0IHMgPSB0cy5leHBhbmREaW1zKDApLmV4cGFuZERpbXMoLTEpIGFzIHRmLlRlbnNvcjREO1xyXG4gICAgLy/mianlsZXkuIDkuKrliY3pnaLnmoRu5ZKM5LiA5Liq5ZCO6Z2i55qEY1xyXG4gICAgcmV0dXJuIHM7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZURpbVRvMkQodHM6IHRmLlRlbnNvcjREKTogdGYuVGVuc29yMkQge1xyXG4gICAgLy/ov5nkuKrmiooyZCBmZWF0dXJlbWFw5Y+Y5Li6NGTlj6/ku6Xnm7TmjqXov5vooYzljbfnp6/mk43kvZznmoRmZWF0dXJlbWFw5oiWa2VybmVsXHJcbiAgICAvL+S5n+WwseaYr+ebtOaOpeWvuWZlYXR1cmVtYXDov5vooYzljbfnp69cclxuICAgIC8v5Y+Y5oiQbmh3Y1xyXG4gICAgbGV0IHMgPSB0cy5zcXVlZXplKFswLCAzXSkgYXMgdGYuVGVuc29yMkQ7XHJcbiAgICAvL+aJqeWxleS4gOS4quWJjemdoueahG7lkozkuIDkuKrlkI7pnaLnmoRjXHJcbiAgICByZXR1cm4gcztcclxufVxyXG4iLCJpbXBvcnQgKiBhcyB0ZiBmcm9tIFwiQHRlbnNvcmZsb3cvdGZqc1wiXHJcbmltcG9ydCB7IGV4cGFuZFRvNEQsIGVxdWFsTWFwLCBkZWxldGVEaW1UbzJEIH0gZnJvbSBcIi4uL21hdHJpeF90b29sXCI7XHJcbmZ1bmN0aW9uIGtlZXAoSyxTLFAsdj0yKVxyXG57XHJcbiAgICBsZXQgSzIgPSBlcXVhbE1hcChLLCB2KTtcclxuICAgIHJldHVybiBQLmFkZChLMi5tdWwoUykpO1xyXG59XHJcbmZ1bmN0aW9uIHNldE9uZShLLFMsUCx2PTMpXHJcbntcclxuICAgIGxldCBLMyA9IGVxdWFsTWFwKEssIHYpO1xyXG4gICAgcmV0dXJuIFAuYWRkKEszKTtcclxufVxyXG5mdW5jdGlvbiB1c2UoSyxTLFApe1xyXG4gICAgY2xhc3MgZnVuY3NcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgSz1LO1xyXG4gICAgICAgIHByb3RlY3RlZCBTPVM7XHJcbiAgICAgICAgcHJvdGVjdGVkIFA9UDtcclxuICAgICAgICBwdWJsaWMga2VlcD0odik9PnRoaXMuUD1rZWVwKHRoaXMuSyx0aGlzLlMsdGhpcy5QLHYpO1xyXG4gICAgICAgIHB1YmxpYyBzZXRPbmU9KHYpPT50aGlzLlA9c2V0T25lKHRoaXMuSyx0aGlzLlMsdGhpcy5QLHYpO1xyXG4gICAgICAgIHB1YmxpYyBnZXQoKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuUDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IGZ1bmNzKCk7XHJcbn1cclxudHlwZSBSdWxlVHlwZT1SZXR1cm5UeXBlPHR5cGVvZiB1c2U+O1xyXG5mdW5jdGlvbiBiYXNpYyh0czp0Zi5UZW5zb3IyRCl7XHJcbiAgICBsZXQga2VyID0gdGYudGVuc29yMmQoW1xyXG4gICAgICAgIFsxLCAxLCAxXSxcclxuICAgICAgICBbMSwgMCwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDFdXHJcbiAgICBdKS5leHBhbmREaW1zKC0xKS5leHBhbmREaW1zKC0xKSBhcyB0Zi5UZW5zb3I0RDtcclxuICAgIC8v5oqKdHPlj5jkuLo0ZFxyXG4gICAgbGV0IFMgPSBleHBhbmRUbzREKHRzKTtcclxuICAgIGxldCBLID0gUy5jb252MmQoa2VyLCAxLCBcInNhbWVcIiwgXCJOSFdDXCIpO1xyXG4gICAgLy/orqHnrpdcclxuICAgIC8v5Y+g5YqgXHJcbiAgICAvL+i/meS4quaYr+WFtuS7luiuvjBcclxuICAgIGxldCBQID0gdGYuemVyb3NMaWtlKFMpO1xyXG4gICAgcmV0dXJuIHtLLFMsUH07XHJcbn1cclxuZXhwb3J0IG5hbWVzcGFjZSBSdWxlc1xyXG57XHJcbiAgICAvL+WfuuacrOinhOWImVxyXG4gICAgLy/ooajnpLogMueahOaXtuWAmeS/neaMgSAz55qE5pe25YCZ56iz5a6aXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gYjNzMjMocnVsZTpSdWxlVHlwZSl7XHJcbiAgICAgICAgcnVsZS5rZWVwKDIpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDMpO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGIzNnMyMyhydWxlOlJ1bGVUeXBlKXtcclxuICAgICAgICBiM3MyMyhydWxlKTtcclxuICAgICAgICBydWxlLnNldE9uZSg2KTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBiMXMxMihydWxlOlJ1bGVUeXBlKXtcclxuICAgICAgICBydWxlLmtlZXAoMik7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoMSk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gYjM2NzhzMzQ2NzgocnVsZTpSdWxlVHlwZSl7XHJcbiAgICAgICAgcnVsZS5rZWVwKDQpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDMpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDYpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDcpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDgpO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGIzNTY3OHM1Njc4KHJ1bGU6UnVsZVR5cGUpe1xyXG4gICAgICAgIC8vIHJ1bGUua2VlcCg0KTtcclxuICAgICAgICBydWxlLnNldE9uZSgzKTtcclxuICAgICAgICBydWxlLnNldE9uZSg1KTtcclxuICAgICAgICBydWxlLnNldE9uZSg2KTtcclxuICAgICAgICBydWxlLnNldE9uZSg3KTtcclxuICAgICAgICBydWxlLnNldE9uZSg4KTtcclxuICAgIH1cclxufVxyXG4vL+eQhuiuuuS4iui/meS4quWPr+S7peaUr+aMgeWQhOenjeinhOWImVxyXG5leHBvcnQgZnVuY3Rpb24gbWF0cml4X3J1bGUodHM6IHRmLlRlbnNvcjJELHJ1bGVGOihydWxlOlJ1bGVUeXBlKT0+dm9pZD1SdWxlcy5iM3MyMykge1xyXG4gICAgLy/nlJ/lkb3muLjmiI/ljbfnp68g5LuO5LiA5LiqZmVhdHVyZSBtYXAg5b6X5Yiw5LiL5LiA5LiqZmVhdHVyZW1hcFxyXG4gICAgLy/ljp/lp4sgUyDljbfnp6/lvpfliLBLIOeEtuWQjksrUyDlvpfliLBQIOeEtuWQjuWvuVDkvb/nlKhlcXVhbE1hcDMg5b6X5Yiw5LqM5YC85YyW55qE5LiL5LiA5LiqXHJcbiAgICAvL2ZlYXR1cmVtYXBcclxuICAgIHJldHVybiB0Zi50aWR5KCgpPT57XHJcbiAgICAgICAgbGV0IHtLLFMsUH09YmFzaWModHMpO1xyXG4gICAgICAgIGxldCBydWxlPXVzZShLLFMsUCk7XHJcbiAgICAgICAgcnVsZUYocnVsZSk7XHJcbiAgICAgICAgUD1ydWxlLmdldCgpO1xyXG4gICAgICAgIHJldHVybiBkZWxldGVEaW1UbzJEKFAgYXMgdGYuVGVuc29yNEQpO1xyXG4gICAgfSk7XHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUnVsZT10eXBlb2YgUnVsZXMuYjNzMjM7XHJcbiIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=
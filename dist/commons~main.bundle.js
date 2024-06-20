(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["commons~main"],{

/***/ "./libs/lib.ts":
/*!*********************!*\
  !*** ./libs/lib.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.len = exports.keys = exports.set = exports.map = exports.mapToObj = exports.list = exports.float = exports.str = exports.int = exports.insert = exports.max = exports.min = exports.sample = exports.extract = exports.byIdx = exports.sorted = exports.shuffle = exports.zip = exports.print = exports.all = exports.any = exports.enumerate = exports.range = exports.delay = exports.randint = void 0;
function randint(max) {
    return Math.floor(Math.random() * max) % max;
}
exports.randint = randint;
function delay(mis) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, mis);
        });
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
function str(n) {
    return new Number(n).toString();
}
exports.str = str;
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
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draw = void 0;
const tf = __importStar(__webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js"));
const matrix_tool_1 = __webpack_require__(/*! ./matrix_tool */ "./src/matrix_tool.ts");
const matrix_rules_1 = __webpack_require__(/*! ./rules/matrix_rules */ "./src/rules/matrix_rules.ts");
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
        this.upsample = tf.layers.upSampling2d({ size: this.pixelsize, dtype: matrix_rules_1.defaultDtype });
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
    draw2D(ts) {
        return __awaiter(this, void 0, void 0, function* () {
            // this.tctx.clearRect(0,0,this.w,this.h);
            // this.tctx.fillStyle = "#ffffff";
            // this.tctx.fillRect(0, 0, this.w, this.h);
            //法1
            let rgbmat = yield this.torgb(ts); //0 ffffffff 1 00000000
            // let img=this.tctx.putImageData(rgbmat,0,0);
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
            // this.ctx.clearRect(0,0,this.w,this.h);
            // this.ctx.drawImage(this.off, 0, 0);
            this.ctx.putImageData(rgbmat, 0, 0);
            // this.ctx.scale(4,4)
        });
    }
    torgb(t) {
        return __awaiter(this, void 0, void 0, function* () {
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
                let r = this.pixelsize[0] == this.pixelsize[0] && this.pixelsize[0] == 1 ? (0, matrix_tool_1.expandTo4D)(colored) : this.upsample.call((0, matrix_tool_1.expandTo4D)(colored), {});
                let resized = r.squeeze([0, 3]);
                //进行rgba话 横向扩展4倍
                // let rgb=horexpand(resized,4);
                //颜色处理 把1 1 1 1的连续4个 变为 aaaaaaaa
                // let cor=rgb.mul(0xaa);
                let num = resized.asType("int32");
                // let num=resized;
                return num;
            });
            //num转换为uint8
            let ar = yield num.data();
            let pixeds = new Uint8ClampedArray(ar.buffer);
            num.dispose();
            return new ImageData(pixeds, num.shape[1], num.shape[0]);
        });
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
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tf = __importStar(__webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js"));
const lib_1 = __webpack_require__(/*! ../libs/lib */ "./libs/lib.ts");
const Draw_1 = __webpack_require__(/*! ./Draw */ "./src/Draw.ts");
// let rules={
//     b3s23,
//     b1s12,
//     b3678s34678,
//     b36s23,
//     b35678s5678
// }
const matrix_rules_1 = __webpack_require__(/*! ./rules/matrix_rules */ "./src/rules/matrix_rules.ts");
__webpack_require__(/*! @tensorflow/tfjs-backend-webgpu */ "./node_modules/@tensorflow/tfjs-backend-webgpu/dist/index.js");
__webpack_require__(/*! @tensorflow/tfjs-backend-wasm */ "./node_modules/@tensorflow/tfjs-backend-wasm/dist/index.js");
// tf.setBackend("webgl").then(r => )
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
function initSelection() {
    for (let k in matrix_rules_1.Rules) {
        get("rule").appendChild(create("option", k, { innerText: k, value: k }));
    }
}
function get_param(param) {
    var query = location.search.substring(1).split("&");
    for (var i = 0; i < query.length; i++) {
        var kv = query[i].split("=");
        if (kv[0] == param) {
            return kv[1];
        }
    }
    return null;
}
//是否需要训练神经网络测试
const usetrain = false;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const s = "webgl";
        const t = yield tf.setBackend(s);
        alert(`后端:${s}${t ? "成功" : "失败"} 使用数据类型:${matrix_rules_1.defaultDtype}`);
        initSelection();
        let ele = get("canvas");
        let hsize = [2048, 2048];
        ele.height = hsize[0];
        ele.width = hsize[1];
        ele.id = "ctx";
        const rsize = get_param("rsize") == null ? 2 : (0, lib_1.float)(get_param("rsize"));
        get("rsize", "input").value = rsize.toString();
        let size = [hsize[0] / rsize, hsize[1] / rsize];
        let d = new Draw_1.Draw(ele, size[0], size[1]);
        let init = () => tf
            .randomUniform(size, 0, 1, matrix_rules_1.defaultDtype)
            .div((0, lib_1.float)(getval("rel")))
            .floor()
            .equal(0)
            .asType(matrix_rules_1.defaultDtype);
        let dt = init();
        //输出
        get("info").innerText = `${dt.shape[0]}x${dt.shape[1]} (h*w) `;
        get("cinfo").innerText = `${hsize[0]}x${hsize[1]} (h*w)`;
        d.draw2D(dt);
        console.log(dt);
        //停止信号
        let p = true;
        //是否静默更新 不绘制
        let sl = false;
        //轮数
        let n = 0;
        //绘制间隔 多少帧绘制一次
        let drawFreq = 1;
        //loop 更新函数 从old计算得到new(帧矩阵）
        //更新函数默认使用矩阵规则 b3s23经典生命游戏
        let update = (old) => (0, matrix_rules_1.useMatrixRule)(old, matrix_rules_1.Rules.b3s23, usetrain);
        /**
         * 随机设置函数 用以随机添加点到画布上
         */
        function randomSet(count) {
            for (var i of (0, lib_1.range)(0, count)) {
                setpoint((0, lib_1.randint)(hsize[0]), (0, lib_1.randint)(hsize[1]));
            }
        }
        /**
         * 主循环 更新一帧 然后绘制
         */
        function loop() {
            return __awaiter(this, void 0, void 0, function* () {
                //输出大小
                let delayt = (0, lib_1.int)(getval("delay"));
                for (;;) {
                    //随机添加点
                    // randomSet()
                    //正文
                    yield (0, lib_1.delay)(delayt);
                    let old = dt;
                    dt = update(dt);
                    old.dispose();
                    // console.log(dt);
                    //非静默 且 更细到了更新的时候 这里可以选择等待绘制完成或者不等待
                    if (!sl && n % drawFreq == 0)
                        yield d.draw2D(dt);
                    //
                    if (p)
                        break;
                    n++;
                    //显示轮
                    get("n").innerText = n.toString();
                }
            });
        }
        //event
        get("start").onclick = () => __awaiter(this, void 0, void 0, function* () {
            if (p) {
                p = false;
                //获取规则
                let ruleid = get("rule", "select").selectedOptions[0].value;
                let rule = matrix_rules_1.Rules[ruleid];
                //这里控制是否开启历史记录（持续消耗内存或显存）
                update = (old) => (0, matrix_rules_1.useMatrixRule)(old, rule, usetrain);
                //启动循环
                loop();
                get("start").style.background = "red";
                get("start").innerText = "暂停";
                get("train").style.display = "none";
            }
            else {
                p = true;
                get("start").style.background = "";
                get("start").innerText = "启动";
                d.draw2D(dt);
                get("train").style.display = "";
            }
        });
        get("train").onclick = () => __awaiter(this, void 0, void 0, function* () {
            yield (0, matrix_rules_1.train)(rsize);
            alert("训练成功,启动测试");
            //显示用网络实现的更新
            update = (old) => (0, matrix_rules_1.useLayers)(old);
            //启动测试，测试完成前请勿操作
            //初始化
            dt = init();
            d.draw2D(dt);
            n = 0;
            p = false;
            get("delay", "input").value = (0, lib_1.str)(200);
            yield loop();
            //
            alert("测试完成");
        });
        get("reset").onclick = () => __awaiter(this, void 0, void 0, function* () {
            dt = init();
            d.draw2D(dt);
            n = 0;
        });
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
            //set
            // console.log(`set:${x},${y} = ${v}`)
        }
        get("ctx").onclick = (e) => {
            if (e.button == 0)
                changepoint(e.offsetX, e.offsetY);
        };
        get("ctx").onmousemove = (e) => {
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
    });
}
window.onload = main;
console.log("helloworld");
const mod = module;
if (mod.hot)
    mod.hot.accept();
console.log(mod.hot);
// mod.addDisposeHandler(()=>{
//     console.log("hello");
// })

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
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
/**
 * 图检测 检测图中每个点是否等于某个数 如果等于返回1 否则返回0 与tf默认的
 * 和tf.equal的能力一样 但发挥的为数值矩阵 而非bool矩阵
 * @param ts
 * @param equto
 */
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
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLayers = exports.train = exports.trainLog = exports.useMatrixRule = exports.Rules = exports.defaultDtype = void 0;
const tf = __importStar(__webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js"));
const matrix_tool_1 = __webpack_require__(/*! ../matrix_tool */ "./src/matrix_tool.ts");
//元操作 0 1矩阵 注意下面的都可以用logicAnd or等来实现
/**
 * 实现多域的方法：将2d矩阵增加一个维度 使用卷积计算结果
 * 显示时分别显示多个图层或选择其中一个显示 或综合 合成一个图层显示
 * 需要改造显示系统 操作逻辑 basic
 * rule 和数据初始化
 */
/**
 * 取反 1 0对调
 * @param tensor
 */
function tf_reverse(tensor) {
    //使用equal 0 也可以实现把 0变1 1 变0
    // return tf.tidy(()=>{
    // return tf.equal(tensor,0);
    // })
    return tf.tidy(() => {
        return tf
            .logicalXor(tensor.asType("bool"), tf.onesLike(tensor).asType("bool"))
            .asType("float32");
    });
    // return tf.tidy(() => {
    //     return tf.abs(tf.sub(tensor, 1));
    // })
}
/**
 * 设1 是设0的反面
 * @param tensor
 */
function tf_setOne(tensor, setMap) {
    return tf.tidy(() => {
        return tf
            .logicalOr(tensor.asType("bool"), setMap.asType("bool"))
            .asType("float32");
    });
    // return tf.tidy(() => {
    //     return tf_reverse(tf_setZero(tf_reverse(tensor), tf_reverse(setMap)));
    // })
}
/**
 * 设0 因为交换律 设置0的参数顺序不限
 * @param tensor 原始矩阵
 * @param setMap 设置矩阵 0表示要设0的位置 1 表示不变
 */
function tf_setZero(tensor, setMap) {
    return tf.tidy(() => {
        return tf
            .logicalAnd(tensor.asType("bool"), setMap.asType("bool"))
            .asType("float32");
    });
    // return tf.tidy(() => tf.mul(tensor, setMap));
}
//操作集 注意 如果一个规则中不设置任何规则 则全部设置为0
exports.defaultDtype = "float32";
/**
 * 如果周围有（v 两）个为1 则保持中心不变
 * 否则设置为0  也就是除了v之外的都会设置为0
 * @param K 卷积得到的结果表示周围格子对中心格子的影响，一般表示周围格子中1的个数
 * @param S 原始矩阵
 * @param P K+S的结果
 * @param v
 */
function keep(K, S, P, condFunc) {
    //把周围有两个格子的点 复制到结果中 如果周围不是两个格子 更多或更少 就不复制
    //复制不是叠加而是设置为1  如果对空结果执行 就是复制的意思 但如果对非空结果 就是 如果原始位置是1的话就设置 否则不改变
    //检测 如果为2  不设置zero 保持不变 如果不是2 则 全部设置为0
    let K2 = condFunc(K, S, P).asType("float32");
    //以叠加方式保存结果 以setOne结尾的话 不会消去任何东西
    return tf_setOne(P, tf_setZero(S, K2));
}
/**
 * 如果周围有（v 3）个为1 则设置中心为1
 * @param K 非0 1 矩阵
 * @param S 0 1 矩阵
 * @param P 0 1矩阵
 * @param v
 */
function setOne(K, S, P, condFunc) {
    //equalmap把非 0 1 变为 0 1
    let K3 = condFunc(K, S, P).asType("float32");
    //置1 原本是用 tf.add(P,K3) 因为假设P是全0  或者保证不重叠 因为 setOne(x)不可能用一个值调用两次
    //tf_setOne是可以同时调用多次而不会出现大于1的情况 而add会
    //因此没有
    return tf_setOne(P, K3);
}
/**
 * setOne的相反面 setZero
 * @param K
 * @param S
 * @param P
 * @param v
 */
function setZero(K, S, P, condFunc) {
    const T = tf_reverse(condFunc(K, S, P).asType("float32"));
    const res = tf_setZero(P, T);
    return res;
}
/**
 * 表示等于什么
 * @param v
 * @returns
 */
function condEqual(v) {
    return (K, S, P) => {
        return (0, matrix_tool_1.equalMap)(K, v);
    };
}
function condLess(v) {
    return (K, S, P) => {
        return tf.less(K, v);
    };
}
function condNotEqual(v) {
    return (K, S, P) => {
        return tf.notEqual(K, v);
    };
}
///操作集结束
function endPoint(target, propkey, descriptor) {
    debugger;
    const f = descriptor.value;
    descriptor.value = function (...args) {
        f.call(this, ...args);
        this.clearCond();
    };
}
class Funcs {
    constructor(K, S, P) {
        this.K = K;
        this.S = S;
        this.P = P;
        this.conds = [];
        // protected cond: CondFunc = null;
        this.linkType = "and";
    }
    /**
     * 混合的条件 暂时使用第一个条件
     * @returns
     */
    getComposedCond() {
        return (K, S, P) => {
            return this.conds[0](K, S, P);
        };
    }
    //多次调用条件会自动使用and连接
    whenEqual(v) {
        this.conds.push(condEqual(v));
        return this;
    }
    whenLess(v) {
        this.conds.push(condLess(v));
        return this;
    }
    whenNotEqual(v) {
        this.conds.push(condNotEqual(v));
        return this;
    }
    clearCond() {
        this.conds = [];
    }
    keep() {
        this.P = keep(this.K, this.S, this.P, this.getComposedCond());
    }
    setOne() {
        this.P = setOne(this.K, this.S, this.P, this.getComposedCond());
    }
    setZero() {
        this.P = setZero(this.K, this.S, this.P, this.getComposedCond());
    }
    get() {
        return this.P;
    }
    calculate(func) {
        return func(this.K, this.S, this.P);
    }
}
__decorate([
    endPoint,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Funcs.prototype, "keep", null);
__decorate([
    endPoint,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Funcs.prototype, "setOne", null);
__decorate([
    endPoint,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Funcs.prototype, "setZero", null);
/**
 * 用于提供dsl 方便规则编写
 * @param K
 * @param S
 * @param P
 */
function use(K, S, P) {
    return new Funcs(K, S, P);
}
function basic(ts) {
    //这里理论上可以考虑用其他kernel以以不同方式考虑周围值
    //这里可以用一个多通道卷积核来处理
    //统计一个格子周围的所有格子的值  权重都是1 但也可以不同  甚至可以考虑其他因素进去
    let ker = tf
        .tensor2d([
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
    ])
        .expandDims(-1)
        .expandDims(-1);
    //测试训练用
    // ker=tf.variable(ker,true,"kernel",defaultDtype);
    //把ts变为4d
    //原始矩阵
    let S = (0, matrix_tool_1.expandTo4D)(ts).asType(exports.defaultDtype);
    //卷积计算后的矩阵
    let K = tf.conv2d(S, ker, 1, "same", "NHWC");
    //计算
    //叠加
    //这个是其他设0
    //初始为0的保存结果的矩阵
    let P = tf.zerosLike(S);
    return { K, S, P };
}
/**
 * 规则集 理论上可以添加：
 * 1.规则内在随机性 有小概率出现其他行为
 * 2. 使用除了keep和setOne之外的操作 如setZero
 */
var Rules;
(function (Rules) {
    //基本规则
    //不复制old的情况下 setZero是自动的 其他规则只是覆盖了全面的setZero 而 如果预先复制上帧 则setZero需要手动调用
    //注意默认情况下不是保持 除非复制 复制 则默认行为为保持 不复制默认行为为设0
    //表示 2的时候不变 3的时候活过来(设置为1)
    //由于没有复制的过程 每个点都是周围其他点的结果 因此setZERO会导致连锁反应
    //也就是说如果不设置规则 下一帧会自动清零 除了保持和设1的 其他都自动设0
    function b3s23(rule) {
        //活着难度
        rule.whenEqual(2).keep();
        // rule.keep(3);
        //出生难度
        // rule.setOne(2);
        rule.whenEqual(3).setOne();
        //6的时候死去 (拥挤规则) 因为除了keep的和setOne的 其他都会自动死去 所以这里调用和不调用一样
        // rule.setZero(6);
    }
    Rules.b3s23 = b3s23;
    function rev_b3s23(rule) {
        rule.whenEqual(6).keep();
        rule.whenEqual(0).setOne();
        rule.whenEqual(1).setOne();
        rule.whenEqual(2).setOne();
        rule.whenEqual(3).setOne();
        rule.whenEqual(4).setOne();
        rule.whenEqual(7).setOne();
        rule.whenEqual(8).setOne();
    }
    Rules.rev_b3s23 = rev_b3s23;
    function b36s23(rule) {
        b3s23(rule);
        rule.whenEqual(6).setOne();
    }
    Rules.b36s23 = b36s23;
    function b1s12(rule) {
        rule.whenEqual(2).keep();
        rule.whenEqual(1).setOne();
    }
    Rules.b1s12 = b1s12;
    function b3678s34678(rule) {
        rule.whenEqual(4).keep();
        rule.whenEqual(3).setOne();
        rule.whenEqual(6).setOne();
        rule.whenEqual(7).setOne();
        rule.whenEqual(8).setOne();
    }
    Rules.b3678s34678 = b3678s34678;
    function b35678s5678(rule) {
        // rule.keep(4);
        const t = [3, 5, 6, 7, 8];
        for (let i of t) {
            rule.whenEqual(i).setOne();
        }
    }
    Rules.b35678s5678 = b35678s5678;
})(Rules = exports.Rules || (exports.Rules = {}));
/**
 *
 * 矩阵规则
 * 理论上这个可以支持各种规则
 * 可以支持在每次计算下一帧的时候进行记录（额外功能）
 *
 * S为0 1 矩阵 K是从0 1 矩阵卷积得到的值 表示了周围格子对中心格子的影响（卷积值） P为K+S的结果 表示
 * old和影响叠加后的产物 (综合产物） 然后去规范化
 */
function useMatrixRule(ts, ruleF = Rules.b3s23, logHistory = false) {
    //生命游戏卷积 从一个feature map 得到下一个featuremap
    //原始 S 卷积得到K 然后K+S 得到P 然后对P使用equalMap3 得到二值化的下一个
    //featuremap
    let ret = tf.tidy(() => {
        let { K, S, P } = basic(ts);
        let rule = use(K, S, P);
        ruleF(rule);
        P = rule.get();
        //训练并输出loss
        let ret = (0, matrix_tool_1.deleteDimTo2D)(P);
        //
        return ret;
    });
    //训练的额外的东西
    if (logHistory)
        trainLog(ts, ret);
    return ret;
}
exports.useMatrixRule = useMatrixRule;
//考虑不改变规则而是训练卷积核，让最终得到的next frame的总和，接近50%,同时尽量与prev不同
//也就是 最大化 abs(A-B)^2
//得到一个神经网络  可以把matrixrule当作环境，把自己输出的frame当作结果
//单纯的根据激励大小增加结果，优化结果 也就是把自己的结果和实际结果 比价
//并且×自己输出的帧
//最终得到一个可以模拟b2s3规则的卷积网络 rnn
//这里是通过上一帧输出下一帧的能力
//计算激励的时候肯定是二值化再计算的，否则就和直接计算loss 没啥区别了
//或者直接计算loss 只是输出的时候二值化
const opt = tf.train.rmsprop(0.01);
function initLayer(rsize = 8) {
    alert("初始化神经网络");
    let layers = tf.sequential({
        layers: [
            tf.layers.conv2d({
                inputShape: [1024 / rsize, 1024 / rsize, 1],
                kernelSize: 3,
                filters: 40,
                activation: "relu",
            }),
            tf.layers.conv2dTranspose({
                kernelSize: 3,
                filters: 10,
                activation: "tanh",
            }),
            tf.layers.conv2d({ kernelSize: 3, filters: 20, activation: "tanh" }),
            tf.layers.conv2dTranspose({ kernelSize: 3, filters: 1 }),
        ],
    });
    layers.compile({
        optimizer: "rmsprop",
        loss: tf.losses.sigmoidCrossEntropy,
        metrics: ["accuracy"],
    });
    return layers;
}
let xs = [], ys = [];
function trainLog(ts, ret) {
    // console.log("记录样本")
    //输入的是上一帧和下一帧
    //net的功能是从上一帧得到下一帧
    xs.push(tf.tidy(() => ts.clone().expandDims(2)));
    ys.push(tf.tidy(() => ret.clone().expandDims(2)));
    // console.log(xs[0])
}
exports.trainLog = trainLog;
let layers;
function train(rsize) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("开始训练");
        layers = initLayer(rsize);
        layers.summary();
        // let nstart=xs[0].clone() as tf.Tensor3D;
        console.log(`样本数:${xs.length}`);
        let x = tf.stack(xs, 0);
        xs.forEach((v) => v.dispose());
        let y = tf.stack(ys, 0);
        ys.forEach((v) => v.dispose());
        let info = yield layers.fit(x, y, {
            epochs: 5,
            callbacks: {
                onBatchEnd(batch, logs) {
                    console.log(`batch:${batch} -> ${logs}`);
                },
            },
        });
        console.log(info.history.acc);
        x.dispose();
        y.dispose();
        xs = [];
        ys = [];
    });
}
exports.train = train;
function useLayers(nstart) {
    //显示神经网络演化 从第一帧开始
    let ret = tf.tidy(() => {
        let t = layers.predict(nstart.expandDims(2).expandDims(0));
        t = t.sigmoid();
        let tt = t.squeeze([0, 3]);
        //二值化
        let bi = tf.greaterEqual(tt, 0.5);
        return bi;
    });
    return ret;
}
exports.useLayers = useLayers;


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

/***/ 10:
/*!********************!*\
  !*** os (ignored) ***!
  \********************/
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
/*!********************************!*\
  !*** string_decoder (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 7:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 8:
/*!********************************!*\
  !*** worker_threads (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 9:
/*!****************************!*\
  !*** perf_hooks (ignored) ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWJzL2xpYi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJhdy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0cml4X3Rvb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hdHJpeF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vbm9kZS1mZXRjaCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3V0aWwgKGlnbm9yZWQpIiwid2VicGFjazovLy9vcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2NyeXB0byAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3N0cmluZ19kZWNvZGVyIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vc3RyaW5nX2RlY29kZXIgKGlnbm9yZWQpPzcxOWMiLCJ3ZWJwYWNrOi8vL2ZzIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vcGF0aCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2ZzIChpZ25vcmVkKT85YzVmIiwid2VicGFjazovLy93b3JrZXJfdGhyZWFkcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3BlcmZfaG9va3MgKGlnbm9yZWQpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFnQixPQUFPLENBQUMsR0FBVztJQUMvQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNqRCxDQUFDO0FBRkQsMEJBRUM7QUFJRCxTQUFzQixLQUFLLENBQUMsR0FBRzs7UUFDM0IsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBQyxFQUFFO1lBQ2hDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixDQUFDLENBQUM7SUFDTixDQUFDO0NBQUE7QUFORCxzQkFNQztBQUdELGFBQWE7QUFDYixRQUFnQixDQUFDLE1BQUssQ0FBQyxLQUFZLEVBQUMsS0FBYSxFQUFDLEdBQVc7SUFDekQscUNBQXFDO0lBQ3JDLElBQUcsS0FBSyxJQUFFLElBQUksSUFBRSxHQUFHLElBQUUsSUFBSSxFQUFDO1FBQ3RCLEdBQUc7UUFDSCxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztLQUMzQjtTQUNJLElBQUcsR0FBRyxJQUFFLElBQUksRUFBQztRQUNkLEdBQUc7UUFDSCxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztLQUMvQjtTQUNHO1FBQ0EsR0FBRztRQUNILEtBQUksSUFBSSxDQUFDLEdBQUMsS0FBSyxFQUFDLENBQUMsR0FBQyxHQUFHLEVBQUMsQ0FBQyxJQUFFLEtBQUssRUFBQztZQUMzQixNQUFNLENBQUMsQ0FBQztTQUNYO0tBQ0o7QUFDTCxDQUFDO0FBaEJELHNCQWdCQztBQUVELFFBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBSSxTQUFxQjtJQUMvQyxJQUFJLEdBQUcsR0FBQyxDQUFDLENBQUM7SUFDVixLQUFJLElBQUksQ0FBQyxJQUFJLFNBQVMsRUFBQztRQUNuQixNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUMsQ0FBQyxDQUFDO0tBQ2xCO0FBQ0wsQ0FBQztBQUxELDhCQUtDO0FBRUQsU0FBZ0IsR0FBRyxDQUFDLFNBQXVCO0lBRXZDLEtBQUksSUFBSSxDQUFDLElBQUksU0FBUyxFQUFDO1FBQ25CLElBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO0tBQ3JCO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQU5ELGtCQU1DO0FBQ0QsU0FBZ0IsR0FBRyxDQUFDLFNBQXVCO0FBRTNDLENBQUM7QUFGRCxrQkFFQztBQUVELFNBQWdCLEtBQUssQ0FBQyxJQUFRO0lBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQztBQUZELHNCQUVDO0FBQ0QsUUFBZ0IsQ0FBQyxJQUFHLENBQUMsR0FBRyxVQUEwQjtJQUM5QyxJQUFJLEtBQUssR0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRSxFQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsRCxTQUFPO1FBQ0gsZ0NBQWdDO1FBQ2hDLElBQUksSUFBSSxHQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFFLEVBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLGVBQWU7UUFDZixTQUFTO1FBQ1QsSUFBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUUsRUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUM7WUFDeEIsSUFBSTtZQUNKLE9BQU8sU0FBUyxDQUFDO1NBQ3BCOztZQUNJLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUUsRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25DO0FBQ0wsQ0FBQztBQWJELGtCQWFDO0FBQ0QsTUFBTTtBQUNOLFNBQWdCLE9BQU8sQ0FBSSxHQUFlO0lBQ3RDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQixJQUFJLENBQUMsR0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QixLQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztRQUNYLE1BQU07UUFDTixJQUFJLEdBQUcsR0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQztLQUNaO0lBQ0QsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDO0FBVEQsMEJBU0M7QUFDRCxTQUFnQixNQUFNLENBQUksR0FBZSxFQUFDLE1BQWtCLElBQUk7SUFDNUQsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRTtRQUMxQixJQUFJLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixPQUFPLENBQUMsR0FBQyxFQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBTkQsd0JBTUM7QUFDRCxTQUFnQixLQUFLLENBQUksR0FBZSxFQUFDLElBQWE7SUFDbEQsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLElBQUksR0FBRyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUpELHNCQUlDO0FBQ0QsT0FBTztBQUNQLFNBQWdCLE9BQU8sQ0FBSSxHQUFlLEVBQUMsS0FBWTtJQUNuRCxjQUFjO0lBQ2QsSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLElBQUksR0FBRyxHQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNYLE9BQU8sS0FBSyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBTkQsMEJBTUM7QUFDRCxPQUFPO0FBQ1AsU0FBZ0IsTUFBTSxDQUFJLEdBQWUsRUFBQyxLQUFZO0lBQ2xELGNBQWM7SUFDZCxJQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUUsUUFBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsT0FBTyxLQUFLLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFMRCx3QkFLQztBQUNELElBQUk7QUFDTyxXQUFHLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNiLFdBQUcsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBRXhCOzs7OztHQUtHO0FBQ0gsU0FBZ0IsTUFBTSxDQUFJLEdBQWUsRUFBQyxLQUFZLEVBQUMsR0FBSztJQUN4RCxJQUFJLEtBQUssR0FBQyxFQUFFO0lBQ1osSUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUU7UUFDZixJQUFHLEtBQUssSUFBRSxHQUFHO1lBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUUsS0FBSztRQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbEMsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQVRELHdCQVNDO0FBU0QsU0FBZ0IsR0FBRyxDQUFDLEtBQXlCO0lBQ3pDLElBQUcsT0FBTyxLQUFLLElBQUUsUUFBUTtRQUFFLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdDLElBQUcsT0FBTyxLQUFLLElBQUUsUUFBUTtRQUFFLE9BQU8sS0FBSyxHQUFDLENBQUMsQ0FBQztTQUMxQyxJQUFHLE9BQU8sSUFBSSxLQUFLLEVBQUM7UUFDckIsT0FBTyxLQUFLLENBQUMsS0FBSyxFQUFFO0tBQ3ZCOztRQUFLLE9BQU8sQ0FBQyxDQUFDO0FBQ25CLENBQUM7QUFORCxrQkFNQztBQUNELFNBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLE9BQU8sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDcEMsQ0FBQztBQUZELGtCQUVDO0FBQ0QsU0FBZ0IsS0FBSyxDQUFDLEtBQTJCO0lBQzdDLElBQUcsT0FBTyxLQUFLLElBQUUsUUFBUTtRQUFFLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9DLElBQUcsT0FBTyxLQUFLLElBQUUsUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO1NBQ3hDLElBQUcsU0FBUyxJQUFJLEtBQUssRUFBQztRQUN2QixPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUU7S0FDekI7O1FBQUssT0FBTyxDQUFDLENBQUM7QUFDbkIsQ0FBQztBQU5ELHNCQU1DO0FBQ0QsVUFBVTtBQUVWLFNBQWdCLElBQUksQ0FBSSxJQUFpQjtJQUNyQyxJQUFHLElBQUksSUFBRSxJQUFJO1FBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0IsSUFBSSxHQUFHLEdBQUMsRUFBRTtJQUNWLEtBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFDO1FBQ2QsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDZDtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQVBELG9CQU9DO0FBQ0QsT0FBTztBQUVQLFNBQWdCLFFBQVEsQ0FBQyxHQUFnQjtJQUNyQyxFQUFFO0lBQ0YsSUFBSSxDQUFDLEdBQUMsSUFBSSxLQUFLLENBQU0sRUFBRSxFQUFDO1FBQ3BCLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBSyxFQUFDLFFBQVE7WUFDckIsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFDRCxHQUFHLENBQUMsTUFBTSxFQUFDLENBQUssRUFBQyxLQUFLLEVBQUMsT0FBTztZQUMxQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsR0FBRyxDQUFDLE1BQU0sRUFBQyxDQUFLO1lBQ1osT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFDRCxjQUFjLENBQUUsTUFBTSxFQUFFLENBQUM7WUFDckIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxjQUFjLENBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxVQUE4QjtZQUVyRCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELE9BQU8sQ0FBRSxNQUFNO1lBRVgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUNELG9EQUFvRDtRQUNwRCxJQUFJO1FBRUosS0FBSztRQUNMLDZEQUE2RDtRQUM3RCxJQUFJO1FBRUosSUFBSTtLQUNQLENBQUM7SUFDRixPQUFPLENBQUMsQ0FBQztBQUNiLENBQUM7QUFuQ0QsNEJBbUNDO0FBQ0QsU0FBZ0IsR0FBRyxDQUFNLEdBQW1CO0lBQ3hDLE9BQU8sSUFBSSxHQUFHLENBQU0sR0FBRyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUZELGtCQUVDO0FBQ0QsU0FBZ0IsR0FBRyxDQUFJLEdBQWU7SUFFbEMsT0FBTyxJQUFJLEdBQUcsQ0FBSSxHQUFHLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBSEQsa0JBR0M7QUFFRCxNQUFNO0FBQ04sUUFBZ0IsQ0FBQyxLQUFJLENBQWMsR0FBbUI7SUFFbEQsc0JBQXNCO0lBQ3RCLElBQUcsR0FBRyxZQUFZLEdBQUcsRUFBQztRQUNsQixJQUFJO1FBQ0osS0FBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUM7WUFDcEIsTUFBTSxDQUFDLENBQUM7U0FDWDtLQUNKO1NBQ0ksSUFBRyxPQUFPLEdBQUcsSUFBRyxRQUFRLEVBQUM7UUFDMUIsS0FBSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUM7WUFDYixNQUFNLENBQUMsQ0FBQztTQUNYO0tBQ0o7QUFDTCxDQUFDO0FBZEQsb0JBY0M7QUFHRCxTQUFTO0FBQ1QsU0FBZ0IsR0FBRyxDQUFDLEdBQWtDO0lBQ2xELElBQUcsUUFBUSxJQUFJLEdBQUcsRUFBQztRQUNmLE9BQU8sR0FBRyxDQUFDLE1BQU07S0FDcEI7U0FBSyxJQUFJLE1BQU0sSUFBSSxHQUFHLEVBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO0tBQ25CO1NBQUssSUFBRyxPQUFPLElBQUksR0FBRyxFQUFDO1FBQ3BCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztLQUNwQjtTQUFLLElBQUcsU0FBUyxJQUFJLEdBQUcsRUFBQztRQUN0QixPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUU7S0FDdkI7U0FBSyxJQUFHLE9BQU8sR0FBRyxJQUFFLFFBQVEsRUFBQztRQUMxQixJQUFJLEdBQUcsR0FBQyxDQUFDLENBQUM7UUFDVixLQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBQztZQUNiLEdBQUcsRUFBRSxDQUFDO1NBQ1Q7UUFDRCxPQUFPLEdBQUcsQ0FBQztLQUNkO0FBRUwsQ0FBQztBQWpCRCxrQkFpQkM7QUFFRCxzQkFBc0I7QUFDdEIsbUNBQW1DO0FBQ25DLDZDQUE2QztBQUM3QywwQkFBMEI7QUFDMUIsc0VBQXNFO0FBQ3RFLGtDQUFrQztBQUNsQywrQ0FBK0M7QUFFL0MsYUFBYTtBQUNiLDhEQUE4RDtBQUM5RCxhQUFhO0FBQ2IsMEJBQTBCO0FBQzFCLGtEQUFrRDtBQUNsRCx5REFBeUQ7QUFDekQsZ0NBQWdDO0FBQ2hDLHdEQUF3RDtBQUN4RCxpREFBaUQ7QUFDakQsZUFBZTtBQUNmLGlFQUFpRTtBQUNqRSx5RUFBeUU7QUFJekUscUZBQXFGO0FBQ3JGLHdGQUF3RjtBQUN4RixvRkFBb0Y7QUFDcEYsc0RBQXNEO0FBRXRELHdHQUF3RztBQUV4RyxlQUFlO0FBQ2YsMEZBQTBGO0FBRTFGLG1FQUFtRTtBQUNuRSxXQUFXO0FBQ1gsZ0JBQWdCO0FBQ2hCLGdCQUFnQjtBQUNoQixVQUFVO0FBQ1Ysb0JBQW9CO0FBQ3BCLG1CQUFtQjtBQUNuQixRQUFRO0FBQ1IsS0FBSztBQUNMLDZCQUE2QjtBQUc3QixXQUFXO0FBRVgsVUFBVTtBQUNWLDZCQUE2QjtBQUM3QixlQUFlO0FBQ2YsYUFBYTtBQUNiLEtBQUs7QUFDTCxTQUFTO0FBQ1QsMEJBQTBCO0FBQzFCLDRCQUE0QjtBQUM1Qiw0QkFBNEI7QUFDNUIsUUFBUTtBQUVSLG9EQUFvRDtBQUNwRCxlQUFlO0FBQ2YsdUJBQXVCO0FBQ3ZCLHVCQUF1QjtBQUN2QixRQUFRO0FBQ1IsSUFBSTtBQUNKLHNEQUFzRDtBQUN0RCxlQUFlO0FBQ2YsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUN4QixRQUFRO0FBQ1IsSUFBSTtBQUNKLHNEQUFzRDtBQUN0RCxlQUFlO0FBQ2YsdUJBQXVCO0FBQ3ZCLHdCQUF3QjtBQUN4QixRQUFRO0FBQ1IsSUFBSTtBQUNKLFNBQVM7QUFDVCxRQUFRO0FBQ1IseUNBQXlDO0FBQ3pDLFVBQVU7QUFDViw0Q0FBNEM7QUFDNUMsMkNBQTJDO0FBQzNDLHlDQUF5QztBQUV6QyxpQkFBaUI7QUFDakIsZ0RBQWdEO0FBQ2hELHVCQUF1QjtBQUN2Qiw2R0FBNkc7QUFFN0csY0FBYztBQUNkLGlDQUFpQztBQUNqQyw4QkFBOEI7QUFDOUIsSUFBSTtBQUNKLGlDQUFpQztBQUNqQyw0REFBNEQ7QUFDNUQsbUJBQW1CO0FBQ25CLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RWSixzSEFBc0M7QUFDdEMsdUZBQWtFO0FBRWxFLHNHQUFrRDtBQUNsRCxNQUFhLElBQUk7SUFRYixZQUFtQixHQUFzQixFQUFTLEVBQVUsRUFBUyxFQUFVO1FBQTVELFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQVE7UUFDM0UsbUJBQW1CO1FBQ25CLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixRQUFRO1FBQ1IsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdEIsT0FBTztRQUNQLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxFQUFFO1FBRUYsSUFBSSxDQUFDLFNBQVMsR0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsMkJBQVksRUFBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUdNLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQVM7UUFDNUIsSUFBSSxFQUFVLEVBQUUsRUFBVSxDQUFDO1FBQzNCLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNqQixFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDakIsUUFBUTtRQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRDs7Ozs7T0FLRztJQUNVLE1BQU0sQ0FBQyxFQUFlOztZQUMvQiwwQ0FBMEM7WUFDMUMsbUNBQW1DO1lBQ25DLDRDQUE0QztZQUM1QyxJQUFJO1lBQ0osSUFBSSxNQUFNLEdBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUUsdUJBQXVCO1lBR3pELDhDQUE4QztZQUM5QyxJQUFJO1lBQ0osNkJBQTZCO1lBQzdCLDBCQUEwQjtZQUMxQixrQkFBa0I7WUFDbEIsNkJBQTZCO1lBQzdCLGtCQUFrQjtZQUNsQix5RUFBeUU7WUFDekUsTUFBTTtZQUNOLG9CQUFvQjtZQUNwQixPQUFPO1lBQ1AseUNBQXlDO1lBQ3pDLHNDQUFzQztZQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLHNCQUFzQjtRQUMxQixDQUFDO0tBQUE7SUFFSyxLQUFLLENBQUMsQ0FBYTs7WUFFckIsV0FBVztZQUNYLHFEQUFxRDtZQUNyRCw4RUFBOEU7WUFDOUUsSUFBSTtZQUNKLHFEQUFxRDtZQUNyRCxxREFBcUQ7WUFDckQsSUFBSTtZQUVKLElBQUksR0FBRyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO2dCQUNoQixlQUFlO2dCQUNmLElBQUksT0FBTyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFDLENBQUMsQ0FBYSxDQUFDO2dCQUM1Qyw2Q0FBNkM7Z0JBRTdDLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQyxDQUFDLDRCQUFVLEVBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsNEJBQVUsRUFBQyxPQUFPLENBQUMsRUFBQyxFQUFFLENBQWdCLENBQUM7Z0JBQ2hKLElBQUksT0FBTyxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQWdCLENBQUM7Z0JBQzVDLGdCQUFnQjtnQkFDaEIsZ0NBQWdDO2dCQUNoQyxnQ0FBZ0M7Z0JBQ2hDLHlCQUF5QjtnQkFDekIsSUFBSSxHQUFHLEdBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDaEMsbUJBQW1CO2dCQUNuQixPQUFPLEdBQUcsQ0FBQztZQUVmLENBQUMsQ0FBQyxDQUFDO1lBRUgsYUFBYTtZQUNiLElBQUksRUFBRSxHQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksTUFBTSxHQUFDLElBQUksaUJBQWlCLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNkLE9BQU8sSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELENBQUM7S0FBQTtDQUNKO0FBbkdELG9CQW1HQztBQUVELGNBQWM7QUFDZCxNQUFNLElBQUksR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUdoQixzSEFBdUM7QUFDdkMsc0VBQXFFO0FBQ3JFLGtFQUE4QjtBQUM5QixjQUFjO0FBQ2QsYUFBYTtBQUNiLGFBQWE7QUFDYixtQkFBbUI7QUFDbkIsY0FBYztBQUNkLGtCQUFrQjtBQUNsQixJQUFJO0FBQ0osc0dBTzhCO0FBQzlCLDJIQUF5QztBQUN6Qyx1SEFBdUM7QUFFdkMscUNBQXFDO0FBQ3JDLFNBQVMsTUFBTSxDQUFDLEVBQVU7SUFDeEIsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFxQixDQUFDO0lBQ2xFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQsU0FBUyxHQUFHLENBQXdCLEVBQVUsRUFBRSxNQUFTLElBQUk7SUFDM0QsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUFFLENBQWEsQ0FBQztBQUN0RCxDQUFDO0FBRUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBVXJCLFNBQVMsTUFBTSxDQUNiLEdBQU0sRUFDTixFQUFVLEVBQ1YsTUFBYztJQUVkLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDVixFQUFFO0lBQ0YsS0FBSyxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQUU7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUs7WUFBRSxTQUFTO1FBQzlCLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbEI7SUFDRCxPQUFPLENBQXdCLENBQUM7QUFDbEMsQ0FBQztBQUVELFNBQVMsYUFBYTtJQUNwQixLQUFLLElBQUksQ0FBQyxJQUFJLG9CQUFLLEVBQUU7UUFDbkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMxRTtBQUNILENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxLQUFhO0lBQzlCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRTtZQUNsQixPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNkO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxjQUFjO0FBQ2QsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBRXZCLFNBQWUsSUFBSTs7UUFDakIsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVywyQkFBWSxFQUFFLENBQUMsQ0FBQztRQUMxRCxhQUFhLEVBQUUsQ0FBQztRQUVoQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFzQixDQUFDO1FBQzdDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ2YsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFLLEVBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDekUsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQy9DLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLEdBQUcsSUFBSSxXQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4QyxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FDZCxFQUFFO2FBQ0MsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLDJCQUFZLENBQUM7YUFDdkMsR0FBRyxDQUFDLGVBQUssRUFBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN6QixLQUFLLEVBQUU7YUFDUCxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ1IsTUFBTSxDQUFDLDJCQUFZLENBQWdCLENBQUM7UUFDekMsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7UUFDaEIsSUFBSTtRQUNKLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMvRCxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRXpELENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLE1BQU07UUFDTixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDYixZQUFZO1FBQ1osSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ2YsSUFBSTtRQUNKLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNWLGNBQWM7UUFDZCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsNEJBQTRCO1FBQzVCLDBCQUEwQjtRQUMxQixJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQWdCLEVBQUUsRUFBRSxDQUFDLGdDQUFhLEVBQUMsR0FBRyxFQUFFLG9CQUFLLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTdFOztXQUVHO1FBQ0gsU0FBUyxTQUFTLENBQUMsS0FBYTtZQUM5QixLQUFLLElBQUksQ0FBQyxJQUFJLGVBQUssRUFBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLFFBQVEsQ0FBQyxpQkFBTyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGlCQUFPLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNoRDtRQUNILENBQUM7UUFFRDs7V0FFRztRQUNILFNBQWUsSUFBSTs7Z0JBQ2pCLE1BQU07Z0JBQ04sSUFBSSxNQUFNLEdBQUcsYUFBRyxFQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUVsQyxTQUFTO29CQUNQLE9BQU87b0JBQ1AsY0FBYztvQkFDZCxJQUFJO29CQUNKLE1BQU0sZUFBSyxFQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNwQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7b0JBQ2IsRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDaEIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUVkLG1CQUFtQjtvQkFDbkIsbUNBQW1DO29CQUNuQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxRQUFRLElBQUksQ0FBQzt3QkFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2pELEVBQUU7b0JBQ0YsSUFBSSxDQUFDO3dCQUFFLE1BQU07b0JBQ2IsQ0FBQyxFQUFFLENBQUM7b0JBQ0osS0FBSztvQkFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDbkM7WUFDSCxDQUFDO1NBQUE7UUFFRCxPQUFPO1FBQ1AsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFTLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEVBQUU7Z0JBQ0wsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDVixNQUFNO2dCQUNOLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDNUQsSUFBSSxJQUFJLEdBQUcsb0JBQUssQ0FBQyxNQUFNLENBQVMsQ0FBQztnQkFDakMseUJBQXlCO2dCQUN6QixNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLGdDQUFhLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDckQsTUFBTTtnQkFDTixJQUFJLEVBQUUsQ0FBQztnQkFDUCxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3RDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7YUFDckM7aUJBQU07Z0JBQ0wsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDVCxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBQ25DLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNiLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzthQUNqQztRQUNILENBQUMsRUFBQztRQUNGLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBUyxFQUFFO1lBQ2hDLE1BQU0sd0JBQUssRUFBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbkIsWUFBWTtZQUNaLE1BQU0sR0FBRyxDQUFDLEdBQWdCLEVBQUUsRUFBRSxDQUFDLDRCQUFTLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUMsZ0JBQWdCO1lBQ2hCLEtBQUs7WUFDTCxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNOLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDVixHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssR0FBRyxhQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUNiLEVBQUU7WUFDRixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxFQUFDO1FBRUYsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFTLEVBQUU7WUFDaEMsRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDO1lBQ1osQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNiLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDUixDQUFDLEVBQUM7UUFFRixTQUFTLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTztZQUMzQixJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDMUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQ1gsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDYixFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUVELFNBQVMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7WUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU87WUFDM0IsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzFCLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNYLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUIsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNiLEVBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDYixLQUFLO1lBQ0wsc0NBQXNDO1FBQ3hDLENBQUM7UUFFRCxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekIsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUM7Z0JBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQztRQUNGLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM3QixJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxDQUFDO1FBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUU7WUFDdkIsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ1QsSUFBSSxFQUFFO2dCQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzs7Z0JBQ3RDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUN2QyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRTFCLE1BQU0sR0FBRyxHQUFHLE1BQWEsQ0FBQztBQUMxQixJQUFJLEdBQUcsQ0FBQyxHQUFHO0lBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQiw4QkFBOEI7QUFDOUIsNEJBQTRCO0FBQzVCLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4UEwsc0hBQXNDO0FBQ3RDLGVBQWU7QUFDZixNQUFNO0FBQ047Ozs7O0dBS0c7QUFDSCxTQUFnQixRQUFRLENBQXNCLEVBQUssRUFBRSxLQUFhO0lBQzlELCtEQUErRDtJQUMvRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFNLENBQUM7QUFDcEQsQ0FBQztBQUhELDRCQUdDO0FBQ0QsdUJBQXVCO0FBRXZCLGVBQWU7QUFDZixTQUFnQixXQUFXLENBQUMsRUFBYTtJQUNyQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDM0IsQ0FBQztBQUZELGtDQUVDO0FBQ0Qsb0JBQW9CO0FBQ3BCLFNBQWdCLE9BQU8sQ0FBQyxFQUFhO0lBQ2pDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUIsQ0FBQztBQUZELDBCQUVDO0FBQ0QsYUFBYTtBQUdiLFNBQWdCLFVBQVUsQ0FBQyxFQUFlO0lBQ3RDLGtEQUFrRDtJQUNsRCxzQkFBc0I7SUFDdEIsUUFBUTtJQUNSLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFnQixDQUFDO0lBQ3ZELGlCQUFpQjtJQUNqQixPQUFPLENBQUMsQ0FBQztBQUNiLENBQUM7QUFQRCxnQ0FPQztBQUNELFNBQWdCLGFBQWEsQ0FBQyxFQUFlO0lBQ3pDLGtEQUFrRDtJQUNsRCxzQkFBc0I7SUFDdEIsUUFBUTtJQUNSLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQWdCLENBQUM7SUFDMUMsaUJBQWlCO0lBQ2pCLE9BQU8sQ0FBQyxDQUFDO0FBQ2IsQ0FBQztBQVBELHNDQU9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Q0Qsc0hBQXVDO0FBRXZDLHdGQUFxRTtBQUNyRSxvQ0FBb0M7QUFDcEM7Ozs7O0dBS0c7QUFDSDs7O0dBR0c7QUFDSCxTQUFTLFVBQVUsQ0FBQyxNQUFjO0lBQ2hDLDJCQUEyQjtJQUMzQix1QkFBdUI7SUFDdkIsNkJBQTZCO0lBQzdCLEtBQUs7SUFDTCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ2xCLE9BQU8sRUFBRTthQUNOLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztJQUNILHlCQUF5QjtJQUN6Qix3Q0FBd0M7SUFDeEMsS0FBSztBQUNQLENBQUM7QUFFRDs7O0dBR0c7QUFDSCxTQUFTLFNBQVMsQ0FBQyxNQUFjLEVBQUUsTUFBYztJQUMvQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ2xCLE9BQU8sRUFBRTthQUNOLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdkQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0gseUJBQXlCO0lBQ3pCLDZFQUE2RTtJQUM3RSxLQUFLO0FBQ1AsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxNQUFjLEVBQUUsTUFBYztJQUNoRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ2xCLE9BQU8sRUFBRTthQUNOLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDeEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0gsZ0RBQWdEO0FBQ2xELENBQUM7QUFFRCwrQkFBK0I7QUFDbEIsb0JBQVksR0FBRyxTQUFTLENBQUM7QUFHdEM7Ozs7Ozs7R0FPRztBQUNILFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQWtCO0lBQ3ZDLHlDQUF5QztJQUN6QyxnRUFBZ0U7SUFDaEUsc0NBQXNDO0lBQ3RDLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxnQ0FBZ0M7SUFDaEMsT0FBTyxTQUFTLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBUyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBa0I7SUFDekMsdUJBQXVCO0lBQ3ZCLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxnRUFBZ0U7SUFDaEUscUNBQXFDO0lBQ3JDLE1BQU07SUFDTixPQUFPLFNBQVMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQVMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQWtCO0lBQzFDLE1BQU0sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUMxRCxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxDQUFDO0lBQ2xCLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2pCLE9BQU8sMEJBQVEsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFDLENBQUM7SUFDakIsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakIsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUM7QUFDSixDQUFDO0FBQ0QsU0FBUyxZQUFZLENBQUMsQ0FBQztJQUNyQixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQixPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFDRCxRQUFRO0FBQ1IsU0FBUyxRQUFRLENBQ2YsTUFBYSxFQUNiLE9BQW9CLEVBQ3BCLFVBQTBEO0lBRTFELFFBQVEsQ0FBQztJQUNULE1BQU0sQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDM0IsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUF1QixHQUFHLElBQVc7UUFDdEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUdELE1BQU0sS0FBSztJQUNULFlBQXNCLENBQUMsRUFBWSxDQUFDLEVBQVksQ0FBQztRQUEzQixNQUFDLEdBQUQsQ0FBQztRQUFZLE1BQUMsR0FBRCxDQUFDO1FBQVksTUFBQyxHQUFELENBQUM7UUFDdkMsVUFBSyxHQUFlLEVBQUUsQ0FBQztRQUNqQyxtQ0FBbUM7UUFFekIsYUFBUSxHQUFhLEtBQUssQ0FBQztJQUplLENBQUM7SUFLckQ7OztPQUdHO0lBQ08sZUFBZTtRQUN2QixPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0Qsa0JBQWtCO0lBQ1gsU0FBUyxDQUFDLENBQVM7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ00sUUFBUSxDQUFDLENBQVM7UUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ00sWUFBWSxDQUFDLENBQVM7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ00sU0FBUztRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVNLE1BQU07UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFTSxHQUFHO1FBQ1IsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFDTSxTQUFTLENBQUksSUFBb0I7UUFDdEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUFuQkM7SUFBQyxRQUFROzs7O2lDQUdSO0FBQ0Q7SUFBQyxRQUFROzs7O21DQUdSO0FBQ0Q7SUFBQyxRQUFROzs7O29DQUdSO0FBVUg7Ozs7O0dBS0c7QUFDSCxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDbEIsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFJRCxTQUFTLEtBQUssQ0FBQyxFQUFlO0lBQzVCLCtCQUErQjtJQUMvQixrQkFBa0I7SUFDbEIsNkNBQTZDO0lBQzdDLElBQUksR0FBRyxHQUFHLEVBQUU7U0FDVCxRQUFRLENBQUM7UUFDUixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDVixDQUFDO1NBQ0QsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2QsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFnQixDQUFDO0lBQ2pDLE9BQU87SUFDUCxtREFBbUQ7SUFDbkQsU0FBUztJQUNULE1BQU07SUFDTixJQUFJLENBQUMsR0FBRyw0QkFBVSxFQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxvQkFBWSxDQUFDLENBQUM7SUFDNUMsVUFBVTtJQUNWLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLElBQUk7SUFDSixJQUFJO0lBQ0osU0FBUztJQUNULGNBQWM7SUFDZCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ3JCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsSUFBaUIsS0FBSyxDQXNEckI7QUF0REQsV0FBaUIsS0FBSztJQUNwQixNQUFNO0lBQ04sc0VBQXNFO0lBQ3RFLHlDQUF5QztJQUN6Qyx5QkFBeUI7SUFDekIsMENBQTBDO0lBQzFDLHVDQUF1QztJQUN2QyxTQUFnQixLQUFLLENBQUMsSUFBYztRQUNsQyxNQUFNO1FBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixnQkFBZ0I7UUFDaEIsTUFBTTtRQUNOLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNCLHVEQUF1RDtRQUN2RCxtQkFBbUI7SUFDckIsQ0FBQztJQVRlLFdBQUssUUFTcEI7SUFFRCxTQUFnQixTQUFTLENBQUMsSUFBYztRQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQVRlLGVBQVMsWUFTeEI7SUFFRCxTQUFnQixNQUFNLENBQUMsSUFBYztRQUNuQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFIZSxZQUFNLFNBR3JCO0lBRUQsU0FBZ0IsS0FBSyxDQUFDLElBQWM7UUFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFIZSxXQUFLLFFBR3BCO0lBRUQsU0FBZ0IsV0FBVyxDQUFDLElBQWM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFOZSxpQkFBVyxjQU0xQjtJQUVELFNBQWdCLFdBQVcsQ0FBQyxJQUFjO1FBQ3hDLGdCQUFnQjtRQUNoQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxQixLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBTmUsaUJBQVcsY0FNMUI7QUFDSCxDQUFDLEVBdERnQixLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFzRHJCO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFnQixhQUFhLENBQzNCLEVBQWUsRUFDZixRQUFrQyxLQUFLLENBQUMsS0FBSyxFQUM3QyxVQUFVLEdBQUcsS0FBSztJQUVsQix1Q0FBdUM7SUFDdkMsZ0RBQWdEO0lBQ2hELFlBQVk7SUFDWixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNyQixJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNmLFdBQVc7UUFDWCxJQUFJLEdBQUcsR0FBRywrQkFBYSxFQUFDLENBQWdCLENBQUMsQ0FBQztRQUMxQyxFQUFFO1FBQ0YsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztJQUNILFVBQVU7SUFDVixJQUFJLFVBQVU7UUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQXJCRCxzQ0FxQkM7QUFJRCxzREFBc0Q7QUFDdEQsb0JBQW9CO0FBRXBCLDZDQUE2QztBQUM3QyxzQ0FBc0M7QUFDdEMsV0FBVztBQUNYLDJCQUEyQjtBQUMzQixrQkFBa0I7QUFDbEIsc0NBQXNDO0FBQ3RDLHVCQUF1QjtBQUN2QixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVuQyxTQUFTLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQztJQUMxQixLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUN6QixNQUFNLEVBQUU7WUFDTixFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDZixVQUFVLEVBQUUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQyxVQUFVLEVBQUUsQ0FBQztnQkFDYixPQUFPLEVBQUUsRUFBRTtnQkFDWCxVQUFVLEVBQUUsTUFBTTthQUNuQixDQUFDO1lBQ0YsRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7Z0JBQ3hCLFVBQVUsRUFBRSxDQUFDO2dCQUNiLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFVBQVUsRUFBRSxNQUFNO2FBQ25CLENBQUM7WUFDRixFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7WUFDcEUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztTQUN6RDtLQUNGLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDYixTQUFTLEVBQUUsU0FBUztRQUNwQixJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUI7UUFDbkMsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO0tBQ3RCLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQ1QsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUVWLFNBQWdCLFFBQVEsQ0FBQyxFQUFlLEVBQUUsR0FBZ0I7SUFDeEQsc0JBQXNCO0lBQ3RCLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRCxxQkFBcUI7QUFDdkIsQ0FBQztBQVBELDRCQU9DO0FBRUQsSUFBSSxNQUFNLENBQUM7QUFFWCxTQUFzQixLQUFLLENBQUMsS0FBSzs7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixNQUFNLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQiwyQ0FBMkM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLElBQUksSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2hDLE1BQU0sRUFBRSxDQUFDO1lBQ1QsU0FBUyxFQUFFO2dCQUNULFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSTtvQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEtBQUssT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ1osRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNSLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDVixDQUFDO0NBQUE7QUF2QkQsc0JBdUJDO0FBRUQsU0FBZ0IsU0FBUyxDQUFDLE1BQW1CO0lBQzNDLGlCQUFpQjtJQUNqQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNyQixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFnQixDQUFDO1FBQzFFLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUMxQyxLQUFLO1FBQ0wsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEMsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBa0IsQ0FBQztBQUM1QixDQUFDO0FBWEQsOEJBV0M7Ozs7Ozs7Ozs7OztBQ25hRCxlOzs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGUiLCJmaWxlIjoiY29tbW9uc35tYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiByYW5kaW50KG1heDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KSAlIG1heDtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsYXkobWlzKXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSk9PntcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0sIG1pcyk7XHJcbiAgICB9KSAgIFxyXG59XHJcblxyXG5cclxuLy/ku79weXRob27ln7rnoYDorr7mlr1cclxuZXhwb3J0IGZ1bmN0aW9uICpyYW5nZShzdGFydDpudW1iZXIsc3BhY2U/Om51bWJlcixlbmQ/Om51bWJlcik6SXRlcmFibGU8bnVtYmVyPntcclxuICAgIC8v5YWB6K64IHJhbmdlKGEsYyxiKSByYW5nZShiKSByYW5nZShhLGIpXHJcbiAgICBpZihzcGFjZT09bnVsbCYmZW5kPT1udWxsKXtcclxuICAgICAgICAvLzFcclxuICAgICAgICB5aWVsZCogcmFuZ2UoMCwxLHN0YXJ0KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZW5kPT1udWxsKXtcclxuICAgICAgICAvLzJcclxuICAgICAgICB5aWVsZCogcmFuZ2Uoc3RhcnQsMSxzcGFjZSk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIC8vM1xyXG4gICAgICAgIGZvcihsZXQgaT1zdGFydDtpPGVuZDtpKz1zcGFjZSl7XHJcbiAgICAgICAgICAgIHlpZWxkIGk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIGVudW1lcmF0ZTxUPihhcnJheWxpa2U6SXRlcmFibGU8VD4pOkl0ZXJhYmxlPFtudW1iZXIsVF0+e1xyXG4gICAgbGV0IG5vdz0wO1xyXG4gICAgZm9yKGxldCBhIG9mIGFycmF5bGlrZSl7XHJcbiAgICAgICAgeWllbGQgW25vdysrLGFdXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbnkoYXJyYXlsaWtlOkl0ZXJhYmxlPGFueT4pXHJcbntcclxuICAgIGZvcihsZXQgYSBvZiBhcnJheWxpa2Upe1xyXG4gICAgICAgIGlmKGEpIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhbGwoYXJyYXlsaWtlOkl0ZXJhYmxlPGFueT4pXHJcbntcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByaW50KGRhdGE6YW55KXtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiAqemlwKC4uLmFycmF5bGlrZXM6SXRlcmFibGU8YW55PltdKXtcclxuICAgIGxldCBpdG9ycz1hcnJheWxpa2VzLm1hcCh2PT52W1N5bWJvbC5pdGVyYXRvcl0oKSk7XHJcbiAgICBmb3IoOzspe1xyXG4gICAgICAgIC8v5a+55omA5pyJaXRvcuWPlm5leHQg5aaC5p6c5YWo6YOo5oiQ5Yqf5YiZeWllbGQg5ZCm5YiZ6L+U5ZueXHJcbiAgICAgICAgbGV0IHJlc3M9aXRvcnMubWFwKHY9PnYubmV4dCgpKTtcclxuICAgICAgICAvLyBwcmludChyZXNzKTtcclxuICAgICAgICAvL+WmguaenOacieS4gOS4que7k+adn1xyXG4gICAgICAgIGlmKGFueShyZXNzLm1hcCh2PT52LmRvbmUpKSl7XHJcbiAgICAgICAgICAgIC8v6L+U5ZueXHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeWllbGQgcmVzcy5tYXAodj0+di52YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuLy/ln7rmnKzmk43kvZxcclxuZXhwb3J0IGZ1bmN0aW9uIHNodWZmbGU8VD4oYXJsOkl0ZXJhYmxlPFQ+KTpUW117XHJcbiAgICBsZXQgYT1saXN0KGFybCk7XHJcbiAgICBsZXQgcj1uZXcgQXJyYXkobGVuKGEpKTtcclxuICAgIGZvcihsZXQgdCBvZiBhKXtcclxuICAgICAgICAvL+maj+acuuWhq+epulxyXG4gICAgICAgIGxldCBpZHg9cmFuZGludChsZW4oYSkpO1xyXG4gICAgICAgIHJbaWR4XT10O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRlZDxUPihhcmw6SXRlcmFibGU8VD4sa2V5Oih2OlQpPT5udW1iZXI9bnVsbCl7XHJcbiAgICBsZXQgcmV0PWxpc3QoYXJsKS5zb3J0KChhLGIpPT57XHJcbiAgICAgICAgbGV0IFtrLGtrXT1ba2V5KGEpLGtleShiKV1cclxuICAgICAgICByZXR1cm4gay1raztcclxuICAgIH0pXHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBieUlkeDxUPihhcmw6SXRlcmFibGU8VD4saWR4czpudW1iZXJbXSl7XHJcbiAgICBsZXQgbD1saXN0KGFybCk7XHJcbiAgICBsZXQgcmV0PWlkeHMubWFwKHY9Pmxbdl0pO1xyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG4vL+S4jeaUvuWbnumHh+agt1xyXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdDxUPihhcmw6SXRlcmFibGU8VD4sY291bnQ6bnVtYmVyKTpUW117XHJcbiAgICAvL+S7juS4gOS4quWIl+ihqOS4remHh+agtyDkuI3mlL7lm55cclxuICAgIGxldCBhPWxpc3QoYXJsKTtcclxuICAgIGxldCBpZHg9c2h1ZmZsZShyYW5nZShsZW4oYSkpKS5zbGljZSgwLGNvdW50KTtcclxuICAgIHByaW50KGlkeCk7XHJcbiAgICByZXR1cm4gYnlJZHgoYSxpZHgpO1xyXG59XHJcbi8v5pyJ5pS+5Zue6YeH5qC3XHJcbmV4cG9ydCBmdW5jdGlvbiBzYW1wbGU8VD4oYXJsOkl0ZXJhYmxlPFQ+LGNvdW50Om51bWJlcik6VFtde1xyXG4gICAgLy/ku47kuIDkuKrliJfooajkuK3ph4fmoLcg5pyJ5pS+5ZueXHJcbiAgICBsZXQgYT1saXN0KGFybCk7XHJcbiAgICBsZXQgaWR4PWxpc3QocmFuZ2UobGVuKGEpKSkubWFwKHY9PnJhbmRpbnQobGVuKGEpKSk7XHJcbiAgICByZXR1cm4gYnlJZHgoYSxpZHgpO1xyXG59XHJcbi8v5pWw5a2mXHJcbmV4cG9ydCBsZXQgbWluPU1hdGgubWluO1xyXG5leHBvcnQgbGV0IG1heD1NYXRoLm1heDtcclxuXHJcbi8qKlxyXG4gKiDmj5LlhaVcclxuICogQHBhcmFtIGFybCDmlbDnu4RcclxuICogQHBhcmFtIHBvaW50IOaPkuWFpeS9jee9riDmj5LlhaXliLDov5nkuKrkvY3nva7nmoTlhYPntKDliY3pnaIg5Li6IDAtbGVuKGFybCkg55qE5YC8XHJcbiAqIEBwYXJhbSB2YWwg5o+S5YWl5YC8XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0PFQ+KGFybDpJdGVyYWJsZTxUPixwb2ludDpudW1iZXIsdmFsOlQpOlRbXXtcclxuICAgIGxldCBuZXdhcj1bXVxyXG4gICAgbGV0IGE9bGlzdChhcmwpO1xyXG4gICAgYS5mb3JFYWNoKCh2LGlkeCk9PntcclxuICAgICAgICBpZihwb2ludD09aWR4KSBuZXdhci5wdXNoKHZhbCk7XHJcbiAgICAgICAgbmV3YXIucHVzaCh2KTtcclxuICAgIH0pO1xyXG4gICAgaWYobGVuKGEpPT1wb2ludCkgbmV3YXIucHVzaCh2YWwpO1xyXG4gICAgcmV0dXJuIG5ld2FyO1xyXG59XHJcblxyXG4vL+WfuuacrOaVsOaNrlxyXG5pbnRlcmZhY2UgQXNJbnR7XHJcbiAgICB0b0ludCgpOm51bWJlcjtcclxufVxyXG5pbnRlcmZhY2UgQXNGbG9hdHtcclxuICAgIHRvRmxvYXQoKTpudW1iZXI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGludChvdGhlcjpzdHJpbmd8bnVtYmVyfEFzSW50KXtcclxuICAgIGlmKHR5cGVvZiBvdGhlcj09XCJzdHJpbmdcIikgcmV0dXJuIHBhcnNlSW50KG90aGVyKTtcclxuICAgIGVsc2UgaWYodHlwZW9mIG90aGVyPT1cIm51bWJlclwiKSByZXR1cm4gb3RoZXJ8MDtcclxuICAgIGVsc2UgaWYoXCJ0b0ludFwiIGluIG90aGVyKXtcclxuICAgICAgICByZXR1cm4gb3RoZXIudG9JbnQoKVxyXG4gICAgfWVsc2UgcmV0dXJuIDA7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cihuKXtcclxuICAgIHJldHVybiBuZXcgTnVtYmVyKG4pLnRvU3RyaW5nKCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGZsb2F0KG90aGVyOnN0cmluZ3xudW1iZXJ8QXNGbG9hdCl7XHJcbiAgICBpZih0eXBlb2Ygb3RoZXI9PVwic3RyaW5nXCIpIHJldHVybiBwYXJzZUZsb2F0KG90aGVyKTtcclxuICAgIGVsc2UgaWYodHlwZW9mIG90aGVyPT1cIm51bWJlclwiKSByZXR1cm4gb3RoZXI7XHJcbiAgICBlbHNlIGlmKFwidG9GbG9hdFwiIGluIG90aGVyKXtcclxuICAgICAgICByZXR1cm4gb3RoZXIudG9GbG9hdCgpXHJcbiAgICB9ZWxzZSByZXR1cm4gMDtcclxufVxyXG4vL+aVsOaNruWuueWZqOaehOmAoOWMuuWfn1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxpc3Q8VD4oaXRlcj86SXRlcmFibGU8VD4pOkFycmF5PFQ+e1xyXG4gICAgaWYoaXRlcj09bnVsbCkgcmV0dXJuIGxpc3QoW10pO1xyXG4gICAgbGV0IHJldD1bXVxyXG4gICAgZm9yKGxldCBhIG9mIGl0ZXIpe1xyXG4gICAgICAgIHJldC5wdXNoKGEpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcbi8v6J6N5ZCI5a+56LGhIFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvT2JqKG1hcDpNYXA8YW55LGFueT4pe1xyXG4gICAgLy9cclxuICAgIGxldCByPW5ldyBQcm94eTxhbnk+KHt9LHtcclxuICAgICAgICBnZXQodGFyZ2V0LHA6YW55LHJlY2VpdmVyKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcC5nZXQocCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQodGFyZ2V0LHA6YW55LHZhbHVlLHJlY2VpdmUpe1xyXG4gICAgICAgICAgICBtYXAuc2V0KHAsdmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhcyh0YXJnZXQscDphbnkpe1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwLmhhcyhwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbGV0ZVByb3BlcnR5ICh0YXJnZXQsIHApOiBib29sZWFue1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwLmRlbGV0ZShwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlZmluZVByb3BlcnR5ICh0YXJnZXQsIHAsIGF0dHJpYnV0ZXM6IFByb3BlcnR5RGVzY3JpcHRvcik6IGJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1hcC5zZXQocCxhdHRyaWJ1dGVzLnZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvd25LZXlzICh0YXJnZXQpOiBhbnlbXVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3QobWFwLmtleXMoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGFwcGx5ICh0YXJnZXQsIHRoaXNBcmc6IGFueSwgYXJnQXJyYXk/OiBhbnkpOiBhbnlcclxuICAgICAgICAvLyB7XHJcblxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gY29uc3RydWN0ICh0YXJnZXQsIGFyZ0FycmF5OiBhbnksIG5ld1RhcmdldD86IGFueSk6IG9iamVjdFxyXG4gICAgICAgIC8vIHtcclxuXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfSlcclxuICAgIHJldHVybiByO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBtYXA8SyxWPihhcmw6SXRlcmFibGU8W0ssVl0+KXtcclxuICAgIHJldHVybiBuZXcgTWFwPEssVj4oYXJsKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0PFQ+KGFybDpJdGVyYWJsZTxUPilcclxue1xyXG4gICAgcmV0dXJuIG5ldyBTZXQ8VD4oYXJsKTtcclxufVxyXG5cclxuLy/mlbDmja7mk43kvZxcclxuZXhwb3J0IGZ1bmN0aW9uICprZXlzPEs9YW55LFY9YW55PihvYmo6b2JqZWN0fE1hcDxLLFY+KVxyXG57XHJcbiAgICAvL+WPluWvueixoeeahGtleeaIlm1hcOeahOaJgOaciWtleSDmnprkuL5cclxuICAgIGlmKG9iaiBpbnN0YW5jZW9mIE1hcCl7XHJcbiAgICAgICAgLy/mnprkuL5cclxuICAgICAgICBmb3IobGV0IGEgb2Ygb2JqLmtleXMoKSl7XHJcbiAgICAgICAgICAgIHlpZWxkIGE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0eXBlb2Ygb2JqID09XCJvYmplY3RcIil7XHJcbiAgICAgICAgZm9yKGxldCBrIGluIG9iail7XHJcbiAgICAgICAgICAgIHlpZWxkIGs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG50eXBlIEhhc0xlbmd0aD17bGVuZ3RoOm51bWJlcn18e3NpemU6bnVtYmVyfXx7Y291bnQ6bnVtYmVyfXx7X19sZW5fXygpOm51bWJlcn07XHJcbi8v5Lul5LiL5Li66LCD55So5Y2P6K6uXHJcbmV4cG9ydCBmdW5jdGlvbiBsZW4ob2JqOkl0ZXJhYmxlPGFueT58SGFzTGVuZ3RofG9iamVjdCl7XHJcbiAgICBpZihcImxlbmd0aFwiIGluIG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iai5sZW5ndGhcclxuICAgIH1lbHNlIGlmIChcInNpemVcIiBpbiBvYmope1xyXG4gICAgICAgIHJldHVybiBvYmouc2l6ZTtcclxuICAgIH1lbHNlIGlmKFwiY291bnRcIiBpbiBvYmope1xyXG4gICAgICAgIHJldHVybiBvYmouY291bnQ7XHJcbiAgICB9ZWxzZSBpZihcIl9fbGVuX19cIiBpbiBvYmope1xyXG4gICAgICAgIHJldHVybiBvYmouX19sZW5fXygpXHJcbiAgICB9ZWxzZSBpZih0eXBlb2Ygb2JqPT1cIm9iamVjdFwiKXtcclxuICAgICAgICBsZXQgc3VtPTA7XHJcbiAgICAgICAgZm9yKGxldCBrIGluIG9iail7XHJcbiAgICAgICAgICAgIHN1bSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VtO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy8gLy/nsbvlnovlh73mlbDmiorkuIDkuKrnsbvlnovmmKDlsITkuLrlj6bkuIDkuKrnsbvlnotcclxuLy8gLy/lr7nosaHmmKDlsITlh73mlbDvvIzmiorkuIDkuKrlr7nosaHkuK3nmoTmr4/kuKrlsZ7mgKfkvb/nlKjkuIDkuKptYXBwZXLmmKDlsIRcclxuLy8gLy/pgJLlvZLlr7nosaHmmKDlsITlh73mlbDvvIzmiorkuIDkuKrlr7nosaHkuK3nmoTmiYDmnInpnZ7lr7nosaHlsZ7mgKfkvb/nlKhtYXBwZXLmmKDlsITvvIzlr7nosaHpgJLlvZLmmKDlsIRcclxuLy8gdHlwZSBNYXBwZXI8QSxCPj1bQSxCXTtcclxuLy8gdHlwZSBNYXBUbzxUIGV4dGVuZHMgTWFwcGVyPGFueSxhbnk+LEM+PUMgZXh0ZW5kcyBUWzBdPyBUWzFdOm5ldmVyO1xyXG4vLyB0eXBlIFN3aXRjaDxULCBVIGV4dGVuZHMgYW55PiA9XHJcbi8vICAgICBUIGV4dGVuZHMga2V5b2YgVSA/IFVbVF0gOiBVW1wiZGVmYXVsdFwiXTtcclxuXHJcbi8vIC8vIOiOt+WPluesrOS4gOS4quWFg+e0oFxyXG4vLyBleHBvcnQgdHlwZSBIZWFkPFQ+ID0gVCBleHRlbmRzIHsgMDogaW5mZXIgSCB9ID8gSCA6IG5ldmVyO1xyXG4vLyAvLyDnp7vpmaTnrKzkuIDkuKrlhYPntKBcclxuLy8gZXhwb3J0IHR5cGUgVGFpbDxUPiA9IChcclxuLy8gICAgICguLi5hOiBUIGV4dGVuZHMgYW55W10gPyBUIDogbmV2ZXIpID0+IHZvaWRcclxuLy8gKSBleHRlbmRzIChhOiBhbnksIC4uLmI6IGluZmVyIFIpID0+IHZvaWQgPyBSIDogbmV2ZXI7XHJcbi8vIGV4cG9ydCB0eXBlIFVuc2hpZnQ8VCwgQT4gPSAoXHJcbi8vICAgICAoYTogQSwgLi4uYjogVCBleHRlbmRzIGFueVtdID8gVCA6IG5ldmVyKSA9PiB2b2lkXHJcbi8vICkgZXh0ZW5kcyAoLi4uYTogaW5mZXIgUikgPT4gdm9pZCA/IFIgOiBuZXZlcjtcclxuLy8gLy8g5Zyo5bC+6YOo5Yqg5YWl5LiA5Liq5YWD57SgXHJcbi8vIGV4cG9ydCB0eXBlIENvcHk8VCwgUyBleHRlbmRzIGFueT4gPSB7IFtQIGluIGtleW9mIFRdOiBTW1BdIH07XHJcbi8vIGV4cG9ydCB0eXBlIFB1c2g8VCwgQT4gPSBDb3B5PFVuc2hpZnQ8VCwgYW55PiwgVCAmIFJlY29yZDxzdHJpbmcsIEE+PjtcclxuXHJcblxyXG5cclxuLy8gdHlwZSBNdWx0aU1hcFRvPFQgZXh0ZW5kcyBhbnlbXSxDLGs9XCJzdHVmZlwiPj1UW1wibGVuZ3RoXCJdIGV4dGVuZHMgMD8gTWFwVG88VFswXSxDPjpcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQyBleHRlbmRzIFRbMF1bMF0/IFRbMF1bMV06U3dpdGNoPGsse1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R1ZmY6TXVsdGlNYXBUbzxUYWlsPFQ+LEMsaz5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfT47XHJcblxyXG4vLyB0eXBlIE9iamVjdFR5cGVNYXA8QyBleHRlbmRzIE1hcHBlcjxhbnksYW55PltdLFQgZXh0ZW5kcyBvYmplY3Q+PXtbUCBpbiBrZXlvZiBUXTpNdWx0aU1hcFRvPEMsVFtQXT59O1xyXG5cclxuLy8gLy/lrp7njrDpgJLlvZLmgKcg5bCa5pyq5a6e546wXHJcbi8vIHR5cGUgT2JqZWN0TWFwcGVyPFQgZXh0ZW5kcyBvYmplY3QsQyBleHRlbmRzIE1hcHBlcjxhbnksIGFueT5bXT49W1QsT2JqZWN0VHlwZU1hcDxDLFQ+XVxyXG5cclxuLy8gdHlwZSBzPVtbbnVtYmVyLHN0cmluZ10sW3N0cmluZyxudW1iZXJdLE9iamVjdE1hcHBlcjxvYmplY3Qscz5dO1xyXG4vLyB0eXBlIG89e1xyXG4vLyAgICAgYTpzdHJpbmcsXHJcbi8vICAgICBiOm51bWJlcixcclxuLy8gICAgIGM6e1xyXG4vLyAgICAgICAgIGQ6c3RyaW5nLFxyXG4vLyAgICAgICAgIGU6bnVtYmVyXHJcbi8vICAgICB9XHJcbi8vIH07XHJcbi8vIHR5cGUgcj1PYmplY3RUeXBlTWFwPHMsbz47XHJcblxyXG5cclxuLy8gLy/lgLzljJbnsbvlnovlrprkuYlcclxuXHJcbi8vIC8v57G75Z6L5Yik5pat55SoXHJcbi8vIHR5cGUgVHlwZVJlcDxULFY9c3RyaW5nPj17XHJcbi8vICAgICB2YWx1ZTpWLFxyXG4vLyAgICAgdHlwZTpUXHJcbi8vIH07XHJcbi8vIC8v56iL5bqP55So55qEXHJcbi8vIGxldCB0eXBlX2FycmF5PVwiYXJyYXlcIjtcclxuLy8gbGV0IHR5cGVfbnVtYmVyPVwibnVtYmVyXCI7XHJcbi8vIGxldCB0eXBlX3N0cmluZz1cInN0cmluZ1wiO1xyXG4vLyAvL+WAvOmDqOWIhlxyXG5cclxuLy8gZnVuY3Rpb24gZ2V0YXJyYXk8VD4odmFsdWU6VCk6VHlwZVJlcDxcImFycmF5XCIsVD57XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIHZhbHVlOnZhbHVlLFxyXG4vLyAgICAgICAgIHR5cGU6XCJhcnJheVwiXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZnVuY3Rpb24gZ2V0bnVtYmVyPFQ+KHZhbHVlOlQpOlR5cGVSZXA8XCJudW1iZXJcIixUPntcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgdmFsdWU6dmFsdWUsXHJcbi8vICAgICAgICAgdHlwZTpcIm51bWJlclwiXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gZnVuY3Rpb24gZ2V0c3RyaW5nPFQ+KHZhbHVlOlQpOlR5cGVSZXA8XCJzdHJpbmdcIixUPntcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgdmFsdWU6dmFsdWUsXHJcbi8vICAgICAgICAgdHlwZTpcInN0cmluZ1wiXHJcbi8vICAgICB9XHJcbi8vIH1cclxuLy8gLy/mmKDlsITpg6jliIZcclxuLy8gLy/mmKDlsITlmahcclxuLy8gdHlwZSBSZXBNYXA8QSxCPj1NYXBwZXI8VHlwZVJlcDxBPixCPjtcclxuLy8gLy/nsbvlnovmmKDlsITlmahcclxuLy8gdHlwZSBSZXBNYXBwZXJzPVtSZXBNYXA8XCJzdHJpbmdcIixzdHJpbmc+LFxyXG4vLyAgICAgICAgICAgICAgICAgUmVwTWFwPFwibnVtYmVyXCIsbnVtYmVyPixcclxuLy8gICAgICAgICAgICAgICAgIFJlcE1hcDxcImFycmF5XCIsYW55W10+XVxyXG5cclxuLy8gLy/mmKDlsIRyZXDnsbvlnovliLDmraPluLjnsbvlnotcclxuLy8gdHlwZSBFeHRyYWN0PFJlcD49TXVsdGlNYXBUbzxSZXBNYXBwZXJzLFJlcD47XHJcbi8vIC8v5pig5bCEbW9kZWwg5YiwIHBhcnNl5ZCO57G75Z6LXHJcbi8vIHR5cGUgTWFwTW9kZWw8TW9kZWxUeXBlIGV4dGVuZHMge1tQIGluIGtleW9mIE1vZGVsVHlwZV06VHlwZVJlcDxhbnk+fT49T2JqZWN0VHlwZU1hcDxSZXBNYXBwZXJzLE1vZGVsVHlwZT5cclxuXHJcbi8vIGxldCBtb2RlbD17XHJcbi8vICAgICB0aXRsZTpnZXRzdHJpbmcoXCIudGl0bGVcIiksXHJcbi8vICAgICBsaXN0OmdldGFycmF5KFwiLmFycmF5XCIpXHJcbi8vIH1cclxuLy8gdHlwZSBhPU1hcE1vZGVsPHR5cGVvZiBtb2RlbD47XHJcbi8vIGZ1bmN0aW9uIHBhcnNlKGJvZHksbW9kZWw6b2JqZWN0KTpNYXBNb2RlbDx0eXBlb2YgbW9kZWw+e1xyXG4vLyAgICAgcmV0dXJuIG51bGw7XHJcbi8vIH1cclxuIiwiaW1wb3J0ICogYXMgdGYgZnJvbSBcIkB0ZW5zb3JmbG93L3RmanNcIlxyXG5pbXBvcnQgeyByZXZlcnNlQm9vbCwgZXF1YWxNYXAsIGV4cGFuZFRvNEQgfSBmcm9tICcuL21hdHJpeF90b29sJztcclxuaW1wb3J0IHtkZWJ1Z30gZnJvbSBcIndlYnBhY2tcIjtcclxuaW1wb3J0IHtkZWZhdWx0RHR5cGV9IGZyb20gXCIuL3J1bGVzL21hdHJpeF9ydWxlc1wiO1xyXG5leHBvcnQgY2xhc3MgRHJhdyB7XHJcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIHRjdHg6IE9mZnNjcmVlbkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIG9mZjogT2Zmc2NyZWVuQ2FudmFzO1xyXG4gICAgaDogbnVtYmVyO1xyXG4gICAgdzogbnVtYmVyO1xyXG4gICAgLy9waXhlZHNpemVcclxuICAgIHBpeGVsc2l6ZTpbbnVtYmVyLG51bWJlcl07XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlOiBIVE1MQ2FudmFzRWxlbWVudCwgcHVibGljIHJzOiBudW1iZXIsIHB1YmxpYyBjczogbnVtYmVyKSB7XHJcbiAgICAgICAgLy/ov5nph4zlvpfliLAyZCDkuIrkuIvmlocg6K6h566X5qC85a2Q5aSn5bCPXHJcbiAgICAgICAgbGV0IGN0eCA9IGVsZS5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgdGhpcy5jdHggPSBjdHg7XHJcbiAgICAgICAgLy/orqHnrpfmoLzlrZDlpKflsI9cclxuICAgICAgICB0aGlzLmggPSBlbGUuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMudyA9IGVsZS53aWR0aDtcclxuICAgICAgICB0aGlzLmNoID0gdGhpcy5oIC8gcnM7XHJcbiAgICAgICAgdGhpcy5jdyA9IHRoaXMudyAvIGNzO1xyXG4gICAgICAgIC8vY2FjaGVcclxuICAgICAgICB0aGlzLm9mZiA9IG5ldyBPZmZzY3JlZW5DYW52YXModGhpcy53LCB0aGlzLmgpO1xyXG4gICAgICAgIHRoaXMudGN0eCA9IHRoaXMub2ZmLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucGl4ZWxzaXplPVt0aGlzLmNoLHRoaXMuY3ddO1xyXG4gICAgICAgIHRoaXMudXBzYW1wbGU9dGYubGF5ZXJzLnVwU2FtcGxpbmcyZCh7c2l6ZTp0aGlzLnBpeGVsc2l6ZSxkdHlwZTpkZWZhdWx0RHR5cGV9KTtcclxuICAgIH1cclxuICAgIGNoOiBudW1iZXI7XHJcbiAgICBjdzogbnVtYmVyO1xyXG4gICAgcHVibGljIGRyYXdQb2ludCh4LCB5LCBjOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcng6IG51bWJlciwgcnk6IG51bWJlcjtcclxuICAgICAgICByeCA9IHggKiB0aGlzLmN3O1xyXG4gICAgICAgIHJ5ID0geSAqIHRoaXMuY2g7XHJcbiAgICAgICAgLy/nu5jliLYgPz8/XHJcbiAgICAgICAgdGhpcy50Y3R4LmZpbGxTdHlsZSA9IGM7XHJcbiAgICAgICAgdGhpcy50Y3R4LmZpbGxSZWN0KHJ4LCByeSwgdGhpcy5jdywgdGhpcy5jaCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOeUqOS6jue7mOWItjAx55+p6Zi1IOeUqOafkOS4quminOiJsuihqOekujFcclxuICAgICAqIOi/mOmcgOimgee7mOWItuS4jeWQjOWbvuWxgueahOaWueW8jyDlpoLnlKjmn5Dkupvlj6bkuIDkupvpopzoibLooajnpLrlj6bkuIDkupvkuJzopb8g54S25ZCO5Y+g5YqgXHJcbiAgICAgKiDov5jpnIDopoHlj6/ku6Xnu5jliLblrp7mlbDnn6npmLXnmoTlh73mlbBcclxuICAgICAqIEBwYXJhbSB0cyAwMeefqemYtVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZHJhdzJEKHRzOiB0Zi5UZW5zb3IyRCkge1xyXG4gICAgICAgIC8vIHRoaXMudGN0eC5jbGVhclJlY3QoMCwwLHRoaXMudyx0aGlzLmgpO1xyXG4gICAgICAgIC8vIHRoaXMudGN0eC5maWxsU3R5bGUgPSBcIiNmZmZmZmZcIjtcclxuICAgICAgICAvLyB0aGlzLnRjdHguZmlsbFJlY3QoMCwgMCwgdGhpcy53LCB0aGlzLmgpO1xyXG4gICAgICAgIC8v5rOVMVxyXG4gICAgICAgIGxldCByZ2JtYXQ9YXdhaXQgdGhpcy50b3JnYih0cyk7ICAvLzAgZmZmZmZmZmYgMSAwMDAwMDAwMFxyXG5cclxuXHJcbiAgICAgICAgLy8gbGV0IGltZz10aGlzLnRjdHgucHV0SW1hZ2VEYXRhKHJnYm1hdCwwLDApO1xyXG4gICAgICAgIC8v5rOVMlxyXG4gICAgICAgIC8vIGxldCBhcnIgPSBhd2FpdCB0cy5kYXRhKCk7XHJcbiAgICAgICAgLy8gYXJyLmZvckVhY2goKHYsIGkpID0+IHtcclxuICAgICAgICAvLyAgICAgLy/nu5jliLYgMOe0ouW8leWvueW6lOWIl1xyXG4gICAgICAgIC8vICAgICBsZXQgYSA9IFssIFwiI2ZmMDAwMFwiXTtcclxuICAgICAgICAvLyAgICAgaWYgKHYgPT0gMSlcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuZHJhd1BvaW50KGkldHMuc2hhcGVbMF0sTWF0aC5mbG9vcihpL3RzLnNoYXBlWzBdKSwgYVsxXSk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gdGhpcy50Y3R4LmZpbGwoKTtcclxuICAgICAgICAvL+e7mOWItuWIsOeUu+W4g1xyXG4gICAgICAgIC8vIHRoaXMuY3R4LmNsZWFyUmVjdCgwLDAsdGhpcy53LHRoaXMuaCk7XHJcbiAgICAgICAgLy8gdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMub2ZmLCAwLCAwKTtcclxuICAgICAgICB0aGlzLmN0eC5wdXRJbWFnZURhdGEocmdibWF0LDAsMCk7XHJcbiAgICAgICAgLy8gdGhpcy5jdHguc2NhbGUoNCw0KVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cHNhbXBsZTogdGYubGF5ZXJzLkxheWVyO1xyXG4gICAgYXN5bmMgdG9yZ2IodDp0Zi5UZW5zb3IyRCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/mqKrnurXmianlsZU05YCNIOaLieS8uFxyXG4gICAgICAgIC8vIGZ1bmN0aW9uIGhvcmV4cGFuZCh0OnRmLlRlbnNvcjJELHY9NCk6dGYuVGVuc29yMkR7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiB0LmV4cGFuZERpbXMoMikudGlsZShbMSwxLHZdKS5yZXNoYXBlKFt0LnNoYXBlWzBdLHQuc2hhcGVbMV0qdl0pXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGZ1bmN0aW9uIHZvcmV4cGFuZCh0OnRmLlRlbnNvcjJELHY9NCk6dGYuVGVuc29yMkR7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBob3JleHBhbmQodC50cmFuc3Bvc2UoKSx2KS50cmFuc3Bvc2UoKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGxldCBudW09dGYudGlkeSgoKT0+e1xyXG4gICAgICAgICAgICAvL2ludDMyIOeEtuWQjsOX5LiA5Liq6aKc6ImyXHJcbiAgICAgICAgICAgIGxldCBjb2xvcmVkPXQubXVsKDB4ZmYwMDAwZmZ8MCkgYXMgdHlwZW9mIHQ7XHJcbiAgICAgICAgICAgIC8vIGxldCByZXNpemVkPXZvcmV4cGFuZChob3JleHBhbmQoY29sb3JlZCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHI9dGhpcy5waXhlbHNpemVbMF09PXRoaXMucGl4ZWxzaXplWzBdJiZ0aGlzLnBpeGVsc2l6ZVswXT09MT8gZXhwYW5kVG80RChjb2xvcmVkKTp0aGlzLnVwc2FtcGxlLmNhbGwoZXhwYW5kVG80RChjb2xvcmVkKSx7fSkgYXMgdGYuVGVuc29yNEQ7XHJcbiAgICAgICAgICAgIGxldCByZXNpemVkPXIuc3F1ZWV6ZShbMCwzXSkgYXMgdGYuVGVuc29yMkQ7XHJcbiAgICAgICAgICAgIC8v6L+b6KGMcmdiYeivnSDmqKrlkJHmianlsZU05YCNXHJcbiAgICAgICAgICAgIC8vIGxldCByZ2I9aG9yZXhwYW5kKHJlc2l6ZWQsNCk7XHJcbiAgICAgICAgICAgIC8v6aKc6Imy5aSE55CGIOaKijEgMSAxIDHnmoTov57nu6005LiqIOWPmOS4uiBhYWFhYWFhYVxyXG4gICAgICAgICAgICAvLyBsZXQgY29yPXJnYi5tdWwoMHhhYSk7XHJcbiAgICAgICAgICAgIGxldCBudW09cmVzaXplZC5hc1R5cGUoXCJpbnQzMlwiKTtcclxuICAgICAgICAgICAgLy8gbGV0IG51bT1yZXNpemVkO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAvL251bei9rOaNouS4unVpbnQ4XHJcbiAgICAgICAgbGV0IGFyPWF3YWl0IG51bS5kYXRhKCk7XHJcbiAgICAgICAgbGV0IHBpeGVkcz1uZXcgVWludDhDbGFtcGVkQXJyYXkoYXIuYnVmZmVyKTtcclxuICAgICAgICBudW0uZGlzcG9zZSgpO1xyXG4gICAgICAgIHJldHVybiBuZXcgSW1hZ2VEYXRhKHBpeGVkcyxudW0uc2hhcGVbMV0sbnVtLnNoYXBlWzBdKTtcclxuICAgIH1cclxufVxyXG5cclxuLy/mioowMeefqemYtei9rOaNouS4uuWDj+e0oOefqemYtVxyXG5jb25zdCBzaXplPVs0LDRdXHJcbiIsImltcG9ydCAqIGFzIHRmIGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCI7XHJcbmltcG9ydCB7IGRlbGF5LCBmbG9hdCwgaW50LCByYW5kaW50LCByYW5nZSwgc3RyIH0gZnJvbSBcIi4uL2xpYnMvbGliXCI7XHJcbmltcG9ydCB7IERyYXcgfSBmcm9tIFwiLi9EcmF3XCI7XHJcbi8vIGxldCBydWxlcz17XHJcbi8vICAgICBiM3MyMyxcclxuLy8gICAgIGIxczEyLFxyXG4vLyAgICAgYjM2NzhzMzQ2NzgsXHJcbi8vICAgICBiMzZzMjMsXHJcbi8vICAgICBiMzU2NzhzNTY3OFxyXG4vLyB9XHJcbmltcG9ydCB7XHJcbiAgZGVmYXVsdER0eXBlLFxyXG4gIFJ1bGUsXHJcbiAgUnVsZXMgYXMgcnVsZXMsXHJcbiAgdHJhaW4sXHJcbiAgdXNlTGF5ZXJzLFxyXG4gIHVzZU1hdHJpeFJ1bGUsXHJcbn0gZnJvbSBcIi4vcnVsZXMvbWF0cml4X3J1bGVzXCI7XHJcbmltcG9ydCBcIkB0ZW5zb3JmbG93L3RmanMtYmFja2VuZC13ZWJncHVcIjtcclxuaW1wb3J0IFwiQHRlbnNvcmZsb3cvdGZqcy1iYWNrZW5kLXdhc21cIjtcclxuXHJcbi8vIHRmLnNldEJhY2tlbmQoXCJ3ZWJnbFwiKS50aGVuKHIgPT4gKVxyXG5mdW5jdGlvbiBnZXR2YWwoaWQ6IHN0cmluZykge1xyXG4gIGxldCBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXQjJHtpZH1gKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHJldHVybiBlLnZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQ8UiBleHRlbmRzIGtleW9mIHRhYmxlPihpZDogc3RyaW5nLCB0YWc6IFIgPSBudWxsKTogdGFibGVbUl0ge1xyXG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKSBhcyB0YWJsZVtSXTtcclxufVxyXG5cclxubGV0IGEgPSBnZXQoXCJoZWxsb1wiKTtcclxuXHJcbnR5cGUgdGFibGUgPSB7XHJcbiAgb3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudDtcclxuICBkaXY6IEhUTUxEaXZFbGVtZW50O1xyXG4gIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIFwiKlwiOiBIVE1MRWxlbWVudDtcclxuICBzZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlPFQgZXh0ZW5kcyBrZXlvZiB0YWJsZSwgUiBleHRlbmRzIGtleW9mIHRhYmxlW1RdPihcclxuICB0YWc6IFQsXHJcbiAgaWQ6IHN0cmluZyxcclxuICB2YWx1ZXM6IG9iamVjdFxyXG4pOiB0YWJsZVtUXSB7XHJcbiAgbGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcbiAgdC5pZCA9IGlkO1xyXG4gIC8vXHJcbiAgZm9yIChsZXQgayBpbiB2YWx1ZXMpIHtcclxuICAgIGlmIChrIGluIHQgPT0gZmFsc2UpIGNvbnRpbnVlO1xyXG4gICAgdFtrXSA9IHZhbHVlc1trXTtcclxuICB9XHJcbiAgcmV0dXJuIHQgYXMgdW5rbm93biBhcyB0YWJsZVtUXTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFNlbGVjdGlvbigpIHtcclxuICBmb3IgKGxldCBrIGluIHJ1bGVzKSB7XHJcbiAgICBnZXQoXCJydWxlXCIpLmFwcGVuZENoaWxkKGNyZWF0ZShcIm9wdGlvblwiLCBrLCB7IGlubmVyVGV4dDogaywgdmFsdWU6IGsgfSkpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X3BhcmFtKHBhcmFtOiBzdHJpbmcpIHtcclxuICB2YXIgcXVlcnkgPSBsb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KFwiJlwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXJ5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIga3YgPSBxdWVyeVtpXS5zcGxpdChcIj1cIik7XHJcbiAgICBpZiAoa3ZbMF0gPT0gcGFyYW0pIHtcclxuICAgICAgcmV0dXJuIGt2WzFdO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuLy/mmK/lkKbpnIDopoHorq3nu4PnpZ7nu4/nvZHnu5zmtYvor5VcclxuY29uc3QgdXNldHJhaW4gPSBmYWxzZTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgY29uc3QgcyA9IFwid2ViZ2xcIjtcclxuICBjb25zdCB0ID0gYXdhaXQgdGYuc2V0QmFja2VuZChzKTtcclxuICBhbGVydChg5ZCO56uvOiR7c30ke3QgPyBcIuaIkOWKn1wiIDogXCLlpLHotKVcIn0g5L2/55So5pWw5o2u57G75Z6LOiR7ZGVmYXVsdER0eXBlfWApO1xyXG4gIGluaXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgbGV0IGVsZSA9IGdldChcImNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBsZXQgaHNpemUgPSBbMjA0OCwgMjA0OF07XHJcbiAgZWxlLmhlaWdodCA9IGhzaXplWzBdO1xyXG4gIGVsZS53aWR0aCA9IGhzaXplWzFdO1xyXG4gIGVsZS5pZCA9IFwiY3R4XCI7XHJcbiAgY29uc3QgcnNpemUgPSBnZXRfcGFyYW0oXCJyc2l6ZVwiKSA9PSBudWxsID8gMiA6IGZsb2F0KGdldF9wYXJhbShcInJzaXplXCIpKTtcclxuICBnZXQoXCJyc2l6ZVwiLCBcImlucHV0XCIpLnZhbHVlID0gcnNpemUudG9TdHJpbmcoKTtcclxuICBsZXQgc2l6ZSA9IFtoc2l6ZVswXSAvIHJzaXplLCBoc2l6ZVsxXSAvIHJzaXplXTtcclxuICBsZXQgZCA9IG5ldyBEcmF3KGVsZSwgc2l6ZVswXSwgc2l6ZVsxXSk7XHJcblxyXG4gIGxldCBpbml0ID0gKCkgPT5cclxuICAgIHRmXHJcbiAgICAgIC5yYW5kb21Vbmlmb3JtKHNpemUsIDAsIDEsIGRlZmF1bHREdHlwZSlcclxuICAgICAgLmRpdihmbG9hdChnZXR2YWwoXCJyZWxcIikpKVxyXG4gICAgICAuZmxvb3IoKVxyXG4gICAgICAuZXF1YWwoMClcclxuICAgICAgLmFzVHlwZShkZWZhdWx0RHR5cGUpIGFzIHRmLlRlbnNvcjJEO1xyXG4gIGxldCBkdCA9IGluaXQoKTtcclxuICAvL+i+k+WHulxyXG4gIGdldChcImluZm9cIikuaW5uZXJUZXh0ID0gYCR7ZHQuc2hhcGVbMF19eCR7ZHQuc2hhcGVbMV19IChoKncpIGA7XHJcbiAgZ2V0KFwiY2luZm9cIikuaW5uZXJUZXh0ID0gYCR7aHNpemVbMF19eCR7aHNpemVbMV19IChoKncpYDtcclxuXHJcbiAgZC5kcmF3MkQoZHQpO1xyXG4gIGNvbnNvbGUubG9nKGR0KTtcclxuICAvL+WBnOatouS/oeWPt1xyXG4gIGxldCBwID0gdHJ1ZTtcclxuICAvL+aYr+WQpumdmem7mOabtOaWsCDkuI3nu5jliLZcclxuICBsZXQgc2wgPSBmYWxzZTtcclxuICAvL+i9ruaVsFxyXG4gIGxldCBuID0gMDtcclxuICAvL+e7mOWItumXtOmalCDlpJrlsJHluKfnu5jliLbkuIDmrKFcclxuICBsZXQgZHJhd0ZyZXEgPSAxO1xyXG4gIC8vbG9vcCDmm7TmlrDlh73mlbAg5LuOb2xk6K6h566X5b6X5YiwbmV3KOW4p+efqemYte+8iVxyXG4gIC8v5pu05paw5Ye95pWw6buY6K6k5L2/55So55+p6Zi16KeE5YiZIGIzczIz57uP5YW455Sf5ZG95ri45oiPXHJcbiAgbGV0IHVwZGF0ZSA9IChvbGQ6IHRmLlRlbnNvcjJEKSA9PiB1c2VNYXRyaXhSdWxlKG9sZCwgcnVsZXMuYjNzMjMsIHVzZXRyYWluKTtcclxuXHJcbiAgLyoqXHJcbiAgICog6ZqP5py66K6+572u5Ye95pWwIOeUqOS7pemaj+acuua3u+WKoOeCueWIsOeUu+W4g+S4ilxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIHJhbmRvbVNldChjb3VudDogbnVtYmVyKSB7XHJcbiAgICBmb3IgKHZhciBpIG9mIHJhbmdlKDAsIGNvdW50KSkge1xyXG4gICAgICBzZXRwb2ludChyYW5kaW50KGhzaXplWzBdKSwgcmFuZGludChoc2l6ZVsxXSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Li75b6q546vIOabtOaWsOS4gOW4pyDnhLblkI7nu5jliLZcclxuICAgKi9cclxuICBhc3luYyBmdW5jdGlvbiBsb29wKCkge1xyXG4gICAgLy/ovpPlh7rlpKflsI9cclxuICAgIGxldCBkZWxheXQgPSBpbnQoZ2V0dmFsKFwiZGVsYXlcIikpO1xyXG5cclxuICAgIGZvciAoOzspIHtcclxuICAgICAgLy/pmo/mnLrmt7vliqDngrlcclxuICAgICAgLy8gcmFuZG9tU2V0KClcclxuICAgICAgLy/mraPmlodcclxuICAgICAgYXdhaXQgZGVsYXkoZGVsYXl0KTtcclxuICAgICAgbGV0IG9sZCA9IGR0O1xyXG4gICAgICBkdCA9IHVwZGF0ZShkdCk7XHJcbiAgICAgIG9sZC5kaXNwb3NlKCk7XHJcblxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhkdCk7XHJcbiAgICAgIC8v6Z2e6Z2Z6buYIOS4lCDmm7Tnu4bliLDkuobmm7TmlrDnmoTml7blgJkg6L+Z6YeM5Y+v5Lul6YCJ5oup562J5b6F57uY5Yi25a6M5oiQ5oiW6ICF5LiN562J5b6FXHJcbiAgICAgIGlmICghc2wgJiYgbiAlIGRyYXdGcmVxID09IDApIGF3YWl0IGQuZHJhdzJEKGR0KTtcclxuICAgICAgLy9cclxuICAgICAgaWYgKHApIGJyZWFrO1xyXG4gICAgICBuKys7XHJcbiAgICAgIC8v5pi+56S66L2uXHJcbiAgICAgIGdldChcIm5cIikuaW5uZXJUZXh0ID0gbi50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9ldmVudFxyXG4gIGdldChcInN0YXJ0XCIpLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAocCkge1xyXG4gICAgICBwID0gZmFsc2U7XHJcbiAgICAgIC8v6I635Y+W6KeE5YiZXHJcbiAgICAgIGxldCBydWxlaWQgPSBnZXQoXCJydWxlXCIsIFwic2VsZWN0XCIpLnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcclxuICAgICAgbGV0IHJ1bGUgPSBydWxlc1tydWxlaWRdIGFzIFJ1bGU7XHJcbiAgICAgIC8v6L+Z6YeM5o6n5Yi25piv5ZCm5byA5ZCv5Y6G5Y+y6K6w5b2V77yI5oyB57ut5raI6ICX5YaF5a2Y5oiW5pi+5a2Y77yJXHJcbiAgICAgIHVwZGF0ZSA9IChvbGQpID0+IHVzZU1hdHJpeFJ1bGUob2xkLCBydWxlLCB1c2V0cmFpbik7XHJcbiAgICAgIC8v5ZCv5Yqo5b6q546vXHJcbiAgICAgIGxvb3AoKTtcclxuICAgICAgZ2V0KFwic3RhcnRcIikuc3R5bGUuYmFja2dyb3VuZCA9IFwicmVkXCI7XHJcbiAgICAgIGdldChcInN0YXJ0XCIpLmlubmVyVGV4dCA9IFwi5pqC5YGcXCI7XHJcbiAgICAgIGdldChcInRyYWluXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHAgPSB0cnVlO1xyXG4gICAgICBnZXQoXCJzdGFydFwiKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJcIjtcclxuICAgICAgZ2V0KFwic3RhcnRcIikuaW5uZXJUZXh0ID0gXCLlkK/liqhcIjtcclxuICAgICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgICBnZXQoXCJ0cmFpblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcclxuICAgIH1cclxuICB9O1xyXG4gIGdldChcInRyYWluXCIpLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBhd2FpdCB0cmFpbihyc2l6ZSk7XHJcbiAgICBhbGVydChcIuiuree7g+aIkOWKnyzlkK/liqjmtYvor5VcIik7XHJcbiAgICAvL+aYvuekuueUqOe9kee7nOWunueOsOeahOabtOaWsFxyXG4gICAgdXBkYXRlID0gKG9sZDogdGYuVGVuc29yMkQpID0+IHVzZUxheWVycyhvbGQpO1xyXG4gICAgLy/lkK/liqjmtYvor5XvvIzmtYvor5XlrozmiJDliY3or7fli7/mk43kvZxcclxuICAgIC8v5Yid5aeL5YyWXHJcbiAgICBkdCA9IGluaXQoKTtcclxuICAgIGQuZHJhdzJEKGR0KTtcclxuICAgIG4gPSAwO1xyXG4gICAgcCA9IGZhbHNlO1xyXG4gICAgZ2V0KFwiZGVsYXlcIiwgXCJpbnB1dFwiKS52YWx1ZSA9IHN0cigyMDApO1xyXG4gICAgYXdhaXQgbG9vcCgpO1xyXG4gICAgLy9cclxuICAgIGFsZXJ0KFwi5rWL6K+V5a6M5oiQXCIpO1xyXG4gIH07XHJcblxyXG4gIGdldChcInJlc2V0XCIpLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBkdCA9IGluaXQoKTtcclxuICAgIGQuZHJhdzJEKGR0KTtcclxuICAgIG4gPSAwO1xyXG4gIH07XHJcblxyXG4gIGZ1bmN0aW9uIGNoYW5nZXBvaW50KHgsIHkpIHtcclxuICAgIGlmICh4IDwgMCB8fCB5IDwgMCkgcmV0dXJuO1xyXG4gICAgbGV0IGRhdGEgPSBkdC5hcnJheVN5bmMoKTtcclxuICAgIGxldCB0eCwgdHk7XHJcbiAgICB0eCA9IE1hdGguZmxvb3IoeCAvIGQuY3cpO1xyXG4gICAgdHkgPSBNYXRoLmZsb29yKHkgLyBkLmNoKTtcclxuICAgIGRhdGFbdHldW3R4XSA9IGRhdGFbdHldW3R4XSA9PSAwID8gMSA6IDA7XHJcbiAgICBkdC5kaXNwb3NlKCk7XHJcbiAgICBkdCA9IHRmLnRlbnNvcihkYXRhKTtcclxuICAgIGQuZHJhdzJEKGR0KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNldHBvaW50KHgsIHksIHYgPSAxKSB7XHJcbiAgICBpZiAoeCA8IDAgfHwgeSA8IDApIHJldHVybjtcclxuICAgIGxldCBkYXRhID0gZHQuYXJyYXlTeW5jKCk7XHJcbiAgICBsZXQgdHgsIHR5O1xyXG4gICAgdHggPSBNYXRoLmZsb29yKHggLyBkLmN3KTtcclxuICAgIHR5ID0gTWF0aC5mbG9vcih5IC8gZC5jaCk7XHJcbiAgICBkYXRhW3R5XVt0eF0gPSAxO1xyXG4gICAgZHQuZGlzcG9zZSgpO1xyXG4gICAgZHQgPSB0Zi50ZW5zb3IoZGF0YSk7XHJcbiAgICBkLmRyYXcyRChkdCk7XHJcbiAgICAvL3NldFxyXG4gICAgLy8gY29uc29sZS5sb2coYHNldDoke3h9LCR7eX0gPSAke3Z9YClcclxuICB9XHJcblxyXG4gIGdldChcImN0eFwiKS5vbmNsaWNrID0gKGUpID0+IHtcclxuICAgIGlmIChlLmJ1dHRvbiA9PSAwKSBjaGFuZ2Vwb2ludChlLm9mZnNldFgsIGUub2Zmc2V0WSk7XHJcbiAgfTtcclxuICBnZXQoXCJjdHhcIikub25tb3VzZW1vdmUgPSAoZSkgPT4ge1xyXG4gICAgaWYgKGUuYnV0dG9ucyA9PT0gMSkge1xyXG4gICAgICBzZXRwb2ludChlLm9mZnNldFgsIGUub2Zmc2V0WSwgMSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBnZXQoXCJzbFwiKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgc2wgPSAhc2w7XHJcbiAgICBpZiAoc2wpIGdldChcInNsXCIpLnN0eWxlLmJhY2tncm91bmQgPSBcInJlZFwiO1xyXG4gICAgZWxzZSBnZXQoXCJzbFwiKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJcIjtcclxuICB9O1xyXG59XHJcblxyXG53aW5kb3cub25sb2FkID0gbWFpbjtcclxuY29uc29sZS5sb2coXCJoZWxsb3dvcmxkXCIpO1xyXG5cclxuY29uc3QgbW9kID0gbW9kdWxlIGFzIGFueTtcclxuaWYgKG1vZC5ob3QpIG1vZC5ob3QuYWNjZXB0KCk7XHJcbmNvbnNvbGUubG9nKG1vZC5ob3QpO1xyXG4vLyBtb2QuYWRkRGlzcG9zZUhhbmRsZXIoKCk9PntcclxuLy8gICAgIGNvbnNvbGUubG9nKFwiaGVsbG9cIik7XHJcbi8vIH0pXHJcbiIsImltcG9ydCAqIGFzIHRmIGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCJcclxuLy/lpoLmnpznrYnkuo7liJnkuLoxIOWQpuWImeWImeS4ujBcclxuLy/nm7jnrYnmr5TovoNcclxuLyoqXHJcbiAqIOWbvuajgOa1iyDmo4DmtYvlm77kuK3mr4/kuKrngrnmmK/lkKbnrYnkuo7mn5DkuKrmlbAg5aaC5p6c562J5LqO6L+U5ZueMSDlkKbliJnov5Tlm54wIOS4jnRm6buY6K6k55qEXHJcbiAqIOWSjHRmLmVxdWFs55qE6IO95Yqb5LiA5qC3IOS9huWPkeaMpeeahOS4uuaVsOWAvOefqemYtSDogIzpnZ5ib29s55+p6Zi1XHJcbiAqIEBwYXJhbSB0c1xyXG4gKiBAcGFyYW0gZXF1dG9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlcXVhbE1hcDxUIGV4dGVuZHMgdGYuVGVuc29yPih0czogVCwgZXF1dG86IG51bWJlcik6VCB7XHJcbiAgICAvLyBpZihlcXV0byE9MCkgcmV0dXJuIHRzLmRpdihlcXV0bykuc3ViKDEpLmFicygpLmxlc3NFcXVhbCgwKTtcclxuICAgIHJldHVybiB0Zi5lcXVhbCh0cyxlcXV0bykuYXNUeXBlKHRzLmR0eXBlKSBhcyBUO1xyXG59XHJcbi8v5q2k5aSE5bqU5pyJ5aSn5LqO5q+U6L6DICDnlLHmraTlj6/lvpcg5omA5pyJ5q+U6L6D5Yik5patXHJcblxyXG4vLzEtMCDlj5jmjaIg5Y2zbm906L+Q566XXHJcbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlQm9vbCh0czogdGYuVGVuc29yKSB7XHJcbiAgICByZXR1cm4gdHMuc3ViKDEpLmFicygpO1xyXG59XHJcbi8vMC0xIOWPmOS4uiAgLTEgMSDnrKblj7fljJbov5DnrpdcclxuZXhwb3J0IGZ1bmN0aW9uIHN5bWxpemUodHM6IHRmLlRlbnNvcikge1xyXG4gICAgcmV0dXJuIHRzLm11bCgyKS5zdWIoMSk7XHJcbn1cclxuLy/mraTlpITlupTmnInkuI7miJbpnZ4g5byC5oiWIFxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBleHBhbmRUbzREKHRzOiB0Zi5UZW5zb3IyRCk6IHRmLlRlbnNvcjREIHtcclxuICAgIC8v6L+Z5Liq5oqKMmQgZmVhdHVyZW1hcOWPmOS4ujRk5Y+v5Lul55u05o6l6L+b6KGM5Y2356ev5pON5L2c55qEZmVhdHVyZW1hcOaIlmtlcm5lbFxyXG4gICAgLy/kuZ/lsLHmmK/nm7TmjqXlr7lmZWF0dXJlbWFw6L+b6KGM5Y2356evXHJcbiAgICAvL+WPmOaIkG5od2NcclxuICAgIGxldCBzID0gdHMuZXhwYW5kRGltcygwKS5leHBhbmREaW1zKC0xKSBhcyB0Zi5UZW5zb3I0RDtcclxuICAgIC8v5omp5bGV5LiA5Liq5YmN6Z2i55qEbuWSjOS4gOS4quWQjumdoueahGNcclxuICAgIHJldHVybiBzO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVEaW1UbzJEKHRzOiB0Zi5UZW5zb3I0RCk6IHRmLlRlbnNvcjJEIHtcclxuICAgIC8v6L+Z5Liq5oqKMmQgZmVhdHVyZW1hcOWPmOS4ujRk5Y+v5Lul55u05o6l6L+b6KGM5Y2356ev5pON5L2c55qEZmVhdHVyZW1hcOaIlmtlcm5lbFxyXG4gICAgLy/kuZ/lsLHmmK/nm7TmjqXlr7lmZWF0dXJlbWFw6L+b6KGM5Y2356evXHJcbiAgICAvL+WPmOaIkG5od2NcclxuICAgIGxldCBzID0gdHMuc3F1ZWV6ZShbMCwgM10pIGFzIHRmLlRlbnNvcjJEO1xyXG4gICAgLy/mianlsZXkuIDkuKrliY3pnaLnmoRu5ZKM5LiA5Liq5ZCO6Z2i55qEY1xyXG4gICAgcmV0dXJuIHM7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgdGYgZnJvbSBcIkB0ZW5zb3JmbG93L3RmanNcIjtcclxuaW1wb3J0IHsgVGVuc29yIH0gZnJvbSBcIkB0ZW5zb3JmbG93L3RmanNcIjtcclxuaW1wb3J0IHsgZGVsZXRlRGltVG8yRCwgZXF1YWxNYXAsIGV4cGFuZFRvNEQgfSBmcm9tIFwiLi4vbWF0cml4X3Rvb2xcIjtcclxuLy/lhYPmk43kvZwgMCAx55+p6Zi1IOazqOaEj+S4i+mdoueahOmDveWPr+S7peeUqGxvZ2ljQW5kIG9y562J5p2l5a6e546wXHJcbi8qKlxyXG4gKiDlrp7njrDlpJrln5/nmoTmlrnms5XvvJrlsIYyZOefqemYteWinuWKoOS4gOS4que7tOW6piDkvb/nlKjljbfnp6/orqHnrpfnu5PmnpxcclxuICog5pi+56S65pe25YiG5Yir5pi+56S65aSa5Liq5Zu+5bGC5oiW6YCJ5oup5YW25Lit5LiA5Liq5pi+56S6IOaIlue7vOWQiCDlkIjmiJDkuIDkuKrlm77lsYLmmL7npLpcclxuICog6ZyA6KaB5pS56YCg5pi+56S657O757ufIOaTjeS9nOmAu+i+kSBiYXNpY1xyXG4gKiBydWxlIOWSjOaVsOaNruWIneWni+WMllxyXG4gKi9cclxuLyoqXHJcbiAqIOWPluWPjSAxIDDlr7nosINcclxuICogQHBhcmFtIHRlbnNvclxyXG4gKi9cclxuZnVuY3Rpb24gdGZfcmV2ZXJzZSh0ZW5zb3I6IFRlbnNvcikge1xyXG4gIC8v5L2/55SoZXF1YWwgMCDkuZ/lj6/ku6Xlrp7njrDmioogMOWPmDEgMSDlj5gwXHJcbiAgLy8gcmV0dXJuIHRmLnRpZHkoKCk9PntcclxuICAvLyByZXR1cm4gdGYuZXF1YWwodGVuc29yLDApO1xyXG4gIC8vIH0pXHJcbiAgcmV0dXJuIHRmLnRpZHkoKCkgPT4ge1xyXG4gICAgcmV0dXJuIHRmXHJcbiAgICAgIC5sb2dpY2FsWG9yKHRlbnNvci5hc1R5cGUoXCJib29sXCIpLCB0Zi5vbmVzTGlrZSh0ZW5zb3IpLmFzVHlwZShcImJvb2xcIikpXHJcbiAgICAgIC5hc1R5cGUoXCJmbG9hdDMyXCIpO1xyXG4gIH0pO1xyXG4gIC8vIHJldHVybiB0Zi50aWR5KCgpID0+IHtcclxuICAvLyAgICAgcmV0dXJuIHRmLmFicyh0Zi5zdWIodGVuc29yLCAxKSk7XHJcbiAgLy8gfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiuvjEg5piv6K6+MOeahOWPjemdolxyXG4gKiBAcGFyYW0gdGVuc29yXHJcbiAqL1xyXG5mdW5jdGlvbiB0Zl9zZXRPbmUodGVuc29yOiBUZW5zb3IsIHNldE1hcDogVGVuc29yKSB7XHJcbiAgcmV0dXJuIHRmLnRpZHkoKCkgPT4ge1xyXG4gICAgcmV0dXJuIHRmXHJcbiAgICAgIC5sb2dpY2FsT3IodGVuc29yLmFzVHlwZShcImJvb2xcIiksIHNldE1hcC5hc1R5cGUoXCJib29sXCIpKVxyXG4gICAgICAuYXNUeXBlKFwiZmxvYXQzMlwiKTtcclxuICB9KTtcclxuICAvLyByZXR1cm4gdGYudGlkeSgoKSA9PiB7XHJcbiAgLy8gICAgIHJldHVybiB0Zl9yZXZlcnNlKHRmX3NldFplcm8odGZfcmV2ZXJzZSh0ZW5zb3IpLCB0Zl9yZXZlcnNlKHNldE1hcCkpKTtcclxuICAvLyB9KVxyXG59XHJcblxyXG4vKipcclxuICog6K6+MCDlm6DkuLrkuqTmjaLlvosg6K6+572uMOeahOWPguaVsOmhuuW6j+S4jemZkFxyXG4gKiBAcGFyYW0gdGVuc29yIOWOn+Wni+efqemYtVxyXG4gKiBAcGFyYW0gc2V0TWFwIOiuvue9ruefqemYtSAw6KGo56S66KaB6K6+MOeahOS9jee9riAxIOihqOekuuS4jeWPmFxyXG4gKi9cclxuZnVuY3Rpb24gdGZfc2V0WmVybyh0ZW5zb3I6IFRlbnNvciwgc2V0TWFwOiBUZW5zb3IpIHtcclxuICByZXR1cm4gdGYudGlkeSgoKSA9PiB7XHJcbiAgICByZXR1cm4gdGZcclxuICAgICAgLmxvZ2ljYWxBbmQodGVuc29yLmFzVHlwZShcImJvb2xcIiksIHNldE1hcC5hc1R5cGUoXCJib29sXCIpKVxyXG4gICAgICAuYXNUeXBlKFwiZmxvYXQzMlwiKTtcclxuICB9KTtcclxuICAvLyByZXR1cm4gdGYudGlkeSgoKSA9PiB0Zi5tdWwodGVuc29yLCBzZXRNYXApKTtcclxufVxyXG5cclxuLy/mk43kvZzpm4Yg5rOo5oSPIOWmguaenOS4gOS4quinhOWImeS4reS4jeiuvue9ruS7u+S9leinhOWImSDliJnlhajpg6jorr7nva7kuLowXHJcbmV4cG9ydCBjb25zdCBkZWZhdWx0RHR5cGUgPSBcImZsb2F0MzJcIjtcclxuLy9UZW5zb3LnmoTnsbvlnovkuLpib29sXHJcbnR5cGUgQ29uZEZ1bmMgPSAoSywgUywgUCkgPT4gVGVuc29yO1xyXG4vKipcclxuICog5aaC5p6c5ZGo5Zu05pyJ77yIdiDkuKTvvInkuKrkuLoxIOWImeS/neaMgeS4reW/g+S4jeWPmFxyXG4gKiDlkKbliJnorr7nva7kuLowICDkuZ/lsLHmmK/pmaTkuoZ25LmL5aSW55qE6YO95Lya6K6+572u5Li6MFxyXG4gKiBAcGFyYW0gSyDljbfnp6/lvpfliLDnmoTnu5PmnpzooajnpLrlkajlm7TmoLzlrZDlr7nkuK3lv4PmoLzlrZDnmoTlvbHlk43vvIzkuIDoiKzooajnpLrlkajlm7TmoLzlrZDkuK0x55qE5Liq5pWwXHJcbiAqIEBwYXJhbSBTIOWOn+Wni+efqemYtVxyXG4gKiBAcGFyYW0gUCBLK1PnmoTnu5PmnpxcclxuICogQHBhcmFtIHZcclxuICovXHJcbmZ1bmN0aW9uIGtlZXAoSywgUywgUCwgY29uZEZ1bmM6IENvbmRGdW5jKSB7XHJcbiAgLy/miorlkajlm7TmnInkuKTkuKrmoLzlrZDnmoTngrkg5aSN5Yi25Yiw57uT5p6c5LitIOWmguaenOWRqOWbtOS4jeaYr+S4pOS4quagvOWtkCDmm7TlpJrmiJbmm7TlsJEg5bCx5LiN5aSN5Yi2XHJcbiAgLy/lpI3liLbkuI3mmK/lj6DliqDogIzmmK/orr7nva7kuLoxICDlpoLmnpzlr7nnqbrnu5PmnpzmiafooYwg5bCx5piv5aSN5Yi255qE5oSP5oCdIOS9huWmguaenOWvuemdnuepuue7k+aenCDlsLHmmK8g5aaC5p6c5Y6f5aeL5L2N572u5pivMeeahOivneWwseiuvue9riDlkKbliJnkuI3mlLnlj5hcclxuICAvL+ajgOa1iyDlpoLmnpzkuLoyICDkuI3orr7nva56ZXJvIOS/neaMgeS4jeWPmCDlpoLmnpzkuI3mmK8yIOWImSDlhajpg6jorr7nva7kuLowXHJcbiAgbGV0IEsyID0gY29uZEZ1bmMoSywgUywgUCkuYXNUeXBlKFwiZmxvYXQzMlwiKTtcclxuICAvL+S7peWPoOWKoOaWueW8j+S/neWtmOe7k+aenCDku6VzZXRPbmXnu5PlsL7nmoTor50g5LiN5Lya5raI5Y675Lu75L2V5Lic6KW/XHJcbiAgcmV0dXJuIHRmX3NldE9uZShQLCB0Zl9zZXRaZXJvKFMsIEsyKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlpoLmnpzlkajlm7TmnInvvIh2IDPvvInkuKrkuLoxIOWImeiuvue9ruS4reW/g+S4ujFcclxuICogQHBhcmFtIEsg6Z2eMCAxIOefqemYtVxyXG4gKiBAcGFyYW0gUyAwIDEg55+p6Zi1XHJcbiAqIEBwYXJhbSBQIDAgMeefqemYtVxyXG4gKiBAcGFyYW0gdlxyXG4gKi9cclxuZnVuY3Rpb24gc2V0T25lKEssIFMsIFAsIGNvbmRGdW5jOiBDb25kRnVuYykge1xyXG4gIC8vZXF1YWxtYXDmiorpnZ4gMCAxIOWPmOS4uiAwIDFcclxuICBsZXQgSzMgPSBjb25kRnVuYyhLLCBTLCBQKS5hc1R5cGUoXCJmbG9hdDMyXCIpO1xyXG4gIC8v572uMSDljp/mnKzmmK/nlKggdGYuYWRkKFAsSzMpIOWboOS4uuWBh+iuvlDmmK/lhagwICDmiJbogIXkv53or4HkuI3ph43lj6Ag5Zug5Li6IHNldE9uZSh4KeS4jeWPr+iDveeUqOS4gOS4quWAvOiwg+eUqOS4pOasoVxyXG4gIC8vdGZfc2V0T25l5piv5Y+v5Lul5ZCM5pe26LCD55So5aSa5qyh6ICM5LiN5Lya5Ye6546w5aSn5LqOMeeahOaDheWGtSDogIxhZGTkvJpcclxuICAvL+WboOatpOayoeaciVxyXG4gIHJldHVybiB0Zl9zZXRPbmUoUCwgSzMpO1xyXG59XHJcblxyXG4vKipcclxuICogc2V0T25l55qE55u45Y+N6Z2iIHNldFplcm9cclxuICogQHBhcmFtIEtcclxuICogQHBhcmFtIFNcclxuICogQHBhcmFtIFBcclxuICogQHBhcmFtIHZcclxuICovXHJcbmZ1bmN0aW9uIHNldFplcm8oSywgUywgUCwgY29uZEZ1bmM6IENvbmRGdW5jKSB7XHJcbiAgY29uc3QgVCA9IHRmX3JldmVyc2UoY29uZEZ1bmMoSywgUywgUCkuYXNUeXBlKFwiZmxvYXQzMlwiKSk7XHJcbiAgY29uc3QgcmVzID0gdGZfc2V0WmVybyhQLCBUKTtcclxuICByZXR1cm4gcmVzO1xyXG59XHJcblxyXG4vKipcclxuICog6KGo56S6562J5LqO5LuA5LmIXHJcbiAqIEBwYXJhbSB2XHJcbiAqIEByZXR1cm5zXHJcbiAqL1xyXG5mdW5jdGlvbiBjb25kRXF1YWwodik6IENvbmRGdW5jIHtcclxuICByZXR1cm4gKEssIFMsIFApID0+IHtcclxuICAgIHJldHVybiBlcXVhbE1hcChLLCB2KTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb25kTGVzcyh2KTogQ29uZEZ1bmMge1xyXG4gIHJldHVybiAoSywgUywgUCkgPT4ge1xyXG4gICAgcmV0dXJuIHRmLmxlc3MoSywgdik7XHJcbiAgfTtcclxufVxyXG5mdW5jdGlvbiBjb25kTm90RXF1YWwodik6IENvbmRGdW5jIHtcclxuICByZXR1cm4gKEssIFMsIFApID0+IHtcclxuICAgIHJldHVybiB0Zi5ub3RFcXVhbChLLCB2KTtcclxuICB9O1xyXG59XHJcbi8vL+aTjeS9nOmbhue7k+adn1xyXG5mdW5jdGlvbiBlbmRQb2ludChcclxuICB0YXJnZXQ6IEZ1bmNzLFxyXG4gIHByb3BrZXk6IFByb3BlcnR5S2V5LFxyXG4gIGRlc2NyaXB0b3I6IFR5cGVkUHJvcGVydHlEZXNjcmlwdG9yPCguLi5hcmdzOiBhbnkpID0+IGFueT5cclxuKSB7XHJcbiAgZGVidWdnZXI7XHJcbiAgY29uc3QgZiA9IGRlc2NyaXB0b3IudmFsdWU7XHJcbiAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uICh0aGlzOiBGdW5jcywgLi4uYXJnczogYW55W10pIHtcclxuICAgIGYuY2FsbCh0aGlzLCAuLi5hcmdzKTtcclxuICAgIHRoaXMuY2xlYXJDb25kKCk7XHJcbiAgfTtcclxufVxyXG50eXBlIExpbmtUeXBlID0gXCJhbmRcIiB8IFwib3JcIjtcclxuXHJcbmNsYXNzIEZ1bmNzIHtcclxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgSywgcHJvdGVjdGVkIFMsIHByb3RlY3RlZCBQKSB7fVxyXG4gIHByb3RlY3RlZCBjb25kczogQ29uZEZ1bmNbXSA9IFtdO1xyXG4gIC8vIHByb3RlY3RlZCBjb25kOiBDb25kRnVuYyA9IG51bGw7XHJcblxyXG4gIHByb3RlY3RlZCBsaW5rVHlwZTogTGlua1R5cGUgPSBcImFuZFwiO1xyXG4gIC8qKlxyXG4gICAqIOa3t+WQiOeahOadoeS7tiDmmoLml7bkvb/nlKjnrKzkuIDkuKrmnaHku7ZcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBnZXRDb21wb3NlZENvbmQoKTogQ29uZEZ1bmMge1xyXG4gICAgcmV0dXJuIChLLCBTLCBQKSA9PiB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvbmRzWzBdKEssIFMsIFApO1xyXG4gICAgfTtcclxuICB9XHJcbiAgLy/lpJrmrKHosIPnlKjmnaHku7bkvJroh6rliqjkvb/nlKhhbmTov57mjqVcclxuICBwdWJsaWMgd2hlbkVxdWFsKHY6IG51bWJlcikge1xyXG4gICAgdGhpcy5jb25kcy5wdXNoKGNvbmRFcXVhbCh2KSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcHVibGljIHdoZW5MZXNzKHY6IG51bWJlcikge1xyXG4gICAgdGhpcy5jb25kcy5wdXNoKGNvbmRMZXNzKHYpKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICBwdWJsaWMgd2hlbk5vdEVxdWFsKHY6IG51bWJlcikge1xyXG4gICAgdGhpcy5jb25kcy5wdXNoKGNvbmROb3RFcXVhbCh2KSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcHVibGljIGNsZWFyQ29uZCgpIHtcclxuICAgIHRoaXMuY29uZHMgPSBbXTtcclxuICB9XHJcbiAgQGVuZFBvaW50XHJcbiAgcHVibGljIGtlZXAoKSB7XHJcbiAgICB0aGlzLlAgPSBrZWVwKHRoaXMuSywgdGhpcy5TLCB0aGlzLlAsIHRoaXMuZ2V0Q29tcG9zZWRDb25kKCkpO1xyXG4gIH1cclxuICBAZW5kUG9pbnRcclxuICBwdWJsaWMgc2V0T25lKCkge1xyXG4gICAgdGhpcy5QID0gc2V0T25lKHRoaXMuSywgdGhpcy5TLCB0aGlzLlAsIHRoaXMuZ2V0Q29tcG9zZWRDb25kKCkpO1xyXG4gIH1cclxuICBAZW5kUG9pbnRcclxuICBwdWJsaWMgc2V0WmVybygpIHtcclxuICAgIHRoaXMuUCA9IHNldFplcm8odGhpcy5LLCB0aGlzLlMsIHRoaXMuUCwgdGhpcy5nZXRDb21wb3NlZENvbmQoKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuUDtcclxuICB9XHJcbiAgcHVibGljIGNhbGN1bGF0ZTxUPihmdW5jOiAoSywgUywgUCkgPT4gVCkge1xyXG4gICAgcmV0dXJuIGZ1bmModGhpcy5LLCB0aGlzLlMsIHRoaXMuUCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICog55So5LqO5o+Q5L6bZHNsIOaWueS+v+inhOWImee8luWGmVxyXG4gKiBAcGFyYW0gS1xyXG4gKiBAcGFyYW0gU1xyXG4gKiBAcGFyYW0gUFxyXG4gKi9cclxuZnVuY3Rpb24gdXNlKEssIFMsIFApIHtcclxuICByZXR1cm4gbmV3IEZ1bmNzKEssIFMsIFApO1xyXG59XHJcblxyXG50eXBlIFJ1bGVUeXBlID0gUmV0dXJuVHlwZTx0eXBlb2YgdXNlPjtcclxuXHJcbmZ1bmN0aW9uIGJhc2ljKHRzOiB0Zi5UZW5zb3IyRCkge1xyXG4gIC8v6L+Z6YeM55CG6K665LiK5Y+v5Lul6ICD6JmR55So5YW25LuWa2VybmVs5Lul5Lul5LiN5ZCM5pa55byP6ICD6JmR5ZGo5Zu05YC8XHJcbiAgLy/ov5nph4zlj6/ku6XnlKjkuIDkuKrlpJrpgJrpgZPljbfnp6/moLjmnaXlpITnkIZcclxuICAvL+e7n+iuoeS4gOS4quagvOWtkOWRqOWbtOeahOaJgOacieagvOWtkOeahOWAvCAg5p2D6YeN6YO95pivMSDkvYbkuZ/lj6/ku6XkuI3lkIwgIOeUmuiHs+WPr+S7peiAg+iZkeWFtuS7luWboOe0oOi/m+WOu1xyXG4gIGxldCBrZXIgPSB0ZlxyXG4gICAgLnRlbnNvcjJkKFtcclxuICAgICAgWzEsIDEsIDFdLFxyXG4gICAgICBbMSwgMCwgMV0sXHJcbiAgICAgIFsxLCAxLCAxXSxcclxuICAgIF0pXHJcbiAgICAuZXhwYW5kRGltcygtMSlcclxuICAgIC5leHBhbmREaW1zKC0xKSBhcyB0Zi5UZW5zb3I0RDtcclxuICAvL+a1i+ivleiuree7g+eUqFxyXG4gIC8vIGtlcj10Zi52YXJpYWJsZShrZXIsdHJ1ZSxcImtlcm5lbFwiLGRlZmF1bHREdHlwZSk7XHJcbiAgLy/miop0c+WPmOS4ujRkXHJcbiAgLy/ljp/lp4vnn6npmLVcclxuICBsZXQgUyA9IGV4cGFuZFRvNEQodHMpLmFzVHlwZShkZWZhdWx0RHR5cGUpO1xyXG4gIC8v5Y2356ev6K6h566X5ZCO55qE55+p6Zi1XHJcbiAgbGV0IEsgPSB0Zi5jb252MmQoUywga2VyLCAxLCBcInNhbWVcIiwgXCJOSFdDXCIpO1xyXG4gIC8v6K6h566XXHJcbiAgLy/lj6DliqBcclxuICAvL+i/meS4quaYr+WFtuS7luiuvjBcclxuICAvL+WIneWni+S4ujDnmoTkv53lrZjnu5PmnpznmoTnn6npmLVcclxuICBsZXQgUCA9IHRmLnplcm9zTGlrZShTKTtcclxuICByZXR1cm4geyBLLCBTLCBQIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDop4TliJnpm4Yg55CG6K665LiK5Y+v5Lul5re75Yqg77yaXHJcbiAqIDEu6KeE5YiZ5YaF5Zyo6ZqP5py65oCnIOacieWwj+amgueOh+WHuueOsOWFtuS7luihjOS4ulxyXG4gKiAyLiDkvb/nlKjpmaTkuoZrZWVw5ZKMc2V0T25l5LmL5aSW55qE5pON5L2cIOWmgnNldFplcm9cclxuICovXHJcbmV4cG9ydCBuYW1lc3BhY2UgUnVsZXMge1xyXG4gIC8v5Z+65pys6KeE5YiZXHJcbiAgLy/kuI3lpI3liLZvbGTnmoTmg4XlhrXkuIsgc2V0WmVyb+aYr+iHquWKqOeahCDlhbbku5bop4TliJnlj6rmmK/opobnm5bkuoblhajpnaLnmoRzZXRaZXJvIOiAjCDlpoLmnpzpooTlhYjlpI3liLbkuIrluKcg5YiZc2V0WmVyb+mcgOimgeaJi+WKqOiwg+eUqFxyXG4gIC8v5rOo5oSP6buY6K6k5oOF5Ya15LiL5LiN5piv5L+d5oyBIOmZpOmdnuWkjeWItiDlpI3liLYg5YiZ6buY6K6k6KGM5Li65Li65L+d5oyBIOS4jeWkjeWItum7mOiupOihjOS4uuS4uuiuvjBcclxuICAvL+ihqOekuiAy55qE5pe25YCZ5LiN5Y+YIDPnmoTml7blgJnmtLvov4fmnaUo6K6+572u5Li6MSlcclxuICAvL+eUseS6juayoeacieWkjeWItueahOi/h+eoiyDmr4/kuKrngrnpg73mmK/lkajlm7Tlhbbku5bngrnnmoTnu5Pmnpwg5Zug5q2kc2V0WkVST+S8muWvvOiHtOi/numUgeWPjeW6lFxyXG4gIC8v5Lmf5bCx5piv6K+05aaC5p6c5LiN6K6+572u6KeE5YiZIOS4i+S4gOW4p+S8muiHquWKqOa4hembtiDpmaTkuobkv53mjIHlkozorr4x55qEIOWFtuS7lumDveiHquWKqOiuvjBcclxuICBleHBvcnQgZnVuY3Rpb24gYjNzMjMocnVsZTogUnVsZVR5cGUpIHtcclxuICAgIC8v5rS7552A6Zq+5bqmXHJcbiAgICBydWxlLndoZW5FcXVhbCgyKS5rZWVwKCk7XHJcbiAgICAvLyBydWxlLmtlZXAoMyk7XHJcbiAgICAvL+WHuueUn+mavuW6plxyXG4gICAgLy8gcnVsZS5zZXRPbmUoMik7XHJcbiAgICBydWxlLndoZW5FcXVhbCgzKS5zZXRPbmUoKTtcclxuICAgIC8vNueahOaXtuWAmeatu+WOuyAo5oul5oyk6KeE5YiZKSDlm6DkuLrpmaTkuoZrZWVw55qE5ZKMc2V0T25l55qEIOWFtuS7lumDveS8muiHquWKqOatu+WOuyDmiYDku6Xov5nph4zosIPnlKjlkozkuI3osIPnlKjkuIDmoLdcclxuICAgIC8vIHJ1bGUuc2V0WmVybyg2KTtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiByZXZfYjNzMjMocnVsZTogUnVsZVR5cGUpIHtcclxuICAgIHJ1bGUud2hlbkVxdWFsKDYpLmtlZXAoKTtcclxuICAgIHJ1bGUud2hlbkVxdWFsKDApLnNldE9uZSgpO1xyXG4gICAgcnVsZS53aGVuRXF1YWwoMSkuc2V0T25lKCk7XHJcbiAgICBydWxlLndoZW5FcXVhbCgyKS5zZXRPbmUoKTtcclxuICAgIHJ1bGUud2hlbkVxdWFsKDMpLnNldE9uZSgpO1xyXG4gICAgcnVsZS53aGVuRXF1YWwoNCkuc2V0T25lKCk7XHJcbiAgICBydWxlLndoZW5FcXVhbCg3KS5zZXRPbmUoKTtcclxuICAgIHJ1bGUud2hlbkVxdWFsKDgpLnNldE9uZSgpO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGIzNnMyMyhydWxlOiBSdWxlVHlwZSkge1xyXG4gICAgYjNzMjMocnVsZSk7XHJcbiAgICBydWxlLndoZW5FcXVhbCg2KS5zZXRPbmUoKTtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBiMXMxMihydWxlOiBSdWxlVHlwZSkge1xyXG4gICAgcnVsZS53aGVuRXF1YWwoMikua2VlcCgpO1xyXG4gICAgcnVsZS53aGVuRXF1YWwoMSkuc2V0T25lKCk7XHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gYjM2NzhzMzQ2NzgocnVsZTogUnVsZVR5cGUpIHtcclxuICAgIHJ1bGUud2hlbkVxdWFsKDQpLmtlZXAoKTtcclxuICAgIHJ1bGUud2hlbkVxdWFsKDMpLnNldE9uZSgpO1xyXG4gICAgcnVsZS53aGVuRXF1YWwoNikuc2V0T25lKCk7XHJcbiAgICBydWxlLndoZW5FcXVhbCg3KS5zZXRPbmUoKTtcclxuICAgIHJ1bGUud2hlbkVxdWFsKDgpLnNldE9uZSgpO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGIzNTY3OHM1Njc4KHJ1bGU6IFJ1bGVUeXBlKSB7XHJcbiAgICAvLyBydWxlLmtlZXAoNCk7XHJcbiAgICBjb25zdCB0ID0gWzMsIDUsIDYsIDcsIDhdO1xyXG4gICAgZm9yIChsZXQgaSBvZiB0KSB7XHJcbiAgICAgIHJ1bGUud2hlbkVxdWFsKGkpLnNldE9uZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIOefqemYteinhOWImVxyXG4gKiDnkIborrrkuIrov5nkuKrlj6/ku6XmlK/mjIHlkITnp43op4TliJlcclxuICog5Y+v5Lul5pSv5oyB5Zyo5q+P5qyh6K6h566X5LiL5LiA5bin55qE5pe25YCZ6L+b6KGM6K6w5b2V77yI6aKd5aSW5Yqf6IO977yJXHJcbiAqXHJcbiAqIFPkuLowIDEg55+p6Zi1IEvmmK/ku44wIDEg55+p6Zi15Y2356ev5b6X5Yiw55qE5YC8IOihqOekuuS6huWRqOWbtOagvOWtkOWvueS4reW/g+agvOWtkOeahOW9seWTje+8iOWNt+enr+WAvO+8iSBQ5Li6SytT55qE57uT5p6cIOihqOekulxyXG4gKiBvbGTlkozlvbHlk43lj6DliqDlkI7nmoTkuqfniakgKOe7vOWQiOS6p+eJqe+8iSDnhLblkI7ljrvop4TojIPljJZcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VNYXRyaXhSdWxlKFxyXG4gIHRzOiB0Zi5UZW5zb3IyRCxcclxuICBydWxlRjogKHJ1bGU6IFJ1bGVUeXBlKSA9PiB2b2lkID0gUnVsZXMuYjNzMjMsXHJcbiAgbG9nSGlzdG9yeSA9IGZhbHNlXHJcbikge1xyXG4gIC8v55Sf5ZG95ri45oiP5Y2356evIOS7juS4gOS4qmZlYXR1cmUgbWFwIOW+l+WIsOS4i+S4gOS4qmZlYXR1cmVtYXBcclxuICAvL+WOn+WniyBTIOWNt+enr+W+l+WIsEsg54S25ZCOSytTIOW+l+WIsFAg54S25ZCO5a+5UOS9v+eUqGVxdWFsTWFwMyDlvpfliLDkuozlgLzljJbnmoTkuIvkuIDkuKpcclxuICAvL2ZlYXR1cmVtYXBcclxuICBsZXQgcmV0ID0gdGYudGlkeSgoKSA9PiB7XHJcbiAgICBsZXQgeyBLLCBTLCBQIH0gPSBiYXNpYyh0cyk7XHJcbiAgICBsZXQgcnVsZSA9IHVzZShLLCBTLCBQKTtcclxuICAgIHJ1bGVGKHJ1bGUpO1xyXG4gICAgUCA9IHJ1bGUuZ2V0KCk7XHJcbiAgICAvL+iuree7g+W5tui+k+WHumxvc3NcclxuICAgIGxldCByZXQgPSBkZWxldGVEaW1UbzJEKFAgYXMgdGYuVGVuc29yNEQpO1xyXG4gICAgLy9cclxuICAgIHJldHVybiByZXQ7XHJcbiAgfSk7XHJcbiAgLy/orq3nu4PnmoTpop3lpJbnmoTkuJzopb9cclxuICBpZiAobG9nSGlzdG9yeSkgdHJhaW5Mb2codHMsIHJldCk7XHJcbiAgcmV0dXJuIHJldDtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgUnVsZSA9IHR5cGVvZiBSdWxlcy5iM3MyMztcclxuXHJcbi8v6ICD6JmR5LiN5pS55Y+Y6KeE5YiZ6ICM5piv6K6t57uD5Y2356ev5qC477yM6K6p5pyA57uI5b6X5Yiw55qEbmV4dCBmcmFtZeeahOaAu+WSjO+8jOaOpei/kTUwJSzlkIzml7blsL3ph4/kuI5wcmV25LiN5ZCMXHJcbi8v5Lmf5bCx5pivIOacgOWkp+WMliBhYnMoQS1CKV4yXHJcblxyXG4vL+W+l+WIsOS4gOS4quelnue7j+e9kee7nCAg5Y+v5Lul5oqKbWF0cml4cnVsZeW9k+S9nOeOr+Wig++8jOaKiuiHquW3sei+k+WHuueahGZyYW1l5b2T5L2c57uT5p6cXHJcbi8v5Y2V57qv55qE5qC55o2u5r+A5Yqx5aSn5bCP5aKe5Yqg57uT5p6c77yM5LyY5YyW57uT5p6cIOS5n+WwseaYr+aKiuiHquW3seeahOe7k+aenOWSjOWunumZhee7k+aenCDmr5Tku7dcclxuLy/lubbkuJTDl+iHquW3sei+k+WHuueahOW4p1xyXG4vL+acgOe7iOW+l+WIsOS4gOS4quWPr+S7peaooeaLn2IyczPop4TliJnnmoTljbfnp6/nvZHnu5wgcm5uXHJcbi8v6L+Z6YeM5piv6YCa6L+H5LiK5LiA5bin6L6T5Ye65LiL5LiA5bin55qE6IO95YqbXHJcbi8v6K6h566X5r+A5Yqx55qE5pe25YCZ6IKv5a6a5piv5LqM5YC85YyW5YaN6K6h566X55qE77yM5ZCm5YiZ5bCx5ZKM55u05o6l6K6h566XbG9zcyDmsqHllaXljLrliKvkuoZcclxuLy/miJbogIXnm7TmjqXorqHnrpdsb3NzIOWPquaYr+i+k+WHuueahOaXtuWAmeS6jOWAvOWMllxyXG5jb25zdCBvcHQgPSB0Zi50cmFpbi5ybXNwcm9wKDAuMDEpO1xyXG5cclxuZnVuY3Rpb24gaW5pdExheWVyKHJzaXplID0gOCkge1xyXG4gIGFsZXJ0KFwi5Yid5aeL5YyW56We57uP572R57ucXCIpO1xyXG4gIGxldCBsYXllcnMgPSB0Zi5zZXF1ZW50aWFsKHtcclxuICAgIGxheWVyczogW1xyXG4gICAgICB0Zi5sYXllcnMuY29udjJkKHtcclxuICAgICAgICBpbnB1dFNoYXBlOiBbMTAyNCAvIHJzaXplLCAxMDI0IC8gcnNpemUsIDFdLFxyXG4gICAgICAgIGtlcm5lbFNpemU6IDMsXHJcbiAgICAgICAgZmlsdGVyczogNDAsXHJcbiAgICAgICAgYWN0aXZhdGlvbjogXCJyZWx1XCIsXHJcbiAgICAgIH0pLFxyXG4gICAgICB0Zi5sYXllcnMuY29udjJkVHJhbnNwb3NlKHtcclxuICAgICAgICBrZXJuZWxTaXplOiAzLFxyXG4gICAgICAgIGZpbHRlcnM6IDEwLFxyXG4gICAgICAgIGFjdGl2YXRpb246IFwidGFuaFwiLFxyXG4gICAgICB9KSxcclxuICAgICAgdGYubGF5ZXJzLmNvbnYyZCh7IGtlcm5lbFNpemU6IDMsIGZpbHRlcnM6IDIwLCBhY3RpdmF0aW9uOiBcInRhbmhcIiB9KSxcclxuICAgICAgdGYubGF5ZXJzLmNvbnYyZFRyYW5zcG9zZSh7IGtlcm5lbFNpemU6IDMsIGZpbHRlcnM6IDEgfSksXHJcbiAgICBdLFxyXG4gIH0pO1xyXG4gIGxheWVycy5jb21waWxlKHtcclxuICAgIG9wdGltaXplcjogXCJybXNwcm9wXCIsXHJcbiAgICBsb3NzOiB0Zi5sb3NzZXMuc2lnbW9pZENyb3NzRW50cm9weSxcclxuICAgIG1ldHJpY3M6IFtcImFjY3VyYWN5XCJdLFxyXG4gIH0pO1xyXG4gIHJldHVybiBsYXllcnM7XHJcbn1cclxuXHJcbmxldCB4cyA9IFtdLFxyXG4gIHlzID0gW107XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdHJhaW5Mb2codHM6IHRmLlRlbnNvcjJELCByZXQ6IHRmLlRlbnNvcjJEKSB7XHJcbiAgLy8gY29uc29sZS5sb2coXCLorrDlvZXmoLfmnKxcIilcclxuICAvL+i+k+WFpeeahOaYr+S4iuS4gOW4p+WSjOS4i+S4gOW4p1xyXG4gIC8vbmV055qE5Yqf6IO95piv5LuO5LiK5LiA5bin5b6X5Yiw5LiL5LiA5binXHJcbiAgeHMucHVzaCh0Zi50aWR5KCgpID0+IHRzLmNsb25lKCkuZXhwYW5kRGltcygyKSkpO1xyXG4gIHlzLnB1c2godGYudGlkeSgoKSA9PiByZXQuY2xvbmUoKS5leHBhbmREaW1zKDIpKSk7XHJcbiAgLy8gY29uc29sZS5sb2coeHNbMF0pXHJcbn1cclxuXHJcbmxldCBsYXllcnM7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdHJhaW4ocnNpemUpIHtcclxuICBjb25zb2xlLmxvZyhcIuW8gOWni+iuree7g1wiKTtcclxuICBsYXllcnMgPSBpbml0TGF5ZXIocnNpemUpO1xyXG4gIGxheWVycy5zdW1tYXJ5KCk7XHJcbiAgLy8gbGV0IG5zdGFydD14c1swXS5jbG9uZSgpIGFzIHRmLlRlbnNvcjNEO1xyXG4gIGNvbnNvbGUubG9nKGDmoLfmnKzmlbA6JHt4cy5sZW5ndGh9YCk7XHJcbiAgbGV0IHggPSB0Zi5zdGFjayh4cywgMCk7XHJcbiAgeHMuZm9yRWFjaCgodikgPT4gdi5kaXNwb3NlKCkpO1xyXG4gIGxldCB5ID0gdGYuc3RhY2soeXMsIDApO1xyXG4gIHlzLmZvckVhY2goKHYpID0+IHYuZGlzcG9zZSgpKTtcclxuICBsZXQgaW5mbyA9IGF3YWl0IGxheWVycy5maXQoeCwgeSwge1xyXG4gICAgZXBvY2hzOiA1LFxyXG4gICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgIG9uQmF0Y2hFbmQoYmF0Y2gsIGxvZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhgYmF0Y2g6JHtiYXRjaH0gLT4gJHtsb2dzfWApO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9KTtcclxuICBjb25zb2xlLmxvZyhpbmZvLmhpc3RvcnkuYWNjKTtcclxuICB4LmRpc3Bvc2UoKTtcclxuICB5LmRpc3Bvc2UoKTtcclxuICB4cyA9IFtdO1xyXG4gIHlzID0gW107XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VMYXllcnMobnN0YXJ0OiB0Zi5UZW5zb3IyRCk6IHRmLlRlbnNvcjJEIHtcclxuICAvL+aYvuekuuelnue7j+e9kee7nOa8lOWMliDku47nrKzkuIDluKflvIDlp4tcclxuICBsZXQgcmV0ID0gdGYudGlkeSgoKSA9PiB7XHJcbiAgICBsZXQgdCA9IGxheWVycy5wcmVkaWN0KG5zdGFydC5leHBhbmREaW1zKDIpLmV4cGFuZERpbXMoMCkpIGFzIHRmLlRlbnNvcjREO1xyXG4gICAgdCA9IHQuc2lnbW9pZCgpO1xyXG4gICAgbGV0IHR0ID0gdC5zcXVlZXplKFswLCAzXSkgYXMgdGYuVGVuc29yMkQ7XHJcbiAgICAvL+S6jOWAvOWMllxyXG4gICAgbGV0IGJpID0gdGYuZ3JlYXRlckVxdWFsKHR0LCAwLjUpO1xyXG4gICAgcmV0dXJuIGJpO1xyXG4gIH0pO1xyXG4gIHJldHVybiByZXQgYXMgdGYuVGVuc29yMkQ7XHJcbn1cclxuIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==
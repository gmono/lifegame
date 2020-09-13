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

/***/ "./main.ts":
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
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
const tf = __importStar(__webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js"));
const lib_1 = __webpack_require__(/*! ./libs/lib */ "./libs/lib.ts");
//如果等于则为1 否则则为0
function equalMap(ts, equto) {
    return ts.div(equto).sub(1).abs().lessEqual(0);
}
//1-0 变换
function reverseBool(ts) {
    return ts.sub(1).abs();
}
//0-1 变为  -1 1
function symlize(ts) {
    return ts.mul(2).sub(1);
}
function expandTo4D(ts) {
    //这个把2d featuremap变为4d可以直接进行卷积操作的featuremap或kernel
    //也就是直接对featuremap进行卷积
    //变成nhwc
    let s = ts.expandDims(0).expandDims(-1);
    //扩展一个前面的n和一个后面的c
    return s;
}
function deleteDimTo2D(ts) {
    //这个把2d featuremap变为4d可以直接进行卷积操作的featuremap或kernel
    //也就是直接对featuremap进行卷积
    //变成nhwc
    let s = ts.squeeze([0, 3]);
    //扩展一个前面的n和一个后面的c
    return s;
}
function b2s3(ts) {
    //生命游戏卷积 从一个feature map 得到下一个featuremap
    //原始 S 卷积得到K 然后K+S 得到P 然后对P使用equalMap3 得到二值化的下一个
    //featuremap
    let ker = tf.tensor2d([
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]).expandDims(-1).expandDims(-1);
    //把ts变为4d
    let S = expandTo4D(ts);
    let K = S.conv2d(ker, 1, "same", "NHWC");
    //计算
    let K2 = equalMap(K, 2);
    let K3 = equalMap(K, 3);
    //叠加
    let P = tf.zerosLike(S);
    P = P.add(K2.mul(S));
    P = P.add(K3);
    return deleteDimTo2D(P);
}
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
    async draw2D(ts) {
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
//绘图 绘制到canvas
function drawFeatureMap(ts) {
}
function getval(id) {
    let e = document.querySelector(`input#${id}`);
    return e.value;
}
function get(id) {
    return document.querySelector(`#${id}`);
}
async function main() {
    let ele = document.createElement("canvas");
    ele.height = 2000;
    ele.width = 2000;
    ele.id = "ctx";
    document.body.appendChild(ele);
    let size = [1000, 1000];
    let d = new Draw(ele, size[0], size[1]);
    let init = () => tf.randomUniform(size, 0, 1, "float32").div(lib_1.float(getval("rel"))).floor();
    let dt = init();
    d.draw2D(dt);
    console.log(dt);
    let p = true;
    let sl = false;
    let n = 0;
    //loop
    async function loop() {
        let delayt = lib_1.int(getval("delay"));
        for (;;) {
            await lib_1.delay(delayt);
            let old = dt;
            dt = tf.tidy(() => b2s3(old));
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
        }
        get("start").style.background = "#111111";
        get("pause").style.background = "";
    };
    get("pause").onclick = async () => {
        p = true;
        get("start").style.background = "";
        get("pause").style.background = "#111111";
        d.draw2D(dt);
    };
    get("reset").onclick = async () => {
        dt = init();
        d.draw2D(dt);
        n = 0;
    };
    get("ctx").onclick = e => {
        let x, y;
        x = e.offsetX;
        y = e.offsetY;
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
    };
    get("sl").onclick = () => {
        sl = true;
    };
    get("nsl").onclick = () => {
        sl = false;
    };
}
window.onload = main;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWJzL2xpYi50cyIsIndlYnBhY2s6Ly8vLi9tYWluLnRzIiwid2VicGFjazovLy9ub2RlLWZldGNoIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vdXRpbCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2NyeXB0byAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3N0cmluZ19kZWNvZGVyIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vZnMgKGlnbm9yZWQpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFnQixPQUFPLENBQUMsR0FBVztJQUMvQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNqRCxDQUFDO0FBRkQsMEJBRUM7QUFJTSxLQUFLLFVBQVUsS0FBSyxDQUFDLEdBQUc7SUFDM0IsT0FBTyxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBQyxFQUFFO1FBQ2hDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUMsQ0FBQztBQUNOLENBQUM7QUFORCxzQkFNQztBQUdELGFBQWE7QUFDYixRQUFnQixDQUFDLE1BQUssQ0FBQyxLQUFZLEVBQUMsS0FBYSxFQUFDLEdBQVc7SUFDekQscUNBQXFDO0lBQ3JDLElBQUcsS0FBSyxJQUFFLElBQUksSUFBRSxHQUFHLElBQUUsSUFBSSxFQUFDO1FBQ3RCLEdBQUc7UUFDSCxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztLQUMzQjtTQUNJLElBQUcsR0FBRyxJQUFFLElBQUksRUFBQztRQUNkLEdBQUc7UUFDSCxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztLQUMv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QUMsR0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDYixFQUFFLEdBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFDLEdBQUUsRUFBRTtRQUNsQixFQUFFLEdBQUMsSUFBSSxDQUFDO0lBQ1osQ0FBQztJQUNELEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLEdBQUMsR0FBRSxFQUFFO1FBQ25CLEVBQUUsR0FBQyxLQUFLLENBQUM7SUFDYixDQUFDO0FBSUwsQ0FBQztBQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7QUN4TW5CLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZSIsImZpbGUiOiJjb21tb25zfm1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJhbmRpbnQobWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICUgbWF4O1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxheShtaXMpe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKT0+e1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSwgbWlzKTtcclxuICAgIH0pICAgXHJcbn1cclxuXHJcblxyXG4vL+S7v3B5dGhvbuWfuuehgOiuvuaWvVxyXG5leHBvcnQgZnVuY3Rpb24gKnJhbmdlKHN0YXJ0Om51bWJlcixzcGFjZT86bnVtYmVyLGVuZD86bnVtYmVyKTpJdGVyYWJsZTxudW1iZXI+e1xyXG4gICAgLy/lhYHorrggcmFuZ2UoYSxjLGIpIHJhbmdlKGIpIHJhbmdlKGEsYilcclxuICAgIGlmKHNwYWNlPT1udWxsJiZlbmQ9PW51bGwpe1xyXG4gICAgICAgIC8vMVxyXG4gICAgICAgIHlpZWxkKiByYW5nZSgwLDEsc3RhcnQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbmQ9PW51bGwpe1xyXG4gICAgICAgIC8vMlxyXG4gICAgICAgIHlpZWxkKiByYW5nZShzdGFydCwxLHNwYWNlKTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgLy8zXHJcbiAgICAgICAgZm9yKGxldCBpPXN0YXJ0O2k8ZW5kO2krPXNwYWNlKXtcclxuICAgICAgICAgICAgeWllbGQgaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiogZW51bWVyYXRlPFQ+KGFycmF5bGlrZTpJdGVyYWJsZTxUPik6SXRlcmFibGU8W251bWJlcixUXT57XHJcbiAgICBsZXQgbm93PTA7XHJcbiAgICBmb3IobGV0IGEgb2YgYXJyYXlsaWtlKXtcclxuICAgICAgICB5aWVsZCBbbm93KyssYV1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFueShhcnJheWxpa2U6SXRlcmFibGU8YW55Pilcclxue1xyXG4gICAgZm9yKGxldCBhIG9mIGFycmF5bGlrZSl7XHJcbiAgICAgICAgaWYoYSkgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFsbChhcnJheWxpa2U6SXRlcmFibGU8YW55Pilcclxue1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJpbnQoZGF0YTphbnkpe1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uICp6aXAoLi4uYXJyYXlsaWtlczpJdGVyYWJsZTxhbnk+W10pe1xyXG4gICAgbGV0IGl0b3JzPWFycmF5bGlrZXMubWFwKHY9PnZbU3ltYm9sLml0ZXJhdG9yXSgpKTtcclxuICAgIGZvcig7Oyl7XHJcbiAgICAgICAgLy/lr7nmiYDmnIlpdG9y5Y+WbmV4dCDlpoLmnpzlhajpg6jmiJDlip/liJl5aWVsZCDlkKbliJnov5Tlm55cclxuICAgICAgICBsZXQgcmVzcz1pdG9ycy5tYXAodj0+di5uZXh0KCkpO1xyXG4gICAgICAgIC8vIHByaW50KHJlc3MpO1xyXG4gICAgICAgIC8v5aaC5p6c5pyJ5LiA5Liq57uT5p2fXHJcbiAgICAgICAgaWYoYW55KHJlc3MubWFwKHY9PnYuZG9uZSkpKXtcclxuICAgICAgICAgICAgLy/ov5Tlm55cclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB5aWVsZCByZXNzLm1hcCh2PT52LnZhbHVlKTtcclxuICAgIH1cclxufVxyXG4vL+WfuuacrOaTjeS9nFxyXG5leHBvcnQgZnVuY3Rpb24gc2h1ZmZsZTxUPihhcmw6SXRlcmFibGU8VD4pOlRbXXtcclxuICAgIGxldCBhPWxpc3QoYXJsKTtcclxuICAgIGxldCByPW5ldyBBcnJheShsZW4oYSkpO1xyXG4gICAgZm9yKGxldCB0IG9mIGEpe1xyXG4gICAgICAgIC8v6ZqP5py65aGr56m6XHJcbiAgICAgICAgbGV0IGlkeD1yYW5kaW50KGxlbihhKSk7XHJcbiAgICAgICAgcltpZHhdPXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc29ydGVkPFQ+KGFybDpJdGVyYWJsZTxUPixrZXk6KHY6VCk9Pm51bWJlcj1udWxsKXtcclxuICAgIGxldCByZXQ9bGlzdChhcmwpLnNvcnQoKGEsYik9PntcclxuICAgICAgICBsZXQgW2ssa2tdPVtrZXkoYSksa2V5KGIpXVxyXG4gICAgICAgIHJldHVybiBrLWtrO1xyXG4gICAgfSlcclxuICAgIHJldHVybiByZXQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJ5SWR4PFQ+KGFybDpJdGVyYWJsZTxUPixpZHhzOm51bWJlcltdKXtcclxuICAgIGxldCBsPWxpc3QoYXJsKTtcclxuICAgIGxldCByZXQ9aWR4cy5tYXAodj0+bFt2XSk7XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcbi8v5LiN5pS+5Zue6YeH5qC3XHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0PFQ+KGFybDpJdGVyYWJsZTxUPixjb3VudDpudW1iZXIpOlRbXXtcclxuICAgIC8v5LuO5LiA5Liq5YiX6KGo5Lit6YeH5qC3IOS4jeaUvuWbnlxyXG4gICAgbGV0IGE9bGlzdChhcmwpO1xyXG4gICAgbGV0IGlkeD1zaHVmZmxlKHJhbmdlKGxlbihhKSkpLnNsaWNlKDAsY291bnQpO1xyXG4gICAgcHJpbnQoaWR4KTtcclxuICAgIHJldHVybiBieUlkeChhLGlkeCk7XHJcbn1cclxuLy/mnInmlL7lm57ph4fmoLdcclxuZXhwb3J0IGZ1bmN0aW9uIHNhbXBsZTxUPihhcmw6SXRlcmFibGU8VD4sY291bnQ6bnVtYmVyKTpUW117XHJcbiAgICAvL+S7juS4gOS4quWIl+ihqOS4remHh+agtyDmnInmlL7lm55cclxuICAgIGxldCBhPWxpc3QoYXJsKTtcclxuICAgIGxldCBpZHg9bGlzdChyYW5nZShsZW4oYSkpKS5tYXAodj0+cmFuZGludChsZW4oYSkpKTtcclxuICAgIHJldHVybiBieUlkeChhLGlkeCk7XHJcbn1cclxuLy/mlbDlraZcclxuZXhwb3J0IGxldCBtaW49TWF0aC5taW47XHJcbmV4cG9ydCBsZXQgbWF4PU1hdGgubWF4O1xyXG5cclxuLyoqXHJcbiAqIOaPkuWFpVxyXG4gKiBAcGFyYW0gYXJsIOaVsOe7hFxyXG4gKiBAcGFyYW0gcG9pbnQg5o+S5YWl5L2N572uIOaPkuWFpeWIsOi/meS4quS9jee9rueahOWFg+e0oOWJjemdoiDkuLogMC1sZW4oYXJsKSDnmoTlgLxcclxuICogQHBhcmFtIHZhbCDmj5LlhaXlgLxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnQ8VD4oYXJsOkl0ZXJhYmxlPFQ+LHBvaW50Om51bWJlcix2YWw6VCk6VFtde1xyXG4gICAgbGV0IG5ld2FyPVtdXHJcbiAgICBsZXQgYT1saXN0KGFybCk7XHJcbiAgICBhLmZvckVhY2goKHYsaWR4KT0+e1xyXG4gICAgICAgIGlmKHBvaW50PT1pZHgpIG5ld2FyLnB1c2godmFsKTtcclxuICAgICAgICBuZXdhci5wdXNoKHYpO1xyXG4gICAgfSk7XHJcbiAgICBpZihsZW4oYSk9PXBvaW50KSBuZXdhci5wdXNoKHZhbCk7XHJcbiAgICByZXR1cm4gbmV3YXI7XHJcbn1cclxuXHJcbi8v5Z+65pys5pWw5o2uXHJcbmludGVyZmFjZSBBc0ludHtcclxuICAgIHRvSW50KCk6bnVtYmVyO1xyXG59XHJcbmludGVyZmFjZSBBc0Zsb2F0e1xyXG4gICAgdG9GbG9hdCgpOm51bWJlcjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaW50KG90aGVyOnN0cmluZ3xudW1iZXJ8QXNJbnQpe1xyXG4gICAgaWYodHlwZW9mIG90aGVyPT1cInN0cmluZ1wiKSByZXR1cm4gcGFyc2VJbnQob3RoZXIpO1xyXG4gICAgZWxzZSBpZih0eXBlb2Ygb3RoZXI9PVwibnVtYmVyXCIpIHJldHVybiBvdGhlcnwwO1xyXG4gICAgZWxzZSBpZihcInRvSW50XCIgaW4gb3RoZXIpe1xyXG4gICAgICAgIHJldHVybiBvdGhlci50b0ludCgpXHJcbiAgICB9ZWxzZSByZXR1cm4gMDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZmxvYXQob3RoZXI6c3RyaW5nfG51bWJlcnxBc0Zsb2F0KXtcclxuICAgIGlmKHR5cGVvZiBvdGhlcj09XCJzdHJpbmdcIikgcmV0dXJuIHBhcnNlRmxvYXQob3RoZXIpO1xyXG4gICAgZWxzZSBpZih0eXBlb2Ygb3RoZXI9PVwibnVtYmVyXCIpIHJldHVybiBvdGhlcjtcclxuICAgIGVsc2UgaWYoXCJ0b0Zsb2F0XCIgaW4gb3RoZXIpe1xyXG4gICAgICAgIHJldHVybiBvdGhlci50b0Zsb2F0KClcclxuICAgIH1lbHNlIHJldHVybiAwO1xyXG59XHJcbi8v5pWw5o2u5a655Zmo5p6E6YCg5Yy65Z+fXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGlzdDxUPihpdGVyPzpJdGVyYWJsZTxUPik6QXJyYXk8VD57XHJcbiAgICBpZihpdGVyPT1udWxsKSByZXR1cm4gbGlzdChbXSk7XHJcbiAgICBsZXQgcmV0PVtdXHJcbiAgICBmb3IobGV0IGEgb2YgaXRlcil7XHJcbiAgICAgICAgcmV0LnB1c2goYSlcclxuICAgIH1cclxuICAgIHJldHVybiByZXQ7XHJcbn1cclxuLy/ono3lkIjlr7nosaEgXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9PYmoobWFwOk1hcDxhbnksYW55Pil7XHJcbiAgICAvL1xyXG4gICAgbGV0IHI9bmV3IFByb3h5KHt9LHtcclxuICAgICAgICBnZXQodGFyZ2V0LHA6YW55LHJlY2VpdmVyKXtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcC5nZXQocCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQodGFyZ2V0LHA6YW55LHZhbHVlLHJlY2VpdmUpe1xyXG4gICAgICAgICAgICBtYXAuc2V0KHAsdmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhhcyh0YXJnZXQscDphbnkpe1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwLmhhcyhwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlbGV0ZVByb3BlcnR5ICh0YXJnZXQsIHApOiBib29sZWFue1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwLmRlbGV0ZShwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRlZmluZVByb3BlcnR5ICh0YXJnZXQsIHAsIGF0dHJpYnV0ZXM6IFByb3BlcnR5RGVzY3JpcHRvcik6IGJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1hcC5zZXQocCxhdHRyaWJ1dGVzLnZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhdGUgKHRhcmdldCk6IGFueVtdXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdChtYXAua2V5cygpKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG93bktleXMgKHRhcmdldCk6IGFueVtdXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdChtYXAua2V5cygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYXBwbHkgKHRhcmdldCwgdGhpc0FyZzogYW55LCBhcmdBcnJheT86IGFueSk6IGFueVxyXG4gICAgICAgIC8vIHtcclxuXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyBjb25zdHJ1Y3QgKHRhcmdldCwgYXJnQXJyYXk6IGFueSwgbmV3VGFyZ2V0PzogYW55KTogb2JqZWN0XHJcbiAgICAgICAgLy8ge1xyXG5cclxuICAgICAgICAvLyB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcDxLLFY+KGFybDpJdGVyYWJsZTxbSyxWXT4pe1xyXG4gICAgcmV0dXJuIG5ldyBNYXA8SyxWPihhcmwpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzZXQ8VD4oYXJsOkl0ZXJhYmxlPFQ+KVxyXG57XHJcbiAgICByZXR1cm4gbmV3IFNldDxUPihhcmwpO1xyXG59XHJcblxyXG4vL+aVsOaNruaTjeS9nFxyXG5leHBvcnQgZnVuY3Rpb24gKmtleXM8Sz1hbnksVj1hbnk+KG9iajpvYmplY3R8TWFwPEssVj4pXHJcbntcclxuICAgIC8v5Y+W5a+56LGh55qEa2V55oiWbWFw55qE5omA5pyJa2V5IOaemuS4vlxyXG4gICAgaWYob2JqIGluc3RhbmNlb2YgTWFwKXtcclxuICAgICAgICAvL+aemuS4vlxyXG4gICAgICAgIGZvcihsZXQgYSBvZiBvYmoua2V5cygpKXtcclxuICAgICAgICAgICAgeWllbGQgYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHR5cGVvZiBvYmogPT1cIm9iamVjdFwiKXtcclxuICAgICAgICBmb3IobGV0IGsgaW4gb2JqKXtcclxuICAgICAgICAgICAgeWllbGQgaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbnR5cGUgSGFzTGVuZ3RoPXtsZW5ndGg6bnVtYmVyfXx7c2l6ZTpudW1iZXJ9fHtjb3VudDpudW1iZXJ9fHtfX2xlbl9fKCk6bnVtYmVyfTtcclxuLy/ku6XkuIvkuLrosIPnlKjljY/orq5cclxuZXhwb3J0IGZ1bmN0aW9uIGxlbihvYmo6SXRlcmFibGU8YW55PnxIYXNMZW5ndGh8b2JqZWN0KXtcclxuICAgIGlmKFwibGVuZ3RoXCIgaW4gb2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqLmxlbmd0aFxyXG4gICAgfWVsc2UgaWYgKFwic2l6ZVwiIGluIG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iai5zaXplO1xyXG4gICAgfWVsc2UgaWYoXCJjb3VudFwiIGluIG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iai5jb3VudDtcclxuICAgIH1lbHNlIGlmKFwiX19sZW5fX1wiIGluIG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iai5fX2xlbl9fKClcclxuICAgIH1lbHNlIGlmKHR5cGVvZiBvYmo9PVwib2JqZWN0XCIpe1xyXG4gICAgICAgIGxldCBzdW09MDtcclxuICAgICAgICBmb3IobGV0IGsgaW4gb2JqKXtcclxuICAgICAgICAgICAgc3VtKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vLyAvL+exu+Wei+WHveaVsOaKiuS4gOS4quexu+Wei+aYoOWwhOS4uuWPpuS4gOS4quexu+Wei1xyXG4vLyAvL+WvueixoeaYoOWwhOWHveaVsO+8jOaKiuS4gOS4quWvueixoeS4reeahOavj+S4quWxnuaAp+S9v+eUqOS4gOS4qm1hcHBlcuaYoOWwhFxyXG4vLyAvL+mAkuW9kuWvueixoeaYoOWwhOWHveaVsO+8jOaKiuS4gOS4quWvueixoeS4reeahOaJgOaciemdnuWvueixoeWxnuaAp+S9v+eUqG1hcHBlcuaYoOWwhO+8jOWvueixoemAkuW9kuaYoOWwhFxyXG4vLyB0eXBlIE1hcHBlcjxBLEI+PVtBLEJdO1xyXG4vLyB0eXBlIE1hcFRvPFQgZXh0ZW5kcyBNYXBwZXI8YW55LGFueT4sQz49QyBleHRlbmRzIFRbMF0/IFRbMV06bmV2ZXI7XHJcbi8vIHR5cGUgU3dpdGNoPFQsIFUgZXh0ZW5kcyBhbnk+ID1cclxuLy8gICAgIFQgZXh0ZW5kcyBrZXlvZiBVID8gVVtUXSA6IFVbXCJkZWZhdWx0XCJdO1xyXG5cclxuLy8gLy8g6I635Y+W56ys5LiA5Liq5YWD57SgXHJcbi8vIGV4cG9ydCB0eXBlIEhlYWQ8VD4gPSBUIGV4dGVuZHMgeyAwOiBpbmZlciBIIH0gPyBIIDogbmV2ZXI7XHJcbi8vIC8vIOenu+mZpOesrOS4gOS4quWFg+e0oFxyXG4vLyBleHBvcnQgdHlwZSBUYWlsPFQ+ID0gKFxyXG4vLyAgICAgKC4uLmE6IFQgZXh0ZW5kcyBhbnlbXSA/IFQgOiBuZXZlcikgPT4gdm9pZFxyXG4vLyApIGV4dGVuZHMgKGE6IGFueSwgLi4uYjogaW5mZXIgUikgPT4gdm9pZCA/IFIgOiBuZXZlcjtcclxuLy8gZXhwb3J0IHR5cGUgVW5zaGlmdDxULCBBPiA9IChcclxuLy8gICAgIChhOiBBLCAuLi5iOiBUIGV4dGVuZHMgYW55W10gPyBUIDogbmV2ZXIpID0+IHZvaWRcclxuLy8gKSBleHRlbmRzICguLi5hOiBpbmZlciBSKSA9PiB2b2lkID8gUiA6IG5ldmVyO1xyXG4vLyAvLyDlnKjlsL7pg6jliqDlhaXkuIDkuKrlhYPntKBcclxuLy8gZXhwb3J0IHR5cGUgQ29weTxULCBTIGV4dGVuZHMgYW55PiA9IHsgW1AgaW4ga2V5b2YgVF06IFNbUF0gfTtcclxuLy8gZXhwb3J0IHR5cGUgUHVzaDxULCBBPiA9IENvcHk8VW5zaGlmdDxULCBhbnk+LCBUICYgUmVjb3JkPHN0cmluZywgQT4+O1xyXG5cclxuXHJcblxyXG4vLyB0eXBlIE11bHRpTWFwVG88VCBleHRlbmRzIGFueVtdLEMsaz1cInN0dWZmXCI+PVRbXCJsZW5ndGhcIl0gZXh0ZW5kcyAwPyBNYXBUbzxUWzBdLEM+OlxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDIGV4dGVuZHMgVFswXVswXT8gVFswXVsxXTpTd2l0Y2g8ayx7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHVmZjpNdWx0aU1hcFRvPFRhaWw8VD4sQyxrPlxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9PjtcclxuXHJcbi8vIHR5cGUgT2JqZWN0VHlwZU1hcDxDIGV4dGVuZHMgTWFwcGVyPGFueSxhbnk+W10sVCBleHRlbmRzIG9iamVjdD49e1tQIGluIGtleW9mIFRdOk11bHRpTWFwVG88QyxUW1BdPn07XHJcblxyXG4vLyAvL+WunueOsOmAkuW9kuaApyDlsJrmnKrlrp7njrBcclxuLy8gdHlwZSBPYmplY3RNYXBwZXI8VCBleHRlbmRzIG9iamVjdCxDIGV4dGVuZHMgTWFwcGVyPGFueSwgYW55PltdPj1bVCxPYmplY3RUeXBlTWFwPEMsVD5dXHJcblxyXG4vLyB0eXBlIHM9W1tudW1iZXIsc3RyaW5nXSxbc3RyaW5nLG51bWJlcl0sT2JqZWN0TWFwcGVyPG9iamVjdCxzPl07XHJcbi8vIHR5cGUgbz17XHJcbi8vICAgICBhOnN0cmluZyxcclxuLy8gICAgIGI6bnVtYmVyLFxyXG4vLyAgICAgYzp7XHJcbi8vICAgICAgICAgZDpzdHJpbmcsXHJcbi8vICAgICAgICAgZTpudW1iZXJcclxuLy8gICAgIH1cclxuLy8gfTtcclxuLy8gdHlwZSByPU9iamVjdFR5cGVNYXA8cyxvPjtcclxuXHJcblxyXG4vLyAvL+WAvOWMluexu+Wei+WumuS5iVxyXG5cclxuLy8gLy/nsbvlnovliKTmlq3nlKhcclxuLy8gdHlwZSBUeXBlUmVwPFQsVj1zdHJpbmc+PXtcclxuLy8gICAgIHZhbHVlOlYsXHJcbi8vICAgICB0eXBlOlRcclxuLy8gfTtcclxuLy8gLy/nqIvluo/nlKjnmoRcclxuLy8gbGV0IHR5cGVfYXJyYXk9XCJhcnJheVwiO1xyXG4vLyBsZXQgdHlwZV9udW1iZXI9XCJudW1iZXJcIjtcclxuLy8gbGV0IHR5cGVfc3RyaW5nPVwic3RyaW5nXCI7XHJcbi8vIC8v5YC86YOo5YiGXHJcblxyXG4vLyBmdW5jdGlvbiBnZXRhcnJheTxUPih2YWx1ZTpUKTpUeXBlUmVwPFwiYXJyYXlcIixUPntcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgdmFsdWU6dmFsdWUsXHJcbi8vICAgICAgICAgdHlwZTpcImFycmF5XCJcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBmdW5jdGlvbiBnZXRudW1iZXI8VD4odmFsdWU6VCk6VHlwZVJlcDxcIm51bWJlclwiLFQ+e1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICB2YWx1ZTp2YWx1ZSxcclxuLy8gICAgICAgICB0eXBlOlwibnVtYmVyXCJcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBmdW5jdGlvbiBnZXRzdHJpbmc8VD4odmFsdWU6VCk6VHlwZVJlcDxcInN0cmluZ1wiLFQ+e1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICB2YWx1ZTp2YWx1ZSxcclxuLy8gICAgICAgICB0eXBlOlwic3RyaW5nXCJcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyAvL+aYoOWwhOmDqOWIhlxyXG4vLyAvL+aYoOWwhOWZqFxyXG4vLyB0eXBlIFJlcE1hcDxBLEI+PU1hcHBlcjxUeXBlUmVwPEE+LEI+O1xyXG4vLyAvL+exu+Wei+aYoOWwhOWZqFxyXG4vLyB0eXBlIFJlcE1hcHBlcnM9W1JlcE1hcDxcInN0cmluZ1wiLHN0cmluZz4sXHJcbi8vICAgICAgICAgICAgICAgICBSZXBNYXA8XCJudW1iZXJcIixudW1iZXI+LFxyXG4vLyAgICAgICAgICAgICAgICAgUmVwTWFwPFwiYXJyYXlcIixhbnlbXT5dXHJcblxyXG4vLyAvL+aYoOWwhHJlcOexu+Wei+WIsOato+W4uOexu+Wei1xyXG4vLyB0eXBlIEV4dHJhY3Q8UmVwPj1NdWx0aU1hcFRvPFJlcE1hcHBlcnMsUmVwPjtcclxuLy8gLy/mmKDlsIRtb2RlbCDliLAgcGFyc2XlkI7nsbvlnotcclxuLy8gdHlwZSBNYXBNb2RlbDxNb2RlbFR5cGUgZXh0ZW5kcyB7W1AgaW4ga2V5b2YgTW9kZWxUeXBlXTpUeXBlUmVwPGFueT59Pj1PYmplY3RUeXBlTWFwPFJlcE1hcHBlcnMsTW9kZWxUeXBlPlxyXG5cclxuLy8gbGV0IG1vZGVsPXtcclxuLy8gICAgIHRpdGxlOmdldHN0cmluZyhcIi50aXRsZVwiKSxcclxuLy8gICAgIGxpc3Q6Z2V0YXJyYXkoXCIuYXJyYXlcIilcclxuLy8gfVxyXG4vLyB0eXBlIGE9TWFwTW9kZWw8dHlwZW9mIG1vZGVsPjtcclxuLy8gZnVuY3Rpb24gcGFyc2UoYm9keSxtb2RlbDpvYmplY3QpOk1hcE1vZGVsPHR5cGVvZiBtb2RlbD57XHJcbi8vICAgICByZXR1cm4gbnVsbDtcclxuLy8gfVxyXG4iLCJpbXBvcnQgKiBhcyB0ZiBmcm9tIFwiQHRlbnNvcmZsb3cvdGZqc1wiXHJcbmltcG9ydCB7IGRlbGF5LCBpbnQsIGZsb2F0IH0gZnJvbSAnLi9saWJzL2xpYic7XHJcblxyXG5cclxuLy/lpoLmnpznrYnkuo7liJnkuLoxIOWQpuWImeWImeS4ujBcclxuZnVuY3Rpb24gZXF1YWxNYXA8VCBleHRlbmRzIHRmLlRlbnNvcj4odHM6VCxlcXV0bzpudW1iZXIpe1xyXG4gICAgcmV0dXJuIHRzLmRpdihlcXV0bykuc3ViKDEpLmFicygpLmxlc3NFcXVhbCgwKTtcclxufVxyXG5cclxuLy8xLTAg5Y+Y5o2iXHJcbmZ1bmN0aW9uIHJldmVyc2VCb29sKHRzOnRmLlRlbnNvcil7XHJcbiAgICByZXR1cm4gdHMuc3ViKDEpLmFicygpO1xyXG59XHJcbi8vMC0xIOWPmOS4uiAgLTEgMVxyXG5mdW5jdGlvbiBzeW1saXplKHRzOnRmLlRlbnNvcil7XHJcbiAgICByZXR1cm4gdHMubXVsKDIpLnN1YigxKTtcclxufVxyXG5mdW5jdGlvbiBleHBhbmRUbzREKHRzOnRmLlRlbnNvcjJEKTp0Zi5UZW5zb3I0RHtcclxuICAgIC8v6L+Z5Liq5oqKMmQgZmVhdHVyZW1hcOWPmOS4ujRk5Y+v5Lul55u05o6l6L+b6KGM5Y2356ev5pON5L2c55qEZmVhdHVyZW1hcOaIlmtlcm5lbFxyXG4gICAgLy/kuZ/lsLHmmK/nm7TmjqXlr7lmZWF0dXJlbWFw6L+b6KGM5Y2356evXHJcbiAgICAvL+WPmOaIkG5od2NcclxuICAgIGxldCBzPXRzLmV4cGFuZERpbXMoMCkuZXhwYW5kRGltcygtMSkgYXMgdGYuVGVuc29yNEQ7XHJcbiAgICAvL+aJqeWxleS4gOS4quWJjemdoueahG7lkozkuIDkuKrlkI7pnaLnmoRjXHJcbiAgICByZXR1cm4gcztcclxuXHJcbn1cclxuZnVuY3Rpb24gZGVsZXRlRGltVG8yRCh0czp0Zi5UZW5zb3I0RCk6dGYuVGVuc29yMkR7XHJcbiAgICAvL+i/meS4quaKijJkIGZlYXR1cmVtYXDlj5jkuLo0ZOWPr+S7peebtOaOpei/m+ihjOWNt+enr+aTjeS9nOeahGZlYXR1cmVtYXDmiJZrZXJuZWxcclxuICAgIC8v5Lmf5bCx5piv55u05o6l5a+5ZmVhdHVyZW1hcOi/m+ihjOWNt+enr1xyXG4gICAgLy/lj5jmiJBuaHdjXHJcbiAgICBsZXQgcz10cy5zcXVlZXplKFswLDNdKSBhcyB0Zi5UZW5zb3IyRDtcclxuICAgIC8v5omp5bGV5LiA5Liq5YmN6Z2i55qEbuWSjOS4gOS4quWQjumdoueahGNcclxuICAgIHJldHVybiBzO1xyXG5cclxufVxyXG5mdW5jdGlvbiBiMnMzKHRzOnRmLlRlbnNvcjJEKXtcclxuICAgIC8v55Sf5ZG95ri45oiP5Y2356evIOS7juS4gOS4qmZlYXR1cmUgbWFwIOW+l+WIsOS4i+S4gOS4qmZlYXR1cmVtYXBcclxuICAgIC8v5Y6f5aeLIFMg5Y2356ev5b6X5YiwSyDnhLblkI5LK1Mg5b6X5YiwUCDnhLblkI7lr7lQ5L2/55SoZXF1YWxNYXAzIOW+l+WIsOS6jOWAvOWMlueahOS4i+S4gOS4qlxyXG4gICAgLy9mZWF0dXJlbWFwXHJcbiAgICBsZXQga2VyPXRmLnRlbnNvcjJkKFtcclxuICAgICAgICBbMSwxLDFdLFxyXG4gICAgICAgIFsxLDAsMV0sXHJcbiAgICAgICAgWzEsMSwxXVxyXG4gICAgXSkuZXhwYW5kRGltcygtMSkuZXhwYW5kRGltcygtMSkgYXMgdGYuVGVuc29yNEQ7XHJcbiAgICAvL+aKinRz5Y+Y5Li6NGRcclxuICAgIGxldCBTPWV4cGFuZFRvNEQodHMpO1xyXG4gICAgbGV0IEs9Uy5jb252MmQoa2VyLDEsXCJzYW1lXCIsXCJOSFdDXCIpO1xyXG4gICAgLy/orqHnrpdcclxuICAgIGxldCBLMj1lcXVhbE1hcChLLDIpO1xyXG4gICAgbGV0IEszPWVxdWFsTWFwKEssMyk7XHJcbiAgICAvL+WPoOWKoFxyXG4gICAgbGV0IFA9dGYuemVyb3NMaWtlKFMpO1xyXG4gICAgUD1QLmFkZChLMi5tdWwoUykpO1xyXG4gICAgUD1QLmFkZChLMyk7XHJcbiAgICByZXR1cm4gZGVsZXRlRGltVG8yRChQIGFzIHRmLlRlbnNvcjREKTtcclxufVxyXG5cclxuXHJcbmNsYXNzIERyYXd7XHJcbiAgICBjdHg6Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgdGN0eDpPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBvZmY6T2Zmc2NyZWVuQ2FudmFzO1xyXG4gICAgaDpudW1iZXI7dzpudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlOkhUTUxDYW52YXNFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgcHVibGljIHJzOm51bWJlcixcclxuICAgICAgICAgICAgICAgIHB1YmxpYyBjczpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgLy/ov5nph4zlvpfliLAyZCDkuIrkuIvmlocg6K6h566X5qC85a2Q5aSn5bCPXHJcbiAgICAgICAgbGV0IGN0eD1lbGUuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMuY3R4PWN0eDtcclxuICAgICAgICAvL+iuoeeul+agvOWtkOWkp+Wwj1xyXG4gICAgICAgIHRoaXMuaD1lbGUuaGVpZ2h0O3RoaXMudz1lbGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5jaD10aGlzLmgvcnM7XHJcbiAgICAgICAgdGhpcy5jdz10aGlzLncvY3M7XHJcbiAgICAgICAgLy9jYWNoZVxyXG4gICAgICAgIHRoaXMub2ZmPW5ldyBPZmZzY3JlZW5DYW52YXModGhpcy53LHRoaXMuaCk7XHJcbiAgICAgICAgdGhpcy50Y3R4PXRoaXMub2ZmLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIH1cclxuICAgIGNoOm51bWJlcjtcclxuICAgIGN3Om51bWJlcjtcclxuICAgIHB1YmxpYyBkcmF3UG9pbnQoeCx5LGM6c3RyaW5nKXtcclxuICAgICAgICBsZXQgcng6IG51bWJlcixyeTogbnVtYmVyO1xyXG4gICAgICAgIHJ4PXgqdGhpcy5jdztcclxuICAgICAgICByeT15KnRoaXMuY2g7XHJcbiAgICAgICAgLy/nu5jliLYgPz8/XHJcbiAgICAgICAgdGhpcy50Y3R4LmZpbGxTdHlsZT1jO1xyXG4gICAgICAgIHRoaXMudGN0eC5maWxsUmVjdChyeCxyeSx0aGlzLmN3LHRoaXMuY2gpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIGFzeW5jIGRyYXcyRCh0czp0Zi5UZW5zb3IyRCl7XHJcbiAgICAgICAgLy8gdGhpcy50Y3R4LmNsZWFyUmVjdCgwLDAsdGhpcy53LHRoaXMuaCk7XHJcbiAgICAgICAgdGhpcy50Y3R4LmZpbGxTdHlsZT1cIiNmZmZmZmZcIjtcclxuICAgICAgICB0aGlzLnRjdHguZmlsbFJlY3QoMCwwLHRoaXMudyx0aGlzLmgpO1xyXG4gICAgICAgIGxldCBhcnI9YXdhaXQgdHMuYXJyYXkoKTtcclxuICAgICAgICBhcnIuZm9yRWFjaCgoYSxpKT0+YS5mb3JFYWNoKCh2LGopPT57XHJcbiAgICAgICAgICAgIC8v57uY5Yi2IDDntKLlvJXlr7nlupTliJdcclxuICAgICAgICAgICAgbGV0IGE9WyxcIiNmZjAwMDBcIl1cclxuICAgICAgICAgICAgaWYodj09MSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1BvaW50KGosaSxhWzFdKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy50Y3R4LmZpbGwoKTtcclxuICAgICAgICAvL+e7mOWItuWIsOeUu+W4g1xyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLm9mZiwwLDApO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLy/nu5jlm74g57uY5Yi25YiwY2FudmFzXHJcbmZ1bmN0aW9uIGRyYXdGZWF0dXJlTWFwKHRzOnRmLlRlbnNvcjJEKXtcclxuXHJcbn1cclxuZnVuY3Rpb24gZ2V0dmFsKGlkOnN0cmluZyl7XHJcbiAgICBsZXQgZT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgaW5wdXQjJHtpZH1gKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgcmV0dXJuIGUudmFsdWU7XHJcbn1cclxuZnVuY3Rpb24gZ2V0KGlkOnN0cmluZyl7XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCkgYXMgSFRNTEVsZW1lbnQ7XHJcbn1cclxuYXN5bmMgZnVuY3Rpb24gbWFpbigpe1xyXG4gICAgbGV0IGVsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgZWxlLmhlaWdodD0yMDAwO1xyXG4gICAgZWxlLndpZHRoPTIwMDA7XHJcbiAgICBlbGUuaWQ9XCJjdHhcIlxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGUpO1xyXG4gICAgbGV0IHNpemU9WzEwMDAsMTAwMF1cclxuICAgIGxldCBkPW5ldyBEcmF3KGVsZSxzaXplWzBdLHNpemVbMV0pO1xyXG5cclxuICAgIGxldCBpbml0PSgpPT50Zi5yYW5kb21Vbmlmb3JtKHNpemUsMCwxLFwiZmxvYXQzMlwiKS5kaXYoZmxvYXQoZ2V0dmFsKFwicmVsXCIpKSkuZmxvb3IoKSBhcyB0Zi5UZW5zb3IyRFxyXG4gICAgbGV0IGR0PWluaXQoKTtcclxuXHJcbiAgICBkLmRyYXcyRChkdCk7XHJcbiAgICBjb25zb2xlLmxvZyhkdCk7XHJcbiAgICBsZXQgcD10cnVlO1xyXG4gICAgbGV0IHNsPWZhbHNlO1xyXG4gICAgbGV0IG49MDtcclxuICAgIC8vbG9vcFxyXG4gICAgYXN5bmMgZnVuY3Rpb24gbG9vcCgpe1xyXG4gICAgICAgIGxldCBkZWxheXQ9aW50KGdldHZhbChcImRlbGF5XCIpKTtcclxuICAgICAgICBmb3IoOzspe1xyXG4gICAgICAgICAgICBhd2FpdCBkZWxheShkZWxheXQpO1xyXG4gICAgICAgICAgICBsZXQgb2xkPWR0O1xyXG4gICAgICAgICAgICBkdD10Zi50aWR5KCgpPT5iMnMzKG9sZCkpO1xyXG4gICAgICAgICAgICBvbGQuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZHQpO1xyXG4gICAgICAgICAgICAvL+mdnumdmem7mFxyXG4gICAgICAgICAgICBpZighc2wpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkLmRyYXcyRChkdCk7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGlmKHApIGJyZWFrO1xyXG4gICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgIC8v5pi+56S66L2uXHJcbiAgICAgICAgICAgIGdldChcIm5cIikuaW5uZXJUZXh0PW4udG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgLy9ldmVudFxyXG4gICAgZ2V0KFwic3RhcnRcIikub25jbGljaz1hc3luYygpPT57XHJcbiAgICAgICAgaWYocCl7XHJcbiAgICAgICAgICAgIHA9ZmFsc2U7XHJcbiAgICAgICAgICAgIGxvb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0KFwic3RhcnRcIikuc3R5bGUuYmFja2dyb3VuZD1cIiMxMTExMTFcIlxyXG4gICAgICAgIGdldChcInBhdXNlXCIpLnN0eWxlLmJhY2tncm91bmQ9XCJcIlxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgZ2V0KFwicGF1c2VcIikub25jbGljaz1hc3luYygpPT57XHJcbiAgICAgICAgcD10cnVlO1xyXG4gICAgICAgIGdldChcInN0YXJ0XCIpLnN0eWxlLmJhY2tncm91bmQ9XCJcIlxyXG4gICAgICAgIGdldChcInBhdXNlXCIpLnN0eWxlLmJhY2tncm91bmQ9XCIjMTExMTExXCJcclxuICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICB9XHJcbiAgICBnZXQoXCJyZXNldFwiKS5vbmNsaWNrPWFzeW5jKCk9PntcclxuICAgICAgICBkdD1pbml0KCk7XHJcbiAgICAgICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgICAgIG49MDtcclxuICAgIH1cclxuICAgIGdldChcImN0eFwiKS5vbmNsaWNrPWU9PntcclxuICAgICAgICBsZXQgeCx5O1xyXG4gICAgICAgIHg9ZS5vZmZzZXRYO1xyXG4gICAgICAgIHk9ZS5vZmZzZXRZO1xyXG4gICAgICAgIGlmKHg8MHx8eTwwKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGRhdGE9ZHQuYXJyYXlTeW5jKCk7XHJcbiAgICAgICAgbGV0IHR4LHR5O1xyXG4gICAgICAgIHR4PU1hdGguZmxvb3IoeC9kLmN3KTtcclxuICAgICAgICB0eT1NYXRoLmZsb29yKHkvZC5jaClcclxuICAgICAgICBkYXRhW3R5XVt0eF09ZGF0YVt0eV1bdHhdPT0wPyAxOjA7XHJcbiAgICAgICAgZHQuZGlzcG9zZSgpO1xyXG4gICAgICAgIGR0PXRmLnRlbnNvcihkYXRhKTtcclxuICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICB9XHJcbiAgICBnZXQoXCJzbFwiKS5vbmNsaWNrPSgpPT57XHJcbiAgICAgICAgc2w9dHJ1ZTtcclxuICAgIH1cclxuICAgIGdldChcIm5zbFwiKS5vbmNsaWNrPSgpPT57XHJcbiAgICAgICAgc2w9ZmFsc2U7XHJcbiAgICB9XHJcbiAgIFxyXG4gICAgXHJcbiAgICBcclxufVxyXG53aW5kb3cub25sb2FkPW1haW47XHJcbiIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=
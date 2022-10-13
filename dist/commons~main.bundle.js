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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.len = exports.keys = exports.set = exports.map = exports.mapToObj = exports.list = exports.float = exports.str = exports.int = exports.insert = exports.max = exports.min = exports.sample = exports.extract = exports.byIdx = exports.sorted = exports.shuffle = exports.zip = exports.print = exports.all = exports.any = exports.enumerate = exports.range = exports.delay = exports.randint = void 0;
function randint(max) {
    return Math.floor(Math.random() * max) % max;
}
exports.randint = randint;
function delay(mis) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(function () {
                        resolve();
                    }, mis);
                })];
        });
    });
}
exports.delay = delay;
//仿python基础设施
function range(start, space, end) {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(space == null && end == null)) return [3 /*break*/, 2];
                //1
                return [5 /*yield**/, __values(range(0, 1, start))];
            case 1:
                //1
                _a.sent();
                return [3 /*break*/, 8];
            case 2:
                if (!(end == null)) return [3 /*break*/, 4];
                //2
                return [5 /*yield**/, __values(range(start, 1, space))];
            case 3:
                //2
                _a.sent();
                return [3 /*break*/, 8];
            case 4:
                i = start;
                _a.label = 5;
            case 5:
                if (!(i < end)) return [3 /*break*/, 8];
                return [4 /*yield*/, i];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                i += space;
                return [3 /*break*/, 5];
            case 8: return [2 /*return*/];
        }
    });
}
exports.range = range;
function enumerate(arraylike) {
    var now, arraylike_1, arraylike_1_1, a, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                now = 0;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, 7, 8]);
                arraylike_1 = __values(arraylike), arraylike_1_1 = arraylike_1.next();
                _b.label = 2;
            case 2:
                if (!!arraylike_1_1.done) return [3 /*break*/, 5];
                a = arraylike_1_1.value;
                return [4 /*yield*/, [now++, a]];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                arraylike_1_1 = arraylike_1.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (arraylike_1_1 && !arraylike_1_1.done && (_a = arraylike_1.return)) _a.call(arraylike_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}
exports.enumerate = enumerate;
function any(arraylike) {
    var e_2, _a;
    try {
        for (var arraylike_2 = __values(arraylike), arraylike_2_1 = arraylike_2.next(); !arraylike_2_1.done; arraylike_2_1 = arraylike_2.next()) {
            var a = arraylike_2_1.value;
            if (a)
                return true;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (arraylike_2_1 && !arraylike_2_1.done && (_a = arraylike_2.return)) _a.call(arraylike_2);
        }
        finally { if (e_2) throw e_2.error; }
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
function zip() {
    var _i, itors, ress;
    var arraylikes = [];
    for (_i = 0; _i < arguments.length; _i++) {
        arraylikes[_i] = arguments[_i];
    }
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                itors = arraylikes.map(function (v) { return v[Symbol.iterator](); });
                _a.label = 1;
            case 1:
                ress = itors.map(function (v) { return v.next(); });
                if (!any(ress.map(function (v) { return v.done; }))) return [3 /*break*/, 2];
                //返回
                return [2 /*return*/, undefined];
            case 2: return [4 /*yield*/, ress.map(function (v) { return v.value; })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}
exports.zip = zip;
//基本操作
function shuffle(arl) {
    var e_3, _a;
    var a = list(arl);
    var r = new Array(len(a));
    try {
        for (var a_1 = __values(a), a_1_1 = a_1.next(); !a_1_1.done; a_1_1 = a_1.next()) {
            var t = a_1_1.value;
            //随机填空
            var idx = randint(len(a));
            r[idx] = t;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (a_1_1 && !a_1_1.done && (_a = a_1.return)) _a.call(a_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return r;
}
exports.shuffle = shuffle;
function sorted(arl, key) {
    if (key === void 0) { key = null; }
    var ret = list(arl).sort(function (a, b) {
        var _a = __read([key(a), key(b)], 2), k = _a[0], kk = _a[1];
        return k - kk;
    });
    return ret;
}
exports.sorted = sorted;
function byIdx(arl, idxs) {
    var l = list(arl);
    var ret = idxs.map(function (v) { return l[v]; });
    return ret;
}
exports.byIdx = byIdx;
//不放回采样
function extract(arl, count) {
    //从一个列表中采样 不放回
    var a = list(arl);
    var idx = shuffle(range(len(a))).slice(0, count);
    print(idx);
    return byIdx(a, idx);
}
exports.extract = extract;
//有放回采样
function sample(arl, count) {
    //从一个列表中采样 有放回
    var a = list(arl);
    var idx = list(range(len(a))).map(function (v) { return randint(len(a)); });
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
    var newar = [];
    var a = list(arl);
    a.forEach(function (v, idx) {
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
    var e_4, _a;
    if (iter == null)
        return list([]);
    var ret = [];
    try {
        for (var iter_1 = __values(iter), iter_1_1 = iter_1.next(); !iter_1_1.done; iter_1_1 = iter_1.next()) {
            var a = iter_1_1.value;
            ret.push(a);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (iter_1_1 && !iter_1_1.done && (_a = iter_1.return)) _a.call(iter_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return ret;
}
exports.list = list;
//融合对象 
function mapToObj(map) {
    //
    var r = new Proxy({}, {
        get: function (target, p, receiver) {
            return map.get(p);
        },
        set: function (target, p, value, receive) {
            map.set(p, value);
            return true;
        },
        has: function (target, p) {
            return map.has(p);
        },
        deleteProperty: function (target, p) {
            return map.delete(p);
        },
        defineProperty: function (target, p, attributes) {
            map.set(p, attributes.value);
            return true;
        },
        ownKeys: function (target) {
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
function keys(obj) {
    var _a, _b, a, e_5_1, _c, _d, _i, k;
    var e_5, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (!(obj instanceof Map)) return [3 /*break*/, 9];
                _f.label = 1;
            case 1:
                _f.trys.push([1, 6, 7, 8]);
                _a = __values(obj.keys()), _b = _a.next();
                _f.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 5];
                a = _b.value;
                return [4 /*yield*/, a];
            case 3:
                _f.sent();
                _f.label = 4;
            case 4:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_5_1 = _f.sent();
                e_5 = { error: e_5_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                }
                finally { if (e_5) throw e_5.error; }
                return [7 /*endfinally*/];
            case 8: return [3 /*break*/, 13];
            case 9:
                if (!(typeof obj == "object")) return [3 /*break*/, 13];
                _c = [];
                for (_d in obj)
                    _c.push(_d);
                _i = 0;
                _f.label = 10;
            case 10:
                if (!(_i < _c.length)) return [3 /*break*/, 13];
                k = _c[_i];
                return [4 /*yield*/, k];
            case 11:
                _f.sent();
                _f.label = 12;
            case 12:
                _i++;
                return [3 /*break*/, 10];
            case 13: return [2 /*return*/];
        }
    });
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
        var sum = 0;
        for (var k in obj) {
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Draw = void 0;
var tf = __importStar(__webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js"));
var matrix_tool_1 = __webpack_require__(/*! ./matrix_tool */ "./src/matrix_tool.ts");
var matrix_rules_1 = __webpack_require__(/*! ./rules/matrix_rules */ "./src/rules/matrix_rules.ts");
var Draw = /** @class */ (function () {
    function Draw(ele, rs, cs) {
        this.ele = ele;
        this.rs = rs;
        this.cs = cs;
        //这里得到2d 上下文 计算格子大小
        var ctx = ele.getContext("2d");
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
    Draw.prototype.drawPoint = function (x, y, c) {
        var rx, ry;
        rx = x * this.cw;
        ry = y * this.ch;
        //绘制 ???
        this.tctx.fillStyle = c;
        this.tctx.fillRect(rx, ry, this.cw, this.ch);
    };
    /**
     * 用于绘制01矩阵 用某个颜色表示1
     * 还需要绘制不同图层的方式 如用某些另一些颜色表示另一些东西 然后叠加
     * 还需要可以绘制实数矩阵的函数
     * @param ts 01矩阵
     */
    Draw.prototype.draw2D = function (ts) {
        return __awaiter(this, void 0, void 0, function () {
            var rgbmat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.torgb(ts)];
                    case 1:
                        rgbmat = _a.sent();
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
                        return [2 /*return*/];
                }
            });
        });
    };
    Draw.prototype.torgb = function (t) {
        return __awaiter(this, void 0, void 0, function () {
            var num, ar, pixeds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        num = tf.tidy(function () {
                            //int32 然后×一个颜色
                            var colored = t.mul(0xff0000ff | 0);
                            // let resized=vorexpand(horexpand(colored));
                            var r = _this.pixelsize[0] == _this.pixelsize[0] && _this.pixelsize[0] == 1 ? (0, matrix_tool_1.expandTo4D)(colored) : _this.upsample.call((0, matrix_tool_1.expandTo4D)(colored), {});
                            var resized = r.squeeze([0, 3]);
                            //进行rgba话 横向扩展4倍
                            // let rgb=horexpand(resized,4);
                            //颜色处理 把1 1 1 1的连续4个 变为 aaaaaaaa
                            // let cor=rgb.mul(0xaa);
                            var num = resized.asType("int32");
                            // let num=resized;
                            return num;
                        });
                        return [4 /*yield*/, num.data()];
                    case 1:
                        ar = _a.sent();
                        pixeds = new Uint8ClampedArray(ar.buffer);
                        num.dispose();
                        return [2 /*return*/, new ImageData(pixeds, num.shape[1], num.shape[0])];
                }
            });
        });
    };
    return Draw;
}());
exports.Draw = Draw;
//把01矩阵转换为像素矩阵
var size = [4, 4];


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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var tf = __importStar(__webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js"));
var lib_1 = __webpack_require__(/*! ../libs/lib */ "./libs/lib.ts");
var Draw_1 = __webpack_require__(/*! ./Draw */ "./src/Draw.ts");
var matrix_rules_1 = __webpack_require__(/*! ./rules/matrix_rules */ "./src/rules/matrix_rules.ts");
__webpack_require__(/*! @tensorflow/tfjs-backend-webgpu */ "./node_modules/@tensorflow/tfjs-backend-webgpu/dist/index.js");
__webpack_require__(/*! @tensorflow/tfjs-backend-wasm */ "./node_modules/@tensorflow/tfjs-backend-wasm/dist/index.js");
// tf.setBackend("webgl").then(r => )
function getval(id) {
    var e = document.querySelector("input#".concat(id));
    return e.value;
}
function get(id, tag) {
    if (tag === void 0) { tag = null; }
    return document.querySelector("#".concat(id));
}
var a = get("hello");
function create(tag, id, values) {
    var t = document.createElement(tag);
    t.id = id;
    //
    for (var k in values) {
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
var matrix_rules_2 = __webpack_require__(/*! ./rules/matrix_rules */ "./src/rules/matrix_rules.ts");
function initSelection() {
    for (var k in matrix_rules_2.Rules) {
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
//是否需要训练神经网络测试
var usetrain = false;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        /**
         * 随机设置函数 用以随机添加点到画布上
         */
        function randomSet(count) {
            var e_1, _a;
            try {
                for (var _b = __values((0, lib_1.range)(0, count)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var i = _c.value;
                    setpoint((0, lib_1.randint)(hsize[0]), (0, lib_1.randint)(hsize[1]));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        /**
         * 主循环 更新一帧 然后绘制
         */
        function loop() {
            return __awaiter(this, void 0, void 0, function () {
                var delayt, old;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            delayt = (0, lib_1.int)(getval("delay"));
                            _a.label = 1;
                        case 1: 
                        //随机添加点
                        // randomSet()
                        //正文
                        return [4 /*yield*/, (0, lib_1.delay)(delayt)];
                        case 2:
                            //随机添加点
                            // randomSet()
                            //正文
                            _a.sent();
                            old = dt;
                            dt = update(dt);
                            old.dispose();
                            if (!(!sl && n % drawFreq == 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, d.draw2D(dt)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            //
                            if (p)
                                return [3 /*break*/, 6];
                            n++;
                            //显示轮
                            get("n").innerText = n.toString();
                            _a.label = 5;
                        case 5: return [3 /*break*/, 1];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
        function changepoint(x, y) {
            if (x < 0 || y < 0)
                return;
            var data = dt.arraySync();
            var tx, ty;
            tx = Math.floor(x / d.cw);
            ty = Math.floor(y / d.ch);
            data[ty][tx] = data[ty][tx] == 0 ? 1 : 0;
            dt.dispose();
            dt = tf.tensor(data);
            d.draw2D(dt);
        }
        function setpoint(x, y, v) {
            if (v === void 0) { v = 1; }
            if (x < 0 || y < 0)
                return;
            var data = dt.arraySync();
            var tx, ty;
            tx = Math.floor(x / d.cw);
            ty = Math.floor(y / d.ch);
            data[ty][tx] = 1;
            dt.dispose();
            dt = tf.tensor(data);
            d.draw2D(dt);
            //set
            // console.log(`set:${x},${y} = ${v}`)
        }
        var s, t, ele, hsize, rsize, size, d, init, dt, p, sl, n, drawFreq, update;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    s = "webgl";
                    return [4 /*yield*/, tf.setBackend(s)];
                case 1:
                    t = _a.sent();
                    alert("\u540E\u7AEF:".concat(s).concat(t ? "成功" : "失败", " \u4F7F\u7528\u6570\u636E\u7C7B\u578B:").concat(matrix_rules_1.defaultDtype));
                    initSelection();
                    ele = get("canvas");
                    hsize = [1024, 1024];
                    ele.height = hsize[0];
                    ele.width = hsize[1];
                    ele.id = "ctx";
                    rsize = get_param("rsize") == null ? 2 : (0, lib_1.float)(get_param("rsize"));
                    get("rsize", "input").value = rsize.toString();
                    size = [hsize[0] / rsize, hsize[1] / rsize];
                    d = new Draw_1.Draw(ele, size[0], size[1]);
                    init = function () { return tf.randomUniform(size, 0, 1, matrix_rules_1.defaultDtype).div((0, lib_1.float)(getval("rel"))).floor().equal(0).asType(matrix_rules_1.defaultDtype); };
                    dt = init();
                    //输出
                    get("info").innerText = "".concat(dt.shape[0], "x").concat(dt.shape[1], " (h*w) ");
                    get("cinfo").innerText = "".concat(hsize[0], "x").concat(hsize[1], " (h*w)");
                    d.draw2D(dt);
                    console.log(dt);
                    p = true;
                    sl = false;
                    n = 0;
                    drawFreq = 1;
                    update = function (old) { return (0, matrix_rules_1.useMatrixRule)(old, matrix_rules_2.Rules.b3s23, usetrain); };
                    //event
                    get("start").onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                        var ruleid, rule_1;
                        return __generator(this, function (_a) {
                            if (p) {
                                p = false;
                                ruleid = get("rule", "select").selectedOptions[0].value;
                                rule_1 = matrix_rules_2.Rules[ruleid];
                                //这里控制是否开启历史记录（持续消耗内存或显存）
                                update = function (old) { return (0, matrix_rules_1.useMatrixRule)(old, rule_1, usetrain); };
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
                            return [2 /*return*/];
                        });
                    }); };
                    get("train").onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, matrix_rules_1.train)(rsize)];
                                case 1:
                                    _a.sent();
                                    alert("训练成功,启动测试");
                                    //显示用网络实现的更新
                                    update = function (old) { return (0, matrix_rules_1.useLayers)(old); };
                                    //启动测试，测试完成前请勿操作 
                                    //初始化
                                    dt = init();
                                    d.draw2D(dt);
                                    n = 0;
                                    p = false;
                                    get("delay", "input").value = (0, lib_1.str)(200);
                                    return [4 /*yield*/, loop()];
                                case 2:
                                    _a.sent();
                                    //
                                    alert("测试完成");
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    get("reset").onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            dt = init();
                            d.draw2D(dt);
                            n = 0;
                            return [2 /*return*/];
                        });
                    }); };
                    get("ctx").onclick = function (e) {
                        if (e.button == 0)
                            changepoint(e.offsetX, e.offsetY);
                    };
                    get("ctx").onmousemove = function (e) {
                        if (e.buttons === 1) {
                            setpoint(e.offsetX, e.offsetY, 1);
                        }
                    };
                    get("sl").onclick = function () {
                        sl = !sl;
                        if (sl)
                            get("sl").style.background = "red";
                        else
                            get("sl").style.background = "";
                    };
                    return [2 /*return*/];
            }
        });
    });
}
window.onload = main;
console.log("helloworld");
var mod = module;
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
var tf = __importStar(__webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js"));
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
    var s = ts.expandDims(0).expandDims(-1);
    //扩展一个前面的n和一个后面的c
    return s;
}
exports.expandTo4D = expandTo4D;
function deleteDimTo2D(ts) {
    //这个把2d featuremap变为4d可以直接进行卷积操作的featuremap或kernel
    //也就是直接对featuremap进行卷积
    //变成nhwc
    var s = ts.squeeze([0, 3]);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLayers = exports.train = exports.trainLog = exports.useMatrixRule = exports.Rules = exports.defaultDtype = void 0;
var tf = __importStar(__webpack_require__(/*! @tensorflow/tfjs */ "./node_modules/@tensorflow/tfjs/dist/index.js"));
var matrix_tool_1 = __webpack_require__(/*! ../matrix_tool */ "./src/matrix_tool.ts");
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
    return tf.tidy(function () {
        return tf.abs(tf.sub(tensor, 1));
    });
}
/**
 * 设1 是设0的反面
 * @param tensor
 */
function tf_setOne(tensor, setMap) {
    return tf.tidy(function () {
        return tf_reverse(tf_setZero(tf_reverse(tensor), tf_reverse(setMap)));
    });
}
/**
 * 设0 因为交换律 设置0的参数顺序不限
 * @param tensor 原始矩阵
 * @param setMap 设置矩阵 0表示要设0的位置 1 表示不变
 */
function tf_setZero(tensor, setMap) {
    return tf.tidy(function () { return tf.mul(tensor, setMap); });
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
function keep(K, S, P, v) {
    if (v === void 0) { v = 2; }
    //把周围有两个格子的点 复制到结果中 如果周围不是两个格子 更多或更少 就不复制
    //复制不是叠加而是设置为1  如果对空结果执行 就是复制的意思 但如果对非空结果 就是 如果原始位置是1的话就设置 否则不改变
    //检测 如果为2  不设置zero 保持不变 如果不是2 则 全部设置为0
    var K2 = (0, matrix_tool_1.equalMap)(K, v);
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
function setOne(K, S, P, v) {
    if (v === void 0) { v = 3; }
    //equalmap把非 0 1 变为 0 1
    var K3 = (0, matrix_tool_1.equalMap)(K, v);
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
function setZero(K, S, P, v) {
    if (v === void 0) { v = 3; }
    var T = tf_reverse((0, matrix_tool_1.equalMap)(K, v));
    var res = tf_setZero(P, T);
    return res;
}
///操作集结束
/**
 * 用于提供dsl 方便规则编写
 * @param K
 * @param S
 * @param P
 */
function use(K, S, P) {
    var funcs = /** @class */ (function () {
        function funcs() {
            var _this = this;
            this.K = K;
            this.S = S;
            this.P = P;
            this.keep = function (v) { return _this.P = keep(_this.K, _this.S, _this.P, v); };
            this.setOne = function (v) { return _this.P = setOne(_this.K, _this.S, _this.P, v); };
            this.setZero = function (v) { return _this.P = setZero(_this.K, _this.S, _this.P, v); };
        }
        funcs.prototype.get = function () {
            return this.P;
        };
        return funcs;
    }());
    return new funcs();
}
function basic(ts) {
    //这里理论上可以考虑用其他kernel以以不同方式考虑周围值
    //这里可以用一个多通道卷积核来处理
    //统计一个格子周围的所有格子的值  权重都是1 但也可以不同  甚至可以考虑其他因素进去
    var ker = tf.tensor2d([
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
    ]).expandDims(-1).expandDims(-1);
    //测试训练用
    // ker=tf.variable(ker,true,"kernel",defaultDtype);
    //把ts变为4d
    //原始矩阵
    var S = (0, matrix_tool_1.expandTo4D)(ts).asType(exports.defaultDtype);
    //卷积计算后的矩阵
    var K = tf.conv2d(S, ker, 1, "same", "NHWC");
    //计算
    //叠加
    //这个是其他设0
    //初始为0的保存结果的矩阵
    var P = tf.zerosLike(S);
    return { K: K, S: S, P: P };
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
        rule.keep(2);
        // rule.keep(3);
        //出生难度
        // rule.setOne(2);
        rule.setOne(3);
        //6的时候死去 (拥挤规则) 因为除了keep的和setOne的 其他都会自动死去 所以这里调用和不调用一样
        // rule.setZero(6);
    }
    Rules.b3s23 = b3s23;
    function rev_b3s23(rule) {
        rule.keep(6);
        rule.setOne(0);
        rule.setOne(1);
        rule.setOne(2);
        rule.setOne(3);
        rule.setOne(4);
        rule.setOne(7);
        rule.setOne(8);
    }
    Rules.rev_b3s23 = rev_b3s23;
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
/**
 *
 * 矩阵规则
 * 理论上这个可以支持各种规则
 * 可以支持在每次计算下一帧的时候进行记录（额外功能）
 *
 * S为0 1 矩阵 K是从0 1 矩阵卷积得到的值 表示了周围格子对中心格子的影响（卷积值） P为K+S的结果 表示
 * old和影响叠加后的产物 (综合产物） 然后去规范化
 */
function useMatrixRule(ts, ruleF, logHistory) {
    if (ruleF === void 0) { ruleF = Rules.b3s23; }
    if (logHistory === void 0) { logHistory = false; }
    //生命游戏卷积 从一个feature map 得到下一个featuremap
    //原始 S 卷积得到K 然后K+S 得到P 然后对P使用equalMap3 得到二值化的下一个
    //featuremap
    var ret = tf.tidy(function () {
        var _a = basic(ts), K = _a.K, S = _a.S, P = _a.P;
        var rule = use(K, S, P);
        ruleF(rule);
        P = rule.get();
        //训练并输出loss
        var ret = (0, matrix_tool_1.deleteDimTo2D)(P);
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
var opt = tf.train.rmsprop(0.01);
function initLayer(rsize) {
    if (rsize === void 0) { rsize = 8; }
    alert("初始化神经网络");
    var layers = tf.sequential({
        layers: [
            tf.layers.conv2d({ inputShape: [1024 / rsize, 1024 / rsize, 1], kernelSize: 3, filters: 40, activation: "relu" }),
            tf.layers.conv2dTranspose({ kernelSize: 3, filters: 10, activation: "tanh" }),
            tf.layers.conv2d({ kernelSize: 3, filters: 20, activation: "tanh" }),
            tf.layers.conv2dTranspose({ kernelSize: 3, filters: 1 })
        ]
    });
    layers.compile({
        optimizer: "rmsprop",
        loss: tf.losses.sigmoidCrossEntropy,
        metrics: ["accuracy"]
    });
    return layers;
}
var xs = [], ys = [];
function trainLog(ts, ret) {
    // console.log("记录样本")
    //输入的是上一帧和下一帧
    //net的功能是从上一帧得到下一帧
    xs.push(tf.tidy(function () { return ts.clone().expandDims(2); }));
    ys.push(tf.tidy(function () { return ret.clone().expandDims(2); }));
    // console.log(xs[0])
}
exports.trainLog = trainLog;
var layers;
function train(rsize) {
    return __awaiter(this, void 0, void 0, function () {
        var x, y, info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("开始训练");
                    layers = initLayer(rsize);
                    layers.summary();
                    // let nstart=xs[0].clone() as tf.Tensor3D;
                    console.log("\u6837\u672C\u6570:".concat(xs.length));
                    x = tf.stack(xs, 0);
                    xs.forEach(function (v) { return v.dispose(); });
                    y = tf.stack(ys, 0);
                    ys.forEach(function (v) { return v.dispose(); });
                    return [4 /*yield*/, layers.fit(x, y, {
                            epochs: 5, callbacks: {
                                onBatchEnd: function (batch, logs) {
                                    console.log("batch:".concat(batch, " -> ").concat(logs));
                                }
                            }
                        })];
                case 1:
                    info = _a.sent();
                    console.log(info.history.acc);
                    x.dispose();
                    y.dispose();
                    xs = [];
                    ys = [];
                    return [2 /*return*/];
            }
        });
    });
}
exports.train = train;
function useLayers(nstart) {
    //显示神经网络演化 从第一帧开始
    var ret = tf.tidy(function () {
        var t = layers.predict(nstart.expandDims(2).expandDims(0));
        t = t.sigmoid();
        var tt = t.squeeze([0, 3]);
        //二值化
        var bi = tf.greaterEqual(tt, 0.5);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWJzL2xpYi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJhdy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0cml4X3Rvb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hdHJpeF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vbm9kZS1mZXRjaCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3V0aWwgKGlnbm9yZWQpIiwid2VicGFjazovLy9vcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2NyeXB0byAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3N0cmluZ19kZWNvZGVyIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vc3RyaW5nX2RlY29kZXIgKGlnbm9yZWQpPzcxOWMiLCJ3ZWJwYWNrOi8vL2ZzIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vcGF0aCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2ZzIChpZ25vcmVkKT85YzVmIiwid2VicGFjazovLy93b3JrZXJfdGhyZWFkcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3BlcmZfaG9va3MgKGlnbm9yZWQpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFnQixPQUFPLENBQUMsR0FBVztJQUMvQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNqRCxDQUFDO0FBRkQsMEJBRUM7QUFJRCxTQUFzQixLQUFLLENBQUMsR0FBRzs7O1lBQzNCLHNCQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTztvQkFDN0IsVUFBVSxDQUFDO3dCQUNQLE9BQU8sRUFBRSxDQUFDO29CQUNkLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztn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Q0wsRUFBRSxHQUFDLEVBQUU7Ozs7O0NBRVI7QUF2QkQsc0JBdUJDO0FBRUQsU0FBZ0IsU0FBUyxDQUFDLE1BQWtCO0lBQ3BDLGlCQUFpQjtJQUNqQixJQUFJLEdBQUcsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ1osSUFBSSxDQUFDLEdBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUN4RSxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRTtRQUNiLElBQUksRUFBRSxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQWdCLENBQUM7UUFDdkMsS0FBSztRQUNMLElBQUksRUFBRSxHQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxHQUFrQixDQUFDO0FBQ2xDLENBQUM7QUFYRCw4QkFXQzs7Ozs7Ozs7Ozs7O0FDL1NELGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZSIsImZpbGUiOiJjb21tb25zfm1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJhbmRpbnQobWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpICUgbWF4O1xyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxheShtaXMpe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKT0+e1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSwgbWlzKTtcclxuICAgIH0pICAgXHJcbn1cclxuXHJcblxyXG4vL+S7v3B5dGhvbuWfuuehgOiuvuaWvVxyXG5leHBvcnQgZnVuY3Rpb24gKnJhbmdlKHN0YXJ0Om51bWJlcixzcGFjZT86bnVtYmVyLGVuZD86bnVtYmVyKTpJdGVyYWJsZTxudW1iZXI+e1xyXG4gICAgLy/lhYHorrggcmFuZ2UoYSxjLGIpIHJhbmdlKGIpIHJhbmdlKGEsYilcclxuICAgIGlmKHNwYWNlPT1udWxsJiZlbmQ9PW51bGwpe1xyXG4gICAgICAgIC8vMVxyXG4gICAgICAgIHlpZWxkKiByYW5nZSgwLDEsc3RhcnQpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbmQ9PW51bGwpe1xyXG4gICAgICAgIC8vMlxyXG4gICAgICAgIHlpZWxkKiByYW5nZShzdGFydCwxLHNwYWNlKTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgLy8zXHJcbiAgICAgICAgZm9yKGxldCBpPXN0YXJ0O2k8ZW5kO2krPXNwYWNlKXtcclxuICAgICAgICAgICAgeWllbGQgaTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiogZW51bWVyYXRlPFQ+KGFycmF5bGlrZTpJdGVyYWJsZTxUPik6SXRlcmFibGU8W251bWJlcixUXT57XHJcbiAgICBsZXQgbm93PTA7XHJcbiAgICBmb3IobGV0IGEgb2YgYXJyYXlsaWtlKXtcclxuICAgICAgICB5aWVsZCBbbm93KyssYV1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFueShhcnJheWxpa2U6SXRlcmFibGU8YW55Pilcclxue1xyXG4gICAgZm9yKGxldCBhIG9mIGFycmF5bGlrZSl7XHJcbiAgICAgICAgaWYoYSkgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFsbChhcnJheWxpa2U6SXRlcmFibGU8YW55Pilcclxue1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJpbnQoZGF0YTphbnkpe1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uICp6aXAoLi4uYXJyYXlsaWtlczpJdGVyYWJsZTxhbnk+W10pe1xyXG4gICAgbGV0IGl0b3JzPWFycmF5bGlrZXMubWFwKHY9PnZbU3ltYm9sLml0ZXJhdG9yXSgpKTtcclxuICAgIGZvcig7Oyl7XHJcbiAgICAgICAgLy/lr7nmiYDmnIlpdG9y5Y+WbmV4dCDlpoLmnpzlhajpg6jmiJDlip/liJl5aWVsZCDlkKbliJnov5Tlm55cclxuICAgICAgICBsZXQgcmVzcz1pdG9ycy5tYXAodj0+di5uZXh0KCkpO1xyXG4gICAgICAgIC8vIHByaW50KHJlc3MpO1xyXG4gICAgICAgIC8v5aaC5p6c5pyJ5LiA5Liq57uT5p2fXHJcbiAgICAgICAgaWYoYW55KHJlc3MubWFwKHY9PnYuZG9uZSkpKXtcclxuICAgICAgICAgICAgLy/ov5Tlm55cclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB5aWVsZCByZXNzLm1hcCh2PT52LnZhbHVlKTtcclxuICAgIH1cclxufVxyXG4vL+WfuuacrOaTjeS9nFxyXG5leHBvcnQgZnVuY3Rpb24gc2h1ZmZsZTxUPihhcmw6SXRlcmFibGU8VD4pOlRbXXtcclxuICAgIGxldCBhPWxpc3QoYXJsKTtcclxuICAgIGxldCByPW5ldyBBcnJheShsZW4oYSkpO1xyXG4gICAgZm9yKGxldCB0IG9mIGEpe1xyXG4gICAgICAgIC8v6ZqP5py65aGr56m6XHJcbiAgICAgICAgbGV0IGlkeD1yYW5kaW50KGxlbihhKSk7XHJcbiAgICAgICAgcltpZHhdPXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc29ydGVkPFQ+KGFybDpJdGVyYWJsZTxUPixrZXk6KHY6VCk9Pm51bWJlcj1udWxsKXtcclxuICAgIGxldCByZXQ9bGlzdChhcmwpLnNvcnQoKGEsYik9PntcclxuICAgICAgICBsZXQgW2ssa2tdPVtrZXkoYSksa2V5KGIpXVxyXG4gICAgICAgIHJldHVybiBrLWtrO1xyXG4gICAgfSlcclxuICAgIHJldHVybiByZXQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGJ5SWR4PFQ+KGFybDpJdGVyYWJsZTxUPixpZHhzOm51bWJlcltdKXtcclxuICAgIGxldCBsPWxpc3QoYXJsKTtcclxuICAgIGxldCByZXQ9aWR4cy5tYXAodj0+bFt2XSk7XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcbi8v5LiN5pS+5Zue6YeH5qC3XHJcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0PFQ+KGFybDpJdGVyYWJsZTxUPixjb3VudDpudW1iZXIpOlRbXXtcclxuICAgIC8v5LuO5LiA5Liq5YiX6KGo5Lit6YeH5qC3IOS4jeaUvuWbnlxyXG4gICAgbGV0IGE9bGlzdChhcmwpO1xyXG4gICAgbGV0IGlkeD1zaHVmZmxlKHJhbmdlKGxlbihhKSkpLnNsaWNlKDAsY291bnQpO1xyXG4gICAgcHJpbnQoaWR4KTtcclxuICAgIHJldHVybiBieUlkeChhLGlkeCk7XHJcbn1cclxuLy/mnInmlL7lm57ph4fmoLdcclxuZXhwb3J0IGZ1bmN0aW9uIHNhbXBsZTxUPihhcmw6SXRlcmFibGU8VD4sY291bnQ6bnVtYmVyKTpUW117XHJcbiAgICAvL+S7juS4gOS4quWIl+ihqOS4remHh+agtyDmnInmlL7lm55cclxuICAgIGxldCBhPWxpc3QoYXJsKTtcclxuICAgIGxldCBpZHg9bGlzdChyYW5nZShsZW4oYSkpKS5tYXAodj0+cmFuZGludChsZW4oYSkpKTtcclxuICAgIHJldHVybiBieUlkeChhLGlkeCk7XHJcbn1cclxuLy/mlbDlraZcclxuZXhwb3J0IGxldCBtaW49TWF0aC5taW47XHJcbmV4cG9ydCBsZXQgbWF4PU1hdGgubWF4O1xyXG5cclxuLyoqXHJcbiAqIOaPkuWFpVxyXG4gKiBAcGFyYW0gYXJsIOaVsOe7hFxyXG4gKiBAcGFyYW0gcG9pbnQg5o+S5YWl5L2N572uIOaPkuWFpeWIsOi/meS4quS9jee9rueahOWFg+e0oOWJjemdoiDkuLogMC1sZW4oYXJsKSDnmoTlgLxcclxuICogQHBhcmFtIHZhbCDmj5LlhaXlgLxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnQ8VD4oYXJsOkl0ZXJhYmxlPFQ+LHBvaW50Om51bWJlcix2YWw6VCk6VFtde1xyXG4gICAgbGV0IG5ld2FyPVtdXHJcbiAgICBsZXQgYT1saXN0KGFybCk7XHJcbiAgICBhLmZvckVhY2goKHYsaWR4KT0+e1xyXG4gICAgICAgIGlmKHBvaW50PT1pZHgpIG5ld2FyLnB1c2godmFsKTtcclxuICAgICAgICBuZXdhci5wdXNoKHYpO1xyXG4gICAgfSk7XHJcbiAgICBpZihsZW4oYSk9PXBvaW50KSBuZXdhci5wdXNoKHZhbCk7XHJcbiAgICByZXR1cm4gbmV3YXI7XHJcbn1cclxuXHJcbi8v5Z+65pys5pWw5o2uXHJcbmludGVyZmFjZSBBc0ludHtcclxuICAgIHRvSW50KCk6bnVtYmVyO1xyXG59XHJcbmludGVyZmFjZSBBc0Zsb2F0e1xyXG4gICAgdG9GbG9hdCgpOm51bWJlcjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaW50KG90aGVyOnN0cmluZ3xudW1iZXJ8QXNJbnQpe1xyXG4gICAgaWYodHlwZW9mIG90aGVyPT1cInN0cmluZ1wiKSByZXR1cm4gcGFyc2VJbnQob3RoZXIpO1xyXG4gICAgZWxzZSBpZih0eXBlb2Ygb3RoZXI9PVwibnVtYmVyXCIpIHJldHVybiBvdGhlcnwwO1xyXG4gICAgZWxzZSBpZihcInRvSW50XCIgaW4gb3RoZXIpe1xyXG4gICAgICAgIHJldHVybiBvdGhlci50b0ludCgpXHJcbiAgICB9ZWxzZSByZXR1cm4gMDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc3RyKG4pe1xyXG4gICAgcmV0dXJuIG5ldyBOdW1iZXIobikudG9TdHJpbmcoKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZmxvYXQob3RoZXI6c3RyaW5nfG51bWJlcnxBc0Zsb2F0KXtcclxuICAgIGlmKHR5cGVvZiBvdGhlcj09XCJzdHJpbmdcIikgcmV0dXJuIHBhcnNlRmxvYXQob3RoZXIpO1xyXG4gICAgZWxzZSBpZih0eXBlb2Ygb3RoZXI9PVwibnVtYmVyXCIpIHJldHVybiBvdGhlcjtcclxuICAgIGVsc2UgaWYoXCJ0b0Zsb2F0XCIgaW4gb3RoZXIpe1xyXG4gICAgICAgIHJldHVybiBvdGhlci50b0Zsb2F0KClcclxuICAgIH1lbHNlIHJldHVybiAwO1xyXG59XHJcbi8v5pWw5o2u5a655Zmo5p6E6YCg5Yy65Z+fXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbGlzdDxUPihpdGVyPzpJdGVyYWJsZTxUPik6QXJyYXk8VD57XHJcbiAgICBpZihpdGVyPT1udWxsKSByZXR1cm4gbGlzdChbXSk7XHJcbiAgICBsZXQgcmV0PVtdXHJcbiAgICBmb3IobGV0IGEgb2YgaXRlcil7XHJcbiAgICAgICAgcmV0LnB1c2goYSlcclxuICAgIH1cclxuICAgIHJldHVybiByZXQ7XHJcbn1cclxuLy/ono3lkIjlr7nosaEgXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFwVG9PYmoobWFwOk1hcDxhbnksYW55Pil7XHJcbiAgICAvL1xyXG4gICAgbGV0IHI9bmV3IFByb3h5PGFueT4oe30se1xyXG4gICAgICAgIGdldCh0YXJnZXQscDphbnkscmVjZWl2ZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwLmdldChwKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCh0YXJnZXQscDphbnksdmFsdWUscmVjZWl2ZSl7XHJcbiAgICAgICAgICAgIG1hcC5zZXQocCx2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGFzKHRhcmdldCxwOmFueSl7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXAuaGFzKHApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVsZXRlUHJvcGVydHkgKHRhcmdldCwgcCk6IGJvb2xlYW57XHJcbiAgICAgICAgICAgIHJldHVybiBtYXAuZGVsZXRlKHApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVmaW5lUHJvcGVydHkgKHRhcmdldCwgcCwgYXR0cmlidXRlczogUHJvcGVydHlEZXNjcmlwdG9yKTogYm9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWFwLnNldChwLGF0dHJpYnV0ZXMudmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG93bktleXMgKHRhcmdldCk6IGFueVtdXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbGlzdChtYXAua2V5cygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYXBwbHkgKHRhcmdldCwgdGhpc0FyZzogYW55LCBhcmdBcnJheT86IGFueSk6IGFueVxyXG4gICAgICAgIC8vIHtcclxuXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyBjb25zdHJ1Y3QgKHRhcmdldCwgYXJnQXJyYXk6IGFueSwgbmV3VGFyZ2V0PzogYW55KTogb2JqZWN0XHJcbiAgICAgICAgLy8ge1xyXG5cclxuICAgICAgICAvLyB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIG1hcDxLLFY+KGFybDpJdGVyYWJsZTxbSyxWXT4pe1xyXG4gICAgcmV0dXJuIG5ldyBNYXA8SyxWPihhcmwpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzZXQ8VD4oYXJsOkl0ZXJhYmxlPFQ+KVxyXG57XHJcbiAgICByZXR1cm4gbmV3IFNldDxUPihhcmwpO1xyXG59XHJcblxyXG4vL+aVsOaNruaTjeS9nFxyXG5leHBvcnQgZnVuY3Rpb24gKmtleXM8Sz1hbnksVj1hbnk+KG9iajpvYmplY3R8TWFwPEssVj4pXHJcbntcclxuICAgIC8v5Y+W5a+56LGh55qEa2V55oiWbWFw55qE5omA5pyJa2V5IOaemuS4vlxyXG4gICAgaWYob2JqIGluc3RhbmNlb2YgTWFwKXtcclxuICAgICAgICAvL+aemuS4vlxyXG4gICAgICAgIGZvcihsZXQgYSBvZiBvYmoua2V5cygpKXtcclxuICAgICAgICAgICAgeWllbGQgYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHR5cGVvZiBvYmogPT1cIm9iamVjdFwiKXtcclxuICAgICAgICBmb3IobGV0IGsgaW4gb2JqKXtcclxuICAgICAgICAgICAgeWllbGQgaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbnR5cGUgSGFzTGVuZ3RoPXtsZW5ndGg6bnVtYmVyfXx7c2l6ZTpudW1iZXJ9fHtjb3VudDpudW1iZXJ9fHtfX2xlbl9fKCk6bnVtYmVyfTtcclxuLy/ku6XkuIvkuLrosIPnlKjljY/orq5cclxuZXhwb3J0IGZ1bmN0aW9uIGxlbihvYmo6SXRlcmFibGU8YW55PnxIYXNMZW5ndGh8b2JqZWN0KXtcclxuICAgIGlmKFwibGVuZ3RoXCIgaW4gb2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqLmxlbmd0aFxyXG4gICAgfWVsc2UgaWYgKFwic2l6ZVwiIGluIG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iai5zaXplO1xyXG4gICAgfWVsc2UgaWYoXCJjb3VudFwiIGluIG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iai5jb3VudDtcclxuICAgIH1lbHNlIGlmKFwiX19sZW5fX1wiIGluIG9iail7XHJcbiAgICAgICAgcmV0dXJuIG9iai5fX2xlbl9fKClcclxuICAgIH1lbHNlIGlmKHR5cGVvZiBvYmo9PVwib2JqZWN0XCIpe1xyXG4gICAgICAgIGxldCBzdW09MDtcclxuICAgICAgICBmb3IobGV0IGsgaW4gb2JqKXtcclxuICAgICAgICAgICAgc3VtKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdW07XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vLyAvL+exu+Wei+WHveaVsOaKiuS4gOS4quexu+Wei+aYoOWwhOS4uuWPpuS4gOS4quexu+Wei1xyXG4vLyAvL+WvueixoeaYoOWwhOWHveaVsO+8jOaKiuS4gOS4quWvueixoeS4reeahOavj+S4quWxnuaAp+S9v+eUqOS4gOS4qm1hcHBlcuaYoOWwhFxyXG4vLyAvL+mAkuW9kuWvueixoeaYoOWwhOWHveaVsO+8jOaKiuS4gOS4quWvueixoeS4reeahOaJgOaciemdnuWvueixoeWxnuaAp+S9v+eUqG1hcHBlcuaYoOWwhO+8jOWvueixoemAkuW9kuaYoOWwhFxyXG4vLyB0eXBlIE1hcHBlcjxBLEI+PVtBLEJdO1xyXG4vLyB0eXBlIE1hcFRvPFQgZXh0ZW5kcyBNYXBwZXI8YW55LGFueT4sQz49QyBleHRlbmRzIFRbMF0/IFRbMV06bmV2ZXI7XHJcbi8vIHR5cGUgU3dpdGNoPFQsIFUgZXh0ZW5kcyBhbnk+ID1cclxuLy8gICAgIFQgZXh0ZW5kcyBrZXlvZiBVID8gVVtUXSA6IFVbXCJkZWZhdWx0XCJdO1xyXG5cclxuLy8gLy8g6I635Y+W56ys5LiA5Liq5YWD57SgXHJcbi8vIGV4cG9ydCB0eXBlIEhlYWQ8VD4gPSBUIGV4dGVuZHMgeyAwOiBpbmZlciBIIH0gPyBIIDogbmV2ZXI7XHJcbi8vIC8vIOenu+mZpOesrOS4gOS4quWFg+e0oFxyXG4vLyBleHBvcnQgdHlwZSBUYWlsPFQ+ID0gKFxyXG4vLyAgICAgKC4uLmE6IFQgZXh0ZW5kcyBhbnlbXSA/IFQgOiBuZXZlcikgPT4gdm9pZFxyXG4vLyApIGV4dGVuZHMgKGE6IGFueSwgLi4uYjogaW5mZXIgUikgPT4gdm9pZCA/IFIgOiBuZXZlcjtcclxuLy8gZXhwb3J0IHR5cGUgVW5zaGlmdDxULCBBPiA9IChcclxuLy8gICAgIChhOiBBLCAuLi5iOiBUIGV4dGVuZHMgYW55W10gPyBUIDogbmV2ZXIpID0+IHZvaWRcclxuLy8gKSBleHRlbmRzICguLi5hOiBpbmZlciBSKSA9PiB2b2lkID8gUiA6IG5ldmVyO1xyXG4vLyAvLyDlnKjlsL7pg6jliqDlhaXkuIDkuKrlhYPntKBcclxuLy8gZXhwb3J0IHR5cGUgQ29weTxULCBTIGV4dGVuZHMgYW55PiA9IHsgW1AgaW4ga2V5b2YgVF06IFNbUF0gfTtcclxuLy8gZXhwb3J0IHR5cGUgUHVzaDxULCBBPiA9IENvcHk8VW5zaGlmdDxULCBhbnk+LCBUICYgUmVjb3JkPHN0cmluZywgQT4+O1xyXG5cclxuXHJcblxyXG4vLyB0eXBlIE11bHRpTWFwVG88VCBleHRlbmRzIGFueVtdLEMsaz1cInN0dWZmXCI+PVRbXCJsZW5ndGhcIl0gZXh0ZW5kcyAwPyBNYXBUbzxUWzBdLEM+OlxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDIGV4dGVuZHMgVFswXVswXT8gVFswXVsxXTpTd2l0Y2g8ayx7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHVmZjpNdWx0aU1hcFRvPFRhaWw8VD4sQyxrPlxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9PjtcclxuXHJcbi8vIHR5cGUgT2JqZWN0VHlwZU1hcDxDIGV4dGVuZHMgTWFwcGVyPGFueSxhbnk+W10sVCBleHRlbmRzIG9iamVjdD49e1tQIGluIGtleW9mIFRdOk11bHRpTWFwVG88QyxUW1BdPn07XHJcblxyXG4vLyAvL+WunueOsOmAkuW9kuaApyDlsJrmnKrlrp7njrBcclxuLy8gdHlwZSBPYmplY3RNYXBwZXI8VCBleHRlbmRzIG9iamVjdCxDIGV4dGVuZHMgTWFwcGVyPGFueSwgYW55PltdPj1bVCxPYmplY3RUeXBlTWFwPEMsVD5dXHJcblxyXG4vLyB0eXBlIHM9W1tudW1iZXIsc3RyaW5nXSxbc3RyaW5nLG51bWJlcl0sT2JqZWN0TWFwcGVyPG9iamVjdCxzPl07XHJcbi8vIHR5cGUgbz17XHJcbi8vICAgICBhOnN0cmluZyxcclxuLy8gICAgIGI6bnVtYmVyLFxyXG4vLyAgICAgYzp7XHJcbi8vICAgICAgICAgZDpzdHJpbmcsXHJcbi8vICAgICAgICAgZTpudW1iZXJcclxuLy8gICAgIH1cclxuLy8gfTtcclxuLy8gdHlwZSByPU9iamVjdFR5cGVNYXA8cyxvPjtcclxuXHJcblxyXG4vLyAvL+WAvOWMluexu+Wei+WumuS5iVxyXG5cclxuLy8gLy/nsbvlnovliKTmlq3nlKhcclxuLy8gdHlwZSBUeXBlUmVwPFQsVj1zdHJpbmc+PXtcclxuLy8gICAgIHZhbHVlOlYsXHJcbi8vICAgICB0eXBlOlRcclxuLy8gfTtcclxuLy8gLy/nqIvluo/nlKjnmoRcclxuLy8gbGV0IHR5cGVfYXJyYXk9XCJhcnJheVwiO1xyXG4vLyBsZXQgdHlwZV9udW1iZXI9XCJudW1iZXJcIjtcclxuLy8gbGV0IHR5cGVfc3RyaW5nPVwic3RyaW5nXCI7XHJcbi8vIC8v5YC86YOo5YiGXHJcblxyXG4vLyBmdW5jdGlvbiBnZXRhcnJheTxUPih2YWx1ZTpUKTpUeXBlUmVwPFwiYXJyYXlcIixUPntcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgdmFsdWU6dmFsdWUsXHJcbi8vICAgICAgICAgdHlwZTpcImFycmF5XCJcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBmdW5jdGlvbiBnZXRudW1iZXI8VD4odmFsdWU6VCk6VHlwZVJlcDxcIm51bWJlclwiLFQ+e1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICB2YWx1ZTp2YWx1ZSxcclxuLy8gICAgICAgICB0eXBlOlwibnVtYmVyXCJcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyBmdW5jdGlvbiBnZXRzdHJpbmc8VD4odmFsdWU6VCk6VHlwZVJlcDxcInN0cmluZ1wiLFQ+e1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICB2YWx1ZTp2YWx1ZSxcclxuLy8gICAgICAgICB0eXBlOlwic3RyaW5nXCJcclxuLy8gICAgIH1cclxuLy8gfVxyXG4vLyAvL+aYoOWwhOmDqOWIhlxyXG4vLyAvL+aYoOWwhOWZqFxyXG4vLyB0eXBlIFJlcE1hcDxBLEI+PU1hcHBlcjxUeXBlUmVwPEE+LEI+O1xyXG4vLyAvL+exu+Wei+aYoOWwhOWZqFxyXG4vLyB0eXBlIFJlcE1hcHBlcnM9W1JlcE1hcDxcInN0cmluZ1wiLHN0cmluZz4sXHJcbi8vICAgICAgICAgICAgICAgICBSZXBNYXA8XCJudW1iZXJcIixudW1iZXI+LFxyXG4vLyAgICAgICAgICAgICAgICAgUmVwTWFwPFwiYXJyYXlcIixhbnlbXT5dXHJcblxyXG4vLyAvL+aYoOWwhHJlcOexu+Wei+WIsOato+W4uOexu+Wei1xyXG4vLyB0eXBlIEV4dHJhY3Q8UmVwPj1NdWx0aU1hcFRvPFJlcE1hcHBlcnMsUmVwPjtcclxuLy8gLy/mmKDlsIRtb2RlbCDliLAgcGFyc2XlkI7nsbvlnotcclxuLy8gdHlwZSBNYXBNb2RlbDxNb2RlbFR5cGUgZXh0ZW5kcyB7W1AgaW4ga2V5b2YgTW9kZWxUeXBlXTpUeXBlUmVwPGFueT59Pj1PYmplY3RUeXBlTWFwPFJlcE1hcHBlcnMsTW9kZWxUeXBlPlxyXG5cclxuLy8gbGV0IG1vZGVsPXtcclxuLy8gICAgIHRpdGxlOmdldHN0cmluZyhcIi50aXRsZVwiKSxcclxuLy8gICAgIGxpc3Q6Z2V0YXJyYXkoXCIuYXJyYXlcIilcclxuLy8gfVxyXG4vLyB0eXBlIGE9TWFwTW9kZWw8dHlwZW9mIG1vZGVsPjtcclxuLy8gZnVuY3Rpb24gcGFyc2UoYm9keSxtb2RlbDpvYmplY3QpOk1hcE1vZGVsPHR5cGVvZiBtb2RlbD57XHJcbi8vICAgICByZXR1cm4gbnVsbDtcclxuLy8gfVxyXG4iLCJpbXBvcnQgKiBhcyB0ZiBmcm9tIFwiQHRlbnNvcmZsb3cvdGZqc1wiXHJcbmltcG9ydCB7IHJldmVyc2VCb29sLCBlcXVhbE1hcCwgZXhwYW5kVG80RCB9IGZyb20gJy4vbWF0cml4X3Rvb2wnO1xyXG5pbXBvcnQge2RlYnVnfSBmcm9tIFwid2VicGFja1wiO1xyXG5pbXBvcnQge2RlZmF1bHREdHlwZX0gZnJvbSBcIi4vcnVsZXMvbWF0cml4X3J1bGVzXCI7XHJcbmV4cG9ydCBjbGFzcyBEcmF3IHtcclxuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgdGN0eDogT2Zmc2NyZWVuQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgb2ZmOiBPZmZzY3JlZW5DYW52YXM7XHJcbiAgICBoOiBudW1iZXI7XHJcbiAgICB3OiBudW1iZXI7XHJcbiAgICAvL3BpeGVkc2l6ZVxyXG4gICAgcGl4ZWxzaXplOltudW1iZXIsbnVtYmVyXTtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGU6IEhUTUxDYW52YXNFbGVtZW50LCBwdWJsaWMgcnM6IG51bWJlciwgcHVibGljIGNzOiBudW1iZXIpIHtcclxuICAgICAgICAvL+i/memHjOW+l+WIsDJkIOS4iuS4i+aWhyDorqHnrpfmoLzlrZDlpKflsI9cclxuICAgICAgICBsZXQgY3R4ID0gZWxlLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcclxuICAgICAgICAvL+iuoeeul+agvOWtkOWkp+Wwj1xyXG4gICAgICAgIHRoaXMuaCA9IGVsZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy53ID0gZWxlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuY2ggPSB0aGlzLmggLyBycztcclxuICAgICAgICB0aGlzLmN3ID0gdGhpcy53IC8gY3M7XHJcbiAgICAgICAgLy9jYWNoZVxyXG4gICAgICAgIHRoaXMub2ZmID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh0aGlzLncsIHRoaXMuaCk7XHJcbiAgICAgICAgdGhpcy50Y3R4ID0gdGhpcy5vZmYuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5waXhlbHNpemU9W3RoaXMuY2gsdGhpcy5jd107XHJcbiAgICAgICAgdGhpcy51cHNhbXBsZT10Zi5sYXllcnMudXBTYW1wbGluZzJkKHtzaXplOnRoaXMucGl4ZWxzaXplLGR0eXBlOmRlZmF1bHREdHlwZX0pO1xyXG4gICAgfVxyXG4gICAgY2g6IG51bWJlcjtcclxuICAgIGN3OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZHJhd1BvaW50KHgsIHksIGM6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByeDogbnVtYmVyLCByeTogbnVtYmVyO1xyXG4gICAgICAgIHJ4ID0geCAqIHRoaXMuY3c7XHJcbiAgICAgICAgcnkgPSB5ICogdGhpcy5jaDtcclxuICAgICAgICAvL+e7mOWItiA/Pz9cclxuICAgICAgICB0aGlzLnRjdHguZmlsbFN0eWxlID0gYztcclxuICAgICAgICB0aGlzLnRjdHguZmlsbFJlY3QocngsIHJ5LCB0aGlzLmN3LCB0aGlzLmNoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog55So5LqO57uY5Yi2MDHnn6npmLUg55So5p+Q5Liq6aKc6Imy6KGo56S6MVxyXG4gICAgICog6L+Y6ZyA6KaB57uY5Yi25LiN5ZCM5Zu+5bGC55qE5pa55byPIOWmgueUqOafkOS6m+WPpuS4gOS6m+minOiJsuihqOekuuWPpuS4gOS6m+S4nOilvyDnhLblkI7lj6DliqBcclxuICAgICAqIOi/mOmcgOimgeWPr+S7pee7mOWItuWunuaVsOefqemYteeahOWHveaVsFxyXG4gICAgICogQHBhcmFtIHRzIDAx55+p6Zi1XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBkcmF3MkQodHM6IHRmLlRlbnNvcjJEKSB7XHJcbiAgICAgICAgLy8gdGhpcy50Y3R4LmNsZWFyUmVjdCgwLDAsdGhpcy53LHRoaXMuaCk7XHJcbiAgICAgICAgLy8gdGhpcy50Y3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIC8vIHRoaXMudGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLncsIHRoaXMuaCk7XHJcbiAgICAgICAgLy/ms5UxXHJcbiAgICAgICAgbGV0IHJnYm1hdD1hd2FpdCB0aGlzLnRvcmdiKHRzKTsgIC8vMCBmZmZmZmZmZiAxIDAwMDAwMDAwXHJcblxyXG5cclxuICAgICAgICAvLyBsZXQgaW1nPXRoaXMudGN0eC5wdXRJbWFnZURhdGEocmdibWF0LDAsMCk7XHJcbiAgICAgICAgLy/ms5UyXHJcbiAgICAgICAgLy8gbGV0IGFyciA9IGF3YWl0IHRzLmRhdGEoKTtcclxuICAgICAgICAvLyBhcnIuZm9yRWFjaCgodiwgaSkgPT4ge1xyXG4gICAgICAgIC8vICAgICAvL+e7mOWItiAw57Si5byV5a+55bqU5YiXXHJcbiAgICAgICAgLy8gICAgIGxldCBhID0gWywgXCIjZmYwMDAwXCJdO1xyXG4gICAgICAgIC8vICAgICBpZiAodiA9PSAxKVxyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5kcmF3UG9pbnQoaSV0cy5zaGFwZVswXSxNYXRoLmZsb29yKGkvdHMuc2hhcGVbMF0pLCBhWzFdKTtcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvLyB0aGlzLnRjdHguZmlsbCgpO1xyXG4gICAgICAgIC8v57uY5Yi25Yiw55S75biDXHJcbiAgICAgICAgLy8gdGhpcy5jdHguY2xlYXJSZWN0KDAsMCx0aGlzLncsdGhpcy5oKTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5vZmYsIDAsIDApO1xyXG4gICAgICAgIHRoaXMuY3R4LnB1dEltYWdlRGF0YShyZ2JtYXQsMCwwKTtcclxuICAgICAgICAvLyB0aGlzLmN0eC5zY2FsZSg0LDQpXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwc2FtcGxlOiB0Zi5sYXllcnMuTGF5ZXI7XHJcbiAgICBhc3luYyB0b3JnYih0OnRmLlRlbnNvcjJEKXtcclxuICAgICAgICBcclxuICAgICAgICAvL+aoque6teaJqeWxlTTlgI0g5ouJ5Ly4XHJcbiAgICAgICAgLy8gZnVuY3Rpb24gaG9yZXhwYW5kKHQ6dGYuVGVuc29yMkQsdj00KTp0Zi5UZW5zb3IyRHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIHQuZXhwYW5kRGltcygyKS50aWxlKFsxLDEsdl0pLnJlc2hhcGUoW3Quc2hhcGVbMF0sdC5zaGFwZVsxXSp2XSlcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZnVuY3Rpb24gdm9yZXhwYW5kKHQ6dGYuVGVuc29yMkQsdj00KTp0Zi5UZW5zb3IyRHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGhvcmV4cGFuZCh0LnRyYW5zcG9zZSgpLHYpLnRyYW5zcG9zZSgpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgbGV0IG51bT10Zi50aWR5KCgpPT57XHJcbiAgICAgICAgICAgIC8vaW50MzIg54S25ZCOw5fkuIDkuKrpopzoibJcclxuICAgICAgICAgICAgbGV0IGNvbG9yZWQ9dC5tdWwoMHhmZjAwMDBmZnwwKSBhcyB0eXBlb2YgdDtcclxuICAgICAgICAgICAgLy8gbGV0IHJlc2l6ZWQ9dm9yZXhwYW5kKGhvcmV4cGFuZChjb2xvcmVkKSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcj10aGlzLnBpeGVsc2l6ZVswXT09dGhpcy5waXhlbHNpemVbMF0mJnRoaXMucGl4ZWxzaXplWzBdPT0xPyBleHBhbmRUbzREKGNvbG9yZWQpOnRoaXMudXBzYW1wbGUuY2FsbChleHBhbmRUbzREKGNvbG9yZWQpLHt9KSBhcyB0Zi5UZW5zb3I0RDtcclxuICAgICAgICAgICAgbGV0IHJlc2l6ZWQ9ci5zcXVlZXplKFswLDNdKSBhcyB0Zi5UZW5zb3IyRDtcclxuICAgICAgICAgICAgLy/ov5vooYxyZ2Jh6K+dIOaoquWQkeaJqeWxlTTlgI1cclxuICAgICAgICAgICAgLy8gbGV0IHJnYj1ob3JleHBhbmQocmVzaXplZCw0KTtcclxuICAgICAgICAgICAgLy/popzoibLlpITnkIYg5oqKMSAxIDEgMeeahOi/nue7rTTkuKog5Y+Y5Li6IGFhYWFhYWFhXHJcbiAgICAgICAgICAgIC8vIGxldCBjb3I9cmdiLm11bCgweGFhKTtcclxuICAgICAgICAgICAgbGV0IG51bT1yZXNpemVkLmFzVHlwZShcImludDMyXCIpO1xyXG4gICAgICAgICAgICAvLyBsZXQgbnVtPXJlc2l6ZWQ7XHJcbiAgICAgICAgICAgIHJldHVybiBudW07XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vbnVt6L2s5o2i5Li6dWludDhcclxuICAgICAgICBsZXQgYXI9YXdhaXQgbnVtLmRhdGEoKTtcclxuICAgICAgICBsZXQgcGl4ZWRzPW5ldyBVaW50OENsYW1wZWRBcnJheShhci5idWZmZXIpO1xyXG4gICAgICAgIG51bS5kaXNwb3NlKCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJbWFnZURhdGEocGl4ZWRzLG51bS5zaGFwZVsxXSxudW0uc2hhcGVbMF0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+aKijAx55+p6Zi16L2s5o2i5Li65YOP57Sg55+p6Zi1XHJcbmNvbnN0IHNpemU9WzQsNF1cclxuIiwiaW1wb3J0ICogYXMgdGYgZnJvbSBcIkB0ZW5zb3JmbG93L3RmanNcIlxyXG5pbXBvcnQge2RlbGF5LCBpbnQsIGZsb2F0LCBzdHIsIHJhbmRpbnQsIHJhbmdlfSBmcm9tICcuLi9saWJzL2xpYic7XHJcbmltcG9ydCB7IERyYXcgfSBmcm9tIFwiLi9EcmF3XCI7XHJcbmltcG9ydCB7dXNlTWF0cml4UnVsZSwgUnVsZSwgdHJhaW4sIHVzZUxheWVycywgZGVmYXVsdER0eXBlfSBmcm9tICcuL3J1bGVzL21hdHJpeF9ydWxlcyc7XHJcbmltcG9ydCBcIkB0ZW5zb3JmbG93L3RmanMtYmFja2VuZC13ZWJncHVcIlxyXG5pbXBvcnQgXCJAdGVuc29yZmxvdy90ZmpzLWJhY2tlbmQtd2FzbVwiXHJcbi8vIHRmLnNldEJhY2tlbmQoXCJ3ZWJnbFwiKS50aGVuKHIgPT4gKVxyXG5mdW5jdGlvbiBnZXR2YWwoaWQ6c3RyaW5nKXtcclxuICAgIGxldCBlPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBpbnB1dCMke2lkfWApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICByZXR1cm4gZS52YWx1ZTtcclxufVxyXG5mdW5jdGlvbiBnZXQ8UiBleHRlbmRzIGtleW9mIHRhYmxlPihpZDpzdHJpbmcsdGFnOlI9bnVsbCk6dGFibGVbUl17XHJcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7aWR9YCkgYXMgdGFibGVbUl07XHJcbn1cclxubGV0IGE9Z2V0KFwiaGVsbG9cIilcclxuXHJcbnR5cGUgdGFibGU9e1xyXG4gICAgb3B0aW9uOkhUTUxPcHRpb25FbGVtZW50LFxyXG4gICAgZGl2OkhUTUxEaXZFbGVtZW50LFxyXG4gICAgaW5wdXQ6SFRNTElucHV0RWxlbWVudCxcclxuICAgIFwiKlwiOkhUTUxFbGVtZW50LFxyXG4gICAgc2VsZWN0OkhUTUxTZWxlY3RFbGVtZW50XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlPFQgZXh0ZW5kcyBrZXlvZiB0YWJsZSxSIGV4dGVuZHMga2V5b2YgdGFibGVbVF0+KHRhZzogVCxpZDpzdHJpbmcsdmFsdWVzOm9iamVjdCk6dGFibGVbVF17XHJcbiAgICBsZXQgdD0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpXHJcbiAgICB0LmlkPWlkO1xyXG4gICAgLy9cclxuICAgIGZvcihsZXQgayBpbiB2YWx1ZXMpe1xyXG4gICAgICAgIGlmKGsgaW4gdCA9PSBmYWxzZSkgY29udGludWU7XHJcbiAgICAgICAgdFtrXT12YWx1ZXNba107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdCBhcyB1bmtub3duIGFzIHRhYmxlW1RdO1xyXG59XHJcblxyXG4vLyBsZXQgcnVsZXM9e1xyXG4vLyAgICAgYjNzMjMsXHJcbi8vICAgICBiMXMxMixcclxuLy8gICAgIGIzNjc4czM0Njc4LFxyXG4vLyAgICAgYjM2czIzLFxyXG4vLyAgICAgYjM1Njc4czU2NzhcclxuLy8gfVxyXG5pbXBvcnQge1J1bGVzIGFzIHJ1bGVzfSBmcm9tIFwiLi9ydWxlcy9tYXRyaXhfcnVsZXNcIlxyXG5pbXBvcnQge3NldEJhY2tlbmR9IGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCI7XHJcbmltcG9ydCB7ZGVidWd9IGZyb20gXCJ3ZWJwYWNrXCI7XHJcbmZ1bmN0aW9uIGluaXRTZWxlY3Rpb24oKVxyXG57XHJcblxyXG4gICAgZm9yKGxldCBrIGluIHJ1bGVzKXtcclxuICAgICAgICBnZXQoXCJydWxlXCIpLmFwcGVuZENoaWxkKGNyZWF0ZShcIm9wdGlvblwiLGsse2lubmVyVGV4dDprLHZhbHVlOmt9KSlcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0X3BhcmFtKHBhcmFtOnN0cmluZyl7XHJcbiAgICB2YXIgcXVlcnkgPSBsb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KCcmJyk7XHJcbiAgICBmb3IodmFyIGk9MDtpPHF1ZXJ5Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgIHZhciBrdiA9IHF1ZXJ5W2ldLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgaWYoa3ZbMF0gPT0gcGFyYW0pe1xyXG4gICAgICAgICAgICByZXR1cm4ga3ZbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbi8v5piv5ZCm6ZyA6KaB6K6t57uD56We57uP572R57uc5rWL6K+VXHJcbmNvbnN0IHVzZXRyYWluPWZhbHNlO1xyXG5hc3luYyBmdW5jdGlvbiBtYWluKCl7XHJcbiAgICBjb25zdCBzPVwid2ViZ2xcIjtcclxuICAgIGNvbnN0IHQ9YXdhaXQgdGYuc2V0QmFja2VuZChzKTtcclxuICAgIGFsZXJ0KGDlkI7nq686JHtzfSR7dD9cIuaIkOWKn1wiOlwi5aSx6LSlXCJ9IOS9v+eUqOaVsOaNruexu+Weizoke2RlZmF1bHREdHlwZX1gKVxyXG4gICAgaW5pdFNlbGVjdGlvbigpO1xyXG5cclxuICAgIGxldCBlbGU9Z2V0KFwiY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgbGV0IGhzaXplPVsxMDI0LDEwMjRdXHJcbiAgICBlbGUuaGVpZ2h0PWhzaXplWzBdO1xyXG4gICAgZWxlLndpZHRoPWhzaXplWzFdO1xyXG4gICAgZWxlLmlkPVwiY3R4XCJcclxuICAgIGNvbnN0IHJzaXplPWdldF9wYXJhbShcInJzaXplXCIpPT1udWxsPyAyOmZsb2F0KGdldF9wYXJhbShcInJzaXplXCIpKVxyXG4gICAgZ2V0KFwicnNpemVcIixcImlucHV0XCIpLnZhbHVlPXJzaXplLnRvU3RyaW5nKCk7XHJcbiAgICBsZXQgc2l6ZT1baHNpemVbMF0vcnNpemUsaHNpemVbMV0vcnNpemVdXHJcbiAgICBsZXQgZD1uZXcgRHJhdyhlbGUsc2l6ZVswXSxzaXplWzFdKTtcclxuXHJcbiAgICBsZXQgaW5pdD0oKT0+dGYucmFuZG9tVW5pZm9ybShzaXplLDAsMSxkZWZhdWx0RHR5cGUpLmRpdihmbG9hdChnZXR2YWwoXCJyZWxcIikpKS5mbG9vcigpLmVxdWFsKDApLmFzVHlwZShkZWZhdWx0RHR5cGUpIGFzIHRmLlRlbnNvcjJEXHJcbiAgICBsZXQgZHQ9aW5pdCgpO1xyXG4gICAgLy/ovpPlh7pcclxuICAgIGdldChcImluZm9cIikuaW5uZXJUZXh0PWAke2R0LnNoYXBlWzBdfXgke2R0LnNoYXBlWzFdfSAoaCp3KSBgXHJcbiAgICBnZXQoXCJjaW5mb1wiKS5pbm5lclRleHQ9YCR7aHNpemVbMF19eCR7aHNpemVbMV19IChoKncpYFxyXG5cclxuICAgIGQuZHJhdzJEKGR0KTtcclxuICAgIGNvbnNvbGUubG9nKGR0KTtcclxuICAgIC8v5YGc5q2i5L+h5Y+3XHJcbiAgICBsZXQgcD10cnVlO1xyXG4gICAgLy/mmK/lkKbpnZnpu5jmm7TmlrAg5LiN57uY5Yi2XHJcbiAgICBsZXQgc2w9ZmFsc2U7XHJcbiAgICAvL+i9ruaVsFxyXG4gICAgbGV0IG49MDtcclxuICAgIC8v57uY5Yi26Ze06ZqUIOWkmuWwkeW4p+e7mOWItuS4gOasoVxyXG4gICAgbGV0IGRyYXdGcmVxPTE7XHJcbiAgICAvL2xvb3Ag5pu05paw5Ye95pWwIOS7jm9sZOiuoeeul+W+l+WIsG5ldyjluKfnn6npmLXvvIlcclxuICAgIC8v5pu05paw5Ye95pWw6buY6K6k5L2/55So55+p6Zi16KeE5YiZIGIzczIz57uP5YW455Sf5ZG95ri45oiPXHJcbiAgICBsZXQgdXBkYXRlPShvbGQ6dGYuVGVuc29yMkQpPT51c2VNYXRyaXhSdWxlKG9sZCxydWxlcy5iM3MyMyx1c2V0cmFpbilcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmaj+acuuiuvue9ruWHveaVsCDnlKjku6Xpmo/mnLrmt7vliqDngrnliLDnlLvluIPkuIpcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcmFuZG9tU2V0KGNvdW50Om51bWJlcil7XHJcbiAgICAgICAgZm9yKHZhciBpIG9mIHJhbmdlKDAsY291bnQpKXtcclxuICAgICAgICAgICAgc2V0cG9pbnQocmFuZGludChoc2l6ZVswXSkscmFuZGludChoc2l6ZVsxXSkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Li75b6q546vIOabtOaWsOS4gOW4pyDnhLblkI7nu5jliLZcclxuICAgICAqL1xyXG4gICAgYXN5bmMgZnVuY3Rpb24gbG9vcCgpe1xyXG4gICAgICAgIC8v6L6T5Ye65aSn5bCPXHJcbiAgICAgICAgbGV0IGRlbGF5dD1pbnQoZ2V0dmFsKFwiZGVsYXlcIikpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcig7Oyl7XHJcbiAgICAgICAgICAgIC8v6ZqP5py65re75Yqg54K5XHJcbiAgICAgICAgICAgIC8vIHJhbmRvbVNldCgpXHJcbiAgICAgICAgICAgIC8v5q2j5paHXHJcbiAgICAgICAgICAgIGF3YWl0IGRlbGF5KGRlbGF5dCk7XHJcbiAgICAgICAgICAgIGxldCBvbGQ9ZHQ7XHJcbiAgICAgICAgICAgIGR0PXVwZGF0ZShkdCk7XHJcbiAgICAgICAgICAgIG9sZC5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkdCk7XHJcbiAgICAgICAgICAgIC8v6Z2e6Z2Z6buYIOS4lCDmm7Tnu4bliLDkuobmm7TmlrDnmoTml7blgJkg6L+Z6YeM5Y+v5Lul6YCJ5oup562J5b6F57uY5Yi25a6M5oiQ5oiW6ICF5LiN562J5b6FXHJcbiAgICAgICAgICAgIGlmKCFzbCYmbiVkcmF3RnJlcT09MClcclxuICAgICAgICAgICAgICAgIGF3YWl0IGQuZHJhdzJEKGR0KTtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgaWYocCkgYnJlYWs7XHJcbiAgICAgICAgICAgIG4rKztcclxuICAgICAgICAgICAgLy/mmL7npLrova5cclxuICAgICAgICAgICAgZ2V0KFwiblwiKS5pbm5lclRleHQ9bi50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAvL2V2ZW50XHJcbiAgICBnZXQoXCJzdGFydFwiKS5vbmNsaWNrPWFzeW5jKCk9PntcclxuICAgICAgICBpZihwKXtcclxuICAgICAgICAgICAgcD1mYWxzZTtcclxuICAgICAgICAgICAgLy/ojrflj5bop4TliJlcclxuICAgICAgICAgICAgbGV0IHJ1bGVpZD1nZXQoXCJydWxlXCIsXCJzZWxlY3RcIikuc2VsZWN0ZWRPcHRpb25zWzBdLnZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgcnVsZT1ydWxlc1tydWxlaWRdIGFzIFJ1bGU7XHJcbiAgICAgICAgICAgIC8v6L+Z6YeM5o6n5Yi25piv5ZCm5byA5ZCv5Y6G5Y+y6K6w5b2V77yI5oyB57ut5raI6ICX5YaF5a2Y5oiW5pi+5a2Y77yJXHJcbiAgICAgICAgICAgIHVwZGF0ZT0ob2xkKT0+dXNlTWF0cml4UnVsZShvbGQscnVsZSx1c2V0cmFpbilcclxuICAgICAgICAgICAgLy/lkK/liqjlvqrnjq9cclxuICAgICAgICAgICAgbG9vcCgpO1xyXG4gICAgICAgICAgICBnZXQoXCJzdGFydFwiKS5zdHlsZS5iYWNrZ3JvdW5kPVwicmVkXCJcclxuICAgICAgICAgICAgZ2V0KFwic3RhcnRcIikuaW5uZXJUZXh0PVwi5pqC5YGcXCI7XHJcbiAgICAgICAgICAgIGdldChcInRyYWluXCIpLnN0eWxlLmRpc3BsYXk9XCJub25lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHA9dHJ1ZTtcclxuICAgICAgICAgICAgZ2V0KFwic3RhcnRcIikuc3R5bGUuYmFja2dyb3VuZD1cIlwiXHJcbiAgICAgICAgICAgIGdldChcInN0YXJ0XCIpLmlubmVyVGV4dD1cIuWQr+WKqFwiO1xyXG4gICAgICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICAgICAgICAgIGdldChcInRyYWluXCIpLnN0eWxlLmRpc3BsYXk9XCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG4gICAgZ2V0KFwidHJhaW5cIikub25jbGljaz1hc3luYyAoKT0+e1xyXG4gICAgICAgIGF3YWl0IHRyYWluKHJzaXplKTtcclxuICAgICAgICBhbGVydChcIuiuree7g+aIkOWKnyzlkK/liqjmtYvor5VcIilcclxuICAgICAgICAvL+aYvuekuueUqOe9kee7nOWunueOsOeahOabtOaWsFxyXG4gICAgICAgIHVwZGF0ZT0ob2xkOnRmLlRlbnNvcjJEKT0+dXNlTGF5ZXJzKG9sZCk7XHJcbiAgICAgICAgLy/lkK/liqjmtYvor5XvvIzmtYvor5XlrozmiJDliY3or7fli7/mk43kvZwgXHJcbiAgICAgICAgLy/liJ3lp4vljJZcclxuICAgICAgICBkdD1pbml0KCk7XHJcbiAgICAgICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgICAgIG49MDtcclxuICAgICAgICBwPWZhbHNlO1xyXG4gICAgICAgIGdldChcImRlbGF5XCIsXCJpbnB1dFwiKS52YWx1ZT1zdHIoMjAwKTtcclxuICAgICAgICBhd2FpdCBsb29wKCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBhbGVydChcIua1i+ivleWujOaIkFwiKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIGdldChcInJlc2V0XCIpLm9uY2xpY2s9YXN5bmMoKT0+e1xyXG4gICAgICAgIGR0PWluaXQoKTtcclxuICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICAgICAgbj0wO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoYW5nZXBvaW50KHgseSl7XHJcbiAgICAgICAgaWYoeDwwfHx5PDApIHJldHVybjtcclxuICAgICAgICBsZXQgZGF0YT1kdC5hcnJheVN5bmMoKTtcclxuICAgICAgICBsZXQgdHgsdHk7XHJcbiAgICAgICAgdHg9TWF0aC5mbG9vcih4L2QuY3cpO1xyXG4gICAgICAgIHR5PU1hdGguZmxvb3IoeS9kLmNoKVxyXG4gICAgICAgIGRhdGFbdHldW3R4XT1kYXRhW3R5XVt0eF09PTA/IDE6MDtcclxuICAgICAgICBkdC5kaXNwb3NlKCk7XHJcbiAgICAgICAgZHQ9dGYudGVuc29yKGRhdGEpO1xyXG4gICAgICAgIGQuZHJhdzJEKGR0KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldHBvaW50KHgseSx2PTEpe1xyXG4gICAgICAgIGlmKHg8MHx8eTwwKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGRhdGE9ZHQuYXJyYXlTeW5jKCk7XHJcbiAgICAgICAgbGV0IHR4LHR5O1xyXG4gICAgICAgIHR4PU1hdGguZmxvb3IoeC9kLmN3KTtcclxuICAgICAgICB0eT1NYXRoLmZsb29yKHkvZC5jaClcclxuICAgICAgICBkYXRhW3R5XVt0eF09MTtcclxuICAgICAgICBkdC5kaXNwb3NlKCk7XHJcbiAgICAgICAgZHQ9dGYudGVuc29yKGRhdGEpO1xyXG4gICAgICAgIGQuZHJhdzJEKGR0KTtcclxuICAgICAgICAvL3NldFxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBzZXQ6JHt4fSwke3l9ID0gJHt2fWApXHJcbiAgICB9XHJcbiAgICBnZXQoXCJjdHhcIikub25jbGljaz1lPT57XHJcbiAgICAgICAgaWYoZS5idXR0b249PTApXHJcbiAgICAgICAgICAgIGNoYW5nZXBvaW50KGUub2Zmc2V0WCxlLm9mZnNldFkpO1xyXG4gICAgfVxyXG4gICAgZ2V0KFwiY3R4XCIpLm9ubW91c2Vtb3ZlPWU9PntcclxuICAgICAgICBpZihlLmJ1dHRvbnM9PT0xKXtcclxuICAgICAgICAgICAgc2V0cG9pbnQoZS5vZmZzZXRYLGUub2Zmc2V0WSwxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoXCJzbFwiKS5vbmNsaWNrPSgpPT57XHJcbiAgICAgICAgc2w9IXNsO1xyXG4gICAgICAgIGlmKHNsKSBnZXQoXCJzbFwiKS5zdHlsZS5iYWNrZ3JvdW5kPVwicmVkXCI7XHJcbiAgICAgICAgZWxzZSBnZXQoXCJzbFwiKS5zdHlsZS5iYWNrZ3JvdW5kPVwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG59XHJcbndpbmRvdy5vbmxvYWQ9bWFpbjtcclxuY29uc29sZS5sb2coXCJoZWxsb3dvcmxkXCIpO1xyXG5cclxuY29uc3QgbW9kPSAobW9kdWxlIGFzIGFueSk7XHJcbmlmKG1vZC5ob3QpXHJcbiAgbW9kLmhvdC5hY2NlcHQoKTtcclxuY29uc29sZS5sb2cobW9kLmhvdClcclxuLy8gbW9kLmFkZERpc3Bvc2VIYW5kbGVyKCgpPT57XHJcbi8vICAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpO1xyXG4vLyB9KSIsImltcG9ydCAqIGFzIHRmIGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCJcclxuLy/lpoLmnpznrYnkuo7liJnkuLoxIOWQpuWImeWImeS4ujBcclxuLy/nm7jnrYnmr5TovoNcclxuLyoqXHJcbiAqIOWbvuajgOa1iyDmo4DmtYvlm77kuK3mr4/kuKrngrnmmK/lkKbnrYnkuo7mn5DkuKrmlbAg5aaC5p6c562J5LqO6L+U5ZueMSDlkKbliJnov5Tlm54wIOS4jnRm6buY6K6k55qEXHJcbiAqIOWSjHRmLmVxdWFs55qE6IO95Yqb5LiA5qC3IOS9huWPkeaMpeeahOS4uuaVsOWAvOefqemYtSDogIzpnZ5ib29s55+p6Zi1XHJcbiAqIEBwYXJhbSB0c1xyXG4gKiBAcGFyYW0gZXF1dG9cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBlcXVhbE1hcDxUIGV4dGVuZHMgdGYuVGVuc29yPih0czogVCwgZXF1dG86IG51bWJlcik6VCB7XHJcbiAgICAvLyBpZihlcXV0byE9MCkgcmV0dXJuIHRzLmRpdihlcXV0bykuc3ViKDEpLmFicygpLmxlc3NFcXVhbCgwKTtcclxuICAgIHJldHVybiB0Zi5lcXVhbCh0cyxlcXV0bykuYXNUeXBlKHRzLmR0eXBlKSBhcyBUO1xyXG59XHJcbi8v5q2k5aSE5bqU5pyJ5aSn5LqO5q+U6L6DICDnlLHmraTlj6/lvpcg5omA5pyJ5q+U6L6D5Yik5patXHJcblxyXG4vLzEtMCDlj5jmjaIg5Y2zbm906L+Q566XXHJcbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlQm9vbCh0czogdGYuVGVuc29yKSB7XHJcbiAgICByZXR1cm4gdHMuc3ViKDEpLmFicygpO1xyXG59XHJcbi8vMC0xIOWPmOS4uiAgLTEgMSDnrKblj7fljJbov5DnrpdcclxuZXhwb3J0IGZ1bmN0aW9uIHN5bWxpemUodHM6IHRmLlRlbnNvcikge1xyXG4gICAgcmV0dXJuIHRzLm11bCgyKS5zdWIoMSk7XHJcbn1cclxuLy/mraTlpITlupTmnInkuI7miJbpnZ4g5byC5oiWIFxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBleHBhbmRUbzREKHRzOiB0Zi5UZW5zb3IyRCk6IHRmLlRlbnNvcjREIHtcclxuICAgIC8v6L+Z5Liq5oqKMmQgZmVhdHVyZW1hcOWPmOS4ujRk5Y+v5Lul55u05o6l6L+b6KGM5Y2356ev5pON5L2c55qEZmVhdHVyZW1hcOaIlmtlcm5lbFxyXG4gICAgLy/kuZ/lsLHmmK/nm7TmjqXlr7lmZWF0dXJlbWFw6L+b6KGM5Y2356evXHJcbiAgICAvL+WPmOaIkG5od2NcclxuICAgIGxldCBzID0gdHMuZXhwYW5kRGltcygwKS5leHBhbmREaW1zKC0xKSBhcyB0Zi5UZW5zb3I0RDtcclxuICAgIC8v5omp5bGV5LiA5Liq5YmN6Z2i55qEbuWSjOS4gOS4quWQjumdoueahGNcclxuICAgIHJldHVybiBzO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVEaW1UbzJEKHRzOiB0Zi5UZW5zb3I0RCk6IHRmLlRlbnNvcjJEIHtcclxuICAgIC8v6L+Z5Liq5oqKMmQgZmVhdHVyZW1hcOWPmOS4ujRk5Y+v5Lul55u05o6l6L+b6KGM5Y2356ev5pON5L2c55qEZmVhdHVyZW1hcOaIlmtlcm5lbFxyXG4gICAgLy/kuZ/lsLHmmK/nm7TmjqXlr7lmZWF0dXJlbWFw6L+b6KGM5Y2356evXHJcbiAgICAvL+WPmOaIkG5od2NcclxuICAgIGxldCBzID0gdHMuc3F1ZWV6ZShbMCwgM10pIGFzIHRmLlRlbnNvcjJEO1xyXG4gICAgLy/mianlsZXkuIDkuKrliY3pnaLnmoRu5ZKM5LiA5Liq5ZCO6Z2i55qEY1xyXG4gICAgcmV0dXJuIHM7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgdGYgZnJvbSBcIkB0ZW5zb3JmbG93L3RmanNcIlxyXG5pbXBvcnQgeyBleHBhbmRUbzRELCBlcXVhbE1hcCwgZGVsZXRlRGltVG8yRCB9IGZyb20gXCIuLi9tYXRyaXhfdG9vbFwiO1xyXG5pbXBvcnQgeyByYW5nZSB9IGZyb20gXCIuLi8uLi9saWJzL2xpYlwiO1xyXG5pbXBvcnQge1RlbnNvciwgVGVuc29yMkR9IGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCI7XHJcbi8v5YWD5pON5L2cIDAgMeefqemYtSDms6jmhI/kuIvpnaLnmoTpg73lj6/ku6XnlKhsb2dpY0FuZCBvcuetieadpeWunueOsFxyXG4vKipcclxuICog5a6e546w5aSa5Z+f55qE5pa55rOV77ya5bCGMmTnn6npmLXlop7liqDkuIDkuKrnu7TluqYg5L2/55So5Y2356ev6K6h566X57uT5p6cXHJcbiAqIOaYvuekuuaXtuWIhuWIq+aYvuekuuWkmuS4quWbvuWxguaIlumAieaLqeWFtuS4reS4gOS4quaYvuekuiDmiJbnu7zlkIgg5ZCI5oiQ5LiA5Liq5Zu+5bGC5pi+56S6XHJcbiAqIOmcgOimgeaUuemAoOaYvuekuuezu+e7nyDmk43kvZzpgLvovpEgYmFzaWNcclxuICogcnVsZSDlkozmlbDmja7liJ3lp4vljJZcclxuICovXHJcbi8qKlxyXG4gKiDlj5blj40gMSAw5a+56LCDXHJcbiAqIEBwYXJhbSB0ZW5zb3JcclxuICovXHJcbmZ1bmN0aW9uIHRmX3JldmVyc2UodGVuc29yOlRlbnNvcil7XHJcbiAgICAvL+S9v+eUqGVxdWFsIDAg5Lmf5Y+v5Lul5a6e546w5oqKIDDlj5gxIDEg5Y+YMFxyXG4gICAgcmV0dXJuIHRmLnRpZHkoKCk9PntcclxuICAgICAgICByZXR1cm4gdGYuYWJzKHRmLnN1Yih0ZW5zb3IsMSkpO1xyXG4gICAgfSlcclxufVxyXG4vKipcclxuICog6K6+MSDmmK/orr4w55qE5Y+N6Z2iXHJcbiAqIEBwYXJhbSB0ZW5zb3JcclxuICovXHJcbmZ1bmN0aW9uIHRmX3NldE9uZSh0ZW5zb3I6VGVuc29yLHNldE1hcDpUZW5zb3Ipe1xyXG4gICAgcmV0dXJuIHRmLnRpZHkoKCk9PntcclxuICAgICAgICByZXR1cm4gdGZfcmV2ZXJzZSh0Zl9zZXRaZXJvKHRmX3JldmVyc2UodGVuc29yKSx0Zl9yZXZlcnNlKHNldE1hcCkpKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDorr4wIOWboOS4uuS6pOaNouW+iyDorr7nva4w55qE5Y+C5pWw6aG65bqP5LiN6ZmQXHJcbiAqIEBwYXJhbSB0ZW5zb3Ig5Y6f5aeL55+p6Zi1XHJcbiAqIEBwYXJhbSBzZXRNYXAg6K6+572u55+p6Zi1IDDooajnpLropoHorr4w55qE5L2N572uIDEg6KGo56S65LiN5Y+YXHJcbiAqL1xyXG5mdW5jdGlvbiB0Zl9zZXRaZXJvKHRlbnNvcjpUZW5zb3Isc2V0TWFwOlRlbnNvcil7XHJcbiAgICByZXR1cm4gdGYudGlkeSgoKT0+dGYubXVsKHRlbnNvcixzZXRNYXApKTtcclxufVxyXG4vL+aTjeS9nOmbhiDms6jmhI8g5aaC5p6c5LiA5Liq6KeE5YiZ5Lit5LiN6K6+572u5Lu75L2V6KeE5YiZIOWImeWFqOmDqOiuvue9ruS4ujBcclxuZXhwb3J0IGNvbnN0IGRlZmF1bHREdHlwZT1cImZsb2F0MzJcIlxyXG4vKipcclxuICog5aaC5p6c5ZGo5Zu05pyJ77yIdiDkuKTvvInkuKrkuLoxIOWImeS/neaMgeS4reW/g+S4jeWPmFxyXG4gKiDlkKbliJnorr7nva7kuLowICDkuZ/lsLHmmK/pmaTkuoZ25LmL5aSW55qE6YO95Lya6K6+572u5Li6MFxyXG4gKiBAcGFyYW0gSyDljbfnp6/lvpfliLDnmoTnu5PmnpzooajnpLrlkajlm7TmoLzlrZDlr7nkuK3lv4PmoLzlrZDnmoTlvbHlk43vvIzkuIDoiKzooajnpLrlkajlm7TmoLzlrZDkuK0x55qE5Liq5pWwXHJcbiAqIEBwYXJhbSBTIOWOn+Wni+efqemYtVxyXG4gKiBAcGFyYW0gUCBLK1PnmoTnu5PmnpxcclxuICogQHBhcmFtIHZcclxuICovXHJcbmZ1bmN0aW9uIGtlZXAoSyxTLFAsdj0yKVxyXG57XHJcbiAgICAvL+aKiuWRqOWbtOacieS4pOS4quagvOWtkOeahOeCuSDlpI3liLbliLDnu5PmnpzkuK0g5aaC5p6c5ZGo5Zu05LiN5piv5Lik5Liq5qC85a2QIOabtOWkmuaIluabtOWwkSDlsLHkuI3lpI3liLZcclxuICAgIC8v5aSN5Yi25LiN5piv5Y+g5Yqg6ICM5piv6K6+572u5Li6MSAg5aaC5p6c5a+556m657uT5p6c5omn6KGMIOWwseaYr+WkjeWItueahOaEj+aAnSDkvYblpoLmnpzlr7npnZ7nqbrnu5Pmnpwg5bCx5pivIOWmguaenOWOn+Wni+S9jee9ruaYrzHnmoTor53lsLHorr7nva4g5ZCm5YiZ5LiN5pS55Y+YXHJcbiAgICAvL+ajgOa1iyDlpoLmnpzkuLoyICDkuI3orr7nva56ZXJvIOS/neaMgeS4jeWPmCDlpoLmnpzkuI3mmK8yIOWImSDlhajpg6jorr7nva7kuLowXHJcbiAgICBsZXQgSzIgPSBlcXVhbE1hcChLLCB2KTtcclxuICAgIC8v5Lul5Y+g5Yqg5pa55byP5L+d5a2Y57uT5p6cIOS7pXNldE9uZee7k+WwvueahOivnSDkuI3kvJrmtojljrvku7vkvZXkuJzopb9cclxuICAgIHJldHVybiB0Zl9zZXRPbmUoUCx0Zl9zZXRaZXJvKFMsSzIpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOWmguaenOWRqOWbtOacie+8iHYgM++8ieS4quS4ujEg5YiZ6K6+572u5Lit5b+D5Li6MVxyXG4gKiBAcGFyYW0gSyDpnZ4wIDEg55+p6Zi1XHJcbiAqIEBwYXJhbSBTIDAgMSDnn6npmLVcclxuICogQHBhcmFtIFAgMCAx55+p6Zi1XHJcbiAqIEBwYXJhbSB2XHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRPbmUoSyxTLFAsdj0zKVxyXG57XHJcbiAgICAvL2VxdWFsbWFw5oqK6Z2eIDAgMSDlj5jkuLogMCAxXHJcbiAgICBsZXQgSzMgPSBlcXVhbE1hcChLLCB2KTtcclxuICAgIC8v572uMSDljp/mnKzmmK/nlKggdGYuYWRkKFAsSzMpIOWboOS4uuWBh+iuvlDmmK/lhagwICDmiJbogIXkv53or4HkuI3ph43lj6Ag5Zug5Li6IHNldE9uZSh4KeS4jeWPr+iDveeUqOS4gOS4quWAvOiwg+eUqOS4pOasoVxyXG4gICAgLy90Zl9zZXRPbmXmmK/lj6/ku6XlkIzml7bosIPnlKjlpJrmrKHogIzkuI3kvJrlh7rnjrDlpKfkuo4x55qE5oOF5Ya1IOiAjGFkZOS8mlxyXG4gICAgLy/lm6DmraTmsqHmnIlcclxuICAgIHJldHVybiB0Zl9zZXRPbmUoUCxLMyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBzZXRPbmXnmoTnm7jlj43pnaIgc2V0WmVyb1xyXG4gKiBAcGFyYW0gS1xyXG4gKiBAcGFyYW0gU1xyXG4gKiBAcGFyYW0gUFxyXG4gKiBAcGFyYW0gdlxyXG4gKi9cclxuZnVuY3Rpb24gc2V0WmVybyhLLFMsUCx2PTMpe1xyXG4gICAgY29uc3QgVD10Zl9yZXZlcnNlKGVxdWFsTWFwKEssdikpO1xyXG4gICAgY29uc3QgcmVzPSB0Zl9zZXRaZXJvKFAsVClcclxuICAgIHJldHVybiByZXM7XHJcbn1cclxuLy8v5pON5L2c6ZuG57uT5p2fXHJcbi8qKlxyXG4gKiDnlKjkuo7mj5Dkvptkc2wg5pa55L6/6KeE5YiZ57yW5YaZXHJcbiAqIEBwYXJhbSBLXHJcbiAqIEBwYXJhbSBTXHJcbiAqIEBwYXJhbSBQXHJcbiAqL1xyXG5mdW5jdGlvbiB1c2UoSyxTLFApe1xyXG4gICAgY2xhc3MgZnVuY3NcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgSz1LO1xyXG4gICAgICAgIHByb3RlY3RlZCBTPVM7XHJcbiAgICAgICAgcHJvdGVjdGVkIFA9UDtcclxuICAgICAgICBwdWJsaWMga2VlcD0odik9PnRoaXMuUD1rZWVwKHRoaXMuSyx0aGlzLlMsdGhpcy5QLHYpO1xyXG4gICAgICAgIHB1YmxpYyBzZXRPbmU9KHYpPT50aGlzLlA9c2V0T25lKHRoaXMuSyx0aGlzLlMsdGhpcy5QLHYpO1xyXG4gICAgICAgIHB1YmxpYyBzZXRaZXJvPXY9PnRoaXMuUD1zZXRaZXJvKHRoaXMuSyx0aGlzLlMsdGhpcy5QLHYpO1xyXG4gICAgICAgIHB1YmxpYyBnZXQoKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuUDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IGZ1bmNzKCk7XHJcbn1cclxudHlwZSBSdWxlVHlwZT1SZXR1cm5UeXBlPHR5cGVvZiB1c2U+O1xyXG5mdW5jdGlvbiBiYXNpYyh0czp0Zi5UZW5zb3IyRCl7XHJcbiAgICAvL+i/memHjOeQhuiuuuS4iuWPr+S7peiAg+iZkeeUqOWFtuS7lmtlcm5lbOS7peS7peS4jeWQjOaWueW8j+iAg+iZkeWRqOWbtOWAvFxyXG4gICAgLy/ov5nph4zlj6/ku6XnlKjkuIDkuKrlpJrpgJrpgZPljbfnp6/moLjmnaXlpITnkIZcclxuICAgIC8v57uf6K6h5LiA5Liq5qC85a2Q5ZGo5Zu055qE5omA5pyJ5qC85a2Q55qE5YC8ICDmnYPph43pg73mmK8xIOS9huS5n+WPr+S7peS4jeWQjCAg55Sa6Iez5Y+v5Lul6ICD6JmR5YW25LuW5Zug57Sg6L+b5Y67XHJcbiAgICBsZXQga2VyID0gdGYudGVuc29yMmQoW1xyXG4gICAgICAgIFsxLCAxLCAxXSxcclxuICAgICAgICBbMSwgMCwgMV0sXHJcbiAgICAgICAgWzEsIDEsIDFdXHJcbiAgICBdKS5leHBhbmREaW1zKC0xKS5leHBhbmREaW1zKC0xKSBhcyB0Zi5UZW5zb3I0RDtcclxuICAgIC8v5rWL6K+V6K6t57uD55SoXHJcbiAgICAvLyBrZXI9dGYudmFyaWFibGUoa2VyLHRydWUsXCJrZXJuZWxcIixkZWZhdWx0RHR5cGUpO1xyXG4gICAgLy/miop0c+WPmOS4ujRkXHJcbiAgICAvL+WOn+Wni+efqemYtVxyXG4gICAgbGV0IFMgPSBleHBhbmRUbzREKHRzKS5hc1R5cGUoZGVmYXVsdER0eXBlKTtcclxuICAgIC8v5Y2356ev6K6h566X5ZCO55qE55+p6Zi1XHJcbiAgICBsZXQgSyA9IHRmLmNvbnYyZChTLGtlciwgMSwgXCJzYW1lXCIsIFwiTkhXQ1wiKTtcclxuICAgIC8v6K6h566XXHJcbiAgICAvL+WPoOWKoFxyXG4gICAgLy/ov5nkuKrmmK/lhbbku5borr4wXHJcbiAgICAvL+WIneWni+S4ujDnmoTkv53lrZjnu5PmnpznmoTnn6npmLVcclxuICAgIGxldCBQID0gdGYuemVyb3NMaWtlKFMpO1xyXG4gICAgcmV0dXJuIHtLLFMsUH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDop4TliJnpm4Yg55CG6K665LiK5Y+v5Lul5re75Yqg77yaXHJcbiAqIDEu6KeE5YiZ5YaF5Zyo6ZqP5py65oCnIOacieWwj+amgueOh+WHuueOsOWFtuS7luihjOS4ulxyXG4gKiAyLiDkvb/nlKjpmaTkuoZrZWVw5ZKMc2V0T25l5LmL5aSW55qE5pON5L2cIOWmgnNldFplcm9cclxuICovXHJcbmV4cG9ydCBuYW1lc3BhY2UgUnVsZXNcclxue1xyXG4gICAgLy/ln7rmnKzop4TliJlcclxuICAgIC8v5LiN5aSN5Yi2b2xk55qE5oOF5Ya15LiLIHNldFplcm/mmK/oh6rliqjnmoQg5YW25LuW6KeE5YiZ5Y+q5piv6KaG55uW5LqG5YWo6Z2i55qEc2V0WmVybyDogIwg5aaC5p6c6aKE5YWI5aSN5Yi25LiK5binIOWImXNldFplcm/pnIDopoHmiYvliqjosIPnlKhcclxuICAgIC8v5rOo5oSP6buY6K6k5oOF5Ya15LiL5LiN5piv5L+d5oyBIOmZpOmdnuWkjeWItiDlpI3liLYg5YiZ6buY6K6k6KGM5Li65Li65L+d5oyBIOS4jeWkjeWItum7mOiupOihjOS4uuS4uuiuvjBcclxuICAgIC8v6KGo56S6IDLnmoTml7blgJnkuI3lj5ggM+eahOaXtuWAmea0u+i/h+adpSjorr7nva7kuLoxKVxyXG4gICAgLy/nlLHkuo7msqHmnInlpI3liLbnmoTov4fnqIsg5q+P5Liq54K56YO95piv5ZGo5Zu05YW25LuW54K555qE57uT5p6cIOWboOatpHNldFpFUk/kvJrlr7zoh7Tov57plIHlj43lupRcclxuICAgIC8v5Lmf5bCx5piv6K+05aaC5p6c5LiN6K6+572u6KeE5YiZIOS4i+S4gOW4p+S8muiHquWKqOa4hembtiDpmaTkuobkv53mjIHlkozorr4x55qEIOWFtuS7lumDveiHquWKqOiuvjBcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBiM3MyMyhydWxlOlJ1bGVUeXBlKXtcclxuICAgICAgICAvL+a0u+edgOmavuW6plxyXG4gICAgICAgIHJ1bGUua2VlcCgyKTtcclxuICAgICAgICAvLyBydWxlLmtlZXAoMyk7XHJcbiAgICAgICAgLy/lh7rnlJ/pmr7luqZcclxuICAgICAgICAvLyBydWxlLnNldE9uZSgyKTtcclxuICAgICAgICBydWxlLnNldE9uZSgzKTtcclxuICAgICAgICAvLzbnmoTml7blgJnmrbvljrsgKOaLpeaMpOinhOWImSkg5Zug5Li66Zmk5LqGa2VlcOeahOWSjHNldE9uZeeahCDlhbbku5bpg73kvJroh6rliqjmrbvljrsg5omA5Lul6L+Z6YeM6LCD55So5ZKM5LiN6LCD55So5LiA5qC3XHJcbiAgICAgICAgLy8gcnVsZS5zZXRaZXJvKDYpO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJldl9iM3MyMyhydWxlOlJ1bGVUeXBlKXtcclxuICAgICAgICBydWxlLmtlZXAoNik7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoMCk7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoMSk7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoMik7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoMyk7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoNCk7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoNyk7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoOCk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gYjM2czIzKHJ1bGU6UnVsZVR5cGUpe1xyXG4gICAgICAgIGIzczIzKHJ1bGUpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDYpO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGIxczEyKHJ1bGU6UnVsZVR5cGUpe1xyXG4gICAgICAgIHJ1bGUua2VlcCgyKTtcclxuICAgICAgICBydWxlLnNldE9uZSgxKTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBiMzY3OHMzNDY3OChydWxlOlJ1bGVUeXBlKXtcclxuICAgICAgICBydWxlLmtlZXAoNCk7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoMyk7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoNik7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoNyk7XHJcbiAgICAgICAgcnVsZS5zZXRPbmUoOCk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gYjM1Njc4czU2NzgocnVsZTpSdWxlVHlwZSl7XHJcbiAgICAgICAgLy8gcnVsZS5rZWVwKDQpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDMpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDUpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDYpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDcpO1xyXG4gICAgICAgIHJ1bGUuc2V0T25lKDgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIOefqemYteinhOWImVxyXG4gKiDnkIborrrkuIrov5nkuKrlj6/ku6XmlK/mjIHlkITnp43op4TliJlcclxuICog5Y+v5Lul5pSv5oyB5Zyo5q+P5qyh6K6h566X5LiL5LiA5bin55qE5pe25YCZ6L+b6KGM6K6w5b2V77yI6aKd5aSW5Yqf6IO977yJXHJcbiAqXHJcbiAqIFPkuLowIDEg55+p6Zi1IEvmmK/ku44wIDEg55+p6Zi15Y2356ev5b6X5Yiw55qE5YC8IOihqOekuuS6huWRqOWbtOagvOWtkOWvueS4reW/g+agvOWtkOeahOW9seWTje+8iOWNt+enr+WAvO+8iSBQ5Li6SytT55qE57uT5p6cIOihqOekulxyXG4gKiBvbGTlkozlvbHlk43lj6DliqDlkI7nmoTkuqfniakgKOe7vOWQiOS6p+eJqe+8iSDnhLblkI7ljrvop4TojIPljJZcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VNYXRyaXhSdWxlKHRzOiB0Zi5UZW5zb3IyRCwgcnVsZUY6KHJ1bGU6UnVsZVR5cGUpPT52b2lkPVJ1bGVzLmIzczIzLCBsb2dIaXN0b3J5PWZhbHNlKSB7XHJcbiAgICAvL+eUn+WRvea4uOaIj+WNt+enryDku47kuIDkuKpmZWF0dXJlIG1hcCDlvpfliLDkuIvkuIDkuKpmZWF0dXJlbWFwXHJcbiAgICAvL+WOn+WniyBTIOWNt+enr+W+l+WIsEsg54S25ZCOSytTIOW+l+WIsFAg54S25ZCO5a+5UOS9v+eUqGVxdWFsTWFwMyDlvpfliLDkuozlgLzljJbnmoTkuIvkuIDkuKpcclxuICAgIC8vZmVhdHVyZW1hcFxyXG4gICAgbGV0IHJldD10Zi50aWR5KCgpPT57XHJcbiAgICAgICAgbGV0IHtLLFMsUH09YmFzaWModHMpO1xyXG4gICAgICAgIGxldCBydWxlPXVzZShLLFMsUCk7XHJcbiAgICAgICAgcnVsZUYocnVsZSk7XHJcbiAgICAgICAgUD1ydWxlLmdldCgpO1xyXG4gICAgICAgIC8v6K6t57uD5bm26L6T5Ye6bG9zc1xyXG4gICAgICAgIGxldCByZXQ9ZGVsZXRlRGltVG8yRChQIGFzIHRmLlRlbnNvcjREKVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0pO1xyXG4gICAgLy/orq3nu4PnmoTpop3lpJbnmoTkuJzopb9cclxuICAgIGlmKGxvZ0hpc3RvcnkpXHJcbiAgICAgICAgdHJhaW5Mb2codHMscmV0KTtcclxuICAgIHJldHVybiByZXQ7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFJ1bGU9dHlwZW9mIFJ1bGVzLmIzczIzO1xyXG5cclxuLy/ogIPomZHkuI3mlLnlj5jop4TliJnogIzmmK/orq3nu4Pljbfnp6/moLjvvIzorqnmnIDnu4jlvpfliLDnmoRuZXh0IGZyYW1l55qE5oC75ZKM77yM5o6l6L+RNTAlLOWQjOaXtuWwvemHj+S4jnByZXbkuI3lkIxcclxuLy/kuZ/lsLHmmK8g5pyA5aSn5YyWIGFicyhBLUIpXjJcclxuXHJcblxyXG4vL+W+l+WIsOS4gOS4quelnue7j+e9kee7nCAg5Y+v5Lul5oqKbWF0cml4cnVsZeW9k+S9nOeOr+Wig++8jOaKiuiHquW3sei+k+WHuueahGZyYW1l5b2T5L2c57uT5p6cXHJcbi8v5Y2V57qv55qE5qC55o2u5r+A5Yqx5aSn5bCP5aKe5Yqg57uT5p6c77yM5LyY5YyW57uT5p6cIOS5n+WwseaYr+aKiuiHquW3seeahOe7k+aenOWSjOWunumZhee7k+aenCDmr5Tku7dcclxuLy/lubbkuJTDl+iHquW3sei+k+WHuueahOW4p1xyXG4vL+acgOe7iOW+l+WIsOS4gOS4quWPr+S7peaooeaLn2IyczPop4TliJnnmoTljbfnp6/nvZHnu5wgcm5uIFxyXG4vL+i/memHjOaYr+mAmui/h+S4iuS4gOW4p+i+k+WHuuS4i+S4gOW4p+eahOiDveWKm1xyXG4vL+iuoeeul+a/gOWKseeahOaXtuWAmeiCr+WumuaYr+S6jOWAvOWMluWGjeiuoeeul+eahO+8jOWQpuWImeWwseWSjOebtOaOpeiuoeeul2xvc3Mg5rKh5ZWl5Yy65Yir5LqGXHJcbi8v5oiW6ICF55u05o6l6K6h566XbG9zcyDlj6rmmK/ovpPlh7rnmoTml7blgJnkuozlgLzljJZcclxuY29uc3Qgb3B0PXRmLnRyYWluLnJtc3Byb3AoMC4wMSk7XHJcbmZ1bmN0aW9uIGluaXRMYXllcihyc2l6ZT04KXtcclxuICAgIGFsZXJ0KFwi5Yid5aeL5YyW56We57uP572R57ucXCIpXHJcbiAgICBsZXQgbGF5ZXJzPXRmLnNlcXVlbnRpYWwoe1xyXG4gICAgICAgIGxheWVyczpbXHJcbiAgICAgICAgICAgIHRmLmxheWVycy5jb252MmQoe2lucHV0U2hhcGU6WzEwMjQvcnNpemUsMTAyNC9yc2l6ZSwxXSxrZXJuZWxTaXplOjMsZmlsdGVyczo0MCxhY3RpdmF0aW9uOlwicmVsdVwifSksXHJcbiAgICAgICAgICAgIHRmLmxheWVycy5jb252MmRUcmFuc3Bvc2Uoe2tlcm5lbFNpemU6MyxmaWx0ZXJzOjEwLGFjdGl2YXRpb246XCJ0YW5oXCJ9KSxcclxuICAgICAgICAgICAgdGYubGF5ZXJzLmNvbnYyZCh7a2VybmVsU2l6ZTozLGZpbHRlcnM6MjAsYWN0aXZhdGlvbjpcInRhbmhcIn0pLFxyXG4gICAgICAgICAgICB0Zi5sYXllcnMuY29udjJkVHJhbnNwb3NlKHtrZXJuZWxTaXplOjMsZmlsdGVyczoxfSlcclxuICAgICAgICBdXHJcbiAgICB9KVxyXG4gICAgbGF5ZXJzLmNvbXBpbGUoe1xyXG4gICAgICAgIG9wdGltaXplcjpcInJtc3Byb3BcIixcclxuICAgICAgICBsb3NzOnRmLmxvc3Nlcy5zaWdtb2lkQ3Jvc3NFbnRyb3B5LFxyXG4gICAgICAgIG1ldHJpY3M6W1wiYWNjdXJhY3lcIl1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gbGF5ZXJzO1xyXG59XHJcblxyXG5sZXQgeHM9W10seXM9W11cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYWluTG9nKHRzOnRmLlRlbnNvcjJELCByZXQ6dGYuVGVuc29yMkQpe1xyXG4gICAgLy8gY29uc29sZS5sb2coXCLorrDlvZXmoLfmnKxcIilcclxuICAgIC8v6L6T5YWl55qE5piv5LiK5LiA5bin5ZKM5LiL5LiA5binXHJcbiAgICAvL25ldOeahOWKn+iDveaYr+S7juS4iuS4gOW4p+W+l+WIsOS4i+S4gOW4p1xyXG4gICAgeHMucHVzaCh0Zi50aWR5KCgpPT50cy5jbG9uZSgpLmV4cGFuZERpbXMoMikpKTtcclxuICAgIHlzLnB1c2godGYudGlkeSgoKT0+cmV0LmNsb25lKCkuZXhwYW5kRGltcygyKSkpO1xyXG4gICAgLy8gY29uc29sZS5sb2coeHNbMF0pXHJcbn1cclxuXHJcbmxldCBsYXllcnM7XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB0cmFpbihyc2l6ZSl7XHJcbiAgICBjb25zb2xlLmxvZyhcIuW8gOWni+iuree7g1wiKTtcclxuICAgIGxheWVycz1pbml0TGF5ZXIocnNpemUpO1xyXG4gICAgbGF5ZXJzLnN1bW1hcnkoKVxyXG4gICAgLy8gbGV0IG5zdGFydD14c1swXS5jbG9uZSgpIGFzIHRmLlRlbnNvcjNEO1xyXG4gICAgY29uc29sZS5sb2coYOagt+acrOaVsDoke3hzLmxlbmd0aH1gKVxyXG4gICAgbGV0IHg9dGYuc3RhY2soeHMsMCk7XHJcbiAgICB4cy5mb3JFYWNoKHY9PnYuZGlzcG9zZSgpKVxyXG4gICAgbGV0IHk9dGYuc3RhY2soeXMsMCk7XHJcbiAgICB5cy5mb3JFYWNoKHY9PnYuZGlzcG9zZSgpKVxyXG4gICAgbGV0IGluZm89YXdhaXQgbGF5ZXJzLmZpdCh4LHkse1xyXG4gICAgICAgIGVwb2Noczo1LGNhbGxiYWNrczp7XHJcbiAgICAgICAgICAgIG9uQmF0Y2hFbmQoYmF0Y2gsbG9ncyl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgYmF0Y2g6JHtiYXRjaH0gLT4gJHtsb2dzfWApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKGluZm8uaGlzdG9yeS5hY2MpXHJcbiAgICB4LmRpc3Bvc2UoKTtcclxuICAgIHkuZGlzcG9zZSgpO1xyXG4gICAgeHM9W11cclxuICAgIHlzPVtdXHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXNlTGF5ZXJzKG5zdGFydDp0Zi5UZW5zb3IyRCk6dGYuVGVuc29yMkR7XHJcbiAgICAgICAgLy/mmL7npLrnpZ7nu4/nvZHnu5zmvJTljJYg5LuO56ys5LiA5bin5byA5aeLXHJcbiAgICAgICAgbGV0IHJldD10Zi50aWR5KCgpPT57XHJcbiAgICAgICAgICAgIGxldCB0PWxheWVycy5wcmVkaWN0KG5zdGFydC5leHBhbmREaW1zKDIpLmV4cGFuZERpbXMoMCkpIGFzIHRmLlRlbnNvcjREO1xyXG4gICAgICAgICAgICB0PXQuc2lnbW9pZCgpXHJcbiAgICAgICAgICAgIGxldCB0dD10LnNxdWVlemUoWzAsM10pIGFzIHRmLlRlbnNvcjJEO1xyXG4gICAgICAgICAgICAvL+S6jOWAvOWMllxyXG4gICAgICAgICAgICBsZXQgYmk9dGYuZ3JlYXRlckVxdWFsKHR0LDAuNSk7XHJcbiAgICAgICAgICAgIHJldHVybiBiaTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXQgYXMgdGYuVGVuc29yMkQ7XHJcbn0iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9
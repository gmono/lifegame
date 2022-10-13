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
// let rules={
//     b3s23,
//     b1s12,
//     b3678s34678,
//     b36s23,
//     b35678s5678
// }
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
function initSelection() {
    for (var k in matrix_rules_1.Rules) {
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
                    update = function (old) { return (0, matrix_rules_1.useMatrixRule)(old, matrix_rules_1.Rules.b3s23, usetrain); };
                    //event
                    get("start").onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                        var ruleid, rule_1;
                        return __generator(this, function (_a) {
                            if (p) {
                                p = false;
                                ruleid = get("rule", "select").selectedOptions[0].value;
                                rule_1 = matrix_rules_1.Rules[ruleid];
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
    // return tf.tidy(()=>{
    // return tf.equal(tensor,0);
    // })
    return tf.tidy(function () {
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
    return tf.tidy(function () {
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
    return tf.tidy(function () {
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
    var K2 = condFunc(K, S, P).asType("float32");
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
    var K3 = condFunc(K, S, P).asType("float32");
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
    var T = tf_reverse(condFunc(K, S, P).asType("float32"));
    var res = tf_setZero(P, T);
    return res;
}
/**
 * 表示等于什么
 * @param v
 * @returns
 */
function condEqual(v) {
    return function (K, S, P) {
        return (0, matrix_tool_1.equalMap)(K, v);
    };
}
function condLess(v) {
    return function (K, S, P) {
        return tf.less(K, v);
    };
}
function condNotEqual(v) {
    return function (K, S, P) {
        return tf.notEqual(K, v);
    };
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
            this.conds = null;
            // protected cond: CondFunc = null;
            this.linkType = "and";
            this.keep = function () {
                return (_this.P = keep(_this.K, _this.S, _this.P, _this.getComposedCond()));
            };
            this.setOne = function () {
                return (_this.P = setOne(_this.K, _this.S, _this.P, _this.getComposedCond()));
            };
            this.setZero = function () {
                return (_this.P = setZero(_this.K, _this.S, _this.P, _this.getComposedCond()));
            };
        }
        /**
         * 混合的条件 暂时使用第一个条件
         * @returns
         */
        funcs.prototype.getComposedCond = function () {
            var _this = this;
            return function (K, S, P) {
                return _this.conds[0](K, S, P);
            };
        };
        //多次调用条件会自动使用and连接
        funcs.prototype.whenEqual = function (v) {
            this.conds.push(condEqual(v));
            return this;
        };
        funcs.prototype.whenLess = function (v) {
            this.conds.push(condLess(v));
            return this;
        };
        funcs.prototype.whenNotEqual = function (v) {
            this.conds.push(condNotEqual(v));
            return this;
        };
        funcs.prototype.get = function () {
            return this.P;
        };
        funcs.prototype.calculate = function (func) {
            return func(this.K, this.S, this.P);
        };
        return funcs;
    }());
    return new funcs();
}
function basic(ts) {
    //这里理论上可以考虑用其他kernel以以不同方式考虑周围值
    //这里可以用一个多通道卷积核来处理
    //统计一个格子周围的所有格子的值  权重都是1 但也可以不同  甚至可以考虑其他因素进去
    var ker = tf
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
        var e_1, _a;
        // rule.keep(4);
        var t = [3, 5, 6, 7, 8];
        try {
            for (var t_1 = __values(t), t_1_1 = t_1.next(); !t_1_1.done; t_1_1 = t_1.next()) {
                var i = t_1_1.value;
                rule.whenEqual(i).setOne();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (t_1_1 && !t_1_1.done && (_a = t_1.return)) _a.call(t_1);
            }
            finally { if (e_1) throw e_1.error; }
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
                            epochs: 5,
                            callbacks: {
                                onBatchEnd: function (batch, logs) {
                                    console.log("batch:".concat(batch, " -> ").concat(logs));
                                },
                            },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWJzL2xpYi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRHJhdy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF0cml4X3Rvb2wudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21hdHJpeF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vbm9kZS1mZXRjaCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3V0aWwgKGlnbm9yZWQpIiwid2VicGFjazovLy9vcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2NyeXB0byAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3N0cmluZ19kZWNvZGVyIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vc3RyaW5nX2RlY29kZXIgKGlnbm9yZWQpPzcxOWMiLCJ3ZWJwYWNrOi8vL2ZzIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vcGF0aCAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL2ZzIChpZ25vcmVkKT85YzVmIiwid2VicGFjazovLy93b3JrZXJfdGhyZWFkcyAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3BlcmZfaG9va3MgKGlnbm9yZWQpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFnQixPQUFPLENBQUMsR0FBVztJQUMvQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNqRCxDQUFDO0FBRkQsMEJBRUM7QUFJRCxTQUFzQixLQUFLLENBQUMsR0FBRzs7O1lBQzNCLHNCQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTztvQkFDN0IsVUFBVSxDQUFDO3dCQUNQLE9BQU8sRUFBRSxDQUFDO29CQUNkLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztn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OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlIiwiZmlsZSI6ImNvbW1vbnN+bWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gcmFuZGludChtYXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCkgJSBtYXg7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbGF5KG1pcyl7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpPT57XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9LCBtaXMpO1xyXG4gICAgfSkgICBcclxufVxyXG5cclxuXHJcbi8v5Lu/cHl0aG9u5Z+656GA6K6+5pa9XHJcbmV4cG9ydCBmdW5jdGlvbiAqcmFuZ2Uoc3RhcnQ6bnVtYmVyLHNwYWNlPzpudW1iZXIsZW5kPzpudW1iZXIpOkl0ZXJhYmxlPG51bWJlcj57XHJcbiAgICAvL+WFgeiuuCByYW5nZShhLGMsYikgcmFuZ2UoYikgcmFuZ2UoYSxiKVxyXG4gICAgaWYoc3BhY2U9PW51bGwmJmVuZD09bnVsbCl7XHJcbiAgICAgICAgLy8xXHJcbiAgICAgICAgeWllbGQqIHJhbmdlKDAsMSxzdGFydCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGVuZD09bnVsbCl7XHJcbiAgICAgICAgLy8yXHJcbiAgICAgICAgeWllbGQqIHJhbmdlKHN0YXJ0LDEsc3BhY2UpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICAvLzNcclxuICAgICAgICBmb3IobGV0IGk9c3RhcnQ7aTxlbmQ7aSs9c3BhY2Upe1xyXG4gICAgICAgICAgICB5aWVsZCBpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uKiBlbnVtZXJhdGU8VD4oYXJyYXlsaWtlOkl0ZXJhYmxlPFQ+KTpJdGVyYWJsZTxbbnVtYmVyLFRdPntcclxuICAgIGxldCBub3c9MDtcclxuICAgIGZvcihsZXQgYSBvZiBhcnJheWxpa2Upe1xyXG4gICAgICAgIHlpZWxkIFtub3crKyxhXVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYW55KGFycmF5bGlrZTpJdGVyYWJsZTxhbnk+KVxyXG57XHJcbiAgICBmb3IobGV0IGEgb2YgYXJyYXlsaWtlKXtcclxuICAgICAgICBpZihhKSByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYWxsKGFycmF5bGlrZTpJdGVyYWJsZTxhbnk+KVxyXG57XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwcmludChkYXRhOmFueSl7XHJcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gKnppcCguLi5hcnJheWxpa2VzOkl0ZXJhYmxlPGFueT5bXSl7XHJcbiAgICBsZXQgaXRvcnM9YXJyYXlsaWtlcy5tYXAodj0+dltTeW1ib2wuaXRlcmF0b3JdKCkpO1xyXG4gICAgZm9yKDs7KXtcclxuICAgICAgICAvL+WvueaJgOaciWl0b3Llj5ZuZXh0IOWmguaenOWFqOmDqOaIkOWKn+WImXlpZWxkIOWQpuWImei/lOWbnlxyXG4gICAgICAgIGxldCByZXNzPWl0b3JzLm1hcCh2PT52Lm5leHQoKSk7XHJcbiAgICAgICAgLy8gcHJpbnQocmVzcyk7XHJcbiAgICAgICAgLy/lpoLmnpzmnInkuIDkuKrnu5PmnZ9cclxuICAgICAgICBpZihhbnkocmVzcy5tYXAodj0+di5kb25lKSkpe1xyXG4gICAgICAgICAgICAvL+i/lOWbnlxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHlpZWxkIHJlc3MubWFwKHY9PnYudmFsdWUpO1xyXG4gICAgfVxyXG59XHJcbi8v5Z+65pys5pON5L2cXHJcbmV4cG9ydCBmdW5jdGlvbiBzaHVmZmxlPFQ+KGFybDpJdGVyYWJsZTxUPik6VFtde1xyXG4gICAgbGV0IGE9bGlzdChhcmwpO1xyXG4gICAgbGV0IHI9bmV3IEFycmF5KGxlbihhKSk7XHJcbiAgICBmb3IobGV0IHQgb2YgYSl7XHJcbiAgICAgICAgLy/pmo/mnLrloavnqbpcclxuICAgICAgICBsZXQgaWR4PXJhbmRpbnQobGVuKGEpKTtcclxuICAgICAgICByW2lkeF09dDtcclxuICAgIH1cclxuICAgIHJldHVybiByO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0ZWQ8VD4oYXJsOkl0ZXJhYmxlPFQ+LGtleToodjpUKT0+bnVtYmVyPW51bGwpe1xyXG4gICAgbGV0IHJldD1saXN0KGFybCkuc29ydCgoYSxiKT0+e1xyXG4gICAgICAgIGxldCBbayxra109W2tleShhKSxrZXkoYildXHJcbiAgICAgICAgcmV0dXJuIGsta2s7XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYnlJZHg8VD4oYXJsOkl0ZXJhYmxlPFQ+LGlkeHM6bnVtYmVyW10pe1xyXG4gICAgbGV0IGw9bGlzdChhcmwpO1xyXG4gICAgbGV0IHJldD1pZHhzLm1hcCh2PT5sW3ZdKTtcclxuICAgIHJldHVybiByZXQ7XHJcbn1cclxuLy/kuI3mlL7lm57ph4fmoLdcclxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3Q8VD4oYXJsOkl0ZXJhYmxlPFQ+LGNvdW50Om51bWJlcik6VFtde1xyXG4gICAgLy/ku47kuIDkuKrliJfooajkuK3ph4fmoLcg5LiN5pS+5ZueXHJcbiAgICBsZXQgYT1saXN0KGFybCk7XHJcbiAgICBsZXQgaWR4PXNodWZmbGUocmFuZ2UobGVuKGEpKSkuc2xpY2UoMCxjb3VudCk7XHJcbiAgICBwcmludChpZHgpO1xyXG4gICAgcmV0dXJuIGJ5SWR4KGEsaWR4KTtcclxufVxyXG4vL+acieaUvuWbnumHh+agt1xyXG5leHBvcnQgZnVuY3Rpb24gc2FtcGxlPFQ+KGFybDpJdGVyYWJsZTxUPixjb3VudDpudW1iZXIpOlRbXXtcclxuICAgIC8v5LuO5LiA5Liq5YiX6KGo5Lit6YeH5qC3IOacieaUvuWbnlxyXG4gICAgbGV0IGE9bGlzdChhcmwpO1xyXG4gICAgbGV0IGlkeD1saXN0KHJhbmdlKGxlbihhKSkpLm1hcCh2PT5yYW5kaW50KGxlbihhKSkpO1xyXG4gICAgcmV0dXJuIGJ5SWR4KGEsaWR4KTtcclxufVxyXG4vL+aVsOWtplxyXG5leHBvcnQgbGV0IG1pbj1NYXRoLm1pbjtcclxuZXhwb3J0IGxldCBtYXg9TWF0aC5tYXg7XHJcblxyXG4vKipcclxuICog5o+S5YWlXHJcbiAqIEBwYXJhbSBhcmwg5pWw57uEXHJcbiAqIEBwYXJhbSBwb2ludCDmj5LlhaXkvY3nva4g5o+S5YWl5Yiw6L+Z5Liq5L2N572u55qE5YWD57Sg5YmN6Z2iIOS4uiAwLWxlbihhcmwpIOeahOWAvFxyXG4gKiBAcGFyYW0gdmFsIOaPkuWFpeWAvFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydDxUPihhcmw6SXRlcmFibGU8VD4scG9pbnQ6bnVtYmVyLHZhbDpUKTpUW117XHJcbiAgICBsZXQgbmV3YXI9W11cclxuICAgIGxldCBhPWxpc3QoYXJsKTtcclxuICAgIGEuZm9yRWFjaCgodixpZHgpPT57XHJcbiAgICAgICAgaWYocG9pbnQ9PWlkeCkgbmV3YXIucHVzaCh2YWwpO1xyXG4gICAgICAgIG5ld2FyLnB1c2godik7XHJcbiAgICB9KTtcclxuICAgIGlmKGxlbihhKT09cG9pbnQpIG5ld2FyLnB1c2godmFsKTtcclxuICAgIHJldHVybiBuZXdhcjtcclxufVxyXG5cclxuLy/ln7rmnKzmlbDmja5cclxuaW50ZXJmYWNlIEFzSW50e1xyXG4gICAgdG9JbnQoKTpudW1iZXI7XHJcbn1cclxuaW50ZXJmYWNlIEFzRmxvYXR7XHJcbiAgICB0b0Zsb2F0KCk6bnVtYmVyO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbnQob3RoZXI6c3RyaW5nfG51bWJlcnxBc0ludCl7XHJcbiAgICBpZih0eXBlb2Ygb3RoZXI9PVwic3RyaW5nXCIpIHJldHVybiBwYXJzZUludChvdGhlcik7XHJcbiAgICBlbHNlIGlmKHR5cGVvZiBvdGhlcj09XCJudW1iZXJcIikgcmV0dXJuIG90aGVyfDA7XHJcbiAgICBlbHNlIGlmKFwidG9JbnRcIiBpbiBvdGhlcil7XHJcbiAgICAgICAgcmV0dXJuIG90aGVyLnRvSW50KClcclxuICAgIH1lbHNlIHJldHVybiAwO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBzdHIobil7XHJcbiAgICByZXR1cm4gbmV3IE51bWJlcihuKS50b1N0cmluZygpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmbG9hdChvdGhlcjpzdHJpbmd8bnVtYmVyfEFzRmxvYXQpe1xyXG4gICAgaWYodHlwZW9mIG90aGVyPT1cInN0cmluZ1wiKSByZXR1cm4gcGFyc2VGbG9hdChvdGhlcik7XHJcbiAgICBlbHNlIGlmKHR5cGVvZiBvdGhlcj09XCJudW1iZXJcIikgcmV0dXJuIG90aGVyO1xyXG4gICAgZWxzZSBpZihcInRvRmxvYXRcIiBpbiBvdGhlcil7XHJcbiAgICAgICAgcmV0dXJuIG90aGVyLnRvRmxvYXQoKVxyXG4gICAgfWVsc2UgcmV0dXJuIDA7XHJcbn1cclxuLy/mlbDmja7lrrnlmajmnoTpgKDljLrln59cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsaXN0PFQ+KGl0ZXI/Okl0ZXJhYmxlPFQ+KTpBcnJheTxUPntcclxuICAgIGlmKGl0ZXI9PW51bGwpIHJldHVybiBsaXN0KFtdKTtcclxuICAgIGxldCByZXQ9W11cclxuICAgIGZvcihsZXQgYSBvZiBpdGVyKXtcclxuICAgICAgICByZXQucHVzaChhKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG4vL+iejeWQiOWvueixoSBcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXBUb09iaihtYXA6TWFwPGFueSxhbnk+KXtcclxuICAgIC8vXHJcbiAgICBsZXQgcj1uZXcgUHJveHk8YW55Pih7fSx7XHJcbiAgICAgICAgZ2V0KHRhcmdldCxwOmFueSxyZWNlaXZlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXAuZ2V0KHApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0KHRhcmdldCxwOmFueSx2YWx1ZSxyZWNlaXZlKXtcclxuICAgICAgICAgICAgbWFwLnNldChwLHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoYXModGFyZ2V0LHA6YW55KXtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcC5oYXMocCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWxldGVQcm9wZXJ0eSAodGFyZ2V0LCBwKTogYm9vbGVhbntcclxuICAgICAgICAgICAgcmV0dXJuIG1hcC5kZWxldGUocCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZWZpbmVQcm9wZXJ0eSAodGFyZ2V0LCBwLCBhdHRyaWJ1dGVzOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiBib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtYXAuc2V0KHAsYXR0cmlidXRlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3duS2V5cyAodGFyZ2V0KTogYW55W11cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0KG1hcC5rZXlzKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBhcHBseSAodGFyZ2V0LCB0aGlzQXJnOiBhbnksIGFyZ0FycmF5PzogYW55KTogYW55XHJcbiAgICAgICAgLy8ge1xyXG5cclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIGNvbnN0cnVjdCAodGFyZ2V0LCBhcmdBcnJheTogYW55LCBuZXdUYXJnZXQ/OiBhbnkpOiBvYmplY3RcclxuICAgICAgICAvLyB7XHJcblxyXG4gICAgICAgIC8vIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbWFwPEssVj4oYXJsOkl0ZXJhYmxlPFtLLFZdPil7XHJcbiAgICByZXR1cm4gbmV3IE1hcDxLLFY+KGFybCk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldDxUPihhcmw6SXRlcmFibGU8VD4pXHJcbntcclxuICAgIHJldHVybiBuZXcgU2V0PFQ+KGFybCk7XHJcbn1cclxuXHJcbi8v5pWw5o2u5pON5L2cXHJcbmV4cG9ydCBmdW5jdGlvbiAqa2V5czxLPWFueSxWPWFueT4ob2JqOm9iamVjdHxNYXA8SyxWPilcclxue1xyXG4gICAgLy/lj5blr7nosaHnmoRrZXnmiJZtYXDnmoTmiYDmnIlrZXkg5p6a5Li+XHJcbiAgICBpZihvYmogaW5zdGFuY2VvZiBNYXApe1xyXG4gICAgICAgIC8v5p6a5Li+XHJcbiAgICAgICAgZm9yKGxldCBhIG9mIG9iai5rZXlzKCkpe1xyXG4gICAgICAgICAgICB5aWVsZCBhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYodHlwZW9mIG9iaiA9PVwib2JqZWN0XCIpe1xyXG4gICAgICAgIGZvcihsZXQgayBpbiBvYmope1xyXG4gICAgICAgICAgICB5aWVsZCBrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxudHlwZSBIYXNMZW5ndGg9e2xlbmd0aDpudW1iZXJ9fHtzaXplOm51bWJlcn18e2NvdW50Om51bWJlcn18e19fbGVuX18oKTpudW1iZXJ9O1xyXG4vL+S7peS4i+S4uuiwg+eUqOWNj+iurlxyXG5leHBvcnQgZnVuY3Rpb24gbGVuKG9iajpJdGVyYWJsZTxhbnk+fEhhc0xlbmd0aHxvYmplY3Qpe1xyXG4gICAgaWYoXCJsZW5ndGhcIiBpbiBvYmope1xyXG4gICAgICAgIHJldHVybiBvYmoubGVuZ3RoXHJcbiAgICB9ZWxzZSBpZiAoXCJzaXplXCIgaW4gb2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqLnNpemU7XHJcbiAgICB9ZWxzZSBpZihcImNvdW50XCIgaW4gb2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqLmNvdW50O1xyXG4gICAgfWVsc2UgaWYoXCJfX2xlbl9fXCIgaW4gb2JqKXtcclxuICAgICAgICByZXR1cm4gb2JqLl9fbGVuX18oKVxyXG4gICAgfWVsc2UgaWYodHlwZW9mIG9iaj09XCJvYmplY3RcIil7XHJcbiAgICAgICAgbGV0IHN1bT0wO1xyXG4gICAgICAgIGZvcihsZXQgayBpbiBvYmope1xyXG4gICAgICAgICAgICBzdW0rKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1bTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vIC8v57G75Z6L5Ye95pWw5oqK5LiA5Liq57G75Z6L5pig5bCE5Li65Y+m5LiA5Liq57G75Z6LXHJcbi8vIC8v5a+56LGh5pig5bCE5Ye95pWw77yM5oqK5LiA5Liq5a+56LGh5Lit55qE5q+P5Liq5bGe5oCn5L2/55So5LiA5LiqbWFwcGVy5pig5bCEXHJcbi8vIC8v6YCS5b2S5a+56LGh5pig5bCE5Ye95pWw77yM5oqK5LiA5Liq5a+56LGh5Lit55qE5omA5pyJ6Z2e5a+56LGh5bGe5oCn5L2/55SobWFwcGVy5pig5bCE77yM5a+56LGh6YCS5b2S5pig5bCEXHJcbi8vIHR5cGUgTWFwcGVyPEEsQj49W0EsQl07XHJcbi8vIHR5cGUgTWFwVG88VCBleHRlbmRzIE1hcHBlcjxhbnksYW55PixDPj1DIGV4dGVuZHMgVFswXT8gVFsxXTpuZXZlcjtcclxuLy8gdHlwZSBTd2l0Y2g8VCwgVSBleHRlbmRzIGFueT4gPVxyXG4vLyAgICAgVCBleHRlbmRzIGtleW9mIFUgPyBVW1RdIDogVVtcImRlZmF1bHRcIl07XHJcblxyXG4vLyAvLyDojrflj5bnrKzkuIDkuKrlhYPntKBcclxuLy8gZXhwb3J0IHR5cGUgSGVhZDxUPiA9IFQgZXh0ZW5kcyB7IDA6IGluZmVyIEggfSA/IEggOiBuZXZlcjtcclxuLy8gLy8g56e76Zmk56ys5LiA5Liq5YWD57SgXHJcbi8vIGV4cG9ydCB0eXBlIFRhaWw8VD4gPSAoXHJcbi8vICAgICAoLi4uYTogVCBleHRlbmRzIGFueVtdID8gVCA6IG5ldmVyKSA9PiB2b2lkXHJcbi8vICkgZXh0ZW5kcyAoYTogYW55LCAuLi5iOiBpbmZlciBSKSA9PiB2b2lkID8gUiA6IG5ldmVyO1xyXG4vLyBleHBvcnQgdHlwZSBVbnNoaWZ0PFQsIEE+ID0gKFxyXG4vLyAgICAgKGE6IEEsIC4uLmI6IFQgZXh0ZW5kcyBhbnlbXSA/IFQgOiBuZXZlcikgPT4gdm9pZFxyXG4vLyApIGV4dGVuZHMgKC4uLmE6IGluZmVyIFIpID0+IHZvaWQgPyBSIDogbmV2ZXI7XHJcbi8vIC8vIOWcqOWwvumDqOWKoOWFpeS4gOS4quWFg+e0oFxyXG4vLyBleHBvcnQgdHlwZSBDb3B5PFQsIFMgZXh0ZW5kcyBhbnk+ID0geyBbUCBpbiBrZXlvZiBUXTogU1tQXSB9O1xyXG4vLyBleHBvcnQgdHlwZSBQdXNoPFQsIEE+ID0gQ29weTxVbnNoaWZ0PFQsIGFueT4sIFQgJiBSZWNvcmQ8c3RyaW5nLCBBPj47XHJcblxyXG5cclxuXHJcbi8vIHR5cGUgTXVsdGlNYXBUbzxUIGV4dGVuZHMgYW55W10sQyxrPVwic3R1ZmZcIj49VFtcImxlbmd0aFwiXSBleHRlbmRzIDA/IE1hcFRvPFRbMF0sQz46XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEMgZXh0ZW5kcyBUWzBdWzBdPyBUWzBdWzFdOlN3aXRjaDxrLHtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0dWZmOk11bHRpTWFwVG88VGFpbDxUPixDLGs+XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0+O1xyXG5cclxuLy8gdHlwZSBPYmplY3RUeXBlTWFwPEMgZXh0ZW5kcyBNYXBwZXI8YW55LGFueT5bXSxUIGV4dGVuZHMgb2JqZWN0Pj17W1AgaW4ga2V5b2YgVF06TXVsdGlNYXBUbzxDLFRbUF0+fTtcclxuXHJcbi8vIC8v5a6e546w6YCS5b2S5oCnIOWwmuacquWunueOsFxyXG4vLyB0eXBlIE9iamVjdE1hcHBlcjxUIGV4dGVuZHMgb2JqZWN0LEMgZXh0ZW5kcyBNYXBwZXI8YW55LCBhbnk+W10+PVtULE9iamVjdFR5cGVNYXA8QyxUPl1cclxuXHJcbi8vIHR5cGUgcz1bW251bWJlcixzdHJpbmddLFtzdHJpbmcsbnVtYmVyXSxPYmplY3RNYXBwZXI8b2JqZWN0LHM+XTtcclxuLy8gdHlwZSBvPXtcclxuLy8gICAgIGE6c3RyaW5nLFxyXG4vLyAgICAgYjpudW1iZXIsXHJcbi8vICAgICBjOntcclxuLy8gICAgICAgICBkOnN0cmluZyxcclxuLy8gICAgICAgICBlOm51bWJlclxyXG4vLyAgICAgfVxyXG4vLyB9O1xyXG4vLyB0eXBlIHI9T2JqZWN0VHlwZU1hcDxzLG8+O1xyXG5cclxuXHJcbi8vIC8v5YC85YyW57G75Z6L5a6a5LmJXHJcblxyXG4vLyAvL+exu+Wei+WIpOaWreeUqFxyXG4vLyB0eXBlIFR5cGVSZXA8VCxWPXN0cmluZz49e1xyXG4vLyAgICAgdmFsdWU6VixcclxuLy8gICAgIHR5cGU6VFxyXG4vLyB9O1xyXG4vLyAvL+eoi+W6j+eUqOeahFxyXG4vLyBsZXQgdHlwZV9hcnJheT1cImFycmF5XCI7XHJcbi8vIGxldCB0eXBlX251bWJlcj1cIm51bWJlclwiO1xyXG4vLyBsZXQgdHlwZV9zdHJpbmc9XCJzdHJpbmdcIjtcclxuLy8gLy/lgLzpg6jliIZcclxuXHJcbi8vIGZ1bmN0aW9uIGdldGFycmF5PFQ+KHZhbHVlOlQpOlR5cGVSZXA8XCJhcnJheVwiLFQ+e1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICB2YWx1ZTp2YWx1ZSxcclxuLy8gICAgICAgICB0eXBlOlwiYXJyYXlcIlxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGZ1bmN0aW9uIGdldG51bWJlcjxUPih2YWx1ZTpUKTpUeXBlUmVwPFwibnVtYmVyXCIsVD57XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIHZhbHVlOnZhbHVlLFxyXG4vLyAgICAgICAgIHR5cGU6XCJudW1iZXJcIlxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIGZ1bmN0aW9uIGdldHN0cmluZzxUPih2YWx1ZTpUKTpUeXBlUmVwPFwic3RyaW5nXCIsVD57XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIHZhbHVlOnZhbHVlLFxyXG4vLyAgICAgICAgIHR5cGU6XCJzdHJpbmdcIlxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIC8v5pig5bCE6YOo5YiGXHJcbi8vIC8v5pig5bCE5ZmoXHJcbi8vIHR5cGUgUmVwTWFwPEEsQj49TWFwcGVyPFR5cGVSZXA8QT4sQj47XHJcbi8vIC8v57G75Z6L5pig5bCE5ZmoXHJcbi8vIHR5cGUgUmVwTWFwcGVycz1bUmVwTWFwPFwic3RyaW5nXCIsc3RyaW5nPixcclxuLy8gICAgICAgICAgICAgICAgIFJlcE1hcDxcIm51bWJlclwiLG51bWJlcj4sXHJcbi8vICAgICAgICAgICAgICAgICBSZXBNYXA8XCJhcnJheVwiLGFueVtdPl1cclxuXHJcbi8vIC8v5pig5bCEcmVw57G75Z6L5Yiw5q2j5bi457G75Z6LXHJcbi8vIHR5cGUgRXh0cmFjdDxSZXA+PU11bHRpTWFwVG88UmVwTWFwcGVycyxSZXA+O1xyXG4vLyAvL+aYoOWwhG1vZGVsIOWIsCBwYXJzZeWQjuexu+Wei1xyXG4vLyB0eXBlIE1hcE1vZGVsPE1vZGVsVHlwZSBleHRlbmRzIHtbUCBpbiBrZXlvZiBNb2RlbFR5cGVdOlR5cGVSZXA8YW55Pn0+PU9iamVjdFR5cGVNYXA8UmVwTWFwcGVycyxNb2RlbFR5cGU+XHJcblxyXG4vLyBsZXQgbW9kZWw9e1xyXG4vLyAgICAgdGl0bGU6Z2V0c3RyaW5nKFwiLnRpdGxlXCIpLFxyXG4vLyAgICAgbGlzdDpnZXRhcnJheShcIi5hcnJheVwiKVxyXG4vLyB9XHJcbi8vIHR5cGUgYT1NYXBNb2RlbDx0eXBlb2YgbW9kZWw+O1xyXG4vLyBmdW5jdGlvbiBwYXJzZShib2R5LG1vZGVsOm9iamVjdCk6TWFwTW9kZWw8dHlwZW9mIG1vZGVsPntcclxuLy8gICAgIHJldHVybiBudWxsO1xyXG4vLyB9XHJcbiIsImltcG9ydCAqIGFzIHRmIGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCJcclxuaW1wb3J0IHsgcmV2ZXJzZUJvb2wsIGVxdWFsTWFwLCBleHBhbmRUbzREIH0gZnJvbSAnLi9tYXRyaXhfdG9vbCc7XHJcbmltcG9ydCB7ZGVidWd9IGZyb20gXCJ3ZWJwYWNrXCI7XHJcbmltcG9ydCB7ZGVmYXVsdER0eXBlfSBmcm9tIFwiLi9ydWxlcy9tYXRyaXhfcnVsZXNcIjtcclxuZXhwb3J0IGNsYXNzIERyYXcge1xyXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICB0Y3R4OiBPZmZzY3JlZW5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBvZmY6IE9mZnNjcmVlbkNhbnZhcztcclxuICAgIGg6IG51bWJlcjtcclxuICAgIHc6IG51bWJlcjtcclxuICAgIC8vcGl4ZWRzaXplXHJcbiAgICBwaXhlbHNpemU6W251bWJlcixudW1iZXJdO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZTogSFRNTENhbnZhc0VsZW1lbnQsIHB1YmxpYyByczogbnVtYmVyLCBwdWJsaWMgY3M6IG51bWJlcikge1xyXG4gICAgICAgIC8v6L+Z6YeM5b6X5YiwMmQg5LiK5LiL5paHIOiuoeeul+agvOWtkOWkp+Wwj1xyXG4gICAgICAgIGxldCBjdHggPSBlbGUuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gY3R4O1xyXG4gICAgICAgIC8v6K6h566X5qC85a2Q5aSn5bCPXHJcbiAgICAgICAgdGhpcy5oID0gZWxlLmhlaWdodDtcclxuICAgICAgICB0aGlzLncgPSBlbGUud2lkdGg7XHJcbiAgICAgICAgdGhpcy5jaCA9IHRoaXMuaCAvIHJzO1xyXG4gICAgICAgIHRoaXMuY3cgPSB0aGlzLncgLyBjcztcclxuICAgICAgICAvL2NhY2hlXHJcbiAgICAgICAgdGhpcy5vZmYgPSBuZXcgT2Zmc2NyZWVuQ2FudmFzKHRoaXMudywgdGhpcy5oKTtcclxuICAgICAgICB0aGlzLnRjdHggPSB0aGlzLm9mZi5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnBpeGVsc2l6ZT1bdGhpcy5jaCx0aGlzLmN3XTtcclxuICAgICAgICB0aGlzLnVwc2FtcGxlPXRmLmxheWVycy51cFNhbXBsaW5nMmQoe3NpemU6dGhpcy5waXhlbHNpemUsZHR5cGU6ZGVmYXVsdER0eXBlfSk7XHJcbiAgICB9XHJcbiAgICBjaDogbnVtYmVyO1xyXG4gICAgY3c6IG51bWJlcjtcclxuICAgIHB1YmxpYyBkcmF3UG9pbnQoeCwgeSwgYzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJ4OiBudW1iZXIsIHJ5OiBudW1iZXI7XHJcbiAgICAgICAgcnggPSB4ICogdGhpcy5jdztcclxuICAgICAgICByeSA9IHkgKiB0aGlzLmNoO1xyXG4gICAgICAgIC8v57uY5Yi2ID8/P1xyXG4gICAgICAgIHRoaXMudGN0eC5maWxsU3R5bGUgPSBjO1xyXG4gICAgICAgIHRoaXMudGN0eC5maWxsUmVjdChyeCwgcnksIHRoaXMuY3csIHRoaXMuY2gpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjkuo7nu5jliLYwMeefqemYtSDnlKjmn5DkuKrpopzoibLooajnpLoxXHJcbiAgICAgKiDov5jpnIDopoHnu5jliLbkuI3lkIzlm77lsYLnmoTmlrnlvI8g5aaC55So5p+Q5Lqb5Y+m5LiA5Lqb6aKc6Imy6KGo56S65Y+m5LiA5Lqb5Lic6KW/IOeEtuWQjuWPoOWKoFxyXG4gICAgICog6L+Y6ZyA6KaB5Y+v5Lul57uY5Yi25a6e5pWw55+p6Zi155qE5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdHMgMDHnn6npmLVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGRyYXcyRCh0czogdGYuVGVuc29yMkQpIHtcclxuICAgICAgICAvLyB0aGlzLnRjdHguY2xlYXJSZWN0KDAsMCx0aGlzLncsdGhpcy5oKTtcclxuICAgICAgICAvLyB0aGlzLnRjdHguZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XHJcbiAgICAgICAgLy8gdGhpcy50Y3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMudywgdGhpcy5oKTtcclxuICAgICAgICAvL+azlTFcclxuICAgICAgICBsZXQgcmdibWF0PWF3YWl0IHRoaXMudG9yZ2IodHMpOyAgLy8wIGZmZmZmZmZmIDEgMDAwMDAwMDBcclxuXHJcblxyXG4gICAgICAgIC8vIGxldCBpbWc9dGhpcy50Y3R4LnB1dEltYWdlRGF0YShyZ2JtYXQsMCwwKTtcclxuICAgICAgICAvL+azlTJcclxuICAgICAgICAvLyBsZXQgYXJyID0gYXdhaXQgdHMuZGF0YSgpO1xyXG4gICAgICAgIC8vIGFyci5mb3JFYWNoKCh2LCBpKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIC8v57uY5Yi2IDDntKLlvJXlr7nlupTliJdcclxuICAgICAgICAvLyAgICAgbGV0IGEgPSBbLCBcIiNmZjAwMDBcIl07XHJcbiAgICAgICAgLy8gICAgIGlmICh2ID09IDEpXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmRyYXdQb2ludChpJXRzLnNoYXBlWzBdLE1hdGguZmxvb3IoaS90cy5zaGFwZVswXSksIGFbMV0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8vIHRoaXMudGN0eC5maWxsKCk7XHJcbiAgICAgICAgLy/nu5jliLbliLDnlLvluINcclxuICAgICAgICAvLyB0aGlzLmN0eC5jbGVhclJlY3QoMCwwLHRoaXMudyx0aGlzLmgpO1xyXG4gICAgICAgIC8vIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLm9mZiwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5jdHgucHV0SW1hZ2VEYXRhKHJnYm1hdCwwLDApO1xyXG4gICAgICAgIC8vIHRoaXMuY3R4LnNjYWxlKDQsNClcclxuICAgIH1cclxuICAgIHByaXZhdGUgdXBzYW1wbGU6IHRmLmxheWVycy5MYXllcjtcclxuICAgIGFzeW5jIHRvcmdiKHQ6dGYuVGVuc29yMkQpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5qiq57q15omp5bGVNOWAjSDmi4nkvLhcclxuICAgICAgICAvLyBmdW5jdGlvbiBob3JleHBhbmQodDp0Zi5UZW5zb3IyRCx2PTQpOnRmLlRlbnNvcjJEe1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gdC5leHBhbmREaW1zKDIpLnRpbGUoWzEsMSx2XSkucmVzaGFwZShbdC5zaGFwZVswXSx0LnNoYXBlWzFdKnZdKVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBmdW5jdGlvbiB2b3JleHBhbmQodDp0Zi5UZW5zb3IyRCx2PTQpOnRmLlRlbnNvcjJEe1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gaG9yZXhwYW5kKHQudHJhbnNwb3NlKCksdikudHJhbnNwb3NlKCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBsZXQgbnVtPXRmLnRpZHkoKCk9PntcclxuICAgICAgICAgICAgLy9pbnQzMiDnhLblkI7Dl+S4gOS4quminOiJslxyXG4gICAgICAgICAgICBsZXQgY29sb3JlZD10Lm11bCgweGZmMDAwMGZmfDApIGFzIHR5cGVvZiB0O1xyXG4gICAgICAgICAgICAvLyBsZXQgcmVzaXplZD12b3JleHBhbmQoaG9yZXhwYW5kKGNvbG9yZWQpKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByPXRoaXMucGl4ZWxzaXplWzBdPT10aGlzLnBpeGVsc2l6ZVswXSYmdGhpcy5waXhlbHNpemVbMF09PTE/IGV4cGFuZFRvNEQoY29sb3JlZCk6dGhpcy51cHNhbXBsZS5jYWxsKGV4cGFuZFRvNEQoY29sb3JlZCkse30pIGFzIHRmLlRlbnNvcjREO1xyXG4gICAgICAgICAgICBsZXQgcmVzaXplZD1yLnNxdWVlemUoWzAsM10pIGFzIHRmLlRlbnNvcjJEO1xyXG4gICAgICAgICAgICAvL+i/m+ihjHJnYmHor50g5qiq5ZCR5omp5bGVNOWAjVxyXG4gICAgICAgICAgICAvLyBsZXQgcmdiPWhvcmV4cGFuZChyZXNpemVkLDQpO1xyXG4gICAgICAgICAgICAvL+minOiJsuWkhOeQhiDmiooxIDEgMSAx55qE6L+e57utNOS4qiDlj5jkuLogYWFhYWFhYWFcclxuICAgICAgICAgICAgLy8gbGV0IGNvcj1yZ2IubXVsKDB4YWEpO1xyXG4gICAgICAgICAgICBsZXQgbnVtPXJlc2l6ZWQuYXNUeXBlKFwiaW50MzJcIik7XHJcbiAgICAgICAgICAgIC8vIGxldCBudW09cmVzaXplZDtcclxuICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9udW3ovazmjaLkuLp1aW50OFxyXG4gICAgICAgIGxldCBhcj1hd2FpdCBudW0uZGF0YSgpO1xyXG4gICAgICAgIGxldCBwaXhlZHM9bmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGFyLmJ1ZmZlcik7XHJcbiAgICAgICAgbnVtLmRpc3Bvc2UoKTtcclxuICAgICAgICByZXR1cm4gbmV3IEltYWdlRGF0YShwaXhlZHMsbnVtLnNoYXBlWzFdLG51bS5zaGFwZVswXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5oqKMDHnn6npmLXovazmjaLkuLrlg4/ntKDnn6npmLVcclxuY29uc3Qgc2l6ZT1bNCw0XVxyXG4iLCJpbXBvcnQgKiBhcyB0ZiBmcm9tIFwiQHRlbnNvcmZsb3cvdGZqc1wiXHJcbmltcG9ydCB7ZGVsYXksIGZsb2F0LCBpbnQsIHJhbmRpbnQsIHJhbmdlLCBzdHJ9IGZyb20gJy4uL2xpYnMvbGliJztcclxuaW1wb3J0IHtEcmF3fSBmcm9tIFwiLi9EcmF3XCI7XHJcbi8vIGxldCBydWxlcz17XHJcbi8vICAgICBiM3MyMyxcclxuLy8gICAgIGIxczEyLFxyXG4vLyAgICAgYjM2NzhzMzQ2NzgsXHJcbi8vICAgICBiMzZzMjMsXHJcbi8vICAgICBiMzU2NzhzNTY3OFxyXG4vLyB9XHJcbmltcG9ydCB7ZGVmYXVsdER0eXBlLCBSdWxlLCBSdWxlcyBhcyBydWxlcywgdHJhaW4sIHVzZUxheWVycywgdXNlTWF0cml4UnVsZX0gZnJvbSAnLi9ydWxlcy9tYXRyaXhfcnVsZXMnO1xyXG5pbXBvcnQgXCJAdGVuc29yZmxvdy90ZmpzLWJhY2tlbmQtd2ViZ3B1XCJcclxuaW1wb3J0IFwiQHRlbnNvcmZsb3cvdGZqcy1iYWNrZW5kLXdhc21cIlxyXG5cclxuLy8gdGYuc2V0QmFja2VuZChcIndlYmdsXCIpLnRoZW4ociA9PiApXHJcbmZ1bmN0aW9uIGdldHZhbChpZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0IyR7aWR9YCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHJldHVybiBlLnZhbHVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQ8UiBleHRlbmRzIGtleW9mIHRhYmxlPihpZDogc3RyaW5nLCB0YWc6IFIgPSBudWxsKTogdGFibGVbUl0ge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2lkfWApIGFzIHRhYmxlW1JdO1xyXG59XHJcblxyXG5sZXQgYSA9IGdldChcImhlbGxvXCIpXHJcblxyXG50eXBlIHRhYmxlID0ge1xyXG4gICAgb3B0aW9uOiBIVE1MT3B0aW9uRWxlbWVudCxcclxuICAgIGRpdjogSFRNTERpdkVsZW1lbnQsXHJcbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudCxcclxuICAgIFwiKlwiOiBIVE1MRWxlbWVudCxcclxuICAgIHNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnRcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlPFQgZXh0ZW5kcyBrZXlvZiB0YWJsZSwgUiBleHRlbmRzIGtleW9mIHRhYmxlW1RdPih0YWc6IFQsIGlkOiBzdHJpbmcsIHZhbHVlczogb2JqZWN0KTogdGFibGVbVF0ge1xyXG4gICAgbGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZylcclxuICAgIHQuaWQgPSBpZDtcclxuICAgIC8vXHJcbiAgICBmb3IgKGxldCBrIGluIHZhbHVlcykge1xyXG4gICAgICAgIGlmIChrIGluIHQgPT0gZmFsc2UpIGNvbnRpbnVlO1xyXG4gICAgICAgIHRba10gPSB2YWx1ZXNba107XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdCBhcyB1bmtub3duIGFzIHRhYmxlW1RdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0U2VsZWN0aW9uKCkge1xyXG5cclxuICAgIGZvciAobGV0IGsgaW4gcnVsZXMpIHtcclxuICAgICAgICBnZXQoXCJydWxlXCIpLmFwcGVuZENoaWxkKGNyZWF0ZShcIm9wdGlvblwiLCBrLCB7aW5uZXJUZXh0OiBrLCB2YWx1ZToga30pKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfcGFyYW0ocGFyYW06IHN0cmluZykge1xyXG4gICAgdmFyIHF1ZXJ5ID0gbG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVyeS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBrdiA9IHF1ZXJ5W2ldLnNwbGl0KCc9Jyk7XHJcbiAgICAgICAgaWYgKGt2WzBdID09IHBhcmFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrdlsxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuLy/mmK/lkKbpnIDopoHorq3nu4PnpZ7nu4/nvZHnu5zmtYvor5VcclxuY29uc3QgdXNldHJhaW4gPSBmYWxzZTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgICBjb25zdCBzID0gXCJ3ZWJnbFwiO1xyXG4gICAgY29uc3QgdCA9IGF3YWl0IHRmLnNldEJhY2tlbmQocyk7XHJcbiAgICBhbGVydChg5ZCO56uvOiR7c30ke3QgPyBcIuaIkOWKn1wiIDogXCLlpLHotKVcIn0g5L2/55So5pWw5o2u57G75Z6LOiR7ZGVmYXVsdER0eXBlfWApXHJcbiAgICBpbml0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgbGV0IGVsZSA9IGdldChcImNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIGxldCBoc2l6ZSA9IFsxMDI0LCAxMDI0XVxyXG4gICAgZWxlLmhlaWdodCA9IGhzaXplWzBdO1xyXG4gICAgZWxlLndpZHRoID0gaHNpemVbMV07XHJcbiAgICBlbGUuaWQgPSBcImN0eFwiXHJcbiAgICBjb25zdCByc2l6ZSA9IGdldF9wYXJhbShcInJzaXplXCIpID09IG51bGwgPyAyIDogZmxvYXQoZ2V0X3BhcmFtKFwicnNpemVcIikpXHJcbiAgICBnZXQoXCJyc2l6ZVwiLCBcImlucHV0XCIpLnZhbHVlID0gcnNpemUudG9TdHJpbmcoKTtcclxuICAgIGxldCBzaXplID0gW2hzaXplWzBdIC8gcnNpemUsIGhzaXplWzFdIC8gcnNpemVdXHJcbiAgICBsZXQgZCA9IG5ldyBEcmF3KGVsZSwgc2l6ZVswXSwgc2l6ZVsxXSk7XHJcblxyXG4gICAgbGV0IGluaXQgPSAoKSA9PiB0Zi5yYW5kb21Vbmlmb3JtKHNpemUsIDAsIDEsIGRlZmF1bHREdHlwZSkuZGl2KGZsb2F0KGdldHZhbChcInJlbFwiKSkpLmZsb29yKCkuZXF1YWwoMCkuYXNUeXBlKGRlZmF1bHREdHlwZSkgYXMgdGYuVGVuc29yMkRcclxuICAgIGxldCBkdCA9IGluaXQoKTtcclxuICAgIC8v6L6T5Ye6XHJcbiAgICBnZXQoXCJpbmZvXCIpLmlubmVyVGV4dCA9IGAke2R0LnNoYXBlWzBdfXgke2R0LnNoYXBlWzFdfSAoaCp3KSBgXHJcbiAgICBnZXQoXCJjaW5mb1wiKS5pbm5lclRleHQgPSBgJHtoc2l6ZVswXX14JHtoc2l6ZVsxXX0gKGgqdylgXHJcblxyXG4gICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgY29uc29sZS5sb2coZHQpO1xyXG4gICAgLy/lgZzmraLkv6Hlj7dcclxuICAgIGxldCBwID0gdHJ1ZTtcclxuICAgIC8v5piv5ZCm6Z2Z6buY5pu05pawIOS4jee7mOWItlxyXG4gICAgbGV0IHNsID0gZmFsc2U7XHJcbiAgICAvL+i9ruaVsFxyXG4gICAgbGV0IG4gPSAwO1xyXG4gICAgLy/nu5jliLbpl7TpmpQg5aSa5bCR5bin57uY5Yi25LiA5qyhXHJcbiAgICBsZXQgZHJhd0ZyZXEgPSAxO1xyXG4gICAgLy9sb29wIOabtOaWsOWHveaVsCDku45vbGTorqHnrpflvpfliLBuZXco5bin55+p6Zi177yJXHJcbiAgICAvL+abtOaWsOWHveaVsOm7mOiupOS9v+eUqOefqemYteinhOWImSBiM3MyM+e7j+WFuOeUn+WRvea4uOaIj1xyXG4gICAgbGV0IHVwZGF0ZSA9IChvbGQ6IHRmLlRlbnNvcjJEKSA9PiB1c2VNYXRyaXhSdWxlKG9sZCwgcnVsZXMuYjNzMjMsIHVzZXRyYWluKVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZqP5py66K6+572u5Ye95pWwIOeUqOS7pemaj+acuua3u+WKoOeCueWIsOeUu+W4g+S4ilxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiByYW5kb21TZXQoY291bnQ6IG51bWJlcikge1xyXG4gICAgICAgIGZvciAodmFyIGkgb2YgcmFuZ2UoMCwgY291bnQpKSB7XHJcbiAgICAgICAgICAgIHNldHBvaW50KHJhbmRpbnQoaHNpemVbMF0pLCByYW5kaW50KGhzaXplWzFdKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuLvlvqrnjq8g5pu05paw5LiA5binIOeEtuWQjue7mOWItlxyXG4gICAgICovXHJcbiAgICBhc3luYyBmdW5jdGlvbiBsb29wKCkge1xyXG4gICAgICAgIC8v6L6T5Ye65aSn5bCPXHJcbiAgICAgICAgbGV0IGRlbGF5dCA9IGludChnZXR2YWwoXCJkZWxheVwiKSk7XHJcblxyXG4gICAgICAgIGZvciAoOyA7KSB7XHJcbiAgICAgICAgICAgIC8v6ZqP5py65re75Yqg54K5XHJcbiAgICAgICAgICAgIC8vIHJhbmRvbVNldCgpXHJcbiAgICAgICAgICAgIC8v5q2j5paHXHJcbiAgICAgICAgICAgIGF3YWl0IGRlbGF5KGRlbGF5dCk7XHJcbiAgICAgICAgICAgIGxldCBvbGQgPSBkdDtcclxuICAgICAgICAgICAgZHQgPSB1cGRhdGUoZHQpO1xyXG4gICAgICAgICAgICBvbGQuZGlzcG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZHQpO1xyXG4gICAgICAgICAgICAvL+mdnumdmem7mCDkuJQg5pu057uG5Yiw5LqG5pu05paw55qE5pe25YCZIOi/memHjOWPr+S7pemAieaLqeetieW+hee7mOWItuWujOaIkOaIluiAheS4jeetieW+hVxyXG4gICAgICAgICAgICBpZiAoIXNsICYmIG4gJSBkcmF3RnJlcSA9PSAwKVxyXG4gICAgICAgICAgICAgICAgYXdhaXQgZC5kcmF3MkQoZHQpO1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBpZiAocCkgYnJlYWs7XHJcbiAgICAgICAgICAgIG4rKztcclxuICAgICAgICAgICAgLy/mmL7npLrova5cclxuICAgICAgICAgICAgZ2V0KFwiblwiKS5pbm5lclRleHQgPSBuLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vZXZlbnRcclxuICAgIGdldChcInN0YXJ0XCIpLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHApIHtcclxuICAgICAgICAgICAgcCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL+iOt+WPluinhOWImVxyXG4gICAgICAgICAgICBsZXQgcnVsZWlkID0gZ2V0KFwicnVsZVwiLCBcInNlbGVjdFwiKS5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XHJcbiAgICAgICAgICAgIGxldCBydWxlID0gcnVsZXNbcnVsZWlkXSBhcyBSdWxlO1xyXG4gICAgICAgICAgICAvL+i/memHjOaOp+WItuaYr+WQpuW8gOWQr+WOhuWPsuiusOW9le+8iOaMgee7rea2iOiAl+WGheWtmOaIluaYvuWtmO+8iVxyXG4gICAgICAgICAgICB1cGRhdGUgPSAob2xkKSA9PiB1c2VNYXRyaXhSdWxlKG9sZCwgcnVsZSwgdXNldHJhaW4pXHJcbiAgICAgICAgICAgIC8v5ZCv5Yqo5b6q546vXHJcbiAgICAgICAgICAgIGxvb3AoKTtcclxuICAgICAgICAgICAgZ2V0KFwic3RhcnRcIikuc3R5bGUuYmFja2dyb3VuZCA9IFwicmVkXCJcclxuICAgICAgICAgICAgZ2V0KFwic3RhcnRcIikuaW5uZXJUZXh0ID0gXCLmmoLlgZxcIjtcclxuICAgICAgICAgICAgZ2V0KFwidHJhaW5cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHAgPSB0cnVlO1xyXG4gICAgICAgICAgICBnZXQoXCJzdGFydFwiKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJcIlxyXG4gICAgICAgICAgICBnZXQoXCJzdGFydFwiKS5pbm5lclRleHQgPSBcIuWQr+WKqFwiO1xyXG4gICAgICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICAgICAgICAgIGdldChcInRyYWluXCIpLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgZ2V0KFwidHJhaW5cIikub25jbGljayA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBhd2FpdCB0cmFpbihyc2l6ZSk7XHJcbiAgICAgICAgYWxlcnQoXCLorq3nu4PmiJDlip8s5ZCv5Yqo5rWL6K+VXCIpXHJcbiAgICAgICAgLy/mmL7npLrnlKjnvZHnu5zlrp7njrDnmoTmm7TmlrBcclxuICAgICAgICB1cGRhdGUgPSAob2xkOiB0Zi5UZW5zb3IyRCkgPT4gdXNlTGF5ZXJzKG9sZCk7XHJcbiAgICAgICAgLy/lkK/liqjmtYvor5XvvIzmtYvor5XlrozmiJDliY3or7fli7/mk43kvZwgXHJcbiAgICAgICAgLy/liJ3lp4vljJZcclxuICAgICAgICBkdCA9IGluaXQoKTtcclxuICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICAgICAgbiA9IDA7XHJcbiAgICAgICAgcCA9IGZhbHNlO1xyXG4gICAgICAgIGdldChcImRlbGF5XCIsIFwiaW5wdXRcIikudmFsdWUgPSBzdHIoMjAwKTtcclxuICAgICAgICBhd2FpdCBsb29wKCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBhbGVydChcIua1i+ivleWujOaIkFwiKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0KFwicmVzZXRcIikub25jbGljayA9IGFzeW5jICgpID0+IHtcclxuICAgICAgICBkdCA9IGluaXQoKTtcclxuICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICAgICAgbiA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hhbmdlcG9pbnQoeCwgeSkge1xyXG4gICAgICAgIGlmICh4IDwgMCB8fCB5IDwgMCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBkYXRhID0gZHQuYXJyYXlTeW5jKCk7XHJcbiAgICAgICAgbGV0IHR4LCB0eTtcclxuICAgICAgICB0eCA9IE1hdGguZmxvb3IoeCAvIGQuY3cpO1xyXG4gICAgICAgIHR5ID0gTWF0aC5mbG9vcih5IC8gZC5jaClcclxuICAgICAgICBkYXRhW3R5XVt0eF0gPSBkYXRhW3R5XVt0eF0gPT0gMCA/IDEgOiAwO1xyXG4gICAgICAgIGR0LmRpc3Bvc2UoKTtcclxuICAgICAgICBkdCA9IHRmLnRlbnNvcihkYXRhKTtcclxuICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0cG9pbnQoeCwgeSwgdiA9IDEpIHtcclxuICAgICAgICBpZiAoeCA8IDAgfHwgeSA8IDApIHJldHVybjtcclxuICAgICAgICBsZXQgZGF0YSA9IGR0LmFycmF5U3luYygpO1xyXG4gICAgICAgIGxldCB0eCwgdHk7XHJcbiAgICAgICAgdHggPSBNYXRoLmZsb29yKHggLyBkLmN3KTtcclxuICAgICAgICB0eSA9IE1hdGguZmxvb3IoeSAvIGQuY2gpXHJcbiAgICAgICAgZGF0YVt0eV1bdHhdID0gMTtcclxuICAgICAgICBkdC5kaXNwb3NlKCk7XHJcbiAgICAgICAgZHQgPSB0Zi50ZW5zb3IoZGF0YSk7XHJcbiAgICAgICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgICAgIC8vc2V0XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYHNldDoke3h9LCR7eX0gPSAke3Z9YClcclxuICAgIH1cclxuXHJcbiAgICBnZXQoXCJjdHhcIikub25jbGljayA9IGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmJ1dHRvbiA9PSAwKVxyXG4gICAgICAgICAgICBjaGFuZ2Vwb2ludChlLm9mZnNldFgsIGUub2Zmc2V0WSk7XHJcbiAgICB9XHJcbiAgICBnZXQoXCJjdHhcIikub25tb3VzZW1vdmUgPSBlID0+IHtcclxuICAgICAgICBpZiAoZS5idXR0b25zID09PSAxKSB7XHJcbiAgICAgICAgICAgIHNldHBvaW50KGUub2Zmc2V0WCwgZS5vZmZzZXRZLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoXCJzbFwiKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgIHNsID0gIXNsO1xyXG4gICAgICAgIGlmIChzbCkgZ2V0KFwic2xcIikuc3R5bGUuYmFja2dyb3VuZCA9IFwicmVkXCI7XHJcbiAgICAgICAgZWxzZSBnZXQoXCJzbFwiKS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJcIjtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG53aW5kb3cub25sb2FkID0gbWFpbjtcclxuY29uc29sZS5sb2coXCJoZWxsb3dvcmxkXCIpO1xyXG5cclxuY29uc3QgbW9kID0gKG1vZHVsZSBhcyBhbnkpO1xyXG5pZiAobW9kLmhvdClcclxuICAgIG1vZC5ob3QuYWNjZXB0KCk7XHJcbmNvbnNvbGUubG9nKG1vZC5ob3QpXHJcbi8vIG1vZC5hZGREaXNwb3NlSGFuZGxlcigoKT0+e1xyXG4vLyAgICAgY29uc29sZS5sb2coXCJoZWxsb1wiKTtcclxuLy8gfSkiLCJpbXBvcnQgKiBhcyB0ZiBmcm9tIFwiQHRlbnNvcmZsb3cvdGZqc1wiXHJcbi8v5aaC5p6c562J5LqO5YiZ5Li6MSDlkKbliJnliJnkuLowXHJcbi8v55u4562J5q+U6L6DXHJcbi8qKlxyXG4gKiDlm77mo4DmtYsg5qOA5rWL5Zu+5Lit5q+P5Liq54K55piv5ZCm562J5LqO5p+Q5Liq5pWwIOWmguaenOetieS6jui/lOWbnjEg5ZCm5YiZ6L+U5ZueMCDkuI50Zum7mOiupOeahFxyXG4gKiDlkox0Zi5lcXVhbOeahOiDveWKm+S4gOagtyDkvYblj5HmjKXnmoTkuLrmlbDlgLznn6npmLUg6ICM6Z2eYm9vbOefqemYtVxyXG4gKiBAcGFyYW0gdHNcclxuICogQHBhcmFtIGVxdXRvXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXF1YWxNYXA8VCBleHRlbmRzIHRmLlRlbnNvcj4odHM6IFQsIGVxdXRvOiBudW1iZXIpOlQge1xyXG4gICAgLy8gaWYoZXF1dG8hPTApIHJldHVybiB0cy5kaXYoZXF1dG8pLnN1YigxKS5hYnMoKS5sZXNzRXF1YWwoMCk7XHJcbiAgICByZXR1cm4gdGYuZXF1YWwodHMsZXF1dG8pLmFzVHlwZSh0cy5kdHlwZSkgYXMgVDtcclxufVxyXG4vL+atpOWkhOW6lOacieWkp+S6juavlOi+gyAg55Sx5q2k5Y+v5b6XIOaJgOacieavlOi+g+WIpOaWrVxyXG5cclxuLy8xLTAg5Y+Y5o2iIOWNs25vdOi/kOeul1xyXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZUJvb2wodHM6IHRmLlRlbnNvcikge1xyXG4gICAgcmV0dXJuIHRzLnN1YigxKS5hYnMoKTtcclxufVxyXG4vLzAtMSDlj5jkuLogIC0xIDEg56ym5Y+35YyW6L+Q566XXHJcbmV4cG9ydCBmdW5jdGlvbiBzeW1saXplKHRzOiB0Zi5UZW5zb3IpIHtcclxuICAgIHJldHVybiB0cy5tdWwoMikuc3ViKDEpO1xyXG59XHJcbi8v5q2k5aSE5bqU5pyJ5LiO5oiW6Z2eIOW8guaIliBcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXhwYW5kVG80RCh0czogdGYuVGVuc29yMkQpOiB0Zi5UZW5zb3I0RCB7XHJcbiAgICAvL+i/meS4quaKijJkIGZlYXR1cmVtYXDlj5jkuLo0ZOWPr+S7peebtOaOpei/m+ihjOWNt+enr+aTjeS9nOeahGZlYXR1cmVtYXDmiJZrZXJuZWxcclxuICAgIC8v5Lmf5bCx5piv55u05o6l5a+5ZmVhdHVyZW1hcOi/m+ihjOWNt+enr1xyXG4gICAgLy/lj5jmiJBuaHdjXHJcbiAgICBsZXQgcyA9IHRzLmV4cGFuZERpbXMoMCkuZXhwYW5kRGltcygtMSkgYXMgdGYuVGVuc29yNEQ7XHJcbiAgICAvL+aJqeWxleS4gOS4quWJjemdoueahG7lkozkuIDkuKrlkI7pnaLnmoRjXHJcbiAgICByZXR1cm4gcztcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlRGltVG8yRCh0czogdGYuVGVuc29yNEQpOiB0Zi5UZW5zb3IyRCB7XHJcbiAgICAvL+i/meS4quaKijJkIGZlYXR1cmVtYXDlj5jkuLo0ZOWPr+S7peebtOaOpei/m+ihjOWNt+enr+aTjeS9nOeahGZlYXR1cmVtYXDmiJZrZXJuZWxcclxuICAgIC8v5Lmf5bCx5piv55u05o6l5a+5ZmVhdHVyZW1hcOi/m+ihjOWNt+enr1xyXG4gICAgLy/lj5jmiJBuaHdjXHJcbiAgICBsZXQgcyA9IHRzLnNxdWVlemUoWzAsIDNdKSBhcyB0Zi5UZW5zb3IyRDtcclxuICAgIC8v5omp5bGV5LiA5Liq5YmN6Z2i55qEbuWSjOS4gOS4quWQjumdoueahGNcclxuICAgIHJldHVybiBzO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIHRmIGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCI7XHJcbmltcG9ydCB7IFRlbnNvciB9IGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCI7XHJcbmltcG9ydCB7IGRlbGV0ZURpbVRvMkQsIGVxdWFsTWFwLCBleHBhbmRUbzREIH0gZnJvbSBcIi4uL21hdHJpeF90b29sXCI7XHJcbi8v5YWD5pON5L2cIDAgMeefqemYtSDms6jmhI/kuIvpnaLnmoTpg73lj6/ku6XnlKhsb2dpY0FuZCBvcuetieadpeWunueOsFxyXG4vKipcclxuICog5a6e546w5aSa5Z+f55qE5pa55rOV77ya5bCGMmTnn6npmLXlop7liqDkuIDkuKrnu7TluqYg5L2/55So5Y2356ev6K6h566X57uT5p6cXHJcbiAqIOaYvuekuuaXtuWIhuWIq+aYvuekuuWkmuS4quWbvuWxguaIlumAieaLqeWFtuS4reS4gOS4quaYvuekuiDmiJbnu7zlkIgg5ZCI5oiQ5LiA5Liq5Zu+5bGC5pi+56S6XHJcbiAqIOmcgOimgeaUuemAoOaYvuekuuezu+e7nyDmk43kvZzpgLvovpEgYmFzaWNcclxuICogcnVsZSDlkozmlbDmja7liJ3lp4vljJZcclxuICovXHJcbi8qKlxyXG4gKiDlj5blj40gMSAw5a+56LCDXHJcbiAqIEBwYXJhbSB0ZW5zb3JcclxuICovXHJcbmZ1bmN0aW9uIHRmX3JldmVyc2UodGVuc29yOiBUZW5zb3IpIHtcclxuICAvL+S9v+eUqGVxdWFsIDAg5Lmf5Y+v5Lul5a6e546w5oqKIDDlj5gxIDEg5Y+YMFxyXG4gIC8vIHJldHVybiB0Zi50aWR5KCgpPT57XHJcbiAgLy8gcmV0dXJuIHRmLmVxdWFsKHRlbnNvciwwKTtcclxuICAvLyB9KVxyXG4gIHJldHVybiB0Zi50aWR5KCgpID0+IHtcclxuICAgIHJldHVybiB0ZlxyXG4gICAgICAubG9naWNhbFhvcih0ZW5zb3IuYXNUeXBlKFwiYm9vbFwiKSwgdGYub25lc0xpa2UodGVuc29yKS5hc1R5cGUoXCJib29sXCIpKVxyXG4gICAgICAuYXNUeXBlKFwiZmxvYXQzMlwiKTtcclxuICB9KTtcclxuICAvLyByZXR1cm4gdGYudGlkeSgoKSA9PiB7XHJcbiAgLy8gICAgIHJldHVybiB0Zi5hYnModGYuc3ViKHRlbnNvciwgMSkpO1xyXG4gIC8vIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDorr4xIOaYr+iuvjDnmoTlj43pnaJcclxuICogQHBhcmFtIHRlbnNvclxyXG4gKi9cclxuZnVuY3Rpb24gdGZfc2V0T25lKHRlbnNvcjogVGVuc29yLCBzZXRNYXA6IFRlbnNvcikge1xyXG4gIHJldHVybiB0Zi50aWR5KCgpID0+IHtcclxuICAgIHJldHVybiB0ZlxyXG4gICAgICAubG9naWNhbE9yKHRlbnNvci5hc1R5cGUoXCJib29sXCIpLCBzZXRNYXAuYXNUeXBlKFwiYm9vbFwiKSlcclxuICAgICAgLmFzVHlwZShcImZsb2F0MzJcIik7XHJcbiAgfSk7XHJcbiAgLy8gcmV0dXJuIHRmLnRpZHkoKCkgPT4ge1xyXG4gIC8vICAgICByZXR1cm4gdGZfcmV2ZXJzZSh0Zl9zZXRaZXJvKHRmX3JldmVyc2UodGVuc29yKSwgdGZfcmV2ZXJzZShzZXRNYXApKSk7XHJcbiAgLy8gfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOiuvjAg5Zug5Li65Lqk5o2i5b6LIOiuvue9rjDnmoTlj4LmlbDpobrluo/kuI3pmZBcclxuICogQHBhcmFtIHRlbnNvciDljp/lp4vnn6npmLVcclxuICogQHBhcmFtIHNldE1hcCDorr7nva7nn6npmLUgMOihqOekuuimgeiuvjDnmoTkvY3nva4gMSDooajnpLrkuI3lj5hcclxuICovXHJcbmZ1bmN0aW9uIHRmX3NldFplcm8odGVuc29yOiBUZW5zb3IsIHNldE1hcDogVGVuc29yKSB7XHJcbiAgcmV0dXJuIHRmLnRpZHkoKCkgPT4ge1xyXG4gICAgcmV0dXJuIHRmXHJcbiAgICAgIC5sb2dpY2FsQW5kKHRlbnNvci5hc1R5cGUoXCJib29sXCIpLCBzZXRNYXAuYXNUeXBlKFwiYm9vbFwiKSlcclxuICAgICAgLmFzVHlwZShcImZsb2F0MzJcIik7XHJcbiAgfSk7XHJcbiAgLy8gcmV0dXJuIHRmLnRpZHkoKCkgPT4gdGYubXVsKHRlbnNvciwgc2V0TWFwKSk7XHJcbn1cclxuXHJcbi8v5pON5L2c6ZuGIOazqOaEjyDlpoLmnpzkuIDkuKrop4TliJnkuK3kuI3orr7nva7ku7vkvZXop4TliJkg5YiZ5YWo6YOo6K6+572u5Li6MFxyXG5leHBvcnQgY29uc3QgZGVmYXVsdER0eXBlID0gXCJmbG9hdDMyXCI7XHJcbi8vVGVuc29y55qE57G75Z6L5Li6Ym9vbFxyXG50eXBlIENvbmRGdW5jID0gKEssIFMsIFApID0+IFRlbnNvcjtcclxuLyoqXHJcbiAqIOWmguaenOWRqOWbtOacie+8iHYg5Lik77yJ5Liq5Li6MSDliJnkv53mjIHkuK3lv4PkuI3lj5hcclxuICog5ZCm5YiZ6K6+572u5Li6MCAg5Lmf5bCx5piv6Zmk5LqGduS5i+WklueahOmDveS8muiuvue9ruS4ujBcclxuICogQHBhcmFtIEsg5Y2356ev5b6X5Yiw55qE57uT5p6c6KGo56S65ZGo5Zu05qC85a2Q5a+55Lit5b+D5qC85a2Q55qE5b2x5ZON77yM5LiA6Iis6KGo56S65ZGo5Zu05qC85a2Q5LitMeeahOS4quaVsFxyXG4gKiBAcGFyYW0gUyDljp/lp4vnn6npmLVcclxuICogQHBhcmFtIFAgSytT55qE57uT5p6cXHJcbiAqIEBwYXJhbSB2XHJcbiAqL1xyXG5mdW5jdGlvbiBrZWVwKEssIFMsIFAsIGNvbmRGdW5jOiBDb25kRnVuYykge1xyXG4gIC8v5oqK5ZGo5Zu05pyJ5Lik5Liq5qC85a2Q55qE54K5IOWkjeWItuWIsOe7k+aenOS4rSDlpoLmnpzlkajlm7TkuI3mmK/kuKTkuKrmoLzlrZAg5pu05aSa5oiW5pu05bCRIOWwseS4jeWkjeWItlxyXG4gIC8v5aSN5Yi25LiN5piv5Y+g5Yqg6ICM5piv6K6+572u5Li6MSAg5aaC5p6c5a+556m657uT5p6c5omn6KGMIOWwseaYr+WkjeWItueahOaEj+aAnSDkvYblpoLmnpzlr7npnZ7nqbrnu5Pmnpwg5bCx5pivIOWmguaenOWOn+Wni+S9jee9ruaYrzHnmoTor53lsLHorr7nva4g5ZCm5YiZ5LiN5pS55Y+YXHJcbiAgLy/mo4DmtYsg5aaC5p6c5Li6MiAg5LiN6K6+572uemVybyDkv53mjIHkuI3lj5gg5aaC5p6c5LiN5pivMiDliJkg5YWo6YOo6K6+572u5Li6MFxyXG4gIGxldCBLMiA9IGNvbmRGdW5jKEssIFMsIFApLmFzVHlwZShcImZsb2F0MzJcIik7XHJcbiAgLy/ku6Xlj6DliqDmlrnlvI/kv53lrZjnu5Pmnpwg5Lulc2V0T25l57uT5bC+55qE6K+dIOS4jeS8mua2iOWOu+S7u+S9leS4nOilv1xyXG4gIHJldHVybiB0Zl9zZXRPbmUoUCwgdGZfc2V0WmVybyhTLCBLMikpO1xyXG59XHJcblxyXG4vKipcclxuICog5aaC5p6c5ZGo5Zu05pyJ77yIdiAz77yJ5Liq5Li6MSDliJnorr7nva7kuK3lv4PkuLoxXHJcbiAqIEBwYXJhbSBLIOmdnjAgMSDnn6npmLVcclxuICogQHBhcmFtIFMgMCAxIOefqemYtVxyXG4gKiBAcGFyYW0gUCAwIDHnn6npmLVcclxuICogQHBhcmFtIHZcclxuICovXHJcbmZ1bmN0aW9uIHNldE9uZShLLCBTLCBQLCBjb25kRnVuYzogQ29uZEZ1bmMpIHtcclxuICAvL2VxdWFsbWFw5oqK6Z2eIDAgMSDlj5jkuLogMCAxXHJcbiAgbGV0IEszID0gY29uZEZ1bmMoSywgUywgUCkuYXNUeXBlKFwiZmxvYXQzMlwiKTtcclxuICAvL+e9rjEg5Y6f5pys5piv55SoIHRmLmFkZChQLEszKSDlm6DkuLrlgYforr5Q5piv5YWoMCAg5oiW6ICF5L+d6K+B5LiN6YeN5Y+gIOWboOS4uiBzZXRPbmUoeCnkuI3lj6/og73nlKjkuIDkuKrlgLzosIPnlKjkuKTmrKFcclxuICAvL3RmX3NldE9uZeaYr+WPr+S7peWQjOaXtuiwg+eUqOWkmuasoeiAjOS4jeS8muWHuueOsOWkp+S6jjHnmoTmg4XlhrUg6ICMYWRk5LyaXHJcbiAgLy/lm6DmraTmsqHmnIlcclxuICByZXR1cm4gdGZfc2V0T25lKFAsIEszKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIHNldE9uZeeahOebuOWPjemdoiBzZXRaZXJvXHJcbiAqIEBwYXJhbSBLXHJcbiAqIEBwYXJhbSBTXHJcbiAqIEBwYXJhbSBQXHJcbiAqIEBwYXJhbSB2XHJcbiAqL1xyXG5mdW5jdGlvbiBzZXRaZXJvKEssIFMsIFAsIGNvbmRGdW5jOiBDb25kRnVuYykge1xyXG4gIGNvbnN0IFQgPSB0Zl9yZXZlcnNlKGNvbmRGdW5jKEssIFMsIFApLmFzVHlwZShcImZsb2F0MzJcIikpO1xyXG4gIGNvbnN0IHJlcyA9IHRmX3NldFplcm8oUCwgVCk7XHJcbiAgcmV0dXJuIHJlcztcclxufVxyXG5cclxuLyoqXHJcbiAqIOihqOekuuetieS6juS7gOS5iFxyXG4gKiBAcGFyYW0gdlxyXG4gKiBAcmV0dXJuc1xyXG4gKi9cclxuZnVuY3Rpb24gY29uZEVxdWFsKHYpOiBDb25kRnVuYyB7XHJcbiAgcmV0dXJuIChLLCBTLCBQKSA9PiB7XHJcbiAgICByZXR1cm4gZXF1YWxNYXAoSywgdik7XHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29uZExlc3Modik6IENvbmRGdW5jIHtcclxuICByZXR1cm4gKEssIFMsIFApID0+IHtcclxuICAgIHJldHVybiB0Zi5sZXNzKEssIHYpO1xyXG4gIH07XHJcbn1cclxuZnVuY3Rpb24gY29uZE5vdEVxdWFsKHYpOiBDb25kRnVuYyB7XHJcbiAgcmV0dXJuIChLLCBTLCBQKSA9PiB7XHJcbiAgICByZXR1cm4gdGYubm90RXF1YWwoSywgdik7XHJcbiAgfTtcclxufVxyXG4vLy/mk43kvZzpm4bnu5PmnZ9cclxuLyoqXHJcbiAqIOeUqOS6juaPkOS+m2RzbCDmlrnkvr/op4TliJnnvJblhplcclxuICogQHBhcmFtIEtcclxuICogQHBhcmFtIFNcclxuICogQHBhcmFtIFBcclxuICovXHJcbmZ1bmN0aW9uIHVzZShLLCBTLCBQKSB7XHJcbiAgdHlwZSBMaW5rVHlwZSA9IFwiYW5kXCIgfCBcIm9yXCI7XHJcbiAgY2xhc3MgZnVuY3Mge1xyXG4gICAgcHJvdGVjdGVkIEsgPSBLO1xyXG4gICAgcHJvdGVjdGVkIFMgPSBTO1xyXG4gICAgcHJvdGVjdGVkIFAgPSBQO1xyXG4gICAgcHJvdGVjdGVkIGNvbmRzOiBDb25kRnVuY1tdID0gbnVsbDtcclxuICAgIC8vIHByb3RlY3RlZCBjb25kOiBDb25kRnVuYyA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIGxpbmtUeXBlOiBMaW5rVHlwZSA9IFwiYW5kXCI7XHJcbiAgICAvKipcclxuICAgICAqIOa3t+WQiOeahOadoeS7tiDmmoLml7bkvb/nlKjnrKzkuIDkuKrmnaHku7ZcclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXRDb21wb3NlZENvbmQoKTogQ29uZEZ1bmMge1xyXG4gICAgICByZXR1cm4gKEssIFMsIFApID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25kc1swXShLLCBTLCBQKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIC8v5aSa5qyh6LCD55So5p2h5Lu25Lya6Ieq5Yqo5L2/55SoYW5k6L+e5o6lXHJcbiAgICBwdWJsaWMgd2hlbkVxdWFsKHY6IG51bWJlcikge1xyXG4gICAgICB0aGlzLmNvbmRzLnB1c2goY29uZEVxdWFsKHYpKTtcclxuICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgd2hlbkxlc3ModjogbnVtYmVyKSB7XHJcbiAgICAgIHRoaXMuY29uZHMucHVzaChjb25kTGVzcyh2KSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHdoZW5Ob3RFcXVhbCh2OiBudW1iZXIpIHtcclxuICAgICAgdGhpcy5jb25kcy5wdXNoKGNvbmROb3RFcXVhbCh2KSk7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGtlZXAgPSAoKSA9PlxyXG4gICAgICAodGhpcy5QID0ga2VlcCh0aGlzLkssIHRoaXMuUywgdGhpcy5QLCB0aGlzLmdldENvbXBvc2VkQ29uZCgpKSk7XHJcbiAgICBwdWJsaWMgc2V0T25lID0gKCkgPT5cclxuICAgICAgKHRoaXMuUCA9IHNldE9uZSh0aGlzLkssIHRoaXMuUywgdGhpcy5QLCB0aGlzLmdldENvbXBvc2VkQ29uZCgpKSk7XHJcbiAgICBwdWJsaWMgc2V0WmVybyA9ICgpID0+XHJcbiAgICAgICh0aGlzLlAgPSBzZXRaZXJvKHRoaXMuSywgdGhpcy5TLCB0aGlzLlAsIHRoaXMuZ2V0Q29tcG9zZWRDb25kKCkpKTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5QO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNhbGN1bGF0ZTxUPihmdW5jOiAoSywgUywgUCkgPT4gVCkge1xyXG4gICAgICByZXR1cm4gZnVuYyh0aGlzLkssIHRoaXMuUywgdGhpcy5QKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBuZXcgZnVuY3MoKTtcclxufVxyXG5cclxudHlwZSBSdWxlVHlwZSA9IFJldHVyblR5cGU8dHlwZW9mIHVzZT47XHJcblxyXG5mdW5jdGlvbiBiYXNpYyh0czogdGYuVGVuc29yMkQpIHtcclxuICAvL+i/memHjOeQhuiuuuS4iuWPr+S7peiAg+iZkeeUqOWFtuS7lmtlcm5lbOS7peS7peS4jeWQjOaWueW8j+iAg+iZkeWRqOWbtOWAvFxyXG4gIC8v6L+Z6YeM5Y+v5Lul55So5LiA5Liq5aSa6YCa6YGT5Y2356ev5qC45p2l5aSE55CGXHJcbiAgLy/nu5/orqHkuIDkuKrmoLzlrZDlkajlm7TnmoTmiYDmnInmoLzlrZDnmoTlgLwgIOadg+mHjemDveaYrzEg5L2G5Lmf5Y+v5Lul5LiN5ZCMICDnlJroh7Plj6/ku6XogIPomZHlhbbku5blm6DntKDov5vljrtcclxuICBsZXQga2VyID0gdGZcclxuICAgIC50ZW5zb3IyZChbXHJcbiAgICAgIFsxLCAxLCAxXSxcclxuICAgICAgWzEsIDAsIDFdLFxyXG4gICAgICBbMSwgMSwgMV0sXHJcbiAgICBdKVxyXG4gICAgLmV4cGFuZERpbXMoLTEpXHJcbiAgICAuZXhwYW5kRGltcygtMSkgYXMgdGYuVGVuc29yNEQ7XHJcbiAgLy/mtYvor5Xorq3nu4PnlKhcclxuICAvLyBrZXI9dGYudmFyaWFibGUoa2VyLHRydWUsXCJrZXJuZWxcIixkZWZhdWx0RHR5cGUpO1xyXG4gIC8v5oqKdHPlj5jkuLo0ZFxyXG4gIC8v5Y6f5aeL55+p6Zi1XHJcbiAgbGV0IFMgPSBleHBhbmRUbzREKHRzKS5hc1R5cGUoZGVmYXVsdER0eXBlKTtcclxuICAvL+WNt+enr+iuoeeul+WQjueahOefqemYtVxyXG4gIGxldCBLID0gdGYuY29udjJkKFMsIGtlciwgMSwgXCJzYW1lXCIsIFwiTkhXQ1wiKTtcclxuICAvL+iuoeeul1xyXG4gIC8v5Y+g5YqgXHJcbiAgLy/ov5nkuKrmmK/lhbbku5borr4wXHJcbiAgLy/liJ3lp4vkuLow55qE5L+d5a2Y57uT5p6c55qE55+p6Zi1XHJcbiAgbGV0IFAgPSB0Zi56ZXJvc0xpa2UoUyk7XHJcbiAgcmV0dXJuIHsgSywgUywgUCB9O1xyXG59XHJcblxyXG4vKipcclxuICog6KeE5YiZ6ZuGIOeQhuiuuuS4iuWPr+S7pea3u+WKoO+8mlxyXG4gKiAxLuinhOWImeWGheWcqOmaj+acuuaApyDmnInlsI/mpoLnjoflh7rnjrDlhbbku5booYzkuLpcclxuICogMi4g5L2/55So6Zmk5LqGa2VlcOWSjHNldE9uZeS5i+WklueahOaTjeS9nCDlpoJzZXRaZXJvXHJcbiAqL1xyXG5leHBvcnQgbmFtZXNwYWNlIFJ1bGVzIHtcclxuICAvL+WfuuacrOinhOWImVxyXG4gIC8v5LiN5aSN5Yi2b2xk55qE5oOF5Ya15LiLIHNldFplcm/mmK/oh6rliqjnmoQg5YW25LuW6KeE5YiZ5Y+q5piv6KaG55uW5LqG5YWo6Z2i55qEc2V0WmVybyDogIwg5aaC5p6c6aKE5YWI5aSN5Yi25LiK5binIOWImXNldFplcm/pnIDopoHmiYvliqjosIPnlKhcclxuICAvL+azqOaEj+m7mOiupOaDheWGteS4i+S4jeaYr+S/neaMgSDpmaTpnZ7lpI3liLYg5aSN5Yi2IOWImem7mOiupOihjOS4uuS4uuS/neaMgSDkuI3lpI3liLbpu5jorqTooYzkuLrkuLrorr4wXHJcbiAgLy/ooajnpLogMueahOaXtuWAmeS4jeWPmCAz55qE5pe25YCZ5rS76L+H5p2lKOiuvue9ruS4ujEpXHJcbiAgLy/nlLHkuo7msqHmnInlpI3liLbnmoTov4fnqIsg5q+P5Liq54K56YO95piv5ZGo5Zu05YW25LuW54K555qE57uT5p6cIOWboOatpHNldFpFUk/kvJrlr7zoh7Tov57plIHlj43lupRcclxuICAvL+S5n+WwseaYr+ivtOWmguaenOS4jeiuvue9ruinhOWImSDkuIvkuIDluKfkvJroh6rliqjmuIXpm7Yg6Zmk5LqG5L+d5oyB5ZKM6K6+MeeahCDlhbbku5bpg73oh6rliqjorr4wXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGIzczIzKHJ1bGU6IFJ1bGVUeXBlKSB7XHJcbiAgICAvL+a0u+edgOmavuW6plxyXG4gICAgcnVsZS53aGVuRXF1YWwoMikua2VlcCgpO1xyXG4gICAgLy8gcnVsZS5rZWVwKDMpO1xyXG4gICAgLy/lh7rnlJ/pmr7luqZcclxuICAgIC8vIHJ1bGUuc2V0T25lKDIpO1xyXG4gICAgcnVsZS53aGVuRXF1YWwoMykuc2V0T25lKCk7XHJcbiAgICAvLzbnmoTml7blgJnmrbvljrsgKOaLpeaMpOinhOWImSkg5Zug5Li66Zmk5LqGa2VlcOeahOWSjHNldE9uZeeahCDlhbbku5bpg73kvJroh6rliqjmrbvljrsg5omA5Lul6L+Z6YeM6LCD55So5ZKM5LiN6LCD55So5LiA5qC3XHJcbiAgICAvLyBydWxlLnNldFplcm8oNik7XHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gcmV2X2IzczIzKHJ1bGU6IFJ1bGVUeXBlKSB7XHJcbiAgICBydWxlLndoZW5FcXVhbCg2KS5rZWVwKCk7XHJcbiAgICBydWxlLndoZW5FcXVhbCgwKS5zZXRPbmUoKTtcclxuICAgIHJ1bGUud2hlbkVxdWFsKDEpLnNldE9uZSgpO1xyXG4gICAgcnVsZS53aGVuRXF1YWwoMikuc2V0T25lKCk7XHJcbiAgICBydWxlLndoZW5FcXVhbCgzKS5zZXRPbmUoKTtcclxuICAgIHJ1bGUud2hlbkVxdWFsKDQpLnNldE9uZSgpO1xyXG4gICAgcnVsZS53aGVuRXF1YWwoNykuc2V0T25lKCk7XHJcbiAgICBydWxlLndoZW5FcXVhbCg4KS5zZXRPbmUoKTtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBiMzZzMjMocnVsZTogUnVsZVR5cGUpIHtcclxuICAgIGIzczIzKHJ1bGUpO1xyXG4gICAgcnVsZS53aGVuRXF1YWwoNikuc2V0T25lKCk7XHJcbiAgfVxyXG5cclxuICBleHBvcnQgZnVuY3Rpb24gYjFzMTIocnVsZTogUnVsZVR5cGUpIHtcclxuICAgIHJ1bGUud2hlbkVxdWFsKDIpLmtlZXAoKTtcclxuICAgIHJ1bGUud2hlbkVxdWFsKDEpLnNldE9uZSgpO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGIzNjc4czM0Njc4KHJ1bGU6IFJ1bGVUeXBlKSB7XHJcbiAgICBydWxlLndoZW5FcXVhbCg0KS5rZWVwKCk7XHJcbiAgICBydWxlLndoZW5FcXVhbCgzKS5zZXRPbmUoKTtcclxuICAgIHJ1bGUud2hlbkVxdWFsKDYpLnNldE9uZSgpO1xyXG4gICAgcnVsZS53aGVuRXF1YWwoNykuc2V0T25lKCk7XHJcbiAgICBydWxlLndoZW5FcXVhbCg4KS5zZXRPbmUoKTtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBiMzU2NzhzNTY3OChydWxlOiBSdWxlVHlwZSkge1xyXG4gICAgLy8gcnVsZS5rZWVwKDQpO1xyXG4gICAgY29uc3QgdCA9IFszLCA1LCA2LCA3LCA4XTtcclxuICAgIGZvciAobGV0IGkgb2YgdCkge1xyXG4gICAgICBydWxlLndoZW5FcXVhbChpKS5zZXRPbmUoKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiDnn6npmLXop4TliJlcclxuICog55CG6K665LiK6L+Z5Liq5Y+v5Lul5pSv5oyB5ZCE56eN6KeE5YiZXHJcbiAqIOWPr+S7peaUr+aMgeWcqOavj+asoeiuoeeul+S4i+S4gOW4p+eahOaXtuWAmei/m+ihjOiusOW9le+8iOmineWkluWKn+iDve+8iVxyXG4gKlxyXG4gKiBT5Li6MCAxIOefqemYtSBL5piv5LuOMCAxIOefqemYteWNt+enr+W+l+WIsOeahOWAvCDooajnpLrkuoblkajlm7TmoLzlrZDlr7nkuK3lv4PmoLzlrZDnmoTlvbHlk43vvIjljbfnp6/lgLzvvIkgUOS4uksrU+eahOe7k+aenCDooajnpLpcclxuICogb2xk5ZKM5b2x5ZON5Y+g5Yqg5ZCO55qE5Lqn54mpICjnu7zlkIjkuqfnianvvIkg54S25ZCO5Y676KeE6IyD5YyWXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdXNlTWF0cml4UnVsZShcclxuICB0czogdGYuVGVuc29yMkQsXHJcbiAgcnVsZUY6IChydWxlOiBSdWxlVHlwZSkgPT4gdm9pZCA9IFJ1bGVzLmIzczIzLFxyXG4gIGxvZ0hpc3RvcnkgPSBmYWxzZVxyXG4pIHtcclxuICAvL+eUn+WRvea4uOaIj+WNt+enryDku47kuIDkuKpmZWF0dXJlIG1hcCDlvpfliLDkuIvkuIDkuKpmZWF0dXJlbWFwXHJcbiAgLy/ljp/lp4sgUyDljbfnp6/lvpfliLBLIOeEtuWQjksrUyDlvpfliLBQIOeEtuWQjuWvuVDkvb/nlKhlcXVhbE1hcDMg5b6X5Yiw5LqM5YC85YyW55qE5LiL5LiA5LiqXHJcbiAgLy9mZWF0dXJlbWFwXHJcbiAgbGV0IHJldCA9IHRmLnRpZHkoKCkgPT4ge1xyXG4gICAgbGV0IHsgSywgUywgUCB9ID0gYmFzaWModHMpO1xyXG4gICAgbGV0IHJ1bGUgPSB1c2UoSywgUywgUCk7XHJcbiAgICBydWxlRihydWxlKTtcclxuICAgIFAgPSBydWxlLmdldCgpO1xyXG4gICAgLy/orq3nu4PlubbovpPlh7psb3NzXHJcbiAgICBsZXQgcmV0ID0gZGVsZXRlRGltVG8yRChQIGFzIHRmLlRlbnNvcjREKTtcclxuICAgIC8vXHJcbiAgICByZXR1cm4gcmV0O1xyXG4gIH0pO1xyXG4gIC8v6K6t57uD55qE6aKd5aSW55qE5Lic6KW/XHJcbiAgaWYgKGxvZ0hpc3RvcnkpIHRyYWluTG9nKHRzLCByZXQpO1xyXG4gIHJldHVybiByZXQ7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIFJ1bGUgPSB0eXBlb2YgUnVsZXMuYjNzMjM7XHJcblxyXG4vL+iAg+iZkeS4jeaUueWPmOinhOWImeiAjOaYr+iuree7g+WNt+enr+aguO+8jOiuqeacgOe7iOW+l+WIsOeahG5leHQgZnJhbWXnmoTmgLvlkozvvIzmjqXov5E1MCUs5ZCM5pe25bC96YeP5LiOcHJlduS4jeWQjFxyXG4vL+S5n+WwseaYryDmnIDlpKfljJYgYWJzKEEtQileMlxyXG5cclxuLy/lvpfliLDkuIDkuKrnpZ7nu4/nvZHnu5wgIOWPr+S7peaKim1hdHJpeHJ1bGXlvZPkvZznjq/looPvvIzmioroh6rlt7HovpPlh7rnmoRmcmFtZeW9k+S9nOe7k+aenFxyXG4vL+WNlee6r+eahOagueaNrua/gOWKseWkp+Wwj+WinuWKoOe7k+aenO+8jOS8mOWMlue7k+aenCDkuZ/lsLHmmK/mioroh6rlt7HnmoTnu5Pmnpzlkozlrp7pmYXnu5Pmnpwg5q+U5Lu3XHJcbi8v5bm25LiUw5foh6rlt7HovpPlh7rnmoTluKdcclxuLy/mnIDnu4jlvpfliLDkuIDkuKrlj6/ku6XmqKHmi59iMnMz6KeE5YiZ55qE5Y2356ev572R57ucIHJublxyXG4vL+i/memHjOaYr+mAmui/h+S4iuS4gOW4p+i+k+WHuuS4i+S4gOW4p+eahOiDveWKm1xyXG4vL+iuoeeul+a/gOWKseeahOaXtuWAmeiCr+WumuaYr+S6jOWAvOWMluWGjeiuoeeul+eahO+8jOWQpuWImeWwseWSjOebtOaOpeiuoeeul2xvc3Mg5rKh5ZWl5Yy65Yir5LqGXHJcbi8v5oiW6ICF55u05o6l6K6h566XbG9zcyDlj6rmmK/ovpPlh7rnmoTml7blgJnkuozlgLzljJZcclxuY29uc3Qgb3B0ID0gdGYudHJhaW4ucm1zcHJvcCgwLjAxKTtcclxuXHJcbmZ1bmN0aW9uIGluaXRMYXllcihyc2l6ZSA9IDgpIHtcclxuICBhbGVydChcIuWIneWni+WMluelnue7j+e9kee7nFwiKTtcclxuICBsZXQgbGF5ZXJzID0gdGYuc2VxdWVudGlhbCh7XHJcbiAgICBsYXllcnM6IFtcclxuICAgICAgdGYubGF5ZXJzLmNvbnYyZCh7XHJcbiAgICAgICAgaW5wdXRTaGFwZTogWzEwMjQgLyByc2l6ZSwgMTAyNCAvIHJzaXplLCAxXSxcclxuICAgICAgICBrZXJuZWxTaXplOiAzLFxyXG4gICAgICAgIGZpbHRlcnM6IDQwLFxyXG4gICAgICAgIGFjdGl2YXRpb246IFwicmVsdVwiLFxyXG4gICAgICB9KSxcclxuICAgICAgdGYubGF5ZXJzLmNvbnYyZFRyYW5zcG9zZSh7XHJcbiAgICAgICAga2VybmVsU2l6ZTogMyxcclxuICAgICAgICBmaWx0ZXJzOiAxMCxcclxuICAgICAgICBhY3RpdmF0aW9uOiBcInRhbmhcIixcclxuICAgICAgfSksXHJcbiAgICAgIHRmLmxheWVycy5jb252MmQoeyBrZXJuZWxTaXplOiAzLCBmaWx0ZXJzOiAyMCwgYWN0aXZhdGlvbjogXCJ0YW5oXCIgfSksXHJcbiAgICAgIHRmLmxheWVycy5jb252MmRUcmFuc3Bvc2UoeyBrZXJuZWxTaXplOiAzLCBmaWx0ZXJzOiAxIH0pLFxyXG4gICAgXSxcclxuICB9KTtcclxuICBsYXllcnMuY29tcGlsZSh7XHJcbiAgICBvcHRpbWl6ZXI6IFwicm1zcHJvcFwiLFxyXG4gICAgbG9zczogdGYubG9zc2VzLnNpZ21vaWRDcm9zc0VudHJvcHksXHJcbiAgICBtZXRyaWNzOiBbXCJhY2N1cmFjeVwiXSxcclxuICB9KTtcclxuICByZXR1cm4gbGF5ZXJzO1xyXG59XHJcblxyXG5sZXQgeHMgPSBbXSxcclxuICB5cyA9IFtdO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYWluTG9nKHRzOiB0Zi5UZW5zb3IyRCwgcmV0OiB0Zi5UZW5zb3IyRCkge1xyXG4gIC8vIGNvbnNvbGUubG9nKFwi6K6w5b2V5qC35pysXCIpXHJcbiAgLy/ovpPlhaXnmoTmmK/kuIrkuIDluKflkozkuIvkuIDluKdcclxuICAvL25ldOeahOWKn+iDveaYr+S7juS4iuS4gOW4p+W+l+WIsOS4i+S4gOW4p1xyXG4gIHhzLnB1c2godGYudGlkeSgoKSA9PiB0cy5jbG9uZSgpLmV4cGFuZERpbXMoMikpKTtcclxuICB5cy5wdXNoKHRmLnRpZHkoKCkgPT4gcmV0LmNsb25lKCkuZXhwYW5kRGltcygyKSkpO1xyXG4gIC8vIGNvbnNvbGUubG9nKHhzWzBdKVxyXG59XHJcblxyXG5sZXQgbGF5ZXJzO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRyYWluKHJzaXplKSB7XHJcbiAgY29uc29sZS5sb2coXCLlvIDlp4vorq3nu4NcIik7XHJcbiAgbGF5ZXJzID0gaW5pdExheWVyKHJzaXplKTtcclxuICBsYXllcnMuc3VtbWFyeSgpO1xyXG4gIC8vIGxldCBuc3RhcnQ9eHNbMF0uY2xvbmUoKSBhcyB0Zi5UZW5zb3IzRDtcclxuICBjb25zb2xlLmxvZyhg5qC35pys5pWwOiR7eHMubGVuZ3RofWApO1xyXG4gIGxldCB4ID0gdGYuc3RhY2soeHMsIDApO1xyXG4gIHhzLmZvckVhY2goKHYpID0+IHYuZGlzcG9zZSgpKTtcclxuICBsZXQgeSA9IHRmLnN0YWNrKHlzLCAwKTtcclxuICB5cy5mb3JFYWNoKCh2KSA9PiB2LmRpc3Bvc2UoKSk7XHJcbiAgbGV0IGluZm8gPSBhd2FpdCBsYXllcnMuZml0KHgsIHksIHtcclxuICAgIGVwb2NoczogNSxcclxuICAgIGNhbGxiYWNrczoge1xyXG4gICAgICBvbkJhdGNoRW5kKGJhdGNoLCBsb2dzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYGJhdGNoOiR7YmF0Y2h9IC0+ICR7bG9nc31gKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbiAgY29uc29sZS5sb2coaW5mby5oaXN0b3J5LmFjYyk7XHJcbiAgeC5kaXNwb3NlKCk7XHJcbiAgeS5kaXNwb3NlKCk7XHJcbiAgeHMgPSBbXTtcclxuICB5cyA9IFtdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXNlTGF5ZXJzKG5zdGFydDogdGYuVGVuc29yMkQpOiB0Zi5UZW5zb3IyRCB7XHJcbiAgLy/mmL7npLrnpZ7nu4/nvZHnu5zmvJTljJYg5LuO56ys5LiA5bin5byA5aeLXHJcbiAgbGV0IHJldCA9IHRmLnRpZHkoKCkgPT4ge1xyXG4gICAgbGV0IHQgPSBsYXllcnMucHJlZGljdChuc3RhcnQuZXhwYW5kRGltcygyKS5leHBhbmREaW1zKDApKSBhcyB0Zi5UZW5zb3I0RDtcclxuICAgIHQgPSB0LnNpZ21vaWQoKTtcclxuICAgIGxldCB0dCA9IHQuc3F1ZWV6ZShbMCwgM10pIGFzIHRmLlRlbnNvcjJEO1xyXG4gICAgLy/kuozlgLzljJZcclxuICAgIGxldCBiaSA9IHRmLmdyZWF0ZXJFcXVhbCh0dCwgMC41KTtcclxuICAgIHJldHVybiBiaTtcclxuICB9KTtcclxuICByZXR1cm4gcmV0IGFzIHRmLlRlbnNvcjJEO1xyXG59XHJcbiIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyIsIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=
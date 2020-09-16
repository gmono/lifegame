webpackHotUpdate("commons~main",{

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

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvRHJhdy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNIQUFzQztBQUN0Qyx1RkFBa0U7QUFDbEUsTUFBYSxJQUFJO0lBUWIsWUFBbUIsR0FBc0IsRUFBUyxFQUFVLEVBQVMsRUFBVTtRQUE1RCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFTLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFRO1FBQzNFLG1CQUFtQjtRQUNuQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsUUFBUTtRQUNSLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNwQixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLE9BQU87UUFDUCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsRUFBRTtRQUVGLElBQUksQ0FBQyxTQUFTLEdBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFDLEVBQUUsQ0FBQyxNQUFN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R0FBQyxDQUFDLEdBQUU7UUFDdEIsSUFBRyxDQUFDLENBQUMsT0FBTyxLQUFHLENBQUMsRUFBQztZQUNiLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBQyxHQUFFLEVBQUU7UUFDbEIsRUFBRSxHQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1AsSUFBRyxFQUFFO1lBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUMsS0FBSyxDQUFDOztZQUNuQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBQyxFQUFFLENBQUM7SUFDdkMsQ0FBQztBQUdMLENBQUM7QUFDRCxNQUFNLENBQUMsTUFBTSxHQUFDLElBQUksQ0FBQztBQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRTFCLE1BQU0sR0FBRyxHQUFHLE1BQWMsQ0FBQztBQUMzQixJQUFHLEdBQUcsQ0FBQyxHQUFHO0lBQ1IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDcEIsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUUsRUFBRTtJQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyIsImZpbGUiOiJob3QvaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHRmIGZyb20gXCJAdGVuc29yZmxvdy90ZmpzXCJcclxuaW1wb3J0IHsgcmV2ZXJzZUJvb2wsIGVxdWFsTWFwLCBleHBhbmRUbzREIH0gZnJvbSAnLi9tYXRyaXhfdG9vbCc7XHJcbmV4cG9ydCBjbGFzcyBEcmF3IHtcclxuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgdGN0eDogT2Zmc2NyZWVuQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gICAgb2ZmOiBPZmZzY3JlZW5DYW52YXM7XHJcbiAgICBoOiBudW1iZXI7XHJcbiAgICB3OiBudW1iZXI7XHJcbiAgICAvL3BpeGVkc2l6ZVxyXG4gICAgcGl4ZWxzaXplOltudW1iZXIsbnVtYmVyXTtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGU6IEhUTUxDYW52YXNFbGVtZW50LCBwdWJsaWMgcnM6IG51bWJlciwgcHVibGljIGNzOiBudW1iZXIpIHtcclxuICAgICAgICAvL+i/memHjOW+l+WIsDJkIOS4iuS4i+aWhyDorqHnrpfmoLzlrZDlpKflsI9cclxuICAgICAgICBsZXQgY3R4ID0gZWxlLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICB0aGlzLmN0eCA9IGN0eDtcclxuICAgICAgICAvL+iuoeeul+agvOWtkOWkp+Wwj1xyXG4gICAgICAgIHRoaXMuaCA9IGVsZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy53ID0gZWxlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuY2ggPSB0aGlzLmggLyBycztcclxuICAgICAgICB0aGlzLmN3ID0gdGhpcy53IC8gY3M7XHJcbiAgICAgICAgLy9jYWNoZVxyXG4gICAgICAgIHRoaXMub2ZmID0gbmV3IE9mZnNjcmVlbkNhbnZhcyh0aGlzLncsIHRoaXMuaCk7XHJcbiAgICAgICAgdGhpcy50Y3R4ID0gdGhpcy5vZmYuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5waXhlbHNpemU9W3RoaXMuY2gsdGhpcy5jd107XHJcbiAgICAgICAgdGhpcy51cHNhbXBsZT10Zi5sYXllcnMudXBTYW1wbGluZzJkKHtzaXplOnRoaXMucGl4ZWxzaXplfSk7XHJcbiAgICB9XHJcbiAgICBjaDogbnVtYmVyO1xyXG4gICAgY3c6IG51bWJlcjtcclxuICAgIHB1YmxpYyBkcmF3UG9pbnQoeCwgeSwgYzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJ4OiBudW1iZXIsIHJ5OiBudW1iZXI7XHJcbiAgICAgICAgcnggPSB4ICogdGhpcy5jdztcclxuICAgICAgICByeSA9IHkgKiB0aGlzLmNoO1xyXG4gICAgICAgIC8v57uY5Yi2ID8/P1xyXG4gICAgICAgIHRoaXMudGN0eC5maWxsU3R5bGUgPSBjO1xyXG4gICAgICAgIHRoaXMudGN0eC5maWxsUmVjdChyeCwgcnksIHRoaXMuY3csIHRoaXMuY2gpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnlKjkuo7nu5jliLYwMeefqemYtSDnlKjmn5DkuKrpopzoibLooajnpLoxXHJcbiAgICAgKiDov5jpnIDopoHnu5jliLbkuI3lkIzlm77lsYLnmoTmlrnlvI8g5aaC55So5p+Q5Lqb5Y+m5LiA5Lqb6aKc6Imy6KGo56S65Y+m5LiA5Lqb5Lic6KW/IOeEtuWQjuWPoOWKoFxyXG4gICAgICog6L+Y6ZyA6KaB5Y+v5Lul57uY5Yi25a6e5pWw55+p6Zi155qE5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdHMgMDHnn6npmLVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIGRyYXcyRCh0czogdGYuVGVuc29yMkQpIHtcclxuICAgICAgICB0aGlzLnRjdHguY2xlYXJSZWN0KDAsMCx0aGlzLncsdGhpcy5oKTtcclxuICAgICAgICAvLyB0aGlzLnRjdHguZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XHJcbiAgICAgICAgLy8gdGhpcy50Y3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMudywgdGhpcy5oKTtcclxuICAgICAgICAvL+azlTFcclxuICAgICAgICBsZXQgcmdibWF0PWF3YWl0IHRoaXMudG9yZ2IodHMpOyAgLy8wIGZmZmZmZmZmIDEgMDAwMDAwMDBcclxuXHJcblxyXG4gICAgICAgIGxldCBpbWc9dGhpcy50Y3R4LnB1dEltYWdlRGF0YShyZ2JtYXQsMCwwKTtcclxuICAgICAgICAvL+azlTJcclxuICAgICAgICAvLyBsZXQgYXJyID0gYXdhaXQgdHMuZGF0YSgpO1xyXG4gICAgICAgIC8vIGFyci5mb3JFYWNoKCh2LCBpKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIC8v57uY5Yi2IDDntKLlvJXlr7nlupTliJdcclxuICAgICAgICAvLyAgICAgbGV0IGEgPSBbLCBcIiNmZjAwMDBcIl07XHJcbiAgICAgICAgLy8gICAgIGlmICh2ID09IDEpXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmRyYXdQb2ludChpJXRzLnNoYXBlWzBdLE1hdGguZmxvb3IoaS90cy5zaGFwZVswXSksIGFbMV0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8vIHRoaXMudGN0eC5maWxsKCk7XHJcbiAgICAgICAgLy/nu5jliLbliLDnlLvluINcclxuICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwwLHRoaXMudyx0aGlzLmgpO1xyXG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLm9mZiwgMCwgMCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwc2FtcGxlOiB0Zi5sYXllcnMuTGF5ZXI7XHJcbiAgICBhc3luYyB0b3JnYih0OnRmLlRlbnNvcjJEKXtcclxuICAgICAgICBcclxuICAgICAgICAvL+aoque6teaJqeWxlTTlgI0g5ouJ5Ly4XHJcbiAgICAgICAgLy8gZnVuY3Rpb24gaG9yZXhwYW5kKHQ6dGYuVGVuc29yMkQsdj00KTp0Zi5UZW5zb3IyRHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIHQuZXhwYW5kRGltcygyKS50aWxlKFsxLDEsdl0pLnJlc2hhcGUoW3Quc2hhcGVbMF0sdC5zaGFwZVsxXSp2XSlcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZnVuY3Rpb24gdm9yZXhwYW5kKHQ6dGYuVGVuc29yMkQsdj00KTp0Zi5UZW5zb3IyRHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGhvcmV4cGFuZCh0LnRyYW5zcG9zZSgpLHYpLnRyYW5zcG9zZSgpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgbGV0IG51bT10Zi50aWR5KCgpPT57XHJcbiAgICAgICAgICAgIC8vaW50MzIg54S25ZCOw5fkuIDkuKrpopzoibJcclxuICAgICAgICAgICAgbGV0IGNvbG9yZWQ9dC5tdWwoMHhmZjAwMDBmZnwwKSBhcyB0eXBlb2YgdDtcclxuICAgICAgICAgICAgLy8gbGV0IHJlc2l6ZWQ9dm9yZXhwYW5kKGhvcmV4cGFuZChjb2xvcmVkKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcj10aGlzLnBpeGVsc2l6ZVswXT09dGhpcy5waXhlbHNpemVbMF0mJnRoaXMucGl4ZWxzaXplWzBdPT0xPyBleHBhbmRUbzREKGNvbG9yZWQpOnRoaXMudXBzYW1wbGUuY2FsbChleHBhbmRUbzREKGNvbG9yZWQpLHt9KSBhcyB0Zi5UZW5zb3I0RDtcclxuICAgICAgICAgICAgbGV0IHJlc2l6ZWQ9ci5zcXVlZXplKFswLDNdKSBhcyB0Zi5UZW5zb3IyRDtcclxuICAgICAgICAgICAgLy/ov5vooYxyZ2Jh6K+dIOaoquWQkeaJqeWxlTTlgI1cclxuICAgICAgICAgICAgLy8gbGV0IHJnYj1ob3JleHBhbmQocmVzaXplZCw0KTtcclxuICAgICAgICAgICAgLy/popzoibLlpITnkIYg5oqKMSAxIDEgMeeahOi/nue7rTTkuKog5Y+Y5Li6IGFhYWFhYWFhXHJcbiAgICAgICAgICAgIC8vIGxldCBjb3I9cmdiLm11bCgweGFhKTtcclxuICAgICAgICAgICAgbGV0IG51bT1yZXNpemVkLmFzVHlwZShcImludDMyXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vbnVt6L2s5o2i5Li6dWludDhcclxuICAgICAgICBsZXQgYXI9YXdhaXQgbnVtLmRhdGEoKTtcclxuICAgICAgICBsZXQgcGl4ZWRzPW5ldyBVaW50OENsYW1wZWRBcnJheShhci5idWZmZXIpO1xyXG4gICAgICAgIG51bS5kaXNwb3NlKCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJbWFnZURhdGEocGl4ZWRzLG51bS5zaGFwZVsxXSxudW0uc2hhcGVbMF0pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+aKijAx55+p6Zi16L2s5o2i5Li65YOP57Sg55+p6Zi1XHJcbmNvbnN0IHNpemU9WzQsNF1cclxuIiwiaW1wb3J0ICogYXMgdGYgZnJvbSBcIkB0ZW5zb3JmbG93L3RmanNcIlxyXG5pbXBvcnQgeyBkZWxheSwgaW50LCBmbG9hdCB9IGZyb20gJy4uL2xpYnMvbGliJztcclxuaW1wb3J0IHsgRHJhdyB9IGZyb20gXCIuL0RyYXdcIjtcclxuaW1wb3J0IHsgbWF0cml4X3J1bGUsIFJ1bGV9IGZyb20gJy4vcnVsZXMvbWF0cml4X3J1bGVzJztcclxuXHJcbmZ1bmN0aW9uIGdldHZhbChpZDpzdHJpbmcpe1xyXG4gICAgbGV0IGU9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0IyR7aWR9YCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHJldHVybiBlLnZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIGdldDxSIGV4dGVuZHMga2V5b2YgdGFibGU+KGlkOnN0cmluZyx0YWc6Uj1udWxsKTp0YWJsZVtSXXtcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKSBhcyB0YWJsZVtSXTtcclxufVxyXG5sZXQgYT1nZXQoXCJoZWxsb1wiKVxyXG5cclxudHlwZSB0YWJsZT17XHJcbiAgICBvcHRpb246SFRNTE9wdGlvbkVsZW1lbnQsXHJcbiAgICBkaXY6SFRNTERpdkVsZW1lbnQsXHJcbiAgICBpbnB1dDpIVE1MSW5wdXRFbGVtZW50LFxyXG4gICAgXCIqXCI6SFRNTEVsZW1lbnQsXHJcbiAgICBzZWxlY3Q6SFRNTFNlbGVjdEVsZW1lbnRcclxufVxyXG5mdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIGtleW9mIHRhYmxlLFIgZXh0ZW5kcyBrZXlvZiB0YWJsZVtUXT4odGFnOiBULGlkOnN0cmluZyx2YWx1ZXM6b2JqZWN0KTp0YWJsZVtUXXtcclxuICAgIGxldCB0PSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZylcclxuICAgIHQuaWQ9aWQ7XHJcbiAgICAvL1xyXG4gICAgZm9yKGxldCBrIGluIHZhbHVlcyl7XHJcbiAgICAgICAgaWYoayBpbiB0ID09IGZhbHNlKSBjb250aW51ZTtcclxuICAgICAgICB0W2tdPXZhbHVlc1trXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0IGFzIHVua25vd24gYXMgdGFibGVbVF07XHJcbn1cclxuXHJcbi8vIGxldCBydWxlcz17XHJcbi8vICAgICBiM3MyMyxcclxuLy8gICAgIGIxczEyLFxyXG4vLyAgICAgYjM2NzhzMzQ2NzgsXHJcbi8vICAgICBiMzZzMjMsXHJcbi8vICAgICBiMzU2NzhzNTY3OFxyXG4vLyB9XHJcbmltcG9ydCB7UnVsZXMgYXMgcnVsZXN9IGZyb20gXCIuL3J1bGVzL21hdHJpeF9ydWxlc1wiXHJcbmZ1bmN0aW9uIGluaXRTZWxlY3Rpb24oKVxyXG57XHJcbiAgICBmb3IobGV0IGsgaW4gcnVsZXMpe1xyXG4gICAgICAgIGdldChcInJ1bGVcIikuYXBwZW5kQ2hpbGQoY3JlYXRlKFwib3B0aW9uXCIsayx7aW5uZXJUZXh0OmssdmFsdWU6a30pKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfcGFyYW0ocGFyYW06c3RyaW5nKXtcclxuICAgIHZhciBxdWVyeSA9IGxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkuc3BsaXQoJyYnKTtcclxuICAgIGZvcih2YXIgaT0wO2k8cXVlcnkubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgdmFyIGt2ID0gcXVlcnlbaV0uc3BsaXQoJz0nKTtcclxuICAgICAgICBpZihrdlswXSA9PSBwYXJhbSl7XHJcbiAgICAgICAgICAgIHJldHVybiBrdlsxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbWFpbigpe1xyXG4gICAgaW5pdFNlbGVjdGlvbigpO1xyXG5cclxuICAgIGxldCBlbGU9Z2V0KFwiY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgbGV0IGhzaXplPVsxMDI0LDEwMjRdXHJcbiAgICBlbGUuaGVpZ2h0PWhzaXplWzBdO1xyXG4gICAgZWxlLndpZHRoPWhzaXplWzFdO1xyXG4gICAgZWxlLmlkPVwiY3R4XCJcclxuICAgIGNvbnN0IHJzaXplPWdldF9wYXJhbShcInJzaXplXCIpPT1udWxsPyAwLjI1OmZsb2F0KGdldF9wYXJhbShcInJzaXplXCIpKVxyXG4gICAgbGV0IHNpemU9W2hzaXplWzBdL3JzaXplLGhzaXplWzFdL3JzaXplXVxyXG4gICAgbGV0IGQ9bmV3IERyYXcoZWxlLHNpemVbMF0sc2l6ZVsxXSk7XHJcblxyXG4gICAgbGV0IGluaXQ9KCk9PnRmLnJhbmRvbVVuaWZvcm0oc2l6ZSwwLDEsXCJmbG9hdDMyXCIpLmRpdihmbG9hdChnZXR2YWwoXCJyZWxcIikpKS5mbG9vcigpLmVxdWFsKDApLmFzVHlwZShcImludDMyXCIpIGFzIHRmLlRlbnNvcjJEXHJcbiAgICBsZXQgZHQ9aW5pdCgpO1xyXG4gICAgLy/ovpPlh7pcclxuICAgIGdldChcImluZm9cIikuaW5uZXJUZXh0PWAke2R0LnNoYXBlWzBdfXgke2R0LnNoYXBlWzFdfSAoaCp3KSBgXHJcbiAgICBnZXQoXCJjaW5mb1wiKS5pbm5lclRleHQ9YCR7aHNpemVbMF19eCR7aHNpemVbMV19IChoKncpYFxyXG5cclxuICAgIGQuZHJhdzJEKGR0KTtcclxuICAgIGNvbnNvbGUubG9nKGR0KTtcclxuICAgIGxldCBwPXRydWU7XHJcbiAgICBsZXQgc2w9ZmFsc2U7XHJcbiAgICBsZXQgbj0wO1xyXG4gICAgLy9sb29wXHJcbiAgICBhc3luYyBmdW5jdGlvbiBsb29wKCl7XHJcbiAgICAgICAgLy/ovpPlh7rlpKflsI9cclxuICAgICAgICBsZXQgZGVsYXl0PWludChnZXR2YWwoXCJkZWxheVwiKSk7XHJcbiAgICAgICAgLy/ojrflj5bop4TliJlcclxuICAgICAgICBsZXQgcnVsZWlkPWdldChcInJ1bGVcIixcInNlbGVjdFwiKS5zZWxlY3RlZE9wdGlvbnNbMF0udmFsdWU7XHJcbiAgICAgICAgbGV0IHJ1bGU9cnVsZXNbcnVsZWlkXSBhcyBSdWxlO1xyXG4gICAgICAgIGZvcig7Oyl7XHJcbiAgICAgICAgICAgIGF3YWl0IGRlbGF5KGRlbGF5dCk7XHJcbiAgICAgICAgICAgIGxldCBvbGQ9ZHQ7XHJcbiAgICAgICAgICAgIGR0PW1hdHJpeF9ydWxlKG9sZCxydWxlKTtcclxuICAgICAgICAgICAgb2xkLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGR0KTtcclxuICAgICAgICAgICAgLy/pnZ7pnZnpu5hcclxuICAgICAgICAgICAgaWYoIXNsKVxyXG4gICAgICAgICAgICAgICAgYXdhaXQgZC5kcmF3MkQoZHQpO1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICBpZihwKSBicmVhaztcclxuICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICAvL+aYvuekuui9rlxyXG4gICAgICAgICAgICBnZXQoXCJuXCIpLmlubmVyVGV4dD1uLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgIC8vZXZlbnRcclxuICAgIGdldChcInN0YXJ0XCIpLm9uY2xpY2s9YXN5bmMoKT0+e1xyXG4gICAgICAgIGlmKHApe1xyXG4gICAgICAgICAgICBwPWZhbHNlO1xyXG4gICAgICAgICAgICBsb29wKCk7XHJcbiAgICAgICAgICAgIGdldChcInN0YXJ0XCIpLnN0eWxlLmJhY2tncm91bmQ9XCJyZWRcIlxyXG4gICAgICAgICAgICBnZXQoXCJzdGFydFwiKS5pbm5lclRleHQ9XCLmmoLlgZxcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcD10cnVlO1xyXG4gICAgICAgICAgICBnZXQoXCJzdGFydFwiKS5zdHlsZS5iYWNrZ3JvdW5kPVwiXCJcclxuICAgICAgICAgICAgZ2V0KFwic3RhcnRcIikuaW5uZXJUZXh0PVwi5ZCv5YqoXCI7XHJcbiAgICAgICAgICAgIGQuZHJhdzJEKGR0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9O1xyXG4gICAgXHJcblxyXG4gICAgZ2V0KFwicmVzZXRcIikub25jbGljaz1hc3luYygpPT57XHJcbiAgICAgICAgZHQ9aW5pdCgpO1xyXG4gICAgICAgIGQuZHJhdzJEKGR0KTtcclxuICAgICAgICBuPTA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hhbmdlcG9pbnQoeCx5KXtcclxuICAgICAgICBpZih4PDB8fHk8MCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBkYXRhPWR0LmFycmF5U3luYygpO1xyXG4gICAgICAgIGxldCB0eCx0eTtcclxuICAgICAgICB0eD1NYXRoLmZsb29yKHgvZC5jdyk7XHJcbiAgICAgICAgdHk9TWF0aC5mbG9vcih5L2QuY2gpXHJcbiAgICAgICAgZGF0YVt0eV1bdHhdPWRhdGFbdHldW3R4XT09MD8gMTowO1xyXG4gICAgICAgIGR0LmRpc3Bvc2UoKTtcclxuICAgICAgICBkdD10Zi50ZW5zb3IoZGF0YSk7XHJcbiAgICAgICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0cG9pbnQoeCx5LHY9MSl7XHJcbiAgICAgICAgaWYoeDwwfHx5PDApIHJldHVybjtcclxuICAgICAgICBsZXQgZGF0YT1kdC5hcnJheVN5bmMoKTtcclxuICAgICAgICBsZXQgdHgsdHk7XHJcbiAgICAgICAgdHg9TWF0aC5mbG9vcih4L2QuY3cpO1xyXG4gICAgICAgIHR5PU1hdGguZmxvb3IoeS9kLmNoKVxyXG4gICAgICAgIGRhdGFbdHldW3R4XT0xO1xyXG4gICAgICAgIGR0LmRpc3Bvc2UoKTtcclxuICAgICAgICBkdD10Zi50ZW5zb3IoZGF0YSk7XHJcbiAgICAgICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgfVxyXG4gICAgZ2V0KFwiY3R4XCIpLm9uY2xpY2s9ZT0+e1xyXG4gICAgICAgIGlmKGUuYnV0dG9uPT0wKVxyXG4gICAgICAgICAgICBjaGFuZ2Vwb2ludChlLm9mZnNldFgsZS5vZmZzZXRZKTtcclxuICAgIH1cclxuICAgIGdldChcImN0eFwiKS5vbm1vdXNlbW92ZT1lPT57XHJcbiAgICAgICAgaWYoZS5idXR0b25zPT09MSl7XHJcbiAgICAgICAgICAgIHNldHBvaW50KGUub2Zmc2V0WCxlLm9mZnNldFksMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0KFwic2xcIikub25jbGljaz0oKT0+e1xyXG4gICAgICAgIHNsPSFzbDtcclxuICAgICAgICBpZihzbCkgZ2V0KFwic2xcIikuc3R5bGUuYmFja2dyb3VuZD1cInJlZFwiO1xyXG4gICAgICAgIGVsc2UgZ2V0KFwic2xcIikuc3R5bGUuYmFja2dyb3VuZD1cIlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufVxyXG53aW5kb3cub25sb2FkPW1haW47XHJcbmNvbnNvbGUubG9nKFwiaGVsbG93b3JsZFwiKTtcclxuXHJcbmNvbnN0IG1vZD0gKG1vZHVsZSBhcyBhbnkpO1xyXG5pZihtb2QuaG90KVxyXG4gIG1vZC5ob3QuYWNjZXB0KCk7XHJcbmNvbnNvbGUubG9nKG1vZC5ob3QpXHJcbm1vZC5hZGREaXNwb3NlSGFuZGxlcigoKT0+e1xyXG4gICAgY29uc29sZS5sb2coXCJoZWxsb1wiKTtcclxufSkiXSwic291cmNlUm9vdCI6IiJ9
webpackHotUpdate("commons~main",{

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
    get("rsize", "input").value = rsize.toString();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0hBQXNDO0FBQ3RDLHNFQUFnRDtBQUNoRCxrRUFBOEI7QUFDOUIsc0dBQXdEO0FBRXhELFNBQVMsTUFBTSxDQUFDLEVBQVM7SUFDckIsSUFBSSxDQUFDLEdBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFxQixDQUFDO0lBQ2pFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNuQixDQUFDO0FBQ0QsU0FBUyxHQUFHLENBQXdCLEVBQVMsRUFBQyxNQUFNLElBQUk7SUFDcEQsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxFQUFFLENBQWEsQ0FBQztBQUN4RCxDQUFDO0FBQ0QsSUFBSSxDQUFDLEdBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQVNsQixTQUFTLE1BQU0sQ0FBaUQsR0FBTSxFQUFDLEVBQVMsRUFBQyxNQUFhO0lBQzFGLElBQUksQ0FBQyxHQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDO0lBQ1IsRUFBRTtJQUNGLEtBQUksSUFBSSxDQUFDLElBQUksTUFBTSxFQUFDO1FBQ2hCLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLO1lBQUUsU0FBUztRQUM3QixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xCO0lBQ0QsT0FBTyxDQUF3QixDQUFDO0FBQ3BDLENBQUM7QUFFRCxjQUFjO0FBQ2QsYUFBYTtBQUNiLGFBQWE7QUFDYixtQkFBbUI7QUFDbkIsY0FBYztBQUNkLGtCQUFrQjtBQUNsQixJQUFJO0FBQ0osc0dBQW1EO0FBQ25ELFNBQVMsYUFBYTtJQUVsQixLQUFJLElBQUksQ0FBQyxJQUFJLG9CQUFLLEVBQUM7UUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztLQUNwRTtBQUNMLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxLQUFZO0lBQzNCLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwRCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztRQUMzQixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBQztZQUNkLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO0tBQ0o7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQsS0FBSyxVQUFVLElBQUk7SUFDZixhQUFhLEVBQUUsQ0FBQztJQUVoQixJQUFJLEdBQUcsR0FBQyxHQUFHLENBQUMsUUFBUSxDQUFzQixDQUFDO0lBQzNDLElBQUksS0FBSyxHQUFDLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQztJQUNyQixHQUFHLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixHQUFHLENBQUMsS0FBSyxHQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixHQUFHLENBQUMsRUFBRSxHQUFDLEtBQUs7SUFDWixNQUFNLEtBQUssR0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUUsSUFBSSxFQUFDLENBQUMsSUFBSSxFQUFDLFlBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEUsR0FBRyxDQUFDLE9BQU8sRUFBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVDLElBQUksSUFBSSxHQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFDO0lBQ3hDLElBQUksQ0FBQyxHQUFDLElBQUksV0FBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEMsSUFBSSxJQUFJLEdBQUMsR0FBRSxFQUFFLEdBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFnQjtJQUMzSCxJQUFJLEVBQUUsR0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLElBQUk7SUFDSixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxHQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQzVELEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEdBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRO0lBRXRELENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hCLElBQUksQ0FBQyxHQUFDLElBQUksQ0FBQztJQUNYLElBQUksRUFBRSxHQUFDLEtBQUssQ0FBQztJQUNiLElBQUksQ0FB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TyxHQUFDLEdBQUUsRUFBRTtRQUNsQixFQUFFLEdBQUMsQ0FBQyxFQUFFLENBQUM7UUFDUCxJQUFHLEVBQUU7WUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBQyxLQUFLLENBQUM7O1lBQ25DLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFDLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0FBR0wsQ0FBQztBQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDO0FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFMUIsTUFBTSxHQUFHLEdBQUcsTUFBYyxDQUFDO0FBQzNCLElBQUcsR0FBRyxDQUFDLEdBQUc7SUFDUixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUNwQixHQUFHLENBQUMsaUJBQWlCLENBQUMsR0FBRSxFQUFFO0lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDIiwiZmlsZSI6ImhvdC9ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdGYgZnJvbSBcIkB0ZW5zb3JmbG93L3RmanNcIlxyXG5pbXBvcnQgeyBkZWxheSwgaW50LCBmbG9hdCB9IGZyb20gJy4uL2xpYnMvbGliJztcclxuaW1wb3J0IHsgRHJhdyB9IGZyb20gXCIuL0RyYXdcIjtcclxuaW1wb3J0IHsgbWF0cml4X3J1bGUsIFJ1bGV9IGZyb20gJy4vcnVsZXMvbWF0cml4X3J1bGVzJztcclxuXHJcbmZ1bmN0aW9uIGdldHZhbChpZDpzdHJpbmcpe1xyXG4gICAgbGV0IGU9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGlucHV0IyR7aWR9YCkgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHJldHVybiBlLnZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIGdldDxSIGV4dGVuZHMga2V5b2YgdGFibGU+KGlkOnN0cmluZyx0YWc6Uj1udWxsKTp0YWJsZVtSXXtcclxuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtpZH1gKSBhcyB0YWJsZVtSXTtcclxufVxyXG5sZXQgYT1nZXQoXCJoZWxsb1wiKVxyXG5cclxudHlwZSB0YWJsZT17XHJcbiAgICBvcHRpb246SFRNTE9wdGlvbkVsZW1lbnQsXHJcbiAgICBkaXY6SFRNTERpdkVsZW1lbnQsXHJcbiAgICBpbnB1dDpIVE1MSW5wdXRFbGVtZW50LFxyXG4gICAgXCIqXCI6SFRNTEVsZW1lbnQsXHJcbiAgICBzZWxlY3Q6SFRNTFNlbGVjdEVsZW1lbnRcclxufVxyXG5mdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIGtleW9mIHRhYmxlLFIgZXh0ZW5kcyBrZXlvZiB0YWJsZVtUXT4odGFnOiBULGlkOnN0cmluZyx2YWx1ZXM6b2JqZWN0KTp0YWJsZVtUXXtcclxuICAgIGxldCB0PSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZylcclxuICAgIHQuaWQ9aWQ7XHJcbiAgICAvL1xyXG4gICAgZm9yKGxldCBrIGluIHZhbHVlcyl7XHJcbiAgICAgICAgaWYoayBpbiB0ID09IGZhbHNlKSBjb250aW51ZTtcclxuICAgICAgICB0W2tdPXZhbHVlc1trXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0IGFzIHVua25vd24gYXMgdGFibGVbVF07XHJcbn1cclxuXHJcbi8vIGxldCBydWxlcz17XHJcbi8vICAgICBiM3MyMyxcclxuLy8gICAgIGIxczEyLFxyXG4vLyAgICAgYjM2NzhzMzQ2NzgsXHJcbi8vICAgICBiMzZzMjMsXHJcbi8vICAgICBiMzU2NzhzNTY3OFxyXG4vLyB9XHJcbmltcG9ydCB7UnVsZXMgYXMgcnVsZXN9IGZyb20gXCIuL3J1bGVzL21hdHJpeF9ydWxlc1wiXHJcbmZ1bmN0aW9uIGluaXRTZWxlY3Rpb24oKVxyXG57XHJcbiAgICBmb3IobGV0IGsgaW4gcnVsZXMpe1xyXG4gICAgICAgIGdldChcInJ1bGVcIikuYXBwZW5kQ2hpbGQoY3JlYXRlKFwib3B0aW9uXCIsayx7aW5uZXJUZXh0OmssdmFsdWU6a30pKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfcGFyYW0ocGFyYW06c3RyaW5nKXtcclxuICAgIHZhciBxdWVyeSA9IGxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkuc3BsaXQoJyYnKTtcclxuICAgIGZvcih2YXIgaT0wO2k8cXVlcnkubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgdmFyIGt2ID0gcXVlcnlbaV0uc3BsaXQoJz0nKTtcclxuICAgICAgICBpZihrdlswXSA9PSBwYXJhbSl7XHJcbiAgICAgICAgICAgIHJldHVybiBrdlsxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbWFpbigpe1xyXG4gICAgaW5pdFNlbGVjdGlvbigpO1xyXG5cclxuICAgIGxldCBlbGU9Z2V0KFwiY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgbGV0IGhzaXplPVsxMDI0LDEwMjRdXHJcbiAgICBlbGUuaGVpZ2h0PWhzaXplWzBdO1xyXG4gICAgZWxlLndpZHRoPWhzaXplWzFdO1xyXG4gICAgZWxlLmlkPVwiY3R4XCJcclxuICAgIGNvbnN0IHJzaXplPWdldF9wYXJhbShcInJzaXplXCIpPT1udWxsPyAwLjI1OmZsb2F0KGdldF9wYXJhbShcInJzaXplXCIpKVxyXG4gICAgZ2V0KFwicnNpemVcIixcImlucHV0XCIpLnZhbHVlPXJzaXplLnRvU3RyaW5nKCk7XHJcbiAgICBsZXQgc2l6ZT1baHNpemVbMF0vcnNpemUsaHNpemVbMV0vcnNpemVdXHJcbiAgICBsZXQgZD1uZXcgRHJhdyhlbGUsc2l6ZVswXSxzaXplWzFdKTtcclxuXHJcbiAgICBsZXQgaW5pdD0oKT0+dGYucmFuZG9tVW5pZm9ybShzaXplLDAsMSxcImZsb2F0MzJcIikuZGl2KGZsb2F0KGdldHZhbChcInJlbFwiKSkpLmZsb29yKCkuZXF1YWwoMCkuYXNUeXBlKFwiaW50MzJcIikgYXMgdGYuVGVuc29yMkRcclxuICAgIGxldCBkdD1pbml0KCk7XHJcbiAgICAvL+i+k+WHulxyXG4gICAgZ2V0KFwiaW5mb1wiKS5pbm5lclRleHQ9YCR7ZHQuc2hhcGVbMF19eCR7ZHQuc2hhcGVbMV19IChoKncpIGBcclxuICAgIGdldChcImNpbmZvXCIpLmlubmVyVGV4dD1gJHtoc2l6ZVswXX14JHtoc2l6ZVsxXX0gKGgqdylgXHJcblxyXG4gICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgY29uc29sZS5sb2coZHQpO1xyXG4gICAgbGV0IHA9dHJ1ZTtcclxuICAgIGxldCBzbD1mYWxzZTtcclxuICAgIGxldCBuPTA7XHJcbiAgICAvL2xvb3BcclxuICAgIGFzeW5jIGZ1bmN0aW9uIGxvb3AoKXtcclxuICAgICAgICAvL+i+k+WHuuWkp+Wwj1xyXG4gICAgICAgIGxldCBkZWxheXQ9aW50KGdldHZhbChcImRlbGF5XCIpKTtcclxuICAgICAgICAvL+iOt+WPluinhOWImVxyXG4gICAgICAgIGxldCBydWxlaWQ9Z2V0KFwicnVsZVwiLFwic2VsZWN0XCIpLnNlbGVjdGVkT3B0aW9uc1swXS52YWx1ZTtcclxuICAgICAgICBsZXQgcnVsZT1ydWxlc1tydWxlaWRdIGFzIFJ1bGU7XHJcbiAgICAgICAgZm9yKDs7KXtcclxuICAgICAgICAgICAgYXdhaXQgZGVsYXkoZGVsYXl0KTtcclxuICAgICAgICAgICAgbGV0IG9sZD1kdDtcclxuICAgICAgICAgICAgZHQ9bWF0cml4X3J1bGUob2xkLHJ1bGUpO1xyXG4gICAgICAgICAgICBvbGQuZGlzcG9zZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZHQpO1xyXG4gICAgICAgICAgICAvL+mdnumdmem7mFxyXG4gICAgICAgICAgICBpZighc2wpXHJcbiAgICAgICAgICAgICAgICBhd2FpdCBkLmRyYXcyRChkdCk7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGlmKHApIGJyZWFrO1xyXG4gICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgIC8v5pi+56S66L2uXHJcbiAgICAgICAgICAgIGdldChcIm5cIikuaW5uZXJUZXh0PW4udG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAgLy9ldmVudFxyXG4gICAgZ2V0KFwic3RhcnRcIikub25jbGljaz1hc3luYygpPT57XHJcbiAgICAgICAgaWYocCl7XHJcbiAgICAgICAgICAgIHA9ZmFsc2U7XHJcbiAgICAgICAgICAgIGxvb3AoKTtcclxuICAgICAgICAgICAgZ2V0KFwic3RhcnRcIikuc3R5bGUuYmFja2dyb3VuZD1cInJlZFwiXHJcbiAgICAgICAgICAgIGdldChcInN0YXJ0XCIpLmlubmVyVGV4dD1cIuaaguWBnFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBwPXRydWU7XHJcbiAgICAgICAgICAgIGdldChcInN0YXJ0XCIpLnN0eWxlLmJhY2tncm91bmQ9XCJcIlxyXG4gICAgICAgICAgICBnZXQoXCJzdGFydFwiKS5pbm5lclRleHQ9XCLlkK/liqhcIjtcclxuICAgICAgICAgICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH07XHJcbiAgICBcclxuXHJcbiAgICBnZXQoXCJyZXNldFwiKS5vbmNsaWNrPWFzeW5jKCk9PntcclxuICAgICAgICBkdD1pbml0KCk7XHJcbiAgICAgICAgZC5kcmF3MkQoZHQpO1xyXG4gICAgICAgIG49MDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGFuZ2Vwb2ludCh4LHkpe1xyXG4gICAgICAgIGlmKHg8MHx8eTwwKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGRhdGE9ZHQuYXJyYXlTeW5jKCk7XHJcbiAgICAgICAgbGV0IHR4LHR5O1xyXG4gICAgICAgIHR4PU1hdGguZmxvb3IoeC9kLmN3KTtcclxuICAgICAgICB0eT1NYXRoLmZsb29yKHkvZC5jaClcclxuICAgICAgICBkYXRhW3R5XVt0eF09ZGF0YVt0eV1bdHhdPT0wPyAxOjA7XHJcbiAgICAgICAgZHQuZGlzcG9zZSgpO1xyXG4gICAgICAgIGR0PXRmLnRlbnNvcihkYXRhKTtcclxuICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRwb2ludCh4LHksdj0xKXtcclxuICAgICAgICBpZih4PDB8fHk8MCkgcmV0dXJuO1xyXG4gICAgICAgIGxldCBkYXRhPWR0LmFycmF5U3luYygpO1xyXG4gICAgICAgIGxldCB0eCx0eTtcclxuICAgICAgICB0eD1NYXRoLmZsb29yKHgvZC5jdyk7XHJcbiAgICAgICAgdHk9TWF0aC5mbG9vcih5L2QuY2gpXHJcbiAgICAgICAgZGF0YVt0eV1bdHhdPTE7XHJcbiAgICAgICAgZHQuZGlzcG9zZSgpO1xyXG4gICAgICAgIGR0PXRmLnRlbnNvcihkYXRhKTtcclxuICAgICAgICBkLmRyYXcyRChkdCk7XHJcbiAgICB9XHJcbiAgICBnZXQoXCJjdHhcIikub25jbGljaz1lPT57XHJcbiAgICAgICAgaWYoZS5idXR0b249PTApXHJcbiAgICAgICAgICAgIGNoYW5nZXBvaW50KGUub2Zmc2V0WCxlLm9mZnNldFkpO1xyXG4gICAgfVxyXG4gICAgZ2V0KFwiY3R4XCIpLm9ubW91c2Vtb3ZlPWU9PntcclxuICAgICAgICBpZihlLmJ1dHRvbnM9PT0xKXtcclxuICAgICAgICAgICAgc2V0cG9pbnQoZS5vZmZzZXRYLGUub2Zmc2V0WSwxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQoXCJzbFwiKS5vbmNsaWNrPSgpPT57XHJcbiAgICAgICAgc2w9IXNsO1xyXG4gICAgICAgIGlmKHNsKSBnZXQoXCJzbFwiKS5zdHlsZS5iYWNrZ3JvdW5kPVwicmVkXCI7XHJcbiAgICAgICAgZWxzZSBnZXQoXCJzbFwiKS5zdHlsZS5iYWNrZ3JvdW5kPVwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG59XHJcbndpbmRvdy5vbmxvYWQ9bWFpbjtcclxuY29uc29sZS5sb2coXCJoZWxsb3dvcmxkXCIpO1xyXG5cclxuY29uc3QgbW9kPSAobW9kdWxlIGFzIGFueSk7XHJcbmlmKG1vZC5ob3QpXHJcbiAgbW9kLmhvdC5hY2NlcHQoKTtcclxuY29uc29sZS5sb2cobW9kLmhvdClcclxubW9kLmFkZERpc3Bvc2VIYW5kbGVyKCgpPT57XHJcbiAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpO1xyXG59KSJdLCJzb3VyY2VSb290IjoiIn0=
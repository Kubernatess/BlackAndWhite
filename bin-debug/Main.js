var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            context.onUpdate = function () {
            };
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 4:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.createGameScene = function () {
        this.removeChildren();
        for (var i = 0; i < 6; i++) {
            var rand = Math.floor(Math.random() * 4);
            for (var j = 0; j < 4; j++) {
                var rect = new Rect();
                this.addChildAt(rect, i * 4 + j);
                if (i == 5) {
                    rect.forbidden = true;
                }
                else {
                    if (j == rand) {
                        rect.forbidden = false;
                        if (i == 4) {
                            rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stampPermissive, this);
                        }
                    }
                    else {
                        rect.forbidden = true;
                        if (i == 4) {
                            rect.once(egret.TouchEvent.TOUCH_TAP, this.stampForbidden, this);
                        }
                    }
                }
                rect.active = false;
                rect.draw();
            }
        }
        this.gameOverPanel = new GameOverPanel();
        this.addChildAt(this.gameOverPanel, 100);
        this.gameOverPanel.once(egret.TouchEvent.TOUCH_TAP, this.restart, this);
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        change();
    };
    // 踩中允许区
    Main.prototype.stampPermissive = function (event) {
        // 改变当前方块颜色
        var rect = event.currentTarget;
        rect.forbidden = false;
        rect.active = true;
        rect.draw();
        // 调整颜色顺序
        for (var i = 5; i > 0; i--) {
            for (var j = 0; j < 4; j++) {
                var currentRect = this.getChildAt(i * 4 + j);
                if (i == 4 && currentRect.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
                    if (currentRect.forbidden) {
                        currentRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stampForbidden, this);
                    }
                    else {
                        currentRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stampPermissive, this);
                    }
                }
                var upperRect = this.getChildAt((i - 1) * 4 + j);
                currentRect.forbidden = upperRect.forbidden;
                currentRect.active = upperRect.active;
                currentRect.draw();
                if (i == 4) {
                    if (currentRect.forbidden) {
                        currentRect.once(egret.TouchEvent.TOUCH_TAP, this.stampForbidden, this);
                    }
                    else {
                        currentRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stampPermissive, this);
                    }
                }
            }
        }
        // 重新调整第一行颜色
        var rand = Math.floor(Math.random() * 4);
        for (var i = 0; i < 4; i++) {
            var rect_1 = this.getChildAt(i);
            if (i == rand) {
                rect_1.forbidden = false;
            }
            else {
                rect_1.forbidden = true;
            }
            rect_1.active = false;
            rect_1.draw();
        }
    };
    // 踩中禁区
    Main.prototype.stampForbidden = function (event) {
        var rect = event.currentTarget;
        rect.forbidden = true;
        rect.active = true;
        rect.draw();
        for (var i = 0; i < 24; i++) {
            this.getChildAt(i).touchEnabled = false;
        }
        this.gameOverPanel.visible = true;
    };
    // 重新游戏
    Main.prototype.restart = function () {
        this.createGameScene();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map
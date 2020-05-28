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
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        var _this = _super.call(this) || this;
        //private _colors:Array<number> = [0x000000,0xffffff,0xff0000,0x0000ff];
        //private _currentColor:number = 1;
        _this.forbidden = true;
        _this.active = false;
        _this.touchEnabled = true;
        _this.width = egret.MainContext.instance.stage.stageWidth / 4;
        _this.height = egret.MainContext.instance.stage.stageHeight / 6;
        return _this;
    }
    Rect.prototype.draw = function () {
        this.graphics.clear();
        this.graphics.lineStyle(1.5, 0x000000);
        if (this.forbidden) {
            if (this.active) {
                this.graphics.beginFill(0xff0000);
            }
            else {
                this.graphics.beginFill(0xffffff);
            }
        }
        else {
            if (this.active) {
                this.graphics.beginFill(0x00FF00);
            }
            else {
                this.graphics.beginFill(0x000000);
            }
        }
        var index = this.parent.getChildIndex(this);
        var row = Math.floor(index / 4);
        var col = index % 4;
        this.graphics.drawRect(col * this.width, row * this.height, this.width, this.height);
        this.graphics.endFill();
    };
    return Rect;
}(egret.Sprite));
__reflect(Rect.prototype, "Rect");
//# sourceMappingURL=Rect.js.map
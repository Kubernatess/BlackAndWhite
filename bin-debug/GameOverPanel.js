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
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel() {
        var _this = _super.call(this) || this;
        var stageW = egret.MainContext.instance.stage.stageWidth;
        var stageH = egret.MainContext.instance.stage.stageHeight;
        // 画一层遮罩
        _this.graphics.beginFill(0x000000, 0.5);
        _this.graphics.drawRect(0, 0, stageW, stageH);
        _this.graphics.endFill();
        // 设置贴图纹理
        var bitmap = new egret.Bitmap();
        _this.addChild(bitmap);
        bitmap.texture = RES.getRes("game_over_panel_png");
        var ratio = bitmap.width / bitmap.height;
        bitmap.width = stageW / 2;
        bitmap.height = bitmap.width / ratio;
        bitmap.anchorOffsetX = bitmap.width / 2;
        bitmap.anchorOffsetY = bitmap.height / 2;
        bitmap.x = stageW / 2;
        bitmap.y = stageH / 2;
        bitmap.touchEnabled = true;
        _this.visible = false;
        return _this;
    }
    return GameOverPanel;
}(egret.Sprite));
__reflect(GameOverPanel.prototype, "GameOverPanel");
//# sourceMappingURL=GameOverPanel.js.map
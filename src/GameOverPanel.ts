class GameOverPanel extends egret.Sprite {
	public constructor() {
		super();
		let stageW:number = egret.MainContext.instance.stage.stageWidth;
		let stageH:number = egret.MainContext.instance.stage.stageHeight;
		// 画一层遮罩
		this.graphics.beginFill(0x000000,0.5);		
		this.graphics.drawRect(0,0,stageW,stageH);
		this.graphics.endFill();
		// 设置贴图纹理
		let bitmap:egret.Bitmap = new egret.Bitmap();		
		this.addChild(bitmap);
		bitmap.texture = RES.getRes("game_over_panel_png");
		let ratio:number = bitmap.width/bitmap.height;
		bitmap.width = stageW/2;
		bitmap.height = bitmap.width/ratio;
		bitmap.anchorOffsetX = bitmap.width/2
		bitmap.anchorOffsetY = bitmap.height/2;
		bitmap.x = stageW/2;
		bitmap.y = stageH/2;
		bitmap.touchEnabled = true;

		this.visible = false;
	}

}
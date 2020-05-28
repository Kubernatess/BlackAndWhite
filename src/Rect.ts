class Rect extends egret.Sprite {
	
	public constructor() {
		super();
		this.touchEnabled = true;
		this.width = egret.MainContext.instance.stage.stageWidth/4;
		this.height = egret.MainContext.instance.stage.stageHeight/6;				
	}

	//private _colors:Array<number> = [0x000000,0xffffff,0xff0000,0x0000ff];
	//private _currentColor:number = 1;
	public forbidden:boolean = true;
	public active:boolean = false;

	public draw(){
		this.graphics.clear();
		this.graphics.lineStyle(1.5,0x000000);
		if(this.forbidden){
			if(this.active){
				this.graphics.beginFill(0xff0000);
			}
			else{
				this.graphics.beginFill(0xffffff);
			}			
		}
		else{
			if(this.active){
				this.graphics.beginFill(0x00FF00);
			}
			else{
				this.graphics.beginFill(0x000000);
			}			
		}
		let index:number = this.parent.getChildIndex(this);
		let row:number = Math.floor(index/4);
		let col:number = index%4;
		this.graphics.drawRect(col*this.width,row*this.height,this.width,this.height);
		this.graphics.endFill();
	}

	
}
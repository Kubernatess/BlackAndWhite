class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private gameOverPanel:GameOverPanel;

    private createGameScene() {
        this.removeChildren();
        for(let i=0; i<6; i++){
            let rand = Math.floor(Math.random()*4);
            for(let j=0; j<4; j++){
                let rect:Rect = new Rect();
                this.addChildAt(rect,i*4+j);
                if(i==5){
                    rect.forbidden = true;
                }
                else{
                    if(j==rand){
                        rect.forbidden = false;
                        if(i==4){
                            rect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.stampPermissive,this);
                        }
                    }
                    else{
                        rect.forbidden = true;
                        if(i==4){
                            rect.once(egret.TouchEvent.TOUCH_TAP,this.stampForbidden,this);
                        }
                    }
                }
                rect.active = false;
                rect.draw();   
            }
        }
        this.gameOverPanel = new GameOverPanel();
        this.addChildAt(this.gameOverPanel,100);
        this.gameOverPanel.once(egret.TouchEvent.TOUCH_TAP,this.restart,this);
    }

    
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();
        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };
        change();
    }


    // 踩中允许区
    private stampPermissive(event:egret.TouchEvent) {
        // 改变当前方块颜色
        let rect:Rect = <Rect>event.currentTarget;
        rect.forbidden = false;
        rect.active = true;
        rect.draw();
        // 调整颜色顺序
        for(let i=5; i>0; i--){
            for(let j=0; j<4; j++){
                let currentRect:Rect = <Rect>this.getChildAt(i*4+j);
                if(i==4&&currentRect.hasEventListener(egret.TouchEvent.TOUCH_TAP)){
                    if(currentRect.forbidden){
                        currentRect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.stampForbidden,this);
                    }
                    else{
                        currentRect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.stampPermissive,this);
                    }
                }
                let upperRect:Rect = <Rect>this.getChildAt((i-1)*4+j);
                currentRect.forbidden = upperRect.forbidden;
                currentRect.active = upperRect.active;
                currentRect.draw();
                if(i==4){                    
                    if(currentRect.forbidden){
                        currentRect.once(egret.TouchEvent.TOUCH_TAP,this.stampForbidden,this);
                    }
                    else{
                        currentRect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.stampPermissive,this);
                    }
                }
            }
        }
        // 重新调整第一行颜色
        let rand = Math.floor(Math.random()*4);
        for(let i=0; i<4; i++){
            let rect:Rect = <Rect>this.getChildAt(i);
            if(i==rand){
                rect.forbidden = false;
            }
            else{
                rect.forbidden = true;               
            }
            rect.active = false;
            rect.draw();
        }
    }

    // 踩中禁区
    private stampForbidden(event:egret.TouchEvent) {
        let rect:Rect = <Rect>event.currentTarget;
        rect.forbidden = true;
        rect.active = true;
        rect.draw();
        for(let i=0; i<24; i++){
            (<Rect>this.getChildAt(i)).touchEnabled = false;
        }
        this.gameOverPanel.visible = true;
    }

    // 重新游戏
    private restart(){
        this.createGameScene();
    }
}
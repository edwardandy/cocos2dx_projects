/**
 * Created by Administrator on 13-12-4.
 */
var TestLayer1 = BaseTestLayer.extend({
    cnt:0,
    init:function(){
        this._super();

        var director = cc.Director.getInstance();
        var winSize = director.getWinSize();

        //CCLabelBMFont 测试
        var bmLabel = cc.LabelBMFont.create("LabelBMFont","res/fonts/arial16.fnt");
        bmLabel.setPosition(winSize.width/2,winSize.height - bmLabel.getContentSize().height/2-100);

        var scaleAction = cc.ScaleBy.create(2,4);

        var bmAction = cc.RepeatForever.create(cc.Sequence.create(scaleAction,scaleAction.reverse()));
        bmLabel.runAction(bmAction);
        this.addChild(bmLabel,0,1);

        //CCLabelAtlas
        var atlasLabel = cc.LabelAtlas.create(0,"res/fonts/tuffy_bold_italic-charmap.png",48,64,' ');
        atlasLabel.setPosition(winSize.width/2,100);
        this.addChild(atlasLabel,0,2);

        this.schedule(this.onUpdateAtlasLabel,0.1);
    },
    onUpdateAtlasLabel:function(){
        var atlasLabel = this.getChildByTag(2);
        atlasLabel.setString(this.cnt);
        ++this.cnt;
        this.cnt>999 && (this.cnt=0);
    },
    title:"TestLayer1",
    bgColor:cc.c4b(178,150,0,155),
    onClickNextTest:function(argSender){
        cc.log("Enter next click");

        var scene = cc.Scene.create();
        var layer = new TestLayer2;
        cc.log(layer.toString());
        scene.addChild(layer);
        layer.init();
        cc.Director.getInstance().replaceScene(scene);
    }
});
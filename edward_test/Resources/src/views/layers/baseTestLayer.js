/**
 * Created by ios on 13-11-29.
 */
//require("src/views/layers/testLayer1.js");
//require("src/views/layers/testLayer2.js");
var BaseTestLayer = cc.LayerColor.extend({
    _menu:null,
    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.LayerColor );
    },
    init:function(){
        this._super(this.bgColor);

        var director = cc.Director.getInstance();
        var winSize = director.getWinSize();

        var titleLabel = cc.LabelTTF.create(this.title,"Arial",18);
        titleLabel.setPosition(winSize.width/2,winSize.height-titleLabel.getContentSize().height/2-20);
        this.addChild(titleLabel);

        var prevTest = cc.MenuItemFont.create("PrevTest",this.onClickPrevTest,this);
        prevTest.setFontSize(16);
        prevTest.setPosition(100,50);

        var nextTest = cc.MenuItemFont.create("NextTest",this.onClickNextTest,this);
        nextTest.setFontSize(16);
        nextTest.setPosition(winSize.width-100,50);

        this._menu = cc.Menu.create(prevTest,nextTest);
        this._menu.setPosition(0,0);
        this.addChild(this._menu);

    },
    title:"",
    bgColor:cc.c4b(0,0,0,255),
    onClickPrevTest:function(argSender){

    },
    onClickNextTest:function(argSender){

    }
});

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
        scene.addChild(layer);
        layer.init();
        cc.Director.getInstance().replaceScene(scene);
    }
});

var TestLayer2 = BaseTestLayer.extend({
    init:function(){
        this._super();

        var director = cc.Director.getInstance();
        var winSize = director.getWinSize();

        //CCSpriteBatchNode test
        var spbatch = cc.SpriteBatchNode.create("res/Images/landscape-1024x1024.png",50);
        this.addChild(spbatch,0,1);

        var sp1 = cc.Sprite.createWithTexture(spbatch.getTexture(),cc.rect(0,0,50,50));
        sp1.setPosition(100+100,winSize.height-25-100);
        spbatch.addChild(sp1);

        var move = cc.MoveBy.create(2,cc.p(0,200-winSize.height));
        var moveReverse = move.reverse();

        var easeIn = cc.EaseIn.create(move.clone(),2);
        sp1.runAction(cc.RepeatForever.create(cc.Sequence.create(easeIn,easeIn.reverse())));

        var sp2 = cc.Sprite.createWithTexture(spbatch.getTexture(),cc.rect(50,0,50,50));
        sp2.setPosition(100+100+70,winSize.height-25-100);
        spbatch.addChild(sp2);

        var easeOut = cc.EaseOut.create(move.clone(),2);
        sp2.runAction(cc.RepeatForever.create(cc.Sequence.create(easeOut,easeOut.reverse())));

        var spFrame1 = cc.SpriteFrame.createWithTexture(spbatch.getTexture(),cc.rect(50,50,50,50));
        var spFrame2 = cc.SpriteFrame.createWithTexture(spbatch.getTexture(),cc.rect(100,50,50,50));

        var animation = cc.Animation.create([spFrame1,spFrame2],0.2);
        var animate = cc.Animate.create(animation);

        var sp3 = cc.Sprite.createWithTexture(spbatch.getTexture());
        sp3.setPosition(100+250,winSize.height-25-100);
        sp3.runAction(cc.RepeatForever.create(animate));
        spbatch.addChild(sp3);
    },
    title:"TestLayer2",
    bgColor:cc.c4b(0,150,178,155),
    onClickPrevTest:function(argSender){
        cc.log("Enter prev click");
        var scene = cc.Scene.create();
        var layer = new TestLayer1;
        scene.addChild(layer);
        layer.init();

        cc.Director.getInstance().replaceScene(scene);
    }
});
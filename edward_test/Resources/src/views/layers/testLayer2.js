/**
 * Created by Administrator on 13-12-4.
 */
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
        cc.log(layer.toString());
        scene.addChild(layer);
        layer.init();

        cc.Director.getInstance().replaceScene(scene);
    }
});
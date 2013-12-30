/**
 * Created by Administrator on 13-12-16.
 */
var TestMultiListLayer = cc.Layer.extend({
    _data:null,
    init:function(){
        if(!this._super())
            return false;

        var director = cc.Director.getInstance();
        var winSize = director.getWinSize();

        director.setDepthTest(true);

        //var clipping = cc.ClippingNode.create();
        //var mask = cc.Sprite.create();
        //mask.setContentSize(cc.size(100,100));
        //clipping.setStencil(mask);

        //var content = cc.LayerColor.create(cc.c4b(255,0,0,255),200,200);
        //clipping.addChild(content);

        var bmLabel = cc.LabelBMFont.create("MultiList","res/fonts/arial16.fnt");
        bmLabel.setPosition(winSize.width/2,winSize.height - bmLabel.getContentSize().height/2-100);
        this.addChild(bmLabel);

        var list = new MultiList(TestListItem,TestListSkin,5,6,0,0);
        list.setPosition(50,50);
        this.addChild(list);

        var list1 = new MultiList(TestListItem,TestListSkin,5,6,0,0,Direction.VERTICAL);
        list1.setPosition(50,350);
        this.addChild(list1);

        //var item = new TestListItem(new TestListSkin);
        //item.setPosition(100,100);
        //this.addChild(item);

        //var skin = new TestListSkin;
        //skin.setPosition(200,100);
        //this.addChild(skin);

        this._data = [];
        for(var i = 0;i<50;++i)
        {
            this._data[i] = i;
        }

        list.setData(this._data);
        list1.setData(this._data);
        return true;
    }
});

var TestListItem = ListItem.extend({
    initlize:function(){
        this._super();
        var skin = this.getChildByTag(1);
        if(skin)
        {
            if(null != skin.getChildByTag(1))
                skin.removeChildByTag(1,true);
            if(null !== this._data)
            {
                var i = this._data%8;
                var sp = cc.Sprite.create("res/Images/blocks.png",cc.rect(Math.floor((i%4)/2)*32,(i%2)*32,32,32));
                sp.setAnchorPoint(cc.p(0,0));
                skin.addChild(sp,0,1);
            }
        }

        cc.log("TestListItem x:"+this.getPositionX()+" y:"+this.getPositionY());
    },
    onSelected:function(){
        this._super();
        var skin = this.getChildByTag(1);
        if(skin)
        {
            if(null != skin.getChildByTag(1))
            {
                skin.getChildByTag(1).setVisible(true);
            }
        }
    },
    onUnselected:function(){
        this._super();
        var skin = this.getChildByTag(1);
        if(skin)
        {
            if(null != skin.getChildByTag(1))
            {
                skin.getChildByTag(1).setVisible(false);
            }
        }
    }
});

var TestListSkin = cc.Node.extend({
    ctor:function(){
        this._super();

        var sprite = cc.Sprite.create("res/Images/hole_effect.png");
        sprite.setAnchorPoint(cc.p(0,0));
        this.addChild(sprite);
        this.setContentSize(sprite.getContentSize());
    }
});
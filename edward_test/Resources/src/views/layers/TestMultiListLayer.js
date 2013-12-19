/**
 * Created by Administrator on 13-12-16.
 */
var TestMultiListLayer = cc.Layer.extend({
    _data:null,
    init:function(){
        this._super();

        var director = cc.Director.getInstance();
        var winSize = director.getWinSize();

        var bmLabel = cc.LabelBMFont.create("MultiList","res/fonts/arial16.fnt");
        bmLabel.setPosition(winSize.width/2,winSize.height - bmLabel.getContentSize().height/2-100);
        this.addChild(bmLabel);

        var list = new MultiList();
        list.init(TestListItem,TestListSkin,5,5,0,0,cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        list.setPosition(50,50);
        this.addChild(list);

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
    }
});

var TestListItem = ListItem.extend({
    updateData:function(){
        this._super();
        if(null != this._data)
        {
            cc.log("TestListItem updateData step 1");
            var skin = this.getChildByTag(1);
            cc.log("TestListItem updateData step 2");
            if(skin)
            {
                cc.log("TestListItem updateData step 3");
                skin.removeChildByTag(1,true);
                cc.log("TestListItem updateData step 4");
                var i = this._data%8;
                cc.log("TestListItem updateData step 5 i:"+i);
                var sp = cc.Sprite.create("res/Images/blocks.png",cc.rect((i/2)*32,(i%2)*32,32,32));
                cc.log("TestListItem updateData step 6 size:"+sp.getContentSize().width+" "+sp.getContentSize().height);
                skin.addChild(sp,0,1);
                cc.log("TestListItem updateData step 7");
            }
        }
    }
});

var TestListSkin = cc.Node.extend({
    ctor:function(){
        cc.log("TestListSkin ctor begin");
        this._super();

        var sprite = cc.Sprite.create("res/Images/hole_effect.png");
        sprite.setAnchorPoint(cc.p(0,0));
        this.addChild(sprite);
        this.setContentSize(sprite.getContentSize());
        cc.log("TestListSkin ctor:"+sprite.getContentSize().width+" "+sprite.getContentSize().height);
    }
});
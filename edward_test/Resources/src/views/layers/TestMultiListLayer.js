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
        list.setPosition(cc.p(100,50));
        this.addChild(list);

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
            var skin = getChildByTag(1);
            if(skin)
            {
                skin.removeChildByTag(1,true);
                var i = this._data%8;
                var sp = cc.Sprite.create("res/Images/blocks.png",cc.RectMake((i/2)*32,(i%2)*32,32,32));
                skin.addChild(sp,0,1);
            }
        }
    }
});

var TestListSkin = cc.Node.extend({
    ctor:function(){
        this._super();

        var sprite = cc.Sprite.create("res/Images/hole_effect.png");
        this.addChild(sprite);
    }
});
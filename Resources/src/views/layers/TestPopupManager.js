/**
 * Created by ios on 13-12-27.
 */
var TestPopupManager = cc.Layer.extend({
    init:function(){
        if(!this._super())
            return false;
        var winSize = cc.Director.getInstance().getWinSize();

        var container = cc.Layer.create();
        container.init();
        this.addChild(container);

        PopUpManager.getInstance().initialize(container);

        var popWin = new TestPopupWindow1;
        popWin.init();
        PopUpManager.getInstance().registerPopUp("test1",popWin);

        popWin = new TestPopupWindow2;
        popWin.init();
        PopUpManager.getInstance().registerPopUp("test2",popWin);

        popWin = new TestPopupWindow3;
        popWin.init();
        PopUpManager.getInstance().registerPopUp("test3",popWin);

        popWin = new TestPopupWindow4;
        popWin.init();
        PopUpManager.getInstance().registerPopUp("test4",popWin);

        var tabList = new TabList(TestPopupTabItem,TestTabSkin,4,0);
        tabList.init();
        tabList.setPosition(cc.p(0,0));
        this.addChild(tabList);
        tabList.setData(["test1","test2","test3","test4"]);
        return true;
    }
});

var TestPopupTabItem = TestTabItem.extend({
    onSelect:function(){
        this._super();
        if(this._data)
            PopUpManager.getInstance().open(this._data);
    },
    onUnselect:function(){
        this._super();
        if(this._data)
            PopUpManager.getInstance().close(this._data);
    }
});

var TestPopupWindow1 = IPopUpWindow.extend({
    init:function(){
        if(!this._super())
            return false;
        var sp = cc.Sprite.create('res/Images/background.png',cc.rect(0,0,250,250));
        this.setAnchorPoint(cc.p(0,0));
        sp.ignoreAnchorPointForPosition(true);
        this.addChild(sp);
        this.setContentSize(sp.getContentSize());
    }
});

var TestPopupWindow2 = IPopUpWindow.extend({
    init:function(){
        if(!this._super())
            return false;
        var sp = cc.Sprite.create('res/Images/background1.png',cc.rect(0,0,250,250));
        this.setAnchorPoint(cc.p(0,0));
        sp.ignoreAnchorPointForPosition(true);
        this.addChild(sp);
        this.setContentSize(sp.getContentSize());
    }
});

var TestPopupWindow3 = IPopUpWindow.extend({
    init:function(){
        if(!this._super())
            return false;
        this.setAnchorPoint(cc.p(0,0));
        var sp = cc.Sprite.create('res/Images/background2.png',cc.rect(0,0,250,250));
        sp.ignoreAnchorPointForPosition(true);
        this.addChild(sp);
        this.setContentSize(sp.getContentSize());
    }
});

var TestPopupWindow4 = IPopUpWindow.extend({
    init:function(){
        if(!this._super())
            return false;
        this.setAnchorPoint(cc.p(0,0));
        var sp = cc.Sprite.create('res/Images/background3.png',cc.rect(0,0,250,250));
        sp.ignoreAnchorPointForPosition(true);
        this.addChild(sp);
        this.setContentSize(sp.getContentSize());
    }
});
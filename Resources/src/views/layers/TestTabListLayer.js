/**
 * Created by ios on 13-12-23.
 */
var TestTabListLayer = cc.Layer.extend({
    init:function(){
        if(!this._super())
            return false;

        var tabList = new TabList(TestTabItem,TestTabSkin,3,0);
        tabList.init();
        tabList.setPosition(cc.p(100,100));
        this.addChild(tabList);

        return true;
    }
});

var TestTabItem = TabItem.extend({
    initlize:function(){
        this.skin.setUnselectState();
    },
    onSelect:function(){
        this.skin.setSelectState();
    },
    onUnselect:function(){
        this.skin.setUnselectState();
    }
});

var TestTabSkin = cc.Node.extend({
    m_contentSpt:null,
    m_selectFrame:null,
    m_unselectFrame:null,
    ctor:function(){
        this._super();

        this.m_selectFrame = cc.SpriteFrame.create("res/Images/btn-play-selected.png",cc.rect(0,0,125,42));
        this.m_selectFrame.retain();
        this.m_unselectFrame = cc.SpriteFrame.create("res/Images/btn-about-normal.png",cc.rect(0,0,125,42));
        this.m_unselectFrame.retain();

        this.m_contentSpt = cc.Sprite.createWithSpriteFrame(this.m_unselectFrame);
        this.m_contentSpt.retain();
        this.m_contentSpt.ignoreAnchorPointForPosition(true);
        this.addChild(this.m_contentSpt);
        this.setContentSize(this.m_contentSpt.getContentSize());
    },
    setSelectState:function(){
        this.m_contentSpt.setDisplayFrame(this.m_selectFrame);
        this.setContentSize(this.m_contentSpt.getContentSize());
    },
    setUnselectState:function(){
        this.m_contentSpt.setDisplayFrame(this.m_unselectFrame);
        this.setContentSize(this.m_contentSpt.getContentSize());
    }
});
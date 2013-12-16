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




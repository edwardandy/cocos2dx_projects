/**
 * Created by Administrator on 13-12-16.
 */
var ListItem = cc.Node.extend({
    _itemId:-1,
    _data:null,
    _skin:null,
    ctor:function(){
        this._super();
    },
    setSkin:function(skin){
        cc.log("ListItem ctor begin");
        this._skin = skin;
        this._skin.retain();
        this.addChild(this._skin,0,1);
        this.setContentSize(skin.getContentSize());
        cc.log("ListItem ctor:"+skin.getContentSize().width+" "+skin.getContentSize().height);
    },
    setItemId:function(id){
        this._itemId = id;
    },
    getItemId:function(){
        return this._itemId;
    },
    setData:function(data){
        cc.log("ListItem setData:"+data);
        this._data = data;
        if(this._data)
        {
            //this.setVisible(true);
            this.initlize();
        }else{
            //this.setVisible(false);
        }
    },
    getData:function(){
        return this._data;
    },
    initlize:function(){

    },
    getbody:function(){
        return this;
    },
    updateObject:function(object){
    }
});
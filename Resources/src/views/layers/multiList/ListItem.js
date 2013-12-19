/**
 * Created by Administrator on 13-12-16.
 */
var ListItem = cc.TableViewCell.extend({
    _data:null,
    ctor:function(skin){
        cc.log("ListItem ctor begin");
        this._super();
        this.setAnchorPoint(cc.p(0,0));
        this.addChild(skin,0,1);
        this.setContentSize(skin.getContentSize());
        cc.log("ListItem ctor:"+skin.getContentSize().width+" "+skin.getContentSize().height);
    },
    updateData:function(){
    },
    setData:function(data){
        cc.log("ListItem setData:"+data);
        this._data = data;
        this.updateData();
    },
    getData:function(){
        return this._data;
    },
    updateOutData:function(data){

    }
});
/**
 * Created by Administrator on 13-12-16.
 */
var ListItem = cc.TableViewCell.extend({
    _data:null,
    ctor:function(skin){
        this._super();
        this.setAnchorPoint(cc.p(0,0));
        this.addChild(skin,0,1);
    },
    updateData:function(){
        ;
    },
    setData:function(data){
        this._data = data;
        this.updateData();
    },
    getData:function(){
        return this._data;
    },
    updateOutData:function(data){

    }
})
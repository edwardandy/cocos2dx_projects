/**
 * Created by Edward on 13-12-21.
 */
var TabItem = cc.Layer.extend({
    skin:null,
    _data:null,
    setSkin:function(mov){
        this.skin = mov;
        this.skin.retain();
        this.addChild(this.skin);
    },
    setData:function(o){
        this._data = o;
        if(o){
            this.initlize();
        }
    },
    getData:function(){
        return this._data;
    },
    initlize:function(){
        ;
    },
    onSelect:function(){
        ;
    },
    onUnselect:function(){
        ;
    },
    dispose:function(){
        if(this.skin)
            this.skin.release();
        this.skin.release();
        this._data = null;
    }
});
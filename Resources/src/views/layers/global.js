/**
 * Created by Edward on 13-12-21.
 */
var Direction = {
    HORIZONTAL:"horizontal",
    VERTICAL:"vertical"
};

var ActionTweenDelegate = cb.ActionTweenJSDelegate.extend({
    _target:null,
    ctor:function(target){
        this._super();
        this._target = target;
    },
    updateTweenAction:function(value,key){
        //cc.log("MyActionTweenDelegate updateTweenAction key:"+key+" value:"+value);
        if(this._target /*&& this._target.hasOwnProperty("updateTweenAction")*/)
        {
            this._target["updateTweenAction"](value,key);
        }
    }
});
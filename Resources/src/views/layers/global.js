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
        cc.log("ActionTweenDelegate ctor begin.");
        this._super();
        cc.log("ActionTweenDelegate ctor end.");
        this._target = target;
    },
    updateTweenAction:function(value,key){
        cc.log("MyActionTweenDelegate updateTweenAction key:"+key+" value:"+value);
        if(this._target && this._target.hasOwnProperty("updateTweenAction"))
        {
            this._target["updateTweenAction"](value,key);
        }
    }
});
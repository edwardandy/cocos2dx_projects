/**
 * Created by ios on 14-1-2.
 */
var customBindings = customBindings || {};

customBindings.ActionTweenJSDelegate = {
    updateTweenAction:function(value,key){
        throw new Error("updateTweenAction should be override");
    }
    //构造函数
    //ActionTweenJSDelegate:function(){},
    //create:function(){}
};

customBindings.ActionTweenJSDelegate.extend = cc.Class.extend;
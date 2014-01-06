/**
 * @module custombinding
 */
var cb = cb || {};

/**
 * @class ActionTweenJSDelegate
 */
cb.ActionTweenJSDelegate = {

/**
 * @method create
 * @return A value converted from C/C++ "CustomBindings::ActionTweenJSDelegate*"
 */
create : function () {},
    updateTweenAction:function(value,key){
        throw new Error("updateTweenAction should be override");
    }

};

cb.ActionTweenJSDelegate.extend = cc.Class.extend;

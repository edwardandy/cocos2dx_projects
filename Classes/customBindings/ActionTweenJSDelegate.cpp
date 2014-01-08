//
// Created by gaojian on 14-1-2.
//


#include "ActionTweenJSDelegate.h"
#include "cocos2d_specifics.hpp"

CustomBindings::ActionTweenJSDelegate::ActionTweenJSDelegate(){
    m_bRunning = true;
}
void CustomBindings::ActionTweenJSDelegate::updateTweenAction(float value, const char *key) {
    //CCLog("ActionTweenJSDelegate updateTweenAction");

    js_proxy_t* p = jsb_get_native_proxy(this);
    jsval retval;
    JSContext* jc = ScriptingCore::getInstance()->getGlobalContext();
    jsval v[] = {
            v[0] = DOUBLE_TO_JSVAL(value),
            v[1] = c_string_to_jsval(jc, key, strlen(key))
    };
    ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(p->obj), "updateTweenAction", 2, v, &retval);

}

CustomBindings::ActionTweenJSDelegate *CustomBindings::ActionTweenJSDelegate::create()
{
    CustomBindings::ActionTweenJSDelegate *pRet = new CustomBindings::ActionTweenJSDelegate();
    if (pRet)
    {
        pRet->autorelease();
        return pRet;
    }
    else
    {
        CC_SAFE_DELETE(pRet);
        return NULL;
    }
}
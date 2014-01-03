//
// Created by gaojian on 14-1-2.
//


#include "ActionTweenJSDelegate.h"
#include "cocos2d_specifics.hpp"

void CustomBindings::ActionTweenJSDelegate::updateTweenAction(float value, const char *key) {
    CCLog("ActionTweenJSDelegate updateTweenAction");
    js_proxy_t* p = jsb_get_native_proxy(this);
    jsval retval;
    JSContext* jc = ScriptingCore::getInstance()->getGlobalContext();
    CCString* strValue = CCStringMake("");
    strValue->initWithFormat("%f.2",value);
    jsval v[] = {
            v[0] = c_string_to_jsval(jc, strValue->getCString(), strValue->length()),
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
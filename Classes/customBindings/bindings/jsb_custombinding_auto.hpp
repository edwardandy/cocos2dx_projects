#ifndef __custombinding_h__
#define __custombinding_h__

#include "cocos2d_specifics.hpp"


//extern JSClass  *jsb_ActionTweenJSDelegate_class;
//extern JSObject *jsb_ActionTweenJSDelegate_prototype;

void register_all_custombinding(JSContext* cx, JSObject* obj);
JSBool js_custombinding_ActionTweenJSDelegate_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_custombinding_ActionTweenJSDelegate_finalize(JSContext *cx, JSObject *obj);
void js_register_custombinding_ActionTweenJSDelegate(JSContext *cx, JSObject *global);
JSBool js_custombinding_ActionTweenJSDelegate_create(JSContext *cx, uint32_t argc, jsval *vp);
#endif


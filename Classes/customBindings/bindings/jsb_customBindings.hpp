#ifndef __custombindings_h__
#define __custombindings_h__

#include "cocos2d_specifics.hpp"

void register_all_custombindings(JSContext* cx, JSObject* obj);
void js_register_custombindings_ActionTweenJSDelegate(JSContext *cx, JSObject *global);
void js_custombindings_ActionTweenJSDelegate_finalize(JSFreeOp *fop, JSObject *obj);
JSBool js_custombindings_ActionTweenJSDelegate_constructor(JSContext *cx, uint32_t argc, jsval *vp);
static JSBool js_custombindings_ActionTweenJSDelegate_ctor(JSContext *cx, uint32_t argc, jsval *vp);

JSBool js_custombindings_retain(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_custombindings_release(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_custombindings_ActionTweenJSDelegate_create(JSContext *cx, uint32_t argc, jsval *vp);

#endif//__custombindings_h__
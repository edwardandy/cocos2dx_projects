#include "jsb_custombinding_auto.hpp"
#include "../ActionTweenJSDelegate.h"
#include "jsb_cocos2dx_auto.hpp"

template<class T>
static JSBool dummy_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
	TypeTest<T> t;
	T* cobj = new T();
	//cocos2d::CCObject *_ccobj = dynamic_cast<cocos2d::CCObject *>(cobj);
    cocos2d::CCObject *_ccobj = (cocos2d::CCObject *)cobj;
	if (_ccobj) {
		_ccobj->autorelease();
	}
	js_type_class_t *p;
	uint32_t typeId = t.s_id();
	HASH_FIND_INT(_js_global_type_ht, &typeId, p);
	assert(p);
	JSObject *_tmp = JS_NewObject(cx, p->jsclass, p->proto, p->parentProto);
	js_proxy_t *pp = jsb_new_proxy(cobj, _tmp);
	JS_AddObjectRoot(cx, &pp->obj);
	JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(_tmp));

	return JS_TRUE;
}

static JSBool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
	return JS_FALSE;
}


JSClass  *jsb_ActionTweenJSDelegate_class;
JSObject *jsb_ActionTweenJSDelegate_prototype;

JSBool js_custombinding_ActionTweenJSDelegate_create(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc == 0) {
		CustomBindings::ActionTweenJSDelegate* ret = CustomBindings::ActionTweenJSDelegate::create();
		jsval jsret;
		do {
		if (ret) {
			js_proxy_t *proxy = js_get_or_create_proxy<CustomBindings::ActionTweenJSDelegate>(cx, ret);
			jsret = OBJECT_TO_JSVAL(proxy->obj);
		} else {
			jsret = JSVAL_NULL;
		}
	} while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}
	JS_ReportError(cx, "wrong number of arguments");
	return JS_FALSE;
}



extern JSObject *jsb_CCNode_prototype;

void js_custombinding_ActionTweenJSDelegate_finalize(JSFreeOp *fop, JSObject *obj) {
    CCLOGINFO("jsbindings: finalizing JS object %p (ActionTweenJSDelegate)", obj);
}

static JSBool js_custombinding_ActionTweenJSDelegate_ctor(JSContext *cx, uint32_t argc, jsval *vp)
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
    CustomBindings::ActionTweenJSDelegate *nobj = new CustomBindings::ActionTweenJSDelegate();
    cocos2d::CCNode* nnobj = (cocos2d::CCNode*)nobj;
    nobj->retainCount();
    nnobj->retainCount();
    js_proxy_t* p = jsb_new_proxy(nobj, obj);
    nobj->autorelease();
    JS_AddNamedObjectRoot(cx, &p->obj, "CustomBindings::ActionTweenJSDelegate");
    JS_SET_RVAL(cx, vp, JSVAL_VOID);
    return JS_TRUE;
}

void js_register_custombinding_ActionTweenJSDelegate(JSContext *cx, JSObject *global) {
	jsb_ActionTweenJSDelegate_class = (JSClass *)calloc(1, sizeof(JSClass));
	jsb_ActionTweenJSDelegate_class->name = "ActionTweenJSDelegate";
	jsb_ActionTweenJSDelegate_class->addProperty = JS_PropertyStub;
	jsb_ActionTweenJSDelegate_class->delProperty = JS_PropertyStub;
	jsb_ActionTweenJSDelegate_class->getProperty = JS_PropertyStub;
	jsb_ActionTweenJSDelegate_class->setProperty = JS_StrictPropertyStub;
	jsb_ActionTweenJSDelegate_class->enumerate = JS_EnumerateStub;
	jsb_ActionTweenJSDelegate_class->resolve = JS_ResolveStub;
	jsb_ActionTweenJSDelegate_class->convert = JS_ConvertStub;
	jsb_ActionTweenJSDelegate_class->finalize = js_custombinding_ActionTweenJSDelegate_finalize;
	jsb_ActionTweenJSDelegate_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

	JSPropertySpec *properties = NULL;

	JSFunctionSpec funcs[] = {
        JS_FN("ctor", js_custombinding_ActionTweenJSDelegate_ctor, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FS_END
    };

	static JSFunctionSpec st_funcs[] = {
		JS_FN("create", js_custombinding_ActionTweenJSDelegate_create, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FS_END
	};

	jsb_ActionTweenJSDelegate_prototype = JS_InitClass(
		cx, global,
		jsb_CCNode_prototype,
		jsb_ActionTweenJSDelegate_class,
		dummy_constructor<CustomBindings::ActionTweenJSDelegate>, 0, // no constructor
		properties,
		funcs,
		NULL, // no static properties
		st_funcs);
	// make the class enumerable in the registered namespace
	JSBool found;
	JS_SetPropertyAttributes(cx, global, "ActionTweenJSDelegate", JSPROP_ENUMERATE | JSPROP_READONLY, &found);

	// add the proto and JSClass to the type->js info hash table
	TypeTest<CustomBindings::ActionTweenJSDelegate> t;
	js_type_class_t *p;
	uint32_t typeId = t.s_id();
	HASH_FIND_INT(_js_global_type_ht, &typeId, p);
	if (!p) {
		p = (js_type_class_t *)malloc(sizeof(js_type_class_t));
		p->type = typeId;
		p->jsclass = jsb_ActionTweenJSDelegate_class;
		p->proto = jsb_ActionTweenJSDelegate_prototype;
		p->parentProto = jsb_CCNode_prototype;
		HASH_ADD_INT(_js_global_type_ht, type, p);
	}
}

void register_all_custombinding(JSContext* cx, JSObject* obj) {
	// first, try to get the ns
	jsval nsval;
	JSObject *ns;
	JS_GetProperty(cx, obj, "cb", &nsval);
	if (nsval == JSVAL_VOID) {
		ns = JS_NewObject(cx, NULL, NULL, NULL);
		nsval = OBJECT_TO_JSVAL(ns);
		JS_SetProperty(cx, obj, "cb", &nsval);
	} else {
		JS_ValueToObject(cx, nsval, &ns);
	}
	obj = ns;

	js_register_custombinding_ActionTweenJSDelegate(cx, obj);
}


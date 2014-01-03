#include "jsb_customBindings.hpp"
#include "../ActionTweenJSDelegate.h"
#include "jsb_cocos2dx_auto.hpp"

JSClass  *jsb_ActionTweenJSDelegate_class;
JSObject *jsb_ActionTweenJSDelegate_prototype;

void register_all_custombindings(JSContext* cx, JSObject* obj){
    // first, try to get the ns
    jsval nsval;
    JSObject *ns;
    JS_GetProperty(cx, obj, "customBindings", &nsval);
    if (nsval == JSVAL_VOID) {
        ns = JS_NewObject(cx, NULL, NULL, NULL);
        nsval = OBJECT_TO_JSVAL(ns);
        JS_SetProperty(cx, obj, "customBindings", &nsval);
    } else {
        JS_ValueToObject(cx, nsval, &ns);
    }
    obj = ns;

    js_register_custombindings_ActionTweenJSDelegate(cx, obj);

    JS_DefineFunction(cx, jsb_ActionTweenJSDelegate_prototype, "retain", js_custombindings_retain, 0, JSPROP_READONLY | JSPROP_PERMANENT);
    JS_DefineFunction(cx, jsb_ActionTweenJSDelegate_prototype, "release", js_custombindings_release, 0, JSPROP_READONLY | JSPROP_PERMANENT);
}

JSBool js_custombindings_retain(JSContext *cx, uint32_t argc, jsval *vp)
{
    JSObject *thisObj = JS_THIS_OBJECT(cx, vp);
    if (thisObj) {
        js_proxy_t *proxy = jsb_get_js_proxy(thisObj);
        if (proxy) {
            CustomBindings::ActionTweenJSDelegate* nobj = (CustomBindings::ActionTweenJSDelegate*)proxy->ptr;
            CCLog("js_custombindings_retain refCount:%d,addr:%x,m_uID:%d,m_nLuaID:%d"
                    ,((CCObject *)proxy->ptr)->retainCount()
                    ,((UInt64)proxy->ptr),nobj->m_uID,nobj->m_nLuaID);
            CCLog("js_custombindings_retain refCount:%d,addr:%x,m_uID:%d,m_nLuaID:%d"
                    ,nobj->retainCount(),nobj,nobj->m_uID,nobj->m_nLuaID);
            //nobj->retain();
            ((CCObject *)proxy->ptr)->retain();

            CCLog("js_custombindings_retain refCount:%d,addr:%x,m_uID:%d,m_nLuaID:%d"
                    ,((CCObject *)proxy->ptr)->retainCount()
                    ,((UInt64)proxy->ptr),nobj->m_uID,nobj->m_nLuaID);
            CCLog("js_custombindings_retain refCount:%d,addr:%x,m_uID:%d,m_nLuaID:%d"
                    ,nobj->retainCount(),nobj,nobj->m_uID,nobj->m_nLuaID);
            return JS_TRUE;
        }
    }
    JS_ReportError(cx, "Invalid Native Object.");
    return JS_FALSE;
}

JSBool js_custombindings_release(JSContext *cx, uint32_t argc, jsval *vp)
{
    JSObject *thisObj = JS_THIS_OBJECT(cx, vp);
    if (thisObj) {
        js_proxy_t *proxy = jsb_get_js_proxy(thisObj);
        if (proxy) {
            ((CCObject *)proxy->ptr)->release();
            return JS_TRUE;
        }
    }
    JS_ReportError(cx, "Invalid Native Object.");
    return JS_FALSE;
}


void js_register_custombindings_ActionTweenJSDelegate(JSContext *cx, JSObject *global) {
    jsb_ActionTweenJSDelegate_class = (JSClass *)calloc(1, sizeof(JSClass));
    jsb_ActionTweenJSDelegate_class->name = "ActionTweenJSDelegate";
    jsb_ActionTweenJSDelegate_class->addProperty = JS_PropertyStub;
    jsb_ActionTweenJSDelegate_class->delProperty = JS_PropertyStub;
    jsb_ActionTweenJSDelegate_class->getProperty = JS_PropertyStub;
    jsb_ActionTweenJSDelegate_class->setProperty = JS_StrictPropertyStub;
    jsb_ActionTweenJSDelegate_class->enumerate = JS_EnumerateStub;
    jsb_ActionTweenJSDelegate_class->resolve = JS_ResolveStub;
    jsb_ActionTweenJSDelegate_class->convert = JS_ConvertStub;
    jsb_ActionTweenJSDelegate_class->finalize = js_custombindings_ActionTweenJSDelegate_finalize;
    jsb_ActionTweenJSDelegate_class->flags = JSCLASS_HAS_RESERVED_SLOTS(2);

    static JSPropertySpec properties[] = {
            {0, 0, 0, JSOP_NULLWRAPPER, JSOP_NULLWRAPPER}
    };

    static JSFunctionSpec funcs[] = {
            JS_FN("ctor", js_custombindings_ActionTweenJSDelegate_ctor, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE)
    };

    static JSFunctionSpec st_funcs[] = {
            JS_FN("create", js_custombindings_ActionTweenJSDelegate_create, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
            JS_FS_END
    };

    jsb_ActionTweenJSDelegate_prototype = JS_InitClass(
            cx, global,
            jsb_CCNode_prototype,
            jsb_ActionTweenJSDelegate_class,
            js_custombindings_ActionTweenJSDelegate_constructor, 0, // constructor
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

void js_custombindings_ActionTweenJSDelegate_finalize(JSFreeOp *fop, JSObject *obj) {
    CCLOGINFO("jsbindings: finalizing JS object %p (ActionTweenJSDelegate)", obj);
}

JSBool js_custombindings_ActionTweenJSDelegate_constructor(JSContext *cx, uint32_t argc, jsval *vp)
{
    if (argc == 0) {
        CustomBindings::ActionTweenJSDelegate * cobj = new CustomBindings::ActionTweenJSDelegate();
        cocos2d::CCObject *_ccobj = dynamic_cast<cocos2d::CCObject *>(cobj);
        if (_ccobj) {
            _ccobj->autorelease();
        }
        TypeTest<CustomBindings::ActionTweenJSDelegate> t;
        js_type_class_t *typeClass;
        uint32_t typeId = t.s_id();
        HASH_FIND_INT(_js_global_type_ht, &typeId, typeClass);
        assert(typeClass);
        JSObject *obj = JS_NewObject(cx, typeClass->jsclass, typeClass->proto, typeClass->parentProto);
        JS_SET_RVAL(cx, vp, OBJECT_TO_JSVAL(obj));
        // link the native object with the javascript object
        js_proxy_t* p = jsb_new_proxy(cobj, obj);
        JS_AddNamedObjectRoot(cx, &p->obj, "CustomBindings::ActionTweenJSDelegate");
        return JS_TRUE;
    }

    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
    return JS_FALSE;
}

static JSBool js_custombindings_ActionTweenJSDelegate_ctor(JSContext *cx, uint32_t argc, jsval *vp)
{
    JSObject *obj = JS_THIS_OBJECT(cx, vp);
    CustomBindings::ActionTweenJSDelegate *nobj = new CustomBindings::ActionTweenJSDelegate();
    js_proxy_t* p = jsb_new_proxy(nobj, obj);
    nobj->autorelease();
    CCLog("js_ActionTweenJSDelegate_ctor refCount:%d,addr:%x,m_uID:%d,m_nLuaID:%d"
            ,nobj->retainCount(),((UInt64)nobj),nobj->m_uID,nobj->m_nLuaID);
    JS_AddNamedObjectRoot(cx, &p->obj, "CustomBindings::ActionTweenJSDelegate");
    JS_SET_RVAL(cx, vp, JSVAL_VOID);
    return JS_TRUE;
}

JSBool js_custombindings_ActionTweenJSDelegate_create(JSContext *cx, uint32_t argc, jsval *vp)
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
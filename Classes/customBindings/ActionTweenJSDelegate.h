//
// Created by gaojian on 14-1-2.
//



#ifndef __ActionTweenJSDelegate_H_
#define __ActionTweenJSDelegate_H_

#include "cocos2d.h"

namespace CustomBindings
{
    class ActionTweenJSDelegate :public cocos2d::CCNode, public cocos2d::CCActionTweenDelegate
    {
        virtual ~ActionTweenJSDelegate(){};
        virtual void updateTweenAction(float value,const char* key);
    public:
        static ActionTweenJSDelegate *create(void);
    };
};

#endif //__ActionTweenJSDelegate_H_

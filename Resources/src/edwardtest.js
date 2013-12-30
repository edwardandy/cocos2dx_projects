/* 
  edwardtest.js
  edward_test

  Created by shinezone2 on 13-11-28.

*/
require("jsb.js");
require("src/resource.js");
require("src/myApp.js");
require("src/views/layers/baseTestLayer.js");
require("src/views/layers/testLayer1.js");
require("src/views/layers/testLayer2.js");

require("src/views/layers/global.js")
require("src/views/layers/multiList/ListItem.js");
require("src/views/layers/multiList/MultiList.js");
require("src/views/layers/TestMultiListLayer.js");

require("src/views/layers/tabList/TabItem.js");
require("src/views/layers/tabList/TabList.js");
require("src/views/layers/TestTabListLayer.js");

require("src/views/layers/appears/Appear.js");
require("src/views/layers/popup/PopUpManager.js");
require("src/views/layers/popup/PopUpVos.js");
require("src/views/layers/TestPopupManager.js");

var myScene = cc.Scene.create();//new MyScene();
var layer = new TestMultiListLayer; //new TestPopupManager;//new TestTabListLayer; //new TestLayer2;
myScene.addChild(layer);
layer.init();

cc.Director.getInstance().runWithScene(myScene);//.runWithScene(myScene);
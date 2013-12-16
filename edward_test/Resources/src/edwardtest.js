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

require("src/views/layers/multiList/ListItem.js");
require("src/views/layers/multiList/MultiList.js");
require("src/views/layers/TestMultiListLayer.js");

var myScene = cc.Scene.create();//new MyScene();
var layer = new TestMultiListLayer; //new TestLayer2;
myScene.addChild(layer);
layer.init();

cc.Director.getInstance().runWithScene(myScene);//.runWithScene(myScene);
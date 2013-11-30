/* 
  edwardtest.js
  edward_test

  Created by shinezone2 on 13-11-28.

*/
require("jsb.js");
require("src/resource.js");
require("src/myApp.js");
require("src/views/layers/baseTestLayer.js");

var myScene = cc.Scene.create();//new MyScene();
var layer = new TestLayer2;
myScene.addChild(layer);
layer.init();

cc.Director.getInstance().runWithScene(myScene);//.runWithScene(myScene);
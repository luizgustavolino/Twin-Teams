var tutorialScene = {};

/* UPDATE */

tutorialScene.update = function(_frame){
    
    
}

/* DRAW */

tutorialScene.draw = function(_frame){
    
    game.resources.canvas.drawImage(game.resources["img_background"], 0,0,640,960,
                                    0,0,320*game.sf,480*game.sf);
    game.resources.canvas.drawImage(game.resources["tutorial"], 0,0,640,960,
                                    0,0,320*game.sf,480*game.sf);
                                    
}

/* MOUSE EVENTS */

tutorialScene.mouseDown  = function(e) {
    game.engine.showScene(gameScene);
}

/* LIFECYCLE */

tutorialScene.onEnter = function(){
    tutorialScene.setupListeners();
}

tutorialScene.onExit = function(){
    tutorialScene.removeListeners();
}

/* LISTENERS */

tutorialScene.setupListeners = function(){
	//document.addEventListener("touchstart", gameScene.handleTouchUp, false);
    game.resources.contextDom.addEventListener('mousedown', tutorialScene.mouseDown, false);
}

tutorialScene.removeListeners = function(){
	//document.removeEventListener("touchstart", gameScene.handleTouchUp, false);
    game.resources.contextDom.removeEventListener('mousedown', tutorialScene.mouseDown, false);
}
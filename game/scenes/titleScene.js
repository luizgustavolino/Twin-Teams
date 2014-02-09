var titleScene = {};

/* UPDATE */

titleScene.update = function(_frame){
        
}

/* DRAW */

titleScene.draw = function(_frame){
    
    game.resources.canvas.drawImage(game.resources["img_background"], 0,0,640,960,
                                    0,0,320*game.sf,480*game.sf);
    game.resources.canvas.drawImage(game.resources["logo"], 0,0,640,960,
                                    0,0,320*game.sf,480*game.sf);               
    
}

/* TOUCH EVENTS */

titleScene.handlePositionEvent = function(position){
    game.engine.showScene(tutorialScene);
}

titleScene.handleTouchUp = function(event){
    
    var i;
    
    for(i = 0; i < event.touches.length; i++){
        var aposition = {x:event.touches[i].pageX, y:event.touches[i].pageY};
        titleScene.handlePositionEvent(aposition);
    }
    
}


/* MENU */

titleScene.inputs = {
    start:{
        active: false,
        tileX: 281,
        tileY: 90,
        mapX: 88,
        mapY: 373,
        source: game.resources["button_play"],
        visible: true
    }
}

/* MOUSE EVENTS */

titleScene.mouseDown  = function(e) {
    
    var startX, startY, aposition;
    
    startX = e.pageX;
    startY = e.pageY;
    
    if(startX && startY){
        aposition = {x:startX, y:startY};
        titleScene.handlePositionEvent(aposition);
    }
}

/* LIFECYCLE */

titleScene.onEnter = function(){
    titleScene.setupListeners();
}

titleScene.onExit = function(){
    titleScene.removeListeners();
}

/* LISTENERS */

titleScene.setupListeners = function(){
	//document.addEventListener("touchstart", titleScene.handleTouchUp, false);
    game.resources.contextDom.addEventListener('mousedown', titleScene.mouseDown, false);
}

titleScene.removeListeners = function(){
	//document.removeEventListener("touchstart", titleScene.handleTouchUp, false);
    game.resources.contextDom.removeEventListener('mousedown', titleScene.mouseDown, false);
}
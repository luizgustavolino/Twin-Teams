game.engine = {};

game.engine.paused = false;
game.engine.frameCount = 0;
game.engine.timer = null;
game.engine.perFrameDelay = 1000.0/32.0;

game.engine.scene = null;

game.engine.bootstrap = function(){
    game.engine.timer = setInterval(game.engine.loop, game.engine.perFrameDelay);
    game.engine.showScene(titleScene);
}

game.engine.loop = function(){
    
	//try{
        
        if(!game.engine.paused){
            game.engine.frameCount += 1;
        }
        
        game.engine.clear();
        
        if(game.engine.scene){
            game.engine.scene.update(game.engine.frameCount);
            game.engine.scene.draw(game.engine.frameCount);
        }
        
    //}catch(error){
    //    console.log("error: "+error);
    //}
}

game.engine.showScene = function(_scene){
    
    if(game.engine.scene && game.engine.scene.onExit){
        game.engine.scene.onExit();
    }

    game.engine.scene = _scene;
    
    if(game.engine.scene.onEnter){
        game.engine.scene.onEnter();
    }
    
}

game.engine.clear = function(){
    game.resources.canvas.fillStyle = "#000000";
    game.resources.canvas.fillRect(0, 0,
        game.resources.contextDom.width, game.resources.contextDom.height);
}





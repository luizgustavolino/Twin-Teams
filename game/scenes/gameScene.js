var gameScene = {};

gameScene.witchSelectionStages = {};
gameScene.witchSelectionStages.noOneSelected    = "noOneSelected";
gameScene.witchSelectionStages.firstOneSelected = "firstOneSelected";
gameScene.witchSelectionStages.linkMade         = "linkMade";


gameScene.gameOver = {
    frames: 0,
    active: false,
    stopFrame: 0
}

gameScene.grid = {
    subdivs: tbl.grid,
    height: tbl.gridHeight,
    connections: null,
    firstSelectionTile: null,
    witchSelectionStage: gameScene.witchSelectionStages.noOneSelected,
    witches: null
}

/* UPDATE */

gameScene.update = function(_frame){
    
    var j = 0, i = 0, aConnection = null;
    
    if(!gameScene.gameOver.active){
    
        for(j = 0; j < gameScene.grid.connections.length; j++){
            aConnection = gameScene.grid.connections[j];
            if(aConnection) {
                
                aConnection.update(_frame);
                
                var witchA = gameScene.grid.witches[aConnection.a.y][aConnection.a.x];
                witchA.charge();
                
                var witchB = gameScene.grid.witches[aConnection.b.y][aConnection.b.x];
                witchB.charge();
                
            }
        }
        
        for(i = 0; i < gameScene.grid.subdivs[1]; i++){
            for(j = 0; j < gameScene.grid.subdivs[0]; j++){
                var aWitch = gameScene.grid.witches[i][j];
                if(aWitch) aWitch.update(_frame);
            }
        }
        
        kobolds.update(_frame);
        hadouken.update(_frame);
    
    }
    
}

/* DRAW */

gameScene.draw = function(_frame){
    
    if(gameScene.gameOver.active){
        _frame = gameScene.gameOver.stopFrame;
    }
    
    var i = 0, j = 0, n = 0, cellWidth, cellHeight, gridStart;
                      
    cellWidth = game.resources.contextDom.width/gameScene.grid.subdivs[0];
    cellHeight = (gameScene.grid.height*game.sf)/gameScene.grid.subdivs[1];
    gridStart = game.resources.contextDom.height - (gameScene.grid.height*game.sf);
                                                                
    game.resources.canvas.drawImage(game.resources["img_background"], 0,0,640,960,
                                    0,0,320*game.sf,480*game.sf);
    
    if(tbl.debugGrid){
    
        for(i = 0; i < gameScene.grid.subdivs[1]; i++){
            for(j = 0; j < gameScene.grid.subdivs[0]; j++){
                
                var aWitch = gameScene.grid.witches[i][j];
                
                switch(aWitch.type){
                    case 0:
                        game.resources.canvas.fillStyle = "#00C0DE";
                        break;
                    case 1:
                        game.resources.canvas.fillStyle = "#C0DE00";
                        break;
                    case 2:
                        game.resources.canvas.fillStyle = "#C000DE";
                        break;
                }
                
                if( gameScene.grid.firstSelectionTile &&
                   j == gameScene.grid.firstSelectionTile.x &&
                   i == gameScene.grid.firstSelectionTile.y){
                    game.resources.canvas.fillStyle = "#ea8c15";
                }
                
                for(n = 0; n < gameScene.grid.connections.length; n++){
                    var connection = gameScene.grid.connections[n];
                    if(connection != null){
                        if(connection.a.x == j && connection.a.y == i){
                            //game.resources.canvas.fillStyle = "#595997";
                        }else if(connection.b.x == j && connection.b.y == i){
                            //game.resources.canvas.fillStyle = "#595997";
                        }
                    }
                }
                
                game.resources.canvas.fillRect(cellWidth*j, gridStart+cellHeight*i,
                                               cellWidth, cellHeight);
                
            }
        }
    }
    
    if(gameScene.grid.firstSelectionTile){
        game.resources.canvas.drawImage(game.resources["circle_selectionlight"],
                                        0,0,127,106,
                                        gameScene.grid.firstSelectionTile.x*cellWidth,
                                        gridStart+gameScene.grid.firstSelectionTile.y*cellHeight,
                                        63*game.sf ,53*game.sf);
    }
    
    
    console.log("connections: "+gameScene.grid.connections.length);
    for(j = 0; j < gameScene.grid.connections.length; j++){
        aConnection = gameScene.grid.connections[j];
        if(aConnection) aConnection.draw(_frame);
    }
    
    kobolds.draw(_frame);
    
    for(i = 0; i < gameScene.grid.subdivs[1]; i++){
        for(j = 0; j < gameScene.grid.subdivs[0]; j++){
            var aWitch = gameScene.grid.witches[i][j];
            if(aWitch.draw) aWitch.draw(_frame);
        }
    }
    
    hadouken.draw(_frame);
    
    if(gameScene.gameOver.active){
    
        game.resources.canvas.drawImage(game.resources["gameover_char"],
                                        0,0,497,612,
                                        40*game.sf,(190+gameScene.gameOver.frames)*game.sf,497/2*game.sf,612/2*game.sf);
    
        game.resources.canvas.drawImage(game.resources["gameover_bg"],
                                        0,0,640,960,
                                        0,0, 320*game.sf ,480*game.sf);
                                        
        if(gameScene.gameOver.frames > 0) gameScene.gameOver.frames -= 4;
        else gameScene.gameOver.frames = 0;
    }
    
}

/* GAME OVER */

gameScene.gameOverNow = function(){
    gameScene.gameOver.active       = true;
    gameScene.gameOver.stopFrame    = true;
    gameScene.gameOver.frames       = 120;
}

/* TOUCH EVENTS */

gameScene.handlePositionEvent = function(position){
    
    if(gameScene.gameOver.active) {
        if(gameScene.gameOver.frames){
            return;
        }else{
            window.location.reload(false);
        }
    }
    
    var  i, j, cellWidth, cellHeight, gridStart, tileX, tileY, conCount;
        
    cellWidth   = game.resources.contextDom.width/gameScene.grid.subdivs[0];
    cellHeight  = (gameScene.grid.height*game.sf)/gameScene.grid.subdivs[1];
    gridStart   = game.resources.contextDom.height - (gameScene.grid.height*game.sf);
        
    if(position.y > gridStart){
    
        conCount = 0;
        
        for(j = 0; j < gameScene.grid.connections.length; j++){
            var connection = gameScene.grid.connections[j];
            if(connection != null){
                conCount += 1;
            }
        }
        
        tileX = Math.floor(position.x/cellWidth);
        tileY = Math.floor((position.y-gridStart)/cellHeight);
        
        if(gameScene.grid.witchSelectionStage == gameScene.witchSelectionStages.noOneSelected){
            
            // AM1
            var am1Catch = false;
            for(j = 0; j < gameScene.grid.connections.length; j++){
                var connection = gameScene.grid.connections[j];
                if(connection != null){
                    if(connection.a.x == tileX && connection.a.y == tileY){
                        
                        var wizards = witchUnit.boothFromConnection(gameScene.grid.connections[j]);
                        wizards[0].discharge();
                        wizards[1].discharge();
                        
                        gameScene.grid.connections[j] = null;
                        am1Catch = true;
                        
                    }else if(connection.b.x == tileX && connection.b.y == tileY){
                        
                        gameScene.grid.connections[j] = null;
                        am1Catch = true;
                        
                    }
                }
            }
            
            if(conCount == tbl.maxConnections) {
                if(tbl.removeConnectionTail && !am1Catch){
                    gridConnections.clearOldest();
                }else{
                    return;
                }
            }
            
            if(!am1Catch){
                // PN1
                gameScene.grid.firstSelectionTile   = {x:tileX,y:tileY};
                gameScene.grid.witchSelectionStage  = gameScene.witchSelectionStages.firstOneSelected;
            }
            
        }else if(gameScene.grid.witchSelectionStage == gameScene.witchSelectionStages.firstOneSelected){
                
            // LN1
            if(Math.abs(gameScene.grid.firstSelectionTile.x - tileX) > 1 ||
               Math.abs(gameScene.grid.firstSelectionTile.y - tileY) > 1){
                gameScene.grid.firstSelectionTile   = null;
                gameScene.grid.witchSelectionStage  = gameScene.witchSelectionStages.noOneSelected;
            
            // LN2
            }else{
                
                // KL1
                var aklCatch = false;
                for(j = 0; j < gameScene.grid.connections.length; j++){
                    var connection = gameScene.grid.connections[j];
                    if(connection != null){
                        if(connection.a.x == tileX && connection.a.y == tileY){
                            gameScene.grid.connections[j] = null;
                            aklCatch = true;
                        }else if(connection.b.x == tileX && connection.b.y == tileY){
                            gameScene.grid.connections[j] = null;
                            aklCatch = true;
                        }
                    }
                }
                
                // LN2
                for(j = 0; j < gameScene.grid.connections.length; j++){
                    var connection = gameScene.grid.connections[j];
                    if(connection == null){
                    
                        var okToAdd = false;
                        if(gameScene.grid.firstSelectionTile){
                            if(gameScene.grid.firstSelectionTile.x == tileX &&
                               gameScene.grid.firstSelectionTile.y == tileY){
                                okToAdd = false;
                            }else{
                                okToAdd = true;
                            }
                        }else{
                            okToAdd = false;
                        }
                        
                        if(okToAdd){
                        
                            gameScene.grid.connections[j] =
                                gridConnections.makeGridConnection(gameScene.grid.firstSelectionTile.x,
                                                                   gameScene.grid.firstSelectionTile.y,
                                                                   tileX,tileY);
                                
                            gameScene.grid.firstSelectionTile   = null;
                            gameScene.grid.witchSelectionStage  = gameScene.witchSelectionStages.noOneSelected;
                                  
                        }
                    }
                }
            }
        }
    }
}

gameScene.handleTouchUp = function(event){
    
    var i;
    
    for(i = 0; i < event.touches.length; i++){
        var aposition = {x:event.touches[i].pageX, y:event.touches[i].pageY};
        gameScene.handlePositionEvent(aposition);
    }
    
}

/* MOUSE EVENTS */

gameScene.mouseDown  = function(e) {
    
    var startX, startY, aposition;
    
    startX = e.pageX - game.resources.contextDom.offsetLeft;
    startY = e.pageY - game.resources.contextDom.offsetTop;
    
    if(startX && startY){
        aposition = {x:startX, y:startY};
        gameScene.handlePositionEvent(aposition);
    }
}

gameScene.playerInDanger = function(){

    var j, kobold;

    for( j = 0; j < kobolds.horda.length; j++){
        kobold = kobolds.horda[j];
        if(kobold.posY > 420/2*game.sf){
            return kobold;
        }
    }

    return null;
}

gameScene.koboldReachPlayer = function(){
    
    var j, kobold;
    
    for( j = 0; j < kobolds.horda.length; j++){
        kobold = kobolds.horda[j];
        if(kobold.posY > 464/2*game.sf){
            return true;
        }
    }
    
    return false;
}


/* LIFECYCLE */

gameScene.onEnter = function(){
    
    var i = 0, j = 0, choosedGrid = null, options = tbl.grids ? tbl.grids.length : null;
    
    if(!tbl.autoChooseGrid){
        choosedGrid = tbl.grids[Math.floor(Math.random()*options)];
    }
    
    gameScene.grid.witches = [];
    for(i = 0; i < gameScene.grid.subdivs[1]; i++){
        gameScene.grid.witches[i] = [];
        for(j = 0; j < gameScene.grid.subdivs[0]; j++){
        
            if(choosedGrid){
                gameScene.grid.witches[i][j] = witchUnit.summon(j,i, choosedGrid[i][j]);
            }else{
                gameScene.grid.witches[i][j] = witchUnit.summon(j,i,Math.floor(Math.random()*3));
            }
        }
    }    
    
    gameScene.grid.connections = new Array(tbl.maxConnections);
    for(i = 0; i < tbl.maxConnections; i++){
        gameScene.grid.connections[i] = null;
    }
    
    gameScene.setupListeners();

}

gameScene.onExit = function(){
    gameScene.removeListeners();
}

/* LISTENERS */

gameScene.setupListeners = function(){
	//document.addEventListener("touchstart", gameScene.handleTouchUp, false);
    game.resources.contextDom.addEventListener('mousedown', gameScene.mouseDown, false);
}

gameScene.removeListeners = function(){
	//document.removeEventListener("touchstart", gameScene.handleTouchUp, false);
    game.resources.contextDom.removeEventListener('mousedown', gameScene.mouseDown, false);
}
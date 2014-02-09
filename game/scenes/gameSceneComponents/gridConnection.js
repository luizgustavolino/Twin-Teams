var gridConnections = {};

gridConnections.serialNumber = 0;

gridConnections.makeGridConnection = function(ax,ay,bx,by){

    var aGridConn = {};
    
    aGridConn.a = {};
    aGridConn.a.x = ax;
    aGridConn.a.y = ay;
    aGridConn.a.witch = gameScene.grid.witches[ay][ax];
    
    aGridConn.b = {};
    aGridConn.b.x = bx;
    aGridConn.b.y = by;
    aGridConn.b.witch = gameScene.grid.witches[by][bx];
    
    aGridConn.serial = gridConnections.serialNumber;
    gridConnections.serialNumber += 1;
    
    aGridConn.power = 0;
    
    aGridConn.update = function(_frame){
        
        aGridConn.power += 1;
        
    };
    
    aGridConn.draw = function(_frame){
        
        var cellWidth, cellHeight, gridStart, anmFrame;
        
        cellWidth = game.resources.contextDom.width/gameScene.grid.subdivs[0];
        cellHeight = (gameScene.grid.height*game.sf)/gameScene.grid.subdivs[1];
        gridStart = game.resources.contextDom.height - (gameScene.grid.height*game.sf);
        
        anmFrame = (Math.floor(_frame/3)%5);
        
    
        game.resources.canvas.drawImage(game.resources["circlelevel1"],
                                        anmFrame*127,0,127,106,
                                        aGridConn.a.x*cellWidth,
                                        gridStart+aGridConn.a.y*cellHeight,
                                        63*game.sf,53*game.sf);
                                        
        game.resources.canvas.drawImage(game.resources["circle_selectionlight"],
                                        0,0,127,106,
                                        aGridConn.a.x*cellWidth,
                                        gridStart+aGridConn.a.y*cellHeight,
                                        63*game.sf ,53*game.sf);
                                        
        game.resources.canvas.drawImage(game.resources["circlelevel1"],
                                        anmFrame*127,0,127,106,
                                        aGridConn.b.x*cellWidth,
                                        gridStart+aGridConn.b.y*cellHeight,
                                        63*game.sf ,53*game.sf);
                                        
        game.resources.canvas.drawImage(game.resources["circle_selectionlight"],
                                        0,0,127,106,
                                        aGridConn.b.x*cellWidth,
                                        gridStart+aGridConn.b.y*cellHeight,
                                        63*game.sf ,53*game.sf);
                                        
        
        var lw = Math.sin(_frame/2)*2;
        for( var l = 10; l > 1; l -= 1){
        
            game.resources.canvas.lineWidth     = 6+l*2+lw;
            game.resources.canvas.strokeStyle   = "rgba(255,255,255,"+.20+")";
            game.resources.canvas.beginPath();
            game.resources.canvas.moveTo(aGridConn.a.x*cellWidth+(cellWidth/2),
                                         gridStart+aGridConn.a.y*cellHeight+(cellHeight/2));
            game.resources.canvas.lineTo(aGridConn.b.x*cellWidth+(cellWidth/2),
                                         gridStart+aGridConn.b.y*cellHeight+(cellHeight/2));
            game.resources.canvas.stroke();
        }
        
        if(tbl.debugGrid){
        
            game.resources.canvas.lineWidth = 3;
            game.resources.canvas.strokeStyle = "#FFFFFF";
            game.resources.canvas.beginPath();
            game.resources.canvas.moveTo(aGridConn.a.x*cellWidth+(cellWidth/2),
                                         gridStart+aGridConn.a.y*cellHeight+(cellHeight/2));
            game.resources.canvas.lineTo(aGridConn.b.x*cellWidth+(cellWidth/2),
                                         gridStart+aGridConn.b.y*cellHeight+(cellHeight/2));
            game.resources.canvas.stroke();
            
            game.resources.canvas.beginPath();
            game.resources.canvas.arc(aGridConn.b.x*cellWidth+(cellWidth/2),
                                      gridStart+aGridConn.b.y*cellHeight+(cellHeight/2),
                                      10,0,Math.PI*2,true);
            game.resources.canvas.stroke();
            
            game.resources.canvas.beginPath();
            game.resources.canvas.arc(aGridConn.a.x*cellWidth+(cellWidth/2),
                                      gridStart+aGridConn.a.y*cellHeight+(cellHeight/2),
                                      10,0,Math.PI*2,true);
            game.resources.canvas.stroke();
        
        }
    };
    
    return aGridConn;
}

gridConnections.clearOldest = function(){

    var j = 0, aConnection = null, targetConnectionIndex = -1, minSerial = Number.MAX_VALUE-1;
    
    for(j = 0; j < gameScene.grid.connections.length; j++){
        aConnection = gameScene.grid.connections[j];
        if(aConnection && aConnection.serial < minSerial){
            minSerial = aConnection.serial;
            targetConnectionIndex = j;
        }
    }
    
    if(targetConnectionIndex != -1){
        gameScene.grid.connections[targetConnectionIndex] = null;
    }
    
}

gridConnections.connectionForWitch = function(_witch){
    
    var j = 0, i = 0, aConnection = null;
    
    for(j = 0; j < gameScene.grid.connections.length; j++){
        aConnection = gameScene.grid.connections[j];
        if(aConnection) {
            
            var witchA = gameScene.grid.witches[aConnection.a.y][aConnection.a.x];
            var witchB = gameScene.grid.witches[aConnection.b.y][aConnection.b.x];
            
            if(witchA == _witch){
                return aConnection;
            }
            
            if(witchB == _witch){
                return aConnection;
            }
            
        }
    }
    
}
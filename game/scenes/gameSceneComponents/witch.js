var witchUnit = {};

witchUnit.summon = function(x,y,type){
    
    var newWitch = {};
    
    newWitch.x = x;
    newWitch.y = y;
    newWitch.type = type;
    newWitch.chargeCounter = 0;
    newWitch.deltaPosition = { x:-1+Math.floor(Math.random()*2),
                               y:-1+Math.floor(Math.random()*2)};
    newWitch.animationSeed = Math.floor((Math.random()*10));

    newWitch.charge = function(){
        newWitch.chargeCounter += 1;
        //console.log("chargeCounter: "+newWitch.chargeCounter);
    }
    
    newWitch.discharge = function(){
        newWitch.chargeCounter = 0;
    }
    
    newWitch.update = function(_frame){
        if(newWitch.chargeCounter == tbl.shootThreshold){
        
            var conn = gridConnections.connectionForWitch(newWitch);
            hadouken.registerForWitch(newWitch, [conn.a.witch.type, conn.b.witch.type]);
            newWitch.discharge();
        }
    };
    
    newWitch.draw = function(_frame){
    
        var cellWidth, cellHeight, gridStart, avatarImage, anmFrame;
        
        cellWidth   = game.resources.contextDom.width/gameScene.grid.subdivs[0];
        cellHeight  = (gameScene.grid.height*game.sf)/gameScene.grid.subdivs[1];
        gridStart   = game.resources.contextDom.height - gameScene.grid.height*game.sf;

        if(gridConnections.connectionForWitch(newWitch)){
            
            anmFrame = (Math.floor((_frame+newWitch.animationSeed)/5)%tbl.witches[newWitch.type].sprites.cast.frames);
            
            game.resources.canvas.drawImage(game.resources[tbl.witches[newWitch.type].sprites.cast.file],
                                            102*anmFrame,0,102,111,
                                            cellWidth*newWitch.x+(newWitch.deltaPosition.x+10)*game.sf,
                                            gridStart+cellHeight*newWitch.y-(25+newWitch.deltaPosition.y)*game.sf,
                                            51*game.sf,56*game.sf);
        }else{
            
            anmFrame = (Math.floor((_frame+newWitch.animationSeed)/5)%tbl.witches[newWitch.type].sprites.idle.frames);
            
            game.resources.canvas.drawImage(game.resources[tbl.witches[newWitch.type].sprites.idle.file],
                                            102*anmFrame,0,102,111,
                                            cellWidth*newWitch.x+(newWitch.deltaPosition.x+10)*game.sf,
                                            gridStart+cellHeight*newWitch.y-(25+newWitch.deltaPosition.y)*game.sf,
                                            51*game.sf,56*game.sf);
            
        }
        
        //game.resources.canvas.fillStyle = "#CDCDCD";
        //game.resources.canvas.fillRect((cellWidth/2-10)+cellWidth*newWitch.x, gridStart+cellHeight*newWitch.y, 20, 30);
        
    };
    
    return newWitch;
    
}

witchUnit.boothFromConnection = function(aConn){
    var witchA = gameScene.grid.witches[aConn.a.y][aConn.a.x];
    var witchB = gameScene.grid.witches[aConn.b.y][aConn.b.x];
    return [witchA,witchB];
}
var kobolds = {};

kobolds.horda = [];
kobolds.waveIndex = 0;

kobolds.update = function(_frame){
    
    for(var j = 0; j < kobolds.horda.length; j++){
        var kobold = kobolds.horda[j];
        kobold.update(_frame);
    }
    
    if(kobolds.horda.length == 0){
        kobolds.framesToNextWave = kobolds.nextWave();
    }
    
}

kobolds.draw = function(_frame){
    
    for(var j = 0; j < kobolds.horda.length; j++){
        var kobold = kobolds.horda[j];
        kobold.draw(_frame);
    }
    
}

kobolds.addKobold = function (_type){

    var kobold = {};
    
    kobold.type = _type;
    kobold.posX = 0;
    kobold.posY = 0;
    kobold.totalLife    = tbl.kobolds[kobold.type].maxHP;
    kobold.life         = tbl.kobolds[kobold.type].maxHP;
    kobold.weakness     = tbl.kobolds[kobold.type].weakness;
    kobold.dyingFrames  = 20;
    kobold.wasHit       = 0;
    
    kobold.takeDamage = function(_demageStrength){
        
        kobold.life -= _demageStrength;
        if(kobold.life < 0) kobold.life = 0;
        kobold.wasHit = 5;
    }
    
    kobold.draw = function(_frame){
        
        if(!kobold.life && !kobold.dyingFrames) return;
        
        var cellWidth, cellHeight, gridStart, anmFrame, imgTag, frameWidht, lifebar, hiddenFrame;
        
        cellWidth   = game.resources.contextDom.width/gameScene.grid.subdivs[0];
        cellHeight  = (gameScene.grid.height*game.sf)/gameScene.grid.subdivs[1];
        gridStart   = game.resources.contextDom.height - gameScene.grid.height*game.sf;
        
        if(!kobold.life && kobold.dyingFrames){
            imgTag = game.resources[tbl.kobolds[kobold.type].sprites.dead.file];
            frameWidht = imgTag.width/tbl.kobolds[kobold.type].sprites.dead.frames;
            anmFrame = 0;
            lifebar = false;
            hiddenFrame = kobold.dyingFrames%4 > 2 ? true: false;
        }else if(kobold.wasHit && kobold.type == 0){
            imgTag = game.resources[tbl.kobolds[kobold.type].sprites.hit.file];
            frameWidht = imgTag.width/tbl.kobolds[kobold.type].sprites.hit.frames;
            anmFrame = 0;
            lifebar = true;
            hiddenFrame = false;
        }else{
            imgTag = game.resources[tbl.kobolds[kobold.type].sprites.walk.file];
            frameWidht = imgTag.width/tbl.kobolds[kobold.type].sprites.walk.frames;
            anmFrame = (Math.floor((_frame)/2.3)%tbl.kobolds[kobold.type].sprites.walk.frames);
            lifebar = true;
            hiddenFrame = false;
        }

        
        // corpo
        if(!hiddenFrame){
            game.resources.canvas.drawImage(imgTag,
                                            frameWidht*anmFrame, 0,
                                            frameWidht,imgTag.height,
                                            10*game.sf+kobold.posX, kobold.posY+20,
                                            frameWidht/2*game.sf,imgTag.height/2*game.sf);
        }
                                        
        if(lifebar == true){
            // fundo da barra
            game.resources.canvas.drawImage(game.resources["health_null"],
                                            0,0,
                                            game.resources["health_null"].width/2*game.sf,
                                            game.resources["health_null"].height/2*game.sf,
                                            10*game.sf+kobold.posX, kobold.posY,
                                            game.resources["health_null"].width/2*game.sf,
                                            game.resources["health_null"].height/2*game.sf);
                                             
                                             
            // vida
            game.resources.canvas.drawImage(game.resources["health_full"],
                                            0,0,
                                            game.resources["health_full"].width/2*game.sf*(kobold.life/kobold.totalLife),
                                            game.resources["health_full"].height/2*game.sf,
                                            10*game.sf+kobold.posX, kobold.posY,
                                            game.resources["health_full"].width/2*game.sf*(kobold.life/kobold.totalLife),
                                            game.resources["health_full"].height/2*game.sf);
        }
        
        if(gameScene.playerInDanger() == kobold){
            
        }
    } 
    
    kobold.update = function(_frame){
        
        if(kobold.life){
            if(!gameScene.koboldReachPlayer()){
                if(!kobold.wasHit){
                    kobold.posY += tbl.koboldsSpeed*game.sf;
                }else{
                    kobold.posY -= 0.1;
                }
            }else{
                gameScene.gameOverNow();
            }
        }else{
            if(kobold.dyingFrames){
               kobold.dyingFrames--;
               kobold.posY -= .5*game.sf+Math.sin(_frame/1.5)*3*game.sf;
            }else{
                for(var j = 0; j < kobolds.horda.length; j++){
                    var akobold = kobolds.horda[j];
                    if(akobold == kobold){
                        kobolds.horda.splice(j,1);
                        console.log("Horda size: "+kobolds.horda.length);
                        break;
                    }
                }
            }
        }
        
        if(kobold.wasHit) kobold.wasHit -= 1;
        
    }
    
    return kobold;
    
}

kobolds.nextWave = function(){
    
    if(tbl.waves.length <= kobolds.waveIndex) return -1;
    
    var tickets, i, j, waveDetails, cellWidth, cellHeight;
    
    cellWidth   = game.resources.contextDom.width/gameScene.grid.subdivs[0];
    cellHeight  = (gameScene.grid.height*game.sf)/gameScene.grid.subdivs[1];
    gridStart   = game.resources.contextDom.height - gameScene.grid.height*game.sf;
    
    waveDetails      = tbl.waves[kobolds.waveIndex];
    tickets = [];
    
    console.log("WAVE:"+kobolds.waveIndex);
    
    for( i = 0; i < tbl.grid[0]; i ++){
        for( j = 0; j < tbl.waves[kobolds.waveIndex][2]; j ++){
            tickets.push({x:i,y:j});
        }
    }
    
    for( i = 0; i < 2; i ++){
        for( j = 0; j < tbl.waves[kobolds.waveIndex][i]; j ++){
            
            var koboldPosition, koboldObj;
            
            koboldPosition = (tickets.splice(Math.floor(Math.random()*tickets.length),1))[0];
            koboldObj = kobolds.addKobold( i ? Math.floor(1+(Math.random()*(tbl.kobolds.length-1))) : 0);
            
            koboldObj.posX = koboldPosition.x*cellWidth;
            koboldObj.posY = (koboldPosition.y+1)*(tbl.minimumDistanceBetweenKobolds*game.sf)*-1;
            
            kobolds.horda.push(koboldObj);
            
        }
    }
    
    kobolds.waveIndex += 1;
    
}


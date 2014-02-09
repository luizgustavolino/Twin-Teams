var hadouken = {};

hadouken.shoots = [];

hadouken.update = function(_frame){
    
    var j ,i, aShoot, oneKobold;
    
    for(j = 0; j < hadouken.shoots.length; j++){
    
        aShoot = hadouken.shoots[j];
        aShoot.update(_frame);
        
        for( i = 0; i < kobolds.horda.length; i++){
            oneKobold = kobolds.horda[i];
            
            if(Math.abs((oneKobold.posY + 40*game.sf) - aShoot.position.y) < 5*game.sf &&
               Math.abs((oneKobold.posX + 40*game.sf) - aShoot.position.x) < 10*game.sf &&
               aShoot.position.y > 0 && oneKobold.life && !aShoot.justHit){
                
                var damage = 0;
                
                if(oneKobold.weakness == aShoot.powers[0] || oneKobold.weakness == -1){
                    damage += tbl.baseAttackPower*tbl.attackMultiplier;
                }else{
                    damage += tbl.baseAttackPower;
                }
                
                if(oneKobold.weakness == aShoot.powers[1] || oneKobold.weakness == -1){
                    damage += tbl.baseAttackPower*tbl.attackMultiplier;
                }else{
                    damage += tbl.baseAttackPower;
                }
                
                oneKobold.takeDamage(damage);
                aShoot.justHit = true;
                
            }
            
        }
        
    }
    
}

hadouken.draw = function(_frame){
    
    for(var j = 0; j < hadouken.shoots.length; j++){
        var aShoot = hadouken.shoots[j];
        aShoot.draw(_frame);
    }
    
}

hadouken.registerForWitch = function(_witch, _powers){
    
    var shoot = {}, cellWidth, cellHeight, gridStart;
    
    cellWidth = game.resources.contextDom.width/gameScene.grid.subdivs[0];
    cellHeight = (gameScene.grid.height*game.sf)/gameScene.grid.subdivs[1];
    gridStart = game.resources.contextDom.height - (gameScene.grid.height*game.sf);
    
    shoot.originalTile  = {x:_witch.x, y:_witch.y};
    shoot.position      = {x:_witch.x*cellWidth+(cellWidth/2),
                           y:gridStart+_witch.y*cellHeight+(cellHeight/2)};
                           
    shoot.powers        = _powers;
    shoot.fadeIn        = 10;
    shoot.justHit       = false;
    
    shoot.update = function(_frame){
        
        var shouldRemove = false;
        
        if(shoot.justHit == false){
            shoot.position.y -= tbl.shootSpeed*game.sf;
            if(shoot.position.y < -200){
                shouldRemove = true;
            }
        }else{
            shouldRemove = true;
        }
        
        if(shouldRemove){
            for(var j = 0; j < hadouken.shoots.length; j++){
                var aShoot = hadouken.shoots[j];
                if(aShoot == shoot){
                    hadouken.shoots.splice(j, 1);
                }
            }
        }
    }
    
    shoot.draw = function(_frame){
        
        if(shoot.justHit == false){
            
             
            if(shoot.fadeIn > 0){
                game.resources.canvas.globalAlpha = 1 - (shoot.fadeIn/10);
            }
            
            var imageLabel  = null;
            
            if(shoot.powers[0] == 0 && shoot.powers[1] == 0){
                imageLabel = "magic_fire_projectile";
            } else if(shoot.powers[0] == 1 && shoot.powers[1] == 1){
                imageLabel = "magic_stone_projectile";
            } else if(shoot.powers[0] == 2 && shoot.powers[1] == 2){
                imageLabel = "magic_thunder_projectile";
            } else if(shoot.powers[0] == 0 && shoot.powers[1] == 1 ||
                      shoot.powers[1] == 0 && shoot.powers[0] == 1){
                imageLabel = "magic_firestone_projectile";
            } else if(shoot.powers[0] == 2 && shoot.powers[1] == 1 ||
                      shoot.powers[1] == 2 && shoot.powers[0] == 1){
                imageLabel = "magic_stonethunder_projectile";
            } else if(shoot.powers[0] == 2 && shoot.powers[1] == 0 ||
                      shoot.powers[1] == 2 && shoot.powers[0] == 0){
                imageLabel = "magic_thunderfire_projectile";
            } else{
                imageLabel = "magic_fire_projectile";
            }
            
            game.resources.canvas.drawImage(game.resources[imageLabel],
                                            (Math.floor(_frame/5)%3)*48,0,
                                            48,107,
                                            shoot.position.x-12, shoot.position.y-30,
                                            48/2*game.sf,107/2*game.sf);
            if(shoot.fadeIn > 0){
                shoot.fadeIn -= 1;
                game.resources.canvas.globalAlpha = 1.0;
            }
            
        }
        
    }
    
    hadouken.shoots.push(shoot);
    
}
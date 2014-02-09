game.resources = {};

game.resources.harvest = function(){

    game.resources.contextDom = document.getElementById("viewport");
	game.resources.canvas     = game.resources.contextDom.getContext("2d");

    var imageSet = ["img_background", "fire_idle", "fire_cast", "stone_idle", "stone_cast",
    "thunder_idle", "thunder_cast", "circle_selectionlight","circlelevel1","connection_diagonal1",
    "connection_diagonal2","connection_horizontal","connection_vertical","enemy_neutral_dead","enemy_neutral_walk",
    "enemy_neutral_hit","enemy_shield_fireweak","enemy_shield_stoneweak","enemy_shield_thunderweak",
    "health_full","health_null","magic_fire_projectile","magic_stone_projectile",
    "magic_stonethunder_projectile","magic_thunder_projectile","magic_thunderfire_projectile","magic_firestone_projectile",
    "gameover_bg","gameover_char", "logo", "button_play", "tutorial"];
    
    for(var i = 0; i < imageSet.length; i++){
        var imageName = imageSet[i];
        game.resources[imageName] = document.getElementById(imageName);
    }
    
}
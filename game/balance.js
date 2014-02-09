game.balance = {};


game.balance["level1"] = {
    debugGrid: false, // mostra os grids coloridos
    grid: [5,3], // Tamanho do grid onde ficam as meninas
    gridHeight: 160, // Altura do grid na tela em pxls
    maxConnections: 2, // Número máximo de conexões
    removeConnectionTail: true, // Remove automaticamente o último
    shootThreshold: 24, // Limiar para ativar os projéteis
    shootSpeed: 8, // Velocidade dos tiros
    minimumDistanceBetweenKobolds: 100, // distancia entre inimigos
    koboldsSpeed: 0.5, // tamanho do passo dos kobolds
    baseAttackPower: 2, // dano causado por hit
    attackMultiplier: 5, // multiplicador de dano
    autoChooseGrid: false, // randomiza os magos do grid
    grids:[
        
        // TIPO A
        [[1,2,0,2,0],
         [1,0,2,1,2],
         [0,2,1,0,1]],
         
        // TIPO B
        [[1,2,2,0,1],
         [0,1,0,2,1],
         [0,2,1,2,0]],
         
        // TIPO C
        [[2,1,0,1,0],
         [1,2,1,0,2],
         [0,1,2,0,2]],
         
        // TIPO D
        [[0,1,1,0,0],
        [1,2,0,2,1],
        [2,0,1,2,0]],
            
        // TIPO E
        [[2,0,0,1,2],
        [0,2,0,0,2],
        [0,1,1,1,2]]
    ],
    witches:[
         {// 0 - FOGO
             "sprites":{
                "idle":{file:"fire_idle",frames:4},
                "cast":{file:"fire_cast",frames:6}
             }
         // 1 - PEDRA
         },{
             "sprites":{
                "idle":{file:"stone_idle",frames:4},
                "cast":{file:"stone_cast",frames:6}
             }
         // 2 - RAIO
         },{
             "sprites":{
                "idle":{file:"thunder_idle",frames:4},
                "cast":{file:"thunder_cast",frames:6}
             }
         }
    ],
    kobolds:[
        {
            name:"neutral",
            maxHP: 100,
            weakness: -1,
            sprites:{
                walk:{file:"enemy_neutral_walk",frames:8},
                hit:{file:"enemy_neutral_hit",frames:2},
                dead:{file:"enemy_neutral_dead",frames:1}
            }
        },{
            name:"fireweak",
            maxHP: 100,
            weakness: 0,
            sprites:{
                walk:{file:"enemy_shield_fireweak",frames:8},
                hit:{file:"enemy_neutral_hit",frames:2},
                dead:{file:"enemy_neutral_dead",frames:1}
            }
        },{
             name:"stoneweak",
             maxHP: 100,
             weakness: 1,
             sprites:{
                walk:{file:"enemy_shield_stoneweak",frames:8},
                hit:{file:"enemy_neutral_hit",frames:2},
                dead:{file:"enemy_neutral_dead",frames:1}
             }
        },{
             name:"thunderweak",
             maxHP: 100,
             weakness: 2,
             sprites:{
                walk:{file:"enemy_shield_thunderweak",frames:8},
                hit:{file:"enemy_neutral_hit",frames:2},
                dead:{file:"enemy_neutral_dead",frames:1}
             }
        }
    ],
    waves:[
        [  5,  0, 4],
        [  4,  3, 8],
        [  5,  5, 8],
        [  5,  7, 8],
        [  3, 11, 8],
        [  4, 12, 9],
        [  5, 13, 10],
        [  4, 14, 10],
        [  4,  16, 12],
        [  5,  18, 13],
        [  5,  20, 14]
    ]
}

// inicial
game.balance.tag = "level1";
var tbl = game.balance[game.balance.tag];
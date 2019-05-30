import Player from "./player.js";
import Camera from "./camera.js";
import Hook from "./hook.js";
import GameEntity from "./game_entity.js";
import Platform from "./platform.js";
import Cursor from "./cursor.js";
import Coin from "./coin.js";


const debugSeed = function (game) {
let playerConfig = {
      x: 205,
      y: 566,
      xLen: 25,
      yLen: 30,
      context: game.context,
      game: game,
      platformCollision: game.platformCollision,
      physicsObj: true,
      physicsCollision: game.physicsCollision,
      viewPort: game.viewPort,
      // addEntity: game.addEntity,  //inteded to add hok atfirst
      deleteEntity: game.deleteEntity,
      image: game.spriteSheet,
    }
    
    let hookConfig = {
      x: playerConfig.x,
      y: playerConfig.y,
      xLen: 10,
      yLen: 10,
      active: false,
      context: game.context,
      game: game,
      platformCollision: game.platformCollision,
      viewPort: game.viewPort,
    }
    game.hook = new Hook(hookConfig);
    
    playerConfig.hook = game.hook;
    
    
    let coinConfig = {
      x: 600,
      y: 566,
      xLen: 40,
      yLen: 40,
      context: game.context,
      color: "yellow",
    };

    let testCoin = new Coin(coinConfig);
    game.activeEntities['coin1'] = testCoin;
    game.coins.push(testCoin);
    // game.coins.push(testCoin);

    //put all these in a seed file and use call/apply 
    let platform = new Platform({
      x: 0,
      y: game.canvas.attributes.height.value - 50,
      xLen: game.canvas.attributes.width.value,
      yLen: 25,
      context: game.context
    })
    game.platforms.push(platform);
    // game.entities.push(game.platform);
    game.activeEntities['platform1'] = platform;

    game.platform2 = new Platform({
      x: 50,
      y: 0,
      xLen: 25,
      yLen: game.canvas.attributes.height.value,
      context: game.context
    })
    game.platforms.push(game.platform2);
    // game.entities.push(game.platform2);
    game.activeEntities['platform2'] = game.platform2;

    game.platform3 = new Platform({
      x: 0,
      y: 25,
      xLen: game.canvas.attributes.width.value,
      yLen: 25,
      context: game.context
    })
    game.platforms.push(game.platform3);
    // game.entities.push(game.platform3);
    game.activeEntities['platform3'] = game.platform3;

    game.platform4 = new Platform({
      x: game.canvas.attributes.width.value - 50,
      y: 0,
      xLen: 25,
      yLen: game.canvas.attributes.height.value,
      context: game.context
    })
    game.platforms.push(game.platform4);
    // game.entities.push(game.platform2);
    game.activeEntities['platform4'] = game.platform4;


    game.platform5 = new Platform({
      x: 400,
      y: 400,
      xLen: 40,
      yLen: 40,
      context: game.context
    })
    game.platforms.push(game.platform5);
    // game.entities.push(game.platform2);
    game.activeEntities['platform5'] = game.platform5;


    //old physics box
    game.box = new GameEntity(Object.assign({}, playerConfig, {x: 255, y: 205}));
    // game.entities.push(game.box);
    game.activeEntities['box'] = game.box;
    game.physicsObjs.push(game.box);






    //add player to game
    //hook object created below hookConfig
    game.player = new Player(playerConfig);
    game.camera = new Camera(playerConfig);
    game.camera.x = 0;
    game.camera.y = 0;
    game.camera.center = {x: game.x + (1280 / 2), y: game.y + (720 / 2)}



    // game.entities.push(game.player);
    game.activeEntities['player'] = game.player;
    game.activeEntities['hook'] = game.hook;

    
    game.physicsObjs.push(game.player);


    game.entities = Object.values(game.activeEntities);
}

export default debugSeed;
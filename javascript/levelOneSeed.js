import Player from "./player.js";
import Camera from "./camera.js";
import Hook from "./hook.js";
import GameEntity from "./game_entity.js";
import Platform from "./platform.js";
import Cursor from "./cursor.js";
import Coin from "./coin.js";


const levelOneSeed = function (game) {
  //give each object an id
  let coinConfig, coin, platformConfig

  // let coinConfig = {
  //   x: 600,
  //   y: 566,
  //   xLen: 40,
  //   yLen: 40,
  //   context: game.context,
  //   color: "yellow",
  // };
  // ===============================================================
  //Seed Platforms
  platform = new Platform({
    x: 0,
    y: game.canvas.attributes.height.value - 50,
    xLen: game.canvas.attributes.width.value,
    yLen: 25,
    context: game.context
  })
  game.platforms.push(platform);
  game.activeEntities['platform1'] = platform;



// ================================================================
  //Seed Coins
  coin = new Coin({
    x: 600,
    y: 566,
    xLen: 40,
    yLen: 40,
    context: game.context,
    color: "yellow",
  })
  game.coins.push(coin);
  game.activeEntities['coin1'] = coin;







  

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
  let hook = new Hook(hookConfig);

  playerConfig.hook = hook;

  //add player to game
  //hook object created below hookConfig
  //player and camera should be game attritbutes for update funciton
  game.player = new Player(playerConfig);
  game.camera = new Camera(playerConfig);
  game.camera.x = 0;
  game.camera.y = 0;
  game.camera.center = {
    x: game.x + (1280 / 2),
    y: game.y + (720 / 2)
  }



  // game.entities.push(game.player);
  game.activeEntities['player'] = game.player;
  game.activeEntities['hook'] = game.hook;


  game.physicsObjs.push(game.player);


  game.entities = Object.values(game.activeEntities);
}

export default levelOneSeed;
import Player from "./player.js";
import Camera from "./camera.js";
import Hook from "./hook.js";
import GameEntity from "./game_entity.js";
import Platform from "./platform.js";
import Cursor from "./cursor.js";
import Coin from "./coin.js";


const levelOneSeed = function (game) {
  //give each object an id
  let coinConfig, coin, platformConfig, platform;
  game.score = 0;
  game.entities = [];
  game.platforms = [];
  game.coins = [];
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
    x: 1152,
    y: 800,
    xLen: 32,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);
  
  platform = new Platform({
    x: 1600,
    y: 960,
    xLen: 64,
    yLen: 64,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);
  
  platform = new Platform({
    x: 0,
    y: 992,
    xLen: 2336,
    yLen: 64,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);
  platform = new Platform({
    x: 1728,
    y: 928,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);
  
  platform = new Platform({
    x: 1856,
    y: 896,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);
  
  platform = new Platform({
    x: 1952,
    y: 704,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 2240,
    y: 800,
    xLen: 96,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 2464,
    y: 608,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 2790,
    y: 608,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 3040,
    y: 832,
    xLen: 576,
    yLen: 64,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 3680,
    y: 800,
    xLen: 96,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 3840,
    y: 768,
    xLen: 96,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 4000,
    y: 608,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 4032,
    y: 352,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 4224,
    y: 96,
    xLen: 32,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 4544,
    y: 192,
    xLen: 256,
    yLen: 64,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 5184,
    y: 256,
    xLen: 32,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 5536,
    y: 416,
    xLen: 32,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 5792,
    y: 448,
    xLen: 160,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 5952,
    y: 928,
    xLen: 416,
    yLen: 64,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 6400,
    y: 768,
    xLen: 32,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 6560,
    y: 854,
    xLen: 96,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 6848,
    y: 704,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 6784,
    y: 480,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 6784,
    y: 256,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 7072,
    y: 224,
    xLen: 96,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 7136,
    y: 96,
    xLen: 640,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 7584,
    y: 544,
    xLen: 32,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new Platform({
    x: 7616,
    y: 896,
    xLen: 384,
    yLen: 64,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);



// ================================================================
  //Seed Coins
  coin = new Coin({
    x: 480,
    y: 928,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 864,
    y: 864,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 1152,
    y: 640,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 1664,
    y: 896,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 1792,
    y: 864,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 1952,
    y: 608,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 2272,
    y: 736,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 2464,
    y: 800,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 2624,
    y: 704,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 2688,
    y: 512,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 2880,
    y: 416,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 3040,
    y: 512,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 3296,
    y: 768,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 3616,
    y: 736,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 3808,
    y: 704,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 4032,
    y: 704,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 4128,
    y: 576,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  // ???????
  coin = new Coin({
    x: 4032,
    y: 480,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 3904,
    y: 352,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 4032,
    y: 224,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 4224,
    y: 192,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 4384,
    y: 96,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 4576,
    y: 96,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 4992,
    y: 192,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 5088,
    y: 384,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 5312,
    y: 384,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 5440,
    y: 256,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 5632,
    y: 256,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 5792,
    y: 352,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6016,
    y: 416,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6016,
    y: 640,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6016,
    y: 832,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6464,
    y: 832,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6464,
    y: 832,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6720,
    y: 768,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6848,
    y: 832,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6976,
    y: 736,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6880,
    y: 576,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6688,
    y: 544,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6656,
    y: 416,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6816,
    y: 352,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 6912,
    y: 256,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 7232,
    y: 256,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 7456,
    y: 192,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 7648,
    y: 192,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 7776,
    y: 256,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 7776,
    y: 480,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new Coin({
    x: 7776,
    y: 704,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);




  
  //offset is temporary fix to platform placements
  let offset = 150;

  let playerConfig = {
    x: 192,
    y: 928 - offset,
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
    audioPlayer: game.audioPlayer,
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
  
  
  game.entities.push(game.player);
  game.entities.push(hook);

  game.physicsObjs.push(game.player);

  for(let i = 0; i < game.entities.length; i++){
    game.entities[i].y -= offset;
  }
  for(let i = 0; i < game.coins.length; i++){
    game.coins[i].y -= offset;
  }
  for(let i = 0; i < game.platforms.length; i++){
    game.platforms[i].y -= offset;
  }


  // game.entities = Object.values(game.activeEntities);
}

export default levelOneSeed;
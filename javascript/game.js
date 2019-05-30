import Player from "./player.js";
import Camera from "./camera.js";
import Hook from "./hook.js";
import GameEntity from "./game_entity.js";
import Platform from "./platform.js";
import Cursor from "./cursor.js";
import Coin from "./coin.js";
import debugSeed from "./debug.js";

const PLAYER_KEYS = ['a', 'd', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '];


class Game {
  constructor(options){
   //preload 
    const spriteSheet = new Image();
    this.canvas = options.canvas;
    this.context = options.context;
    this.viewPort = options.viewPort;
    spriteSheet.src = "./images/industrial.v2.png";
    this.spriteSheet = spriteSheet;
    this.keyCodePress = {13: false}
    this.score = 0;
    
    this.gameState = 0;
    //state 0 = title screen, state 1 = active, possibly each state represents a level?
    
    this.platforms = [];
    this.entities = [];
    this.coins = [];
    
    this.physicsObjs = [];
    this.staticObjs = [];
    this.activeEntities = {};
    
    this.gravDir = 1;

    this.platformCollision = this.platformCollision.bind(this);
    this.physicsCollision = this.physicsCollision.bind(this);
    this.addEntity = this.addEntity.bind(this);
    this.deleteEntity = this.deleteEntity.bind(this);
    
    const canvas = document.getElementById('game-canvas');

    document.addEventListener('keydown', (event) => {
      if(event.keyCode === 13){
        this.keyCodePress['enter'] = true;
      }
    });
    //add keybind to change states
    window.onkeydown = function (event) {
      console.log('prevent input');
      //prevent screen from moving
      // return (!event.keycode == 32);
    }
    let cursorConfig = {
      x: 300,
      y: 300,
      xLen: 25,
      yLen: 25,
      context: this.context,
    }
    this.run = false;
    this.cursor = new Cursor(cursorConfig);
    

    //test timer
    // window.run = false;
    // this.preview = window.setInterval(function(){
    //   console.log('hey there')
    //   window.run = !window.run;
    // }, 3000)

    // this.entities.push(this.cursor);
    // this.activeEntities['cursor'] = this.cursor;
  }
  
  
  initialize(){
    // //give each object an id
    debugSeed(this);
    // //init with seed file?
    // //game init
    // let playerConfig = {
    //   x: 205,
    //   y: 566,
    //   xLen: 25,
    //   yLen: 30,
    //   context: this.context,
    //   game: this,
    //   platformCollision: this.platformCollision,
    //   physicsObj: true,
    //   physicsCollision: this.physicsCollision,
    //   viewPort: this.viewPort,
    //   // addEntity: this.addEntity,  //inteded to add hok atfirst
    //   deleteEntity: this.deleteEntity,
    //   image: this.spriteSheet,
    // }
    
    // let hookConfig = {
    //   x: playerConfig.x,
    //   y: playerConfig.y,
    //   xLen: 10,
    //   yLen: 10,
    //   active: false,
    //   context: this.context,
    //   game: this,
    //   platformCollision: this.platformCollision,
    //   viewPort: this.viewPort,
    // }
    // this.hook = new Hook(hookConfig);
    
    // playerConfig.hook = this.hook;
    
    
    // let coinConfig = {
    //   x: 600,
    //   y: 566,
    //   xLen: 40,
    //   yLen: 40,
    //   context: this.context,
    //   color: "yellow",
    // };

    // let testCoin = new Coin(coinConfig);
    // this.activeEntities['coin1'] = testCoin;
    // this.coins.push(testCoin);
    // // this.coins.push(testCoin);

    // //put all these in a seed file and use call/apply 
    // let platform = new Platform({
    //   x: 0,
    //   y: this.canvas.attributes.height.value - 50,
    //   xLen: this.canvas.attributes.width.value,
    //   yLen: 25,
    //   context: this.context
    // })
    // this.platforms.push(platform);
    // // this.entities.push(this.platform);
    // this.activeEntities['platform1'] = platform;

    // this.platform2 = new Platform({
    //   x: 50,
    //   y: 0,
    //   xLen: 25,
    //   yLen: this.canvas.attributes.height.value,
    //   context: this.context
    // })
    // this.platforms.push(this.platform2);
    // // this.entities.push(this.platform2);
    // this.activeEntities['platform2'] = this.platform2;

    // this.platform3 = new Platform({
    //   x: 0,
    //   y: 25,
    //   xLen: this.canvas.attributes.width.value,
    //   yLen: 25,
    //   context: this.context
    // })
    // this.platforms.push(this.platform3);
    // // this.entities.push(this.platform3);
    // this.activeEntities['platform3'] = this.platform3;

    // this.platform4 = new Platform({
    //   x: this.canvas.attributes.width.value - 50,
    //   y: 0,
    //   xLen: 25,
    //   yLen: this.canvas.attributes.height.value,
    //   context: this.context
    // })
    // this.platforms.push(this.platform4);
    // // this.entities.push(this.platform2);
    // this.activeEntities['platform4'] = this.platform4;


    // this.platform5 = new Platform({
    //   x: 400,
    //   y: 400,
    //   xLen: 40,
    //   yLen: 40,
    //   context: this.context
    // })
    // this.platforms.push(this.platform5);
    // // this.entities.push(this.platform2);
    // this.activeEntities['platform5'] = this.platform5;


    // //old physics box
    // this.box = new GameEntity(Object.assign({}, playerConfig, {x: 255, y: 205}));
    // // this.entities.push(this.box);
    // this.activeEntities['box'] = this.box;
    // this.physicsObjs.push(this.box);






    // //add player to game
    // //hook object created below hookConfig
    // this.player = new Player(playerConfig);
    // this.camera = new Camera(playerConfig);
    // this.camera.x = 0;
    // this.camera.y = 0;
    // this.camera.center = {x: this.x + (1280 / 2), y: this.y + (720 / 2)}



    // // this.entities.push(this.player);
    // this.activeEntities['player'] = this.player;
    // this.activeEntities['hook'] = this.hook;

    
    // this.physicsObjs.push(this.player);


    // this.entities = Object.values(this.activeEntities);
  }

  
  addEntity(entity, id) {
    this.activeEntities[id] = entity;
    this.entities = Object.values(this.activeEntities);
  }
  

  deleteEntity(id) {
    delete this.activeEntities[id];
    this.entities = Object.values(this.activeEntities)
  }

  //main game logic loop
  update(){
    //each game step
    switch(this.gameState){
      //start screen
      case 0: 
      this.context.fillStyle = 'white'
      this.context.font = "bold 64px Montserrat";
      this.context.fillText("GrappleHook", 120, 150);
      // this.context.fillText("GrappleHook", this.canvas.attributes.width.value / 2 - (30 * 6), this.canvas.attributes.height.value / 2 - 10);
      this.context.font = "32px Montserrat";
      this.context.fillText("Press Enter to Start", this.canvas.attributes.width.value - 400, this.canvas.attributes.height.value - 50);
      // this.context.fillText("Press Enter to Start", this.canvas.attributes.width.value / 2 - (30 * 5), this.canvas.attributes.height.value / 2 + 30);
      
      if(this.keyCodePress['enter'] === true){
        this.gameState = 1;
        clearInterval(this.preview);
        this.initialize();
      }

      // if(window.run){
      //   this.viewPort.x += 0.2;
      // }
      //run preview


      let viewMove = 0.5;
      // console.log(this.viewPort.x)
      if(this.viewPort.x + viewMove >= 4192){
        this.viewPort.x = 0;
      } 
      this.viewPort.x += viewMove;
      this.cursor.draw();
      break;


      //game logic
      case 1: 
      this.viewPort.x = this.player.x - (this.canvas.attributes.width.value / 2);
      this.viewPort.y = this.player.y - (this.canvas.attributes.height.value / 2);
      
      this.applyGravity();
      
      // this.camera.x = this.player.x - (1280 / 2);
      // this.camera.y = this.player.y - (720 / 2);
      
      for(let i = 0; i < this.entities.length; i++){
        if(this.entities[i].active) {
          this.entities[i].update(this.viewPort);
        }
      }
      //coins can either be implemented thorugh the object itself checking reference and updating the game, or do the check from the game object;
      for(let i = 0; i < this.coins.length; i++){
        if(this.player.positionMeeting(this.player.x, this.player.y, this.coins[i]) && this.coins[i].active){
            this.score += 10;
            this.coins[i].active = false;
          }
        }
        //draw in game UI (score)
        this.context.fillStyle = 'white'
        this.context.font = "bold 32px Montserrat";
        this.context.fillText(`Points: ${this.score}`, this.canvas.attributes.width.value - 220, 100);
        this.cursor.draw();
        break;
      }
    
  }



  physicsCollision(x, y, obj){
    //check collision with physics objs
    for (let i = 0; i < this.physicsObjs.length; i++) {
      // obj.positionMeeting(obj.x, obj.y, platforms[i]);
      if (
        (
          (x + obj.xLen > this.physicsObjs[i].x && x < this.physicsObjs[i].x + this.physicsObjs[i].xLen) &&
          (y + obj.yLen > this.physicsObjs[i].y && y < this.physicsObjs[i].y + this.physicsObjs[i].yLen) && 
          obj != this.physicsObjs[i]
        )
      ) {
        return true;
      }
    }
    return false;
  }

  platformCollision(x, y, obj){
  //check if new position overlaps with any platforms in platforms entitity
    for (let i = 0; i < this.platforms.length; i++) {
      // obj.positionMeeting(obj.x, obj.y, platforms[i]);
      if (
        (
          (x + obj.xLen > this.platforms[i].x && x < this.platforms[i].x + this.platforms[i].xLen) &&
          (y + obj.yLen > this.platforms[i].y && y < this.platforms[i].y + this.platforms[i].yLen)
          )
      ) {
        return true;
      }
    }
    return false;
  }


  applyGravity(){
    //iterate over list of entities and apply gravity
    for(let i = 0; i < this.physicsObjs.length; i++){
      let curObj = this.physicsObjs[i];
      
      //normal gravity
      if(this.gravDir > 0){
        if(curObj.vspd < 6 && !this.platformCollision(curObj.x, curObj.y + curObj.vspd, curObj)){
          curObj.vspd += 0.2;
        }
      }
      else {
        if(curObj.vspd > -6 && !this.platformCollision(curObj.x, curObj.y + curObj.vspd, curObj)) {
          curObj.vspd -= 0.2;
        }
      }
    }
  }

}

export default Game;
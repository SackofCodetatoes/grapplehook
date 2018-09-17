const Player = require("./player.js");
const GameEntity = require("./game_entity.js");
const Platform = require("./platform.js");
const Hook = require("./hook.js");
const HookPoint = require("./hook_point.js");

class Game {
  constructor() {
    this.entities = {};
    this.canvas = document.getElementById('game-canvas');
    this.context = this.canvas.getContext('2d');
    this.platforms = [];
    this.spriteSheet;
    // this.spriteSheet.onload = draw;
  }

  
  init() {
    //testing purposes
    // debugger
    this.platforms = [];
    const playerOptions = {
      x: 25,
      y: 25,
      context: this.context,
      color: 'blue',
      x_len: 25,
      y_len: 25,
      game: this,
      image: this.spriteSheet,
    };
    const staticOptions = {
      x: 0,
      y: 0,
      context: this.context,
      color: 'red',
      x_len: 40,
      y_len: 40,
      context: this.context,
    };
    const platformOptions = {
      x: 0,
      y: 600,
      color: 'black',
      context: this.context,
      x_len: 640,
      y_len: 100,
      image: this.spriteSheet,
    }
    const platformOptions2 = {
      x: 320,
      y: 250,
      color: 'black',
      context: this.context,
      x_len: 100,
      y_len: 50,
      image: this.spriteSheet,
    }
    const platformOptions3 = {
      x: 400,
      y: 0,
      color: 'black',
      context: this.context,
      x_len: 20,
      y_len: 400,
      image: this.spriteSheet,
    }
    const grappleHookOptions = {
      x: playerOptions.x,
      y: playerOptions.y,
      color: 'black',
      context: this.context,
      x_len: 0,
      y_len: 0,
    }
    const hookPointOptions = {
      x: playerOptions.x + playerOptions.x_len/2,
      y: playerOptions.y + playerOptions.y_len/2,
      color: 'yellow',
      context: this.context,
      x_len: 10,
      y_len: 10,
    }


    // this.move_dir = 1;
    this.entities['platform'] = new Platform(platformOptions);
    platformOptions2.y = 550; 
    this.entities['platform2'] = new Platform(platformOptions2);
    platformOptions2.y = 250;

    this.entities['platform3'] = new Platform(platformOptions3);
    platformOptions.x = 800;
    this.entities['platform4'] = new Platform(platformOptions);
    
    platformOptions2.x = 800;
    this.entities['platform5'] = new Platform(platformOptions2);
    platformOptions2.x = 1200;
    this.entities['platform6'] = new Platform(platformOptions2);
    platformOptions2.x = 1600;
    this.entities['platform7'] = new Platform(platformOptions2);
    platformOptions2.x = 2000;
    this.entities['platform8'] = new Platform(platformOptions2);
    platformOptions2.x = 2400;
    this.entities['platform9'] = new Platform(platformOptions2)
    platformOptions.x = 2500;
    this.entities['platform10'] = new Platform(platformOptions);
    platformOptions3.x = 2700;
    this.entities['platform11'] = new Platform(platformOptions3);
    platformOptions2.x = 2900;
    this.entities['platform12'] = new Platform(platformOptions2);
    platformOptions3.x = 3200;
    this.entities['platform13'] = new Platform(platformOptions2);

    this.entities['platform14'] = new Platform(platformOptions2);
    this.entities['platform15'] = new Platform(platformOptions2);
    this.entities['platform16'] = new Platform(platformOptions2);
    this.entities['platform17'] = new Platform(platformOptions2);
    this.entities['platform18'] = new Platform(platformOptions2);






    // this.entities['staticEntity'] = new GameEntity(staticOptions);
    this.entities['newPlayer'] = new Player(playerOptions);
    this.entities['hook'] = new Hook(grappleHookOptions);
    this.entities['hookPoint'] = new HookPoint(hookPointOptions);
    
    this.platforms.push(this.entities.platform); 
    this.platforms.push(this.entities.platform2); 
    this.platforms.push(this.entities.platform3); 
    this.platforms.push(this.entities.platform4); 
    this.platforms.push(this.entities.platform5); 
    this.platforms.push(this.entities.platform6); 
    this.platforms.push(this.entities.platform7); 
    this.platforms.push(this.entities.platform8); 
    this.platforms.push(this.entities.platform9); 
    this.platforms.push(this.entities.platform10); 
    this.platforms.push(this.entities.platform11); 
    this.platforms.push(this.entities.platform12); 
    this.platforms.push(this.entities.platform13); 
    this.platforms.push(this.entities.platform14); 
    this.platforms.push(this.entities.platform15); 
    this.platforms.push(this.entities.platform16); 
    this.platforms.push(this.entities.platform17); 
    this.platforms.push(this.entities.platform18); 




    this.entities.newPlayer.collisionCheck = this.collisionCheck;
    // this.entities['camera'] = {prevX: this.entities.newPlayer.x}
  }
  gravStep(obj){
    obj.vspd += 2;
    return obj;
  }
  xCollisionCheck(obj){
      let platforms = this.platforms;
      for (let i = 0; i < platforms.length; i++) {
        if (
          (
            (obj.x + obj.x_len > platforms[i].x && obj.x < platforms[i].x + platforms[i].x_len) &&
            (obj.y + obj.y_len > platforms[i].y && obj.y < platforms[i].y + platforms[i].y_len))
        ) {
          return true;
        }
      }
      return false;
  }
  collisionCheck(obj) {
    // debugger
    let platforms = this.platforms;
    for(let i = 0; i < platforms.length; i++){
      if( 
        (
          (obj.x + obj.x_len > platforms[i].x && obj.x < platforms[i].x + platforms[i].x_len) &&
          (obj.y + obj.y_len > platforms[i].y && obj.y < platforms[i].y + platforms[i].y_len))
        ) {
          return true;
      }
    }
    return false;
  }


} //end of scope

module.exports = Game;
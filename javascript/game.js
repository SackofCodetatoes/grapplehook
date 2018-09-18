const Player = require("./player.js");
const GameEntity = require("./game_entity.js");
const Platform = require("./platform.js");
const Coin = require("./coin.js");
const Hook = require("./hook.js");
const HookPoint = require("./hook_point.js");

class Game {
  constructor() {
    this.entities = {};
    this.canvas = document.getElementById('game-canvas');
    this.context = this.canvas.getContext('2d');
    this.platforms = [];
    this.coins = [];
    this.spriteSheet;
    // this.spriteSheet.onload = draw;
  }


  init() {
    //testing purposes
    // debugger
    this.platforms = [];
    
    const coinOptions = {
      x: 400,
        y: 650,
        context: this.context,
        color: 'yellow',
        x_len: 25,
        y_len: 25,
        game: this,
        // image: this.spriteSheet
      };
      
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
      
      const platformOptions = {
        x: 0,
        y: 700,
        color: 'black',
        context: this.context,
        x_len: 640,
        y_len: 100,
        image: this.spriteSheet,
    }
    const platformOptions2 = {
      x: 320,
      y: 350,
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
    this.entities['coin'] = new Coin(coinOptions);
    this.coins.push(this.entities.coin);
    
    this.entities['platform'] = new Platform(platformOptions);
    platformOptions2.y = 650; 
    platformOptions2.x = 620;
    this.entities['platform2'] = new Platform(platformOptions2);
    platformOptions2.y = 250;
    
    
    coinOptions.x = 1000;
    this.entities['coin1'] = new Coin(coinOptions);
    this.coins.push(this.entities.coin1);
    
    coinOptions.x = 1500;
    coinOptions.y = 550;
    this.entities['coin2'] = new Coin(coinOptions);
    this.coins.push(this.entities.coin2);
    // this.entities['platform2'] = new Platform(platformOptions3);
    platformOptions.x = 600;
    this.entities['platform3'] = new Platform(platformOptions);
    
    
    
    platformOptions2.x = 600;
    platformOptions2.y = 650;
    platformOptions2.x_len = 300;
    platformOptions2.y_len = 200;
    this.entities['platform4'] = new Platform(platformOptions2);
    
    
    platformOptions2.x = 1200;
    platformOptions2.y = 650;
    this.entities['platform5'] = new Platform(platformOptions2);
    
    platformOptions2.x = 1400;
    platformOptions2.y = 600;
    this.entities['platform20'] = new Platform(platformOptions2);
    
    coinOptions.x = 1840;
    coinOptions.y = 500;
    this.entities['coin3'] = new Coin(coinOptions);
    this.coins.push(this.entities.coin3);
    
    platformOptions2.x_len = 100
    platformOptions2.y_len = 50
    platformOptions2.y = 550;
    platformOptions2.x = 1800;
    this.entities['platform6'] = new Platform(platformOptions2);
    
    
    coinOptions.x = 2140;
    coinOptions.y = 500;
    this.entities['coin4'] = new Coin(coinOptions);
    this.coins.push(this.entities.coin4);
    platformOptions2.x = 2100;
    this.entities['platform7'] = new Platform(platformOptions2);
    
    
    coinOptions.x = 2440;
    coinOptions.y = 500;
    this.entities['coin5'] = new Coin(coinOptions);
    this.coins.push(this.entities.coin5);
    platformOptions2.x = 2400;
    this.entities['platform8'] = new Platform(platformOptions2)
    
    //add some coins
    
    
    coinOptions.x = 3040;
    coinOptions.y = 550;
    this.entities['coin6'] = new Coin(coinOptions);
    this.coins.push(this.entities.coin6);
    coinOptions.x = 3240;
    coinOptions.y = 500;
    this.entities['coin7'] = new Coin(coinOptions);
    this.coins.push(this.entities.coin7);
    coinOptions.x = 3440;
    coinOptions.y = 450;
    this.entities['coin8'] = new Coin(coinOptions);
    this.coins.push(this.entities.coin8);
    
    platformOptions2.y = 250;
    platformOptions.x = 2500;
    platformOptions.x_len = 1500;
    this.entities['platform9'] = new Platform(platformOptions);
    
    platformOptions3.x = 2700;
    platformOptions3.x_len = 50;
    
    this.entities['platform10'] = new Platform(platformOptions3);
    platformOptions2.x = 2700;
    platformOptions2.x_len = 950;
    platformOptions2.y_len = 350;
    platformOptions2.y = 0;
    this.entities['platform11'] = new Platform(platformOptions2);
    
    platformOptions2.y = 650;
    platformOptions2.x_len = 100
    platformOptions2.y_len = 50
    platformOptions2.x = 3900;
    this.entities['platform12'] = new Platform(platformOptions2);
    
    platformOptions2.x = 4000;
    platformOptions2.y = 600;
    platformOptions2.y_len = 600;
    
    this.entities['platform13'] = new Platform(platformOptions2);
    // platformOptions2.x_len = 100
    // platformOptions2.y_len = 50
    
    
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
    
    for(let i = 14; i < 20; i ++){
      let name = 'platform';
      platformOptions2.x += 100;
      platformOptions2.y -= 50;
      
      this.entities[name+i] = new Platform(platformOptions2);
      this.platforms.push(this.entities[name+i]);
    }
    this.platforms.push(this.entities.platform20);
    
    platformOptions2.x = 4650;
    platformOptions2.y = 0;
    platformOptions2.y_len = 50;
    platformOptions2.x_len = 750;
    this.entities['platform21'] = new Platform(platformOptions2);
    this.platforms.push(this.entities.platform21);
    
    platformOptions2.x = 5400;
    platformOptions2.y = 650;
    platformOptions2.y_len = 50;
    platformOptions2.x_len = 2500;
    this.entities['platform22'] = new Platform(platformOptions2);
    this.platforms.push(this.entities.platform22);
    
    
    
    this.entities['newPlayer'] = new Player(playerOptions);
    this.entities.newPlayer.collisionCheck = this.collisionCheck;
    // this.entities['camera'] = {prevX: this.entities.newPlayer.x}
  }
  gravStep(obj){
    obj.vspd += 2;
    return obj;
  }
  
  collisionCheck(obj) {
    // debugger
    let platforms = this.platforms;
    for(let i = 0; i < platforms.length; i++){
      // obj.positionMeeting(obj.x, obj.y, platforms[i]);
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
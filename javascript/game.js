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
  }
  init() {
    //testing purposes
    const playerOptions = {
      x: 25,
      y: 25,
      context: this.context,
      color: 'blue',
      x_len: 25,
      y_len: 25,
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
      y: 450,
      color: 'black',
      context: this.context,
      x_len: 640,
      y_len: 20,
    }
    const platformOptions2 = {
      x: 200,
      y: 220,
      color: 'black',
      context: this.context,
      x_len: 100,
      y_len: 50,
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
      x: playerOptions.x,
      y: playerOptions.y,
      color: 'yellow',
      context: this.context,
      x_len: 10,
      y_len: 10,
    }


    // this.move_dir = 1;
    this.entities['platform'] = new Platform(platformOptions);
    this.entities['platform2'] = new Platform(platformOptions2);
    this.entities['staticEntity'] = new GameEntity(staticOptions);
    this.entities['newPlayer'] = new Player(playerOptions);
    this.entities['hook'] = new Hook(grappleHookOptions);
    this.entities['hookPoint'] = new HookPoint(hookPointOptions);
    this.platforms.push(this.entities.platform); 
    this.platforms.push(this.entities.platform2); 
    // debugger
  }
  gravStep(obj){
    obj.vspd += 2;
    // console.log(obj);
    return obj;
  }
  collisionCheck(obj) {
    // debugger
    let platforms = this.platforms;
    for(let i = 0; i < platforms.length; i++){
      if( 
        ((obj.x + obj.x_len > platforms[i].x && obj.x < platforms[i].x + platforms[i].x_len) &&
          (obj.y + obj.y_len > platforms[i].y && obj.y < platforms[i].y + platforms[i].y_len))
        ) {
          return true;
      }
    }
    return false;
  }


} //end of scope

module.exports = Game;
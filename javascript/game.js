const Player = require("./player.js");
const GameEntity = require("./game_entity.js");
const Platform = require("./platform.js");

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
      y: 400,
      color: 'black',
      context: this.context,
      x_len: 300,
      y_len: 20,
    }
    // this.move_dir = 1;
    this.entities['platform'] = new Platform(platformOptions);
    this.entities['staticEntity'] = new GameEntity(staticOptions);
    this.entities['newPlayer'] = new Player(playerOptions);
    this.platforms.push(this.entities.platform); 
  }

  collisionCheck(checkPos) {
    let platforms = this.platforms;
    for(let i = 0; i < platforms.length; i++){
      if( 
        ((checkPos.x > platforms[i].x) && (checkPos.x < (platforms[i].x + platforms[i].x_len))) && 
        ((checkPos.y > platforms[i].y) && (checkPos.y < (platforms[i].y + platforms[i].y_len)))
        ) {
          return true;
      }
    }
    return false;
  }


} //end of scope

module.exports = Game;
const Game = require("./game.js");
const Player = require("./player.js");
const GameEntity = require("./game_entity.js");


class Display {
  constructor(game){
    this.game = game;  
    this.game = this.game  
  }
  
  render(){  
    const canvas = this.game.canvas;
    const context = this.game.context;
    let newPlayer = this.game.entities.newPlayer;
    let staticEntity = this.game.entities.staticEntity;
    let move_dir = this.game.entities.move_dir;
    let entities = this.game.entities;
    
    
    setInterval(function () {
      context.clearRect(0, 0, 640, 480);
      context.fillStyle = 'orange'; //background
      context.fillRect(0, 0, 640, 480);
      entities.newPlayer.getInput();
    //Test Purposes
      if (entities.staticEntity.y > 200) {
        move_dir = -2;
      } else if (entities.staticEntity.y < 100) {
        move_dir = 2;
      }

      entities.staticEntity.y += move_dir;

      for(let i = 0; i < Object.values(entities).length; i++){
        requestAnimationFrame(Object.values(entities)[i].draw);
      }
      // requestAnimationFrame(entities.staticEntity.draw);
      // requestAnimationFrame(entities.newPlayer.draw);

    }, 1000 / 60);
  }
}

module.exports = Display;
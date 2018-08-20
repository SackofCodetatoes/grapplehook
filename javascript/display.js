const Game = require("./game.js");
const Player = require("./player.js");
const GameEntity = require("./game_entity.js");


class Display {
  constructor(game){
    this.game = game;    
  }
  
  render(){  
    const canvas = this.game.canvas;
    const context = this.game.context;
    let newPlayer = this.game.entities.newPlayer;
    let staticEntity = this.game.entities.staticEntity;
    let move_dir = this.game.entities.move_dir;

    setInterval(function () {
      context.clearRect(0, 0, 640, 480);
      context.fillStyle = 'orange';
      context.fillRect(0, 0, 640, 480);
      newPlayer.getInput();
      requestAnimationFrame(newPlayer.draw);

      //Test Purposes
      if (staticEntity.y > 200) {
        move_dir = -4;
      } else if (staticEntity.y < 100) {
        move_dir = 4;
      }
      staticEntity.y += move_dir;
      requestAnimationFrame(staticEntity.draw);

    }, 1000 / 60);
  }
}

module.exports = Display;
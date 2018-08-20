const Game = require("./game.js");
const Player = require("./player.js");
const GameEntity = require("./game_entity.js");


class Display {
  constructor(options){
    // this.game = options.game;    
  }
  
  render(){  
    window.player = Player;
    const canvas = document.getElementById('game-canvas');
    let context = canvas.getContext('2d');
    
    const playerOptions = {
      x: 25,
      y: 25,
      context: context,
      color: 'blue',
      x_len: 25,
      y_len: 25,
    };
    const staticOptions = {
      x: 0,
      y: 0,
      context: context,
      color: 'red',
      x_len: 40,
      y_len: 40,
    };
    
    window.newPlayer = new Player(playerOptions);
    window.move_dir = 1;
    window.staticEntity = new GameEntity(staticOptions);


    setInterval(function () {
      context.clearRect(0, 0, 640, 480);
      context.fillStyle = 'orange';
      context.fillRect(0, 0, 640, 480);
      newPlayer.getInput();
      requestAnimationFrame(newPlayer.draw);

      //Test Purposes
      if (window.staticEntity.y > 200) {
        window.move_dir = -4;
      } else if (window.staticEntity.y < 100) {
        window.move_dir = 4;
      }
      staticEntity.y += window.move_dir;
      requestAnimationFrame(staticEntity.draw);

    }, 1000 / 60);
  }
}

module.exports = Display;
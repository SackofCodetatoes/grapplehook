const Player = require("./player.js");
const GameEntity = require("./game_entity.js");

class Game {
  constructor() {
    this.entities = {};
    this.canvas = document.getElementById('game-canvas');
    this.context = this.canvas.getContext('2d');
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
    };

    this.entities['newPlayer'] = new Player(playerOptions);
    this.move_dir = 1;
    this.entities['staticEntity'] = new GameEntity(staticOptions);
  }
}

module.exports = Game;
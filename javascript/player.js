const GameEntity = require("./game_entity.js")

// const KEY_LEFT = (event.key === 'a');
class Player extends GameEntity {
  constructor(options) {
    super(options);
    this.move_spd = 2;
  }
}





module.exports = Player;

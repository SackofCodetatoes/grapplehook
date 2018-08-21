const GameEntity = require("./game_entity.js")

// const KEY_LEFT = (event.key === 'a');
class Player extends GameEntity {
  constructor(options) {
    super(options);
    this.moveSpd = 4;
  }
}





module.exports = Player;

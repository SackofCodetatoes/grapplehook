const GameEntitiy = require("./game_entity.js");

class Coin extends GameEntitiy {
  constructor(options){
    super(options);
  }

  move(){
    this.x -= 1;
  }

}

module.exports = Coin;
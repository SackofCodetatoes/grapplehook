const GameEntity = require("./game_entity");

class Platform extends GameEntity {
  constructor(options){
    super(options);
    // this.color = 'black';
    //replace the above with sprite dimensions
  }

  move(){
    this.x -= 1;
  }
  
}
module.exports = Platform;
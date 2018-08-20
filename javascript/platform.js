const GameEntity = require("./game_entity");

class Platform extends GameEntity {
  constructor(options){
    super(options);
    this.x_len = 50;
    this.y_len = 20;
    //replace the above with sprite dimensions
  }

  draw() {
    this.context.fillStyle = 'black';
    this.context.fillRect(this.x, this.y, )
  }
}
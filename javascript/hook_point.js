const GameEntity = require("./game_entity.js");

class HookPoint extends GameEntity {
  constructor(options){
    super(options);
    this.active = false;
  }
  draw() {
    this.context.fillStyle = 'yellow';
    this.context.fillRect(this.x, this.y, 10, 10);
    // this.context.rotate(0.3);
    // this.context.restore();
  }
  reset(x, y){
    this.x = x;
    this.y = y;
  }
}
module.exports = HookPoint;
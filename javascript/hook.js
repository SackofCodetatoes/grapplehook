const GameEntity = require("./game_entity.js");

class GrappleHook extends GameEntity {
  constructor(options){
    super(options);
    this.active = false;
  }

  draw(viewPort){
    this.context.strokeStyle = 'lightgray';
    this.context.beginPath();
    this.context.moveTo(this.x - viewPort.x, this.y - viewPort.y);
    this.context.lineTo(this.targetX - viewPort.x, this.targetY - viewPort.y);
    this.context.stroke();
  }
  snapshot(){
    return {x: this.x, y: this.y}
  }
}
module.exports = GrappleHook;
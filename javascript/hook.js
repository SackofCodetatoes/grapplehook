const GameEntity = require("./game_entity.js");

class GrappleHook extends GameEntity {
  constructor(options){
    super(options);
    this.active = false;
  }

  draw(viewPort){
    this.context.strokeStyle = 'lightgray';
    this.context.beginPath();
    this.context.moveTo(this.x - viewPort, this.y - viewPort);
    this.context.lineTo(this.targetX - viewPort, this.targetY - viewPort);
    this.context.stroke();
  }
  snapshot(){
    return {x: this.x, y: this.y}
  }
}
module.exports = GrappleHook;
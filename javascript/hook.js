const GameEntity = require("./game_entity.js");

class GrappleHook extends GameEntity {
  constructor(options){
    super(options);
    this.active = false;
  }

  draw(){
    this.context.strokeStyle = 'black';
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.targetX, this.targetY);
    this.context.stroke();
  }
}
module.exports = GrappleHook;
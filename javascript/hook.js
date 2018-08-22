const GameEntity = require("./game_entity.js");

class GrappleHook extends GameEntity {
  constructor(options){
    super(options);
    this.targetX = 0;
    this.targetY = 0;
    this.active = false;
  }

  draw(){
    this.context.fillStyle = 'black';
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.targetX, this.targetY);
    this.context.stroke();
  }
}
module.exports = GrappleHook;
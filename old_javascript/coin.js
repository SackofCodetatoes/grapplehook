const GameEntitiy = require("./game_entity.js");

class Coin extends GameEntitiy {
  constructor(options){
    super(options);
  }

  draw(viewPort) {
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'orange';
    this.context.fillStyle = 'yellow';
    this.context.arc(this.x + this.x_len / 2 - viewPort.x, this.y + this.y_len / 2 - viewPort.y, 10, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  }


  move(moveSpd){
    this.x += moveSpd;
  }

}

module.exports = Coin;
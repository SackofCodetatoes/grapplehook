import GameEntity from "./game_entity.js";

class Coin extends GameEntity{
  constructor(options){
    super(options);
    this.defaultColor = 'yellow';
  }
//add gravity mechanic to move towards player when near.
  draw(viewPort){
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'orange';
    this.context.fillStyle = 'yellow';
    this.context.arc(this.x + this.xLen / 2 - viewPort.x, this.y + this.yLen / 2 - viewPort.y, 20, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  }

}


export default Coin;
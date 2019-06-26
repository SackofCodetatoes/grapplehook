import GameEntitiy from "./game_entity.js";

class Platform extends GameEntitiy {
  constructor(options){
    super(options);
  }

  draw(viewPort){
    this.context.shadowOffsetX = 3;
    this.context.shadowOffsetY = 3;
    this.context.shadowColor = "rgba(0,0,0,0.3)";
    this.shadowBlur = 4;

    this.context.fillStyle = this.defaultColor;
    this.context.fillRect(this.x - viewPort.x, this.y - viewPort.y, this.xLen, this.yLen);
    this.context.shadowOffsetX = 0;
    this.context.shadowOffsetY = 0;
  }
}

export default Platform;
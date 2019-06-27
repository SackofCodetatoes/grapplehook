import GameEntity from "./game_entity.js";

class Camera extends GameEntity {
  constructor(options){
    super(options);
  }


  draw(){
    this.context.beginPath();
    this.context.rect(0, 0, this.canvas.attributes.width.value, this.canvas.attributes.height.value);
    this.context.stroke();
  }
}

export default Camera;
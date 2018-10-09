const GameEntity = require("./game_entity");

class Platform extends GameEntity {
  constructor(options){
    super(options);
    this.color = 'darkgray';
    this.image = options.image;

  }
  draw(viewPort){
      this.context.fillStyle = this.color;
      this.context.fillRect(this.x - viewPort.x, this.y - viewPort.y, this.x_len, this.y_len);
  }

  move(moveSpd, otherObj){
    if(this.positionMeeting(this.x+moveSpd, this.y, otherObj)){
      otherObj.x += moveSpd;
      // otherObj.vspd = 0;
      // otherObj.y += 1;
    }
    this.x += moveSpd;
  }
  
}
module.exports = Platform;
module.exports = Platform;
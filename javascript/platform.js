const GameEntity = require("./game_entity");

class Platform extends GameEntity {
  constructor(options){
    super(options);
    this.color = 'darkgray';
    this.image = options.image;

  }
  draw(){
    // if(this.y_len > this.x_len){
      // this.context.drawImage(this.image, 214, 128, 14, 81, this.x, this.y, 14, 81);
    // } else {
      this.context.fillStyle = this.color;
      this.context.fillRect(this.x, this.y, this.x_len, this.y_len);
    // }
  }

  move(moveSpd){
    this.x += moveSpd;
  }
  
}
module.exports = Platform;
class GameEntity {
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.context = options.context;
    this.color = options.color;
    this.x_len = options.x_len;
    this.y_len = options.y_len;
    this.draw = this.draw.bind(this);
    this.hspd = 0;
    this.vspd = 0;
    this.active = true;
    this.faceDir = 1;
  }
  draw(viewPort) {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x - viewPort.x, this.y - viewPort.y, this.x_len, this.y_len);
  }

  move() {
    this.x += this.hspd;
    this.y += this.vspd;
  }
  
  positionMeeting(x, y, otherObj){
    //return true or false if new position intersects other objects position

    //check right side
    if((x + this.x_len > otherObj.x && x < otherObj.x + otherObj.x_len) && 
      (y + this.y_len > otherObj.y && y < otherObj.y + otherObj.y_len)
    ) {
      // console.log('aw shoot');
      return true;
    }// end of if
    return false;
  }
}
module.exports = GameEntity;
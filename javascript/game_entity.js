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
  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.x_len, this.y_len);
  }

  move() {
    this.x += this.hspd;
    this.y += this.vspd;
  }
}
module.exports = GameEntity;
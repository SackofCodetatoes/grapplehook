class GameEntity {
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.context = options.context;
    this.draw = this.draw.bind(this);
  }
  draw() {
    // this.context.clearRect(0, 0, 640, 480);
    this.context.fillStyle = 'red';
    this.context.fillRect(this.x, this.y, this.x_len, this.y_len);
  }
}
module.exports = GameEntity;
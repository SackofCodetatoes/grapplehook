const GameEntity = require("./game_entity.js");

class HookPoint extends GameEntity {
  constructor(options){
    super(options);
    this.active = false;
    this.moveSpd = 20;
    this.target = {x: 0, y: 0};
    this.collided = false;
  }
  draw() {
    this.context.fillStyle = 'yellow';
    this.context.fillRect(this.x, this.y, 10, 10);
    // this.context.rotate(0.3);
    // this.context.restore();
  }
  reset(x, y){
    this.x = x;
    this.y = y;
    this.hspd = 0;
    this.vspd = 0;
    this.collided = false;
  }
  calcSpd(){
    let angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
    // console.log('heres an angle', angle);
    this.hspd = this.moveSpd * Math.cos(angle);
    this.vspd = this.moveSpd * Math.sin(angle);

  }
  move(){
    // https: //gist.github.com/conorbuck/2606166
    if(!this.collided){
      this.calcSpd();
    } else {
      this.hspd = 0;
      this.vspd = 0;
    }
    this.x += this.hspd;
    this.y += this.vspd;
  }
}
module.exports = HookPoint;
const GameEntity = require("./game_entity.js");

class HookPoint extends GameEntity {
  constructor(options){
    super(options);
    this.active = false;
    this.moveSpd = 40;
    this.target = {x: 0, y: 0};
    this.collided = false;
    this.snapCalc = false;
  }
  draw() {
    this.context.fillStyle = 'yellow';
    this.context.fillRect(this.x, this.y, 10, 10);
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
    // https: //gist.github.com/conorbuck/2606166
    let angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
    // console.log('heres an angle', angle);
    this.hspd = this.moveSpd * Math.cos(angle);
    this.vspd = this.moveSpd * Math.sin(angle);
    // debugger

  }
  move(){
    if(this.active){
     if(!this.collided){
       this.x += this.hspd;
       this.y += this.vspd;
      }
      else if(this.collided){
        // this.x -= 1;
      }
    }

    //  else {

    //   // debugger
    //   console.log('spds', this.hspd, this.vspd)
    //   this.x += this.hspd;
    //   this.y += this.vspd;
    //  }
  //      this.hspd = 0;
  //      this.vspd = 0;
  //    }
  //  }

   } 
  
}
module.exports = HookPoint;
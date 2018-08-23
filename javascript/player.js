const GameEntity = require("./game_entity.js")
const MOVE_STATES = ['move', 'fixed']
// const KEY_LEFT = (event.key === 'a');
class Player extends GameEntity {
  constructor(options) {
    super(options);
    this.moveSpd = 4;
    this.state = 'move';
    this.ropeLen = 0;
    this.ropeAngle;
    this.targetPoint = {}
  }

  move(){
    switch (this.state) {
      case 'move':
        this.x += this.hspd;
        this.y += this.vspd;
        break;

      case 'swing':
        this.ropeAngle = Math.atan2(this.targetPoint.y - this.y, this.targetPoint.x - this.x) * 180 / Math.PI;
        if(this.y + this.vspd > this.ropeLen){
          while(!this.y > this.ropeLen ){
            this.y+=1;
          }
          this.vspd = 0;
        }
        this.x += this.ropeLen * Math.cos(this.ropeAngle);
        this.y += this.ropeLen * Math.sin(this.ropeAngle);
        
        console.log(this.ropeLen);
        break;

      default:
        break;
    }
  }
}





module.exports = Player;

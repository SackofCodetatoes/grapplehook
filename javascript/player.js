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
    this.rotateSpd = .1;
  }

  move(){
    if(this.collided === true){
      console.log('set!');
    }
    switch (this.state) {
      case 'move':
        this.x += this.hspd;
        this.y += this.vspd;
        break;


      case 'swing':

        let center = this.targetPoint;
        this.ropeAngle = Math.atan2(this.targetPoint.y - this.y, this.targetPoint.x - this.x) * 180 / Math.PI;
        if(this.y + this.vspd > this.ropeLen){
          while(!this.y > this.ropeLen ){
            this.y+=1;
          }
        }
        //to the mathman i never could be:
        //https://math.stackexchange.com/questions/103202/calculating-the-position-of-a-point-along-an-arc
        let nextX = (center.x + (this.x - center.x) * Math.cos(this.rotateSpd) + (center.y - this.y) * Math.sin(this.rotateSpd));
        let nextY = (center.y + (this.y - center.y) * Math.cos(this.rotateSpd) + (this.x - center.x) * Math.sin(this.rotateSpd));
        // console.log('cur x and y pos', this.x, this.y);
        // console.log('nexts', nextX, nextY);
        // debugger
        this.x = nextX;
        this.y = nextY;
        // console.log('x and y pos', this.x, this.y );
        break;

      default:
        break;
    }
  }
}





module.exports = Player;

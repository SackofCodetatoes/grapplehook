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
    this.collsionCheck;
    this.game = options.game;
    this.image = options.image;
    this.snapX;
    this.snapY;
    this.rotateSpd = 0.03;
  }
  
  move(swingMove){
    switch (this.state) {
      case 'move':
        let testObj = Object.assign({}, this);
        testObj.x += testObj.hspd;
        testObj.y += testObj.vspd;

        if(!this.game.collisionCheck(testObj)){
          this.x += this.hspd;
          this.y += this.vspd;
        }
        else {
        }

        this.rotateSpd = 0.05;
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
        let nextX = (center.x + swingMove + (this.x - center.x + swingMove) * Math.cos(this.rotateSpd) + (center.y - this.y) * Math.sin(this.rotateSpd));
        let nextY = (center.y + swingMove + (this.y - center.y) * Math.cos(this.rotateSpd) + (this.x - center.x) * Math.sin(this.rotateSpd));

        //old working-ish
        // let nextX = (center.x + (this.x - center.x) * Math.cos(this.rotateSpd) + (center.y - this.y) * Math.sin(this.rotateSpd));
        // let nextY = (center.y + (this.y - center.y) * Math.cos(this.rotateSpd) + (this.x - center.x) * Math.sin(this.rotateSpd));

        this.hspd = nextX - this.x + swingMove;
        this.vspd = nextY - this.y;
        if(nextY < this.y && this.vspd > -4){
          this.vspd -= 1;
        }
        let test = Object.assign({}, this, {x: this.x, y: this.y + this.vspd});
        if(!this.game.collisionCheck(test)){
          this.y += this.vspd;
          this.x += this.hspd;
        } 

        else {
          //slide
          this.vspd = 0;
          this.x += this.hspd;
          //add bounce
          // this.rotateSpd = this.rotateSpd * -0.5;
        }
        
        break;

      default:
        break;
    }
  }
    draw(viewPort){
      this.context.drawImage(this.image, 0, 257, 14, 16, this.x - viewPort.x, this.y - viewPort.y, 30, 28);
      
    }

}





module.exports = Player;

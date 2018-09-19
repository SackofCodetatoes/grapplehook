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
    this.rotateSpd = .05;
    this.collsionCheck;
    this.game = options.game;
    this.image = options.image;
    this.snapX;
    this.snapY;
    this.rotateSpd = 0.05;

    // debugger
  }
  
  move(swingMove){
    // console.log('spds', this.hspd, this.vspd)
    // if(this.collided === true){
    //   // console.log('set!');
    // }
    switch (this.state) {
      case 'move':
        let testObj = Object.assign({}, this);
        testObj.x += testObj.hspd;
        testObj.y += testObj.vspd;
        if(!this.game.collisionCheck(testObj)){
          this.x += this.hspd;
          this.y += this.vspd;
        }
        if(this.snapX != undefined && this.snapY != undefined){
          this.snapX = undefined;
          this.snapY = undefined;
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
        // if(this.snapX == undefined && this.snapY == undefined){
        //   this.snapX = this.x;
        //   this.snapY = this.y;
        //   let radius = Math.sqrt(Math.pow(this.snapX - center.x, 2) + Math.pow(this.snapY - center.y, 2));
        // }
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
        let test = Object.assign({}, this, {x: this.x, y: this.y+ this.vspd});
        if(!this.game.collisionCheck(test)){
          this.y += this.vspd;
          this.x += this.hspd;
        } 
        else {
          //add bounce
          this.rotateSpd = this.rotateSpd * -0.5;
        }
        
        
        break;

      default:
        break;
    }
  }
    draw(){
      let count = 0;
      let x;
      let y;
      // if(this.faceDir === -1){
      //   this.context.scale(-1,1);
      // }
      // else {
      //   this.context.scale(1,1);
      // }
    
      // this.context.scale(-1, 1);

      this.context.drawImage(this.image, 0, 257, 14, 16, this.x, this.y, 30, 28);
      
    }

}





module.exports = Player;

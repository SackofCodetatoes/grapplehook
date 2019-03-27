import GameEntity from "./game_entity";


//hook object is the moving grapplehook
class Hook extends GameEntity {
  constructor(options){
    super(options)
    this.defaultColor = 'red';
    this.spd = 10;
    this.moving = false;
    this.state = 'ready';
  }

  //collides with walls and hook points

  update(viewPort){
    // if(this.moving){
    //   this.x += this.hspd;
    //   this.y += this.vspd;
    // }
    if(this.state === 'moving' || this.state === 'hooked') {
      if(this.platformCollision(this.x + this.hspd, this.y + this.vspd, this)){
        this.state = 'hooked';
      }
      else{
        this.x += this.hspd;
        this.y += this.vspd;
      }
      this.draw(viewPort)
    }
  }  

  updateTarget(target, from){
    let angle = Math.atan2(target.y - from.y, target.x - from.x);
    this.x = from.x;
    this.y = from.y;
    this.hspd = this.spd * Math.cos(angle);
    this.vspd = this.spd * Math.sin(angle);
    // this.moving = true;
    this.state = 'moving';
  }
}
export default Hook;

//if hook is off screen by x amount, reset
//review angles and speed
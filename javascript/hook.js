import GameEntity from "./game_entity";

class Hook extends GameEntity {
  constructor(options){
    super(options)
    this.defaultColor = 'red';
    this.spd = 10;
    this.moving = false;
  }

  //collides with walls and hook points

  update(viewPort){
    if(this.moving){
      this.x += this.hspd;
      this.y += this.vspd;
      this.draw(viewPort)
    }
  }  

  updateTarget(target, from){
    let angle = Math.atan2(target.y - from.y, target.x - from.x);
    this.x = from.x;
    this.y = from.y;
    this.hspd = this.spd * Math.cos(angle);
    this.vspd = this.spd * Math.sin(angle);
    this.moving = true;
  }
}
export default Hook;
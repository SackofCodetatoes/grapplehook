import GameEntity from "./game_entity";

class Hook extends GameEntity {
  constructor(options){
    super(options)
    this.defaultColor = 'red';
    this.spd = 10;
  }

  update(viewPort){
    
  }  

}
export default Hook;
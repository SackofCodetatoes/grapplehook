import GameEntity from "./game_entity.js"

const PLAYER_KEYS = ['a', 'd', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '];
// const PLAYER_KEYS = ['a', 'd', ' '];

class Player extends GameEntity {
  constructor(options){
    super(options);
    this.moveSpd = 4;
    this.jumpSpd = 6;
    this.game = options.game;
    this.platformCollision = options.platformCollision;


    this.takeInput = this.takeInput.bind(this);
    this.keyBind();
  }

  keyBind() {
    this.playerInput = {
      a: false,
      d: false,
      ArrowLeft: false,
      ArrowRight: false, 
      ArrowUp: false, 
      ArrowDown: false,
      ' ': false,
      canJump: true,
      canInvert: true,
    };

    const canvas = document.getElementById('game-canvas');

    //key press
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if(PLAYER_KEYS.includes(event.key)){
        this.playerInput[event.key] = true;
      }
    });
    // key release
    document.addEventListener('keyup', (event) => {
      if (PLAYER_KEYS.includes(event.key)) {
        this.playerInput[event.key] = false;
      }
    });

  }// end of keybind

  draw(viewPort){
    this.context.fillStyle = 'blue';
    this.context.fillRect(this.x - viewPort.x, this.y - viewPort.y, 25, 25);
  }

  takeInput(viewPort){
    if (this.playerInput.a) {     
        this.hspd = -this.moveSpd;
    }
    if (this.playerInput.d) {
        this.hspd = this.moveSpd;
    }

    if(this.playerInput[' '] && this.playerInput.canJump){
      this.vspd = this.jumpSpd * -this.game.gravDir;
      this.playerInput.canJump = false;
    }
    // if(this.playerInput.ArrowUp && this.playerInput.canInvert) {
    //   this.game.gravDir = this.game.gravDir * -1;
    //   this.playerInput.canInvert = false;
    // }
  }

  update(viewPort){
    this.takeInput();

    this.stepCollisionCheck();
    
    //reset jump limit
    if (this.platformCollision(this.x, this.y + (1 * this.game.gravDir), this) || this.physicsCollision(this.x, this.y + (1 * this.game.gravDir), this)) {
      this.playerInput.canJump = true;
      this.playerInput.canInvert = true;
    }
    

    this.draw(viewPort);
  }


}


export default Player;
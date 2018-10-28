import GameEntity from "./game_entity.js";
import Hook from "./hook.js";

const PLAYER_KEYS = ['a', 'd', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '];
// const PLAYER_KEYS = ['a', 'd', ' '];

class Player extends GameEntity {
  constructor(options){
    super(options);
    this.addEntity = options.addEntity;
    // this.deleteEntity = options.deleteEntity;
    this.hook = options.hook;
    this.moveSpd = 4;
    this.jumpSpd = 6;
    this.game = options.game;
    this.platformCollision = options.platformCollision;
    this.viewPort = options.viewPort;

    let hookConfig = {
      x: this.x,
      y: this.y,
      xLen: 10,
      yLen: 10,
      context: this.context,
      game: this,
      platformCollision: this.platformCollision,
      viewPort: this.viewPort,
    }

    this.hook = new Hook(hookConfig);
    this.addEntity(this.hook, 'hook');


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
      mouseDown: false,
      targetPoint: {x: this.x, y: this.y},
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

    canvas.addEventListener('mousedown', (event) => {
      // let targetPoint = {};
      this.playerInput.targetPoint.x = event.clientX - canvas.offsetLeft + this.viewPort.x;
      this.playerInput.targetPoint.y = event.clientY - canvas.offsetTop + this.viewPort.y;
      // console.log(targetPoint, {x: this.x, y: this.y});
      this.playerInput.mouseDown = true;
      this.hook.x = this.playerInput.targetPoint.x;
      this.hook.y = this.playerInput.targetPoint.y;
    })
    canvas.addEventListener('mouseup', (event) => {
      this.playerInput.mouseDown = false;
    })

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
import GameEntity from "./game_entity.js";
import Hook from "./hook.js";

const PLAYER_KEYS = ['a', 'd', 's', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '];
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
    this.hook = options.hook;
    //state 0 = not-swinging, state 1 = swinging

    this.state = 0;

    // let hookConfig = {
    //   x: this.x,
    //   y: this.y,
    //   xLen: 10,
    //   yLen: 10,
    //   context: this.context,
    //   game: this,
    //   platformCollision: this.platformCollision,
    //   viewPort: this.viewPort,
    // }

    // this.hook = new Hook(hookConfig);
    // this.addEntity(this.hook, 'hook');


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
      this.playerInput.targetPoint.x = event.clientX - canvas.offsetLeft + this.viewPort.x;
      this.playerInput.targetPoint.y = event.clientY - canvas.offsetTop + this.viewPort.y;
      // console.log(targetPoint, {x: this.x, y: this.y});
      this.playerInput.mouseDown = true;

      this.hook.updateTarget(this.playerInput.targetPoint, {x: this.x, y: this.y});

    })
    canvas.addEventListener('mouseup', (event) => {
      this.playerInput.mouseDown = false;
    })

  }// end of keybind

  draw(viewPort){
    this.context.fillStyle = 'blue';
    this.context.fillRect(this.x - viewPort.x, this.y - viewPort.y, 25, 25);
  }

  //takeinput more of applying input action
  takeInput(viewPort){
    switch(this.state){
      case 0: 
      //free move state
        if (this.playerInput.a) {     
            this.hspd = -this.moveSpd;
        }
        if (this.playerInput.d) {
            this.hspd = this.moveSpd;
        }

      break;

      case 1:
      //swing state
      break;
    }


    if(this.playerInput[' ']){
     if(this.playerInput.canJump || this.state === 1){
       this.vspd = this.jumpSpd * -this.game.gravDir;
       this.playerInput.canJump = false;
     }
     if(this.state === 1){
        this.hook.state = 'ready'
        this.hook.x = this.x;
        this.hook.y = this.y;
        this.state = 0;
     }
    }
    
    // if(this.playerInput.ArrowUp && this.playerInput.canInvert) {
    //   this.game.gravDir = this.game.gravDir * -1;
    //   this.playerInput.canInvert = false;
    // }
  }

  update(viewPort){
    this.takeInput();

    if(this.hook.state === 'hooked'){
      this.state = 1;
    }

    this.stepCollisionCheck();
    // this.stepPhysicsCollisionCheck();
    
    //reset jump limit
    if (this.platformCollision(this.x, this.y + (1 * this.game.gravDir), this) || this.physicsCollision(this.x, this.y + (1 * this.game.gravDir), this)) {
      this.playerInput.canJump = true;
      this.playerInput.canInvert = true;
    }
    

    this.draw(viewPort);
  }


}


export default Player;
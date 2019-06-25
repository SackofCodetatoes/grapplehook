import GameEntity from "./game_entity.js";
import Hook from "./hook.js";

const PLAYER_KEYS = ['a', 'A', 'd', 'D', 's', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', '1', '2'];
// const PLAYER_KEYS = ['a', 'd', ' '];

class Player extends GameEntity {
  constructor(options){
    super(options);
    this.image = options.image;
    this.addEntity = options.addEntity;
    // this.deleteEntity = options.deleteEntity;
    this.hook = options.hook;
    this.moveSpd = 4;//3 for slower
    this.jumpSpd = 6;
    this.game = options.game;
    this.platformCollision = options.platformCollision;
    this.viewPort = options.viewPort;
    this.hook = options.hook;
    this.debug = false;
    this.swingNext = {x: this.x, y: this.y};
    // this.rotateSpd = 0.05;
    this.rotateSpd = 0.05;

    this.audioPlayer = options.audioPlayer;
    //state 0 = not-swinging, state 1 = swinging
    this.ropeLength = 0;
    this.state = 0;
    this.spinDir = -1;
    


    //limit rope length to 300

    this.takeInput = this.takeInput.bind(this);
    this.keyBind();
  }

  keyBind() {
    this.playerInput = {
      a: false,
      d: false,
      1: false,
      2: false,
      ArrowLeft: false,
      ArrowRight: false, 
      ArrowUp: false, 
      ArrowDown: false,
      ' ': false,
      canJump: true,
      canInvert: true,
      mouseDown: false,
      targetPoint: {x: this.x, y: this.y},
      mousePos: {x: 0, y: 0}
    };

    const canvas = document.getElementById('game-canvas');

    //key press
    document.addEventListener('keydown', (event) => {
      let keyName = event.key;
      if(PLAYER_KEYS.includes(event.key)){
        if(event.key == 'A' || event.key == 'D'){
          keyName = keyName.toLocaleLowerCase();
          // event.key = event.key.toLocaleLowerCase();
        }
        this.playerInput[keyName] = true;
      }
    });
    // key release
    document.addEventListener('keyup', (event) => {
      let keyName = event.key;
      if (PLAYER_KEYS.includes(event.key)) {
        if(event.key == 'A' || event.key == 'D'){
          keyName = keyName.toLowerCase();
        }
        this.playerInput[keyName] = false;
      }
    });

    canvas.addEventListener('mousedown', (event) => {
      this.state = 0;
      this.playerInput.targetPoint.x = event.clientX - canvas.offsetLeft + this.viewPort.x;
      this.playerInput.targetPoint.y = event.clientY - canvas.offsetTop + this.viewPort.y;
      // console.log(targetPoint, {x: this.x, y: this.y});
      this.playerInput.mouseDown = true;

      this.hook.updateTarget(this.playerInput.targetPoint, {x: this.x, y: this.y});
      this.audioPlayer.playEffect('fire');
    })
    canvas.addEventListener('mouseup', (event) => {
      this.playerInput.mouseDown = false;
    })

    canvas.addEventListener('mousemove', (event) => {
      this.playerInput.mousePos.x = event.clientX - canvas.offsetLeft + this.viewPort.x;
      this.playerInput.mousePos.y = event.clientY - canvas.offsetTop + this.viewPort.y;
    })

  }// end of keybind

  draw(viewPort){
    //draw rope if hook is in motion
    if(this.hook.state === 'moving' || this.hook.state === 'hooked'){
      this.ropeLength = Math.sqrt(Math.pow(Math.abs(this.x - this.hook.x), 2) + Math.pow(Math.abs(this.y - this.hook.y), 2));
      this.context.beginPath();
      this.context.strokeStyle = 'rgba(255, 255, 255, 0.8)';

      //view for dynamic viewport (centers on player)
      this.context.moveTo(this.x + this.xLen / 2 - (viewPort.x), this.y + this.yLen / 2 - (viewPort.y));
      this.context.lineTo(this.hook.x + this.hook.xLen / 2 - (viewPort.x), this.hook.y + this.yLen / 2 - (viewPort.y));

      //view for static viewport
      // this.context.moveTo(this.x + this.xLen / 2, this.y + this.yLen / 2);
      // this.context.lineTo(this.hook.x + this.hook.xLen / 2, this.hook.y + this.yLen / 2);


      this.context.stroke();

    }

    // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    //Draw sprite
    if(this.vspd !== 0){
      this.context.drawImage(this.image, 0, 273, 14, 16, this.x - viewPort.x, this.y - viewPort.y, 30, 30);
    }
    else{
      this.context.drawImage(this.image, 0, 256, 14, 16, this.x - viewPort.x, this.y - viewPort.y, 30, 30);
    }

  }

  //takeinput more of applying input action
  takeInput(viewPort){
    switch(this.state){
      case 0: 
      //free move state
        if (this.playerInput.a || this.playerInput.A) {     
            this.hspd = -this.moveSpd;
        }
        if (this.playerInput.d || this.playerInput.D) {
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
       this.audioPlayer.playEffect('jump');
       
       this.playerInput.canJump = false;


     }
     if(this.state === 1){
        this.resetHook();
     }
    }
    //GravShift Code
    // if(this.playerInput.ArrowUp && this.playerInput.canInvert) {
    //   this.game.gravDir = this.game.gravDir * -1;
    //   this.playerInput.canInvert = false;
    // }
    
    //Debug tool
    if(this.playerInput['1']){
      this.debug = true;
    }
    if(this.playerInput['2']){
      this.debug = false;
    }
  }
  resetHook(){
    this.hook.state = 'ready'
    this.hook.x = this.x;
    this.hook.y = this.y;
    this.state = 0;

  }

  update(viewPort){
    if(this.debug){
      // console.log('X: ', this.playerInput.mousePos.x, 'Y: ', this.playerInput.mousePos.y)
      console.log(this.playerInput);
    }
    this.takeInput();
    //check for swing state
    if(this.hook.state === 'hooked'){
      if(this.state !== 1){
        if (this.x > this.hook.x) {
          this.spinDir = 1;
        } else this.spinDir = -1;      
        this.state = 1;
      }
  }


    switch(this.state){
      case 0: 
        this.stepCollisionCheck();
        break;


      case 1: //swing state
       //og swing code
      //  let targetCenter = this.playerInput.targetPoint;
        let targetCenter = {x: this.hook.x, y: this.hook.y};
        this.ropeAngle = Math.atan2(targetCenter.y - this.y, targetCenter.x - this.x) * 180 / Math.PI;
        if(this.ropeAngle < 0){
          this.ropeAngle = 360 + this.ropeAngle;
        }
        //credit to the math-man i never could be:
        //https://math.stackexchange.com/questions/103202/calculating-the-position-of-a-point-along-an-arc
        this.swingNext.x = (targetCenter.x + (this.x - targetCenter.x) * Math.cos(this.rotateSpd) + (targetCenter.y - this.y) * Math.sin(this.rotateSpd));
        this.swingNext.y = (targetCenter.y + (this.y - targetCenter.y) * Math.cos(this.rotateSpd) + (this.x - targetCenter.x) * Math.sin(this.rotateSpd));
        this.hspd = this.spinDir * (this.swingNext.x - this.x);
        this.vspd = this.spinDir * (this.swingNext.y - this.y);
        //fix hooked and then hook bug


        this.stepCollisionCheck();
        break;

    }

    // this.stepPhysicsCollisionCheck();
    
    //reset jump limit
    if (this.platformCollision(this.x, this.y + (1 * this.game.gravDir), this) || this.physicsCollision(this.x, this.y + (1 * this.game.gravDir), this)) {
      this.playerInput.canJump = true;
      this.playerInput.canInvert = true;
    }

    if(this.ropeLength > 350){
      this.ropeLength = 0;
      this.resetHook();
    }

    this.draw(viewPort);
  }
  

  swingStep(){

  }


}


export default Player;
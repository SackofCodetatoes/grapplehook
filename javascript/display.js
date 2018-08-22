const Game = require("./game.js");
const Player = require("./player.js");
const GameEntity = require("./game_entity.js");
const PLAYER_KEYS = ['w', 'a', 's', 'd', 'f'];

class Display {
  constructor(game){
    this.game = game;  
    this.game = this.game  
    this.playerInput = {
      a: false,
      d: false,
      w: false,
      s: false,
      ' ': false,
      canJump: 'true',
      mousePos: {x: 0, y: 0}
    }
    this.keyBind();
    // debugger
    this.getInput = this.getInput.bind(this);
    this.applyPhysics = this.applyPhysics.bind(this);
  }
  //source of inspiration for omni-directional movement/fluidity
  //https://stackoverflow.com/questions/12273451/how-to-fix-delay-in-javascript-keydown
  keyBind() {
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if (PLAYER_KEYS.includes(event.key)) {
        this.playerInput[event.key] = true;
      }
    });
    document.addEventListener('keyup', (event) => {
      if (PLAYER_KEYS.includes(event.key)) {
        this.playerInput[event.key] = false;
      }
    });
    document.addEventListener('keydown', (event) => {
      if(event.key === ' ' && this.playerInput.canJump === true){
        console.log('HARD PRESSED');
        this.playerInput.canJump = false;
        this.game.entities.newPlayer.vspd = -4;
      }
    })
    document.addEventListener('mousemove', (event) => {
      let rect = this.game.canvas.getBoundingClientRect();
      // this.playerInput.mousePos = { x: event.clientX - rect.left, y: event.clientY-rect.top };
      this.playerInput.mousePos.x = event.clientX;
      this.playerInput.mousePos.y = event.clientY;
      // console.log(this.playerInput.mousePos);
      // console.log('y: ', event.clientY);
    })

  }
  getInput() {
    let player = this.game.entities.newPlayer;
    let next;
    if (this.playerInput['a'] === true) {
      next = {
        x: player.x - player.moveSpd,
      }
      if(this.game.collisionCheck(Object.assign({}, player, next))){
        while (!this.game.collisionCheck(player)){
          this.game.entities.newPlayer.x -= 1;
        }
        this.game.entities.newPlayer.x += 1;
      } 
      else 
        this.game.entities.newPlayer.x -= this.game.entities.newPlayer.moveSpd;
    }

    if (this.playerInput['d'] === true) {
      next = {
        x: player.x + player.moveSpd,
      }
      if (this.game.collisionCheck(Object.assign({}, player, next))) {
        while (!this.game.collisionCheck(player)) {
          this.game.entities.newPlayer.x += 1;
        }
        this.game.entities.newPlayer.x -= 1;
      }
      else this.game.entities.newPlayer.x += this.game.entities.newPlayer.moveSpd;
    }

    if (this.playerInput['w'] === true) {
      next = {
        y: player.y - player.moveSpd
      }
      if (this.game.collisionCheck(Object.assign({}, player, next))) {
        while (!this.game.collisionCheck(player)) {
          this.game.entities.newPlayer.y -= 1;
        }
        this.game.entities.newPlayer.y+=1;
      }
      else this.game.entities.newPlayer.y -= this.game.entities.newPlayer.moveSpd;
    }
    
    if(this.playerInput['f'] === true) {
      
        this.game.entities.newPlayer.vspd = 1;
        // console.log('space');
      
    }
    // if (this.playerInput['s'] === true) {
    //   next = {
    //     y: player.y + player.moveSpd
    //   }
    //   if (this.game.collisionCheck(Object.assign({}, player, next))) {
    //     while (!this.game.collisionCheck(player)) {
    //       this.game.entities.newPlayer.y += 1;
    //     }
    //     this.game.entities.newPlayer.y -= 1;
    //   }
    //   else this.game.entities.newPlayer.y += this.game.entities.newPlayer.moveSpd;
    // }
  }

    // if (this.playerInput[' '] === true) {
    //   this.game.collisionCheck();
    // }
    
  applyPhysics(obj){
    let nextStep = obj;
    let checkStep = Object.assign({}, obj);
    checkStep.y = checkStep.y + checkStep.vspd + 1;
    // console.log('check me out', Object.assign({}, obj, checkStep));
    //  debugger
    if(obj.vspd < 8){
      obj.vspd += 0.2;
    }

    if (!this.game.collisionCheck(Object.assign({}, obj, checkStep))) {
      // console.log(this.game.collisionCheck(Object.assign({}, obj, checkStep)))
      // nextStep = this.game.gravStep(obj);
      // if(nextStep.vspd < 0){
      //   // console.log('slow down!')
      //   nextStep.vsp += 1;
      //   // console.log(nextStep.vspd)
      // }
      nextStep.y += nextStep.vspd;
      // console.log(nextStep.vspd);
      // obj['test'] = 'value';
      // obj.move();
      //fall
    } else {
      obj.vspd = 0;
      this.playerInput.canJump = true;
      if (this.game.collisionCheck(Object.assign({}, obj, nextStep))) {

        // console.log(this.game.collisionCheck(Object.assign({}, obj, checkStep)))
        while (!this.game.collisionCheck(obj)) {
          this.game.entities.newPlayer.y += 2;
        }
        console.log(this.game.collisionCheck(obj))
        this.game.entities.newPlayer.y -= 2;

      }
    }

  }
  

  
  render(){  
    const canvas = this.game.canvas;

    const context = this.game.context;
    let newPlayer = this.game.entities.newPlayer;
    let staticEntity = this.game.entities.staticEntity;
    let move_dir = this.game.entities.move_dir;
    let entities = this.game.entities;
    let getInput = this.getInput;
    let mousePos = this.playerInput.mousePos;
    console.log(this.playerInput.mousePos);
    let applyPhysics = this.applyPhysics;
    
    
    setInterval(function () {
      context.clearRect(0, 0, 640, 480);
      context.fillStyle = 'orange'; //background 
      context.fillRect(0, 0, 640, 480);


      
      getInput();
      applyPhysics(newPlayer);
      newPlayer.move();
      // debugger;
      //Test Purposes
      if (entities.staticEntity.y > 200) {
        move_dir = -2;
      } else if (entities.staticEntity.y < 100) {
        move_dir = 2;
      }

      context.fillStyle = 'black';
      // console.log(mousePos);
      context.beginPath();
      context.arc(mousePos.x, mousePos.y, 20, 0, 2* Math.PI);
      context.stroke();

      entities.staticEntity.y += move_dir;

      for(let i = 0; i < Object.values(entities).length; i++){
        requestAnimationFrame(Object.values(entities)[i].draw);
      }
      // requestAnimationFrame(entities.staticEntity.draw);
      // requestAnimationFrame(entities.newPlayer.draw);

    }, 1000 / 60);
  }
}

module.exports = Display;
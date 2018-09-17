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
      mousePos: {x: 0, y: 0},
      shootHook: false,
      hookTarget: {},
    }
    this.keyBind();
    this.render = this.render.bind(this);
    this.startRender = this.startRender.bind(this);
    this.startScreenRender = this.startScreenRender.bind(this);
    this.getInput = this.getInput.bind(this);
    this.applyPhysics = this.applyPhysics.bind(this);
  }
  //source of inspiration for omni-directional movement/fluidity
  //https://stackoverflow.com/questions/12273451/how-to-fix-delay-in-javascript-keydown
  keyBind() {
    let timer;
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
        this.playerInput.canJump = false;
        this.game.entities.newPlayer.vspd = -4;
      }
    })
    this.game.canvas.addEventListener('mousemove', (event) => {
      this.playerInput.mousePos.x = event.clientX - this.game.canvas.offsetLeft;
      this.playerInput.mousePos.y = event.clientY - this.game.canvas.offsetTop;
    })
    this.game.canvas.addEventListener('mousedown', (event) => {
      let player = this.game.entities.newPlayer;
      this.playerInput.shootHook = true;
      this.playerInput.hookTarget = {x: event.clientX - this.game.canvas.offsetLeft, y: event.clientY - this.game.canvas.offsetTop};

      this.game.entities.hookPoint.x = player.x + player.x_len / 2;
      this.game.entities.hookPoint.y = player.y + player.y_len / 2;
      this.game.entities.hookPoint.target = this.playerInput.hookTarget;
      this.game.entities.hookPoint.active = true;
      this.game.entities.hookPoint['fired'] = true;
      this.game.entities.hookPoint.calcSpd();
    })
    document.addEventListener('mouseup', (event) => {
      this.hookOff();
    })
  }
  hookOff(){
    let player = this.game.entities.newPlayer;
    this.playerInput['shootHook'] = false;
    this.game.entities.hookPoint.active = false;
    this.game.entities.hookPoint.reset(player.x + player.x_len / 2, player.y + player.y_len / 2);
    this.game.entities.newPlayer.state = 'move';
    this.game.entities.hookPoint['fired'] = false;
 
  }

  getInput() {
    let player = this.game.entities.newPlayer;
    let next;
    if (this.playerInput['a'] === true) {
      this.game.entities.newPlayer.faceDir = -1;
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
        // this.game.entities.newPlayer.hspd = -this.game.entities.newPlayer.moveSpd;
        this.game.entities.newPlayer.x -= this.game.entities.newPlayer.moveSpd;
    } else if(this.playerInput['a'] === false){
      this.game.entities.newPlayer.hspd = 0;
    }

    if (this.playerInput['d'] === true) {
      this.game.entities.newPlayer.faceDir = 1;
      next = {
        x: player.x + player.moveSpd,
      }
      if (this.game.collisionCheck(Object.assign({}, player, next))) {
        while (!this.game.collisionCheck(player)) {
          this.game.entities.newPlayer.x += 1;
        }
        this.game.entities.newPlayer.x -= 1;
      }
      else this.game.entities.newPlayer.hspd = this.game.entities.newPlayer.moveSpd;
    } else if(this.playerInput['d'] === false){
      this.game.entities.newPlayer.hspd = 0;
    }
//for debuggerin
    if (this.playerInput['w'] === true) {
      this.game.entities.newPlayer.y -= 10;
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


    if(this.playerInput.shootHook === true){
      let hookPoint = this.game.entities.hookPoint;
      let hook = this.game.entities.hook;
      let newPlayer = this.game.entities.newPlayer;
      
      this.game.entities.hook.targetX = hookPoint.x + hookPoint.x_len/2;
      this.game.entities.hook.targetY = hookPoint.y + hookPoint.y_len/2;
      
      let checkLen = Math.sqrt((Math.pow(Math.abs(hook.x - hookPoint.x), 2) + Math.pow(Math.abs(hook.y - hookPoint.y), 2)));
      
      if(checkLen > 500){
        this.hookOff();
      }
      
      if(this.game.collisionCheck(this.game.entities.hookPoint)){
        //on collide
        this.game.entities.newPlayer.targetPoint = this.playerInput.hookTarget;
        if(!this.game.entities.hookPoint.collided){
          this.playerInput['ropeLen'] = 
          Math.sqrt((Math.pow(Math.abs(hook.x - hookPoint.x), 2) + Math.pow(Math.abs(hook.y - hookPoint.y), 2)));
          this.game.entities.newPlayer.ropeLen = this.playerInput.ropeLen;

          if (this.playerInput.ropeLen > 100) {
            // console.log('exceed max capacity');
          }

          if(newPlayer.x < newPlayer.targetPoint.x) {
            // console.log('spds', newPlayer.hspd, newPlayer.vspd);
            // newPlayer.rotateSpd = Math.abs(newPlayer.rotateSpd) * -1; 
            newPlayer.rotateSpd = (Math.abs(newPlayer.hspd) + Math.abs(newPlayer.vspd))/150 * -1; 
          } 
          else {
            // newPlayer.rotateSpd = Math.abs(newPlayer.rotateSpd);
            newPlayer.rotateSpd = (Math.abs(newPlayer.hspd) + Math.abs(newPlayer.vspd)) / 150;
          }
        }
        // console.log('collsion chek', this.playerInput.ropeLen)
        this.game.entities.hookPoint.collided = true;
        this.game.entities.newPlayer.state = 'swing';
        this.game.context.beginPath();
        this.game.context.strokeStyle = 'white';
        this.game.context.arc(hookPoint.x, hookPoint.y,
        this.playerInput.ropeLen, 0, 2 * Math.PI);
        this.game.context.stroke();
        // console.log(this.game.entities.newPlayer.hspd, this.game.entities.newPlayer.vspd)
      }
      //set hsnapshopt
      this.game.entities.hook.draw();
    }

  }

  applyPhysics(obj){
    let nextStep = obj;
    let checkStep = Object.assign({}, obj);
    checkStep.y = checkStep.y + checkStep.vspd + 1;

    if(obj.vspd < 8){
      obj.vspd += 0.2;
    }

    if (!this.game.collisionCheck(Object.assign({}, obj, checkStep))) {
      nextStep.y += nextStep.vspd;
      //fall
    } else {
      obj.vspd = 0;
      this.playerInput.canJump = true;
      if (this.game.collisionCheck(Object.assign({}, obj, nextStep))) {
        // console.log('ahh im stuck');
        while (!this.game.collisionCheck(obj)) {
          this.game.entities.newPlayer.y += 2;
        }
        // console.log(this.game.collisionCheck(obj))
        this.game.entities.newPlayer.y -= 2;

      }
    }

  }


  newGame(){
    // this.game.constructor();
    this.game.init();
    this.render();
    // console.log(this)
  }


  startScreenRender(canvas, context, game, mousePos, imageX){
    // debugger
    if(this.playerInput.shootHook){
      this.render();
    }
    else {
      context.clearRect(0, 0, canvas.attributes.width.value, canvas.attributes.height.value);
      imageX += 0.2;
      
      context.drawImage(game.background, imageX, 300, 4192, 1024, 0, 0, 4192, 1024);
      
      context.fillStyle = "gray";
      context.fillRect(250, 100, 200, 150);
  
      
      context.beginPath();
      context.strokeStyle = 'red';
      context.arc(mousePos.x, mousePos.y, 10, 0, 2 * Math.PI);
      context.stroke();
      requestAnimationFrame(() => this.startScreenRender(canvas, context, game, mousePos, imageX));
    }
  }
  
  startRender(){
    const canvas = this.game.canvas;
    const context = this.game.context;
    const game = this.game;
    const mousePos = this.playerInput.mousePos;

    let imageX = 0;
    this.startScreenRender(canvas, context, game, mousePos, imageX);
    // requestAnimationFrame(() => this.startScreenRender(canvas, context, game, mousePos, imageX));
  }


  render(){  
    const canvas = this.game.canvas;

    const context = this.game.context;
    let newPlayer = this.game.entities.newPlayer;
    let entities = this.game.entities;
    let getInput = this.getInput;
    let mousePos = this.playerInput.mousePos;
    let applyPhysics = this.applyPhysics;
    let hook = this.game.entities.hook;
    let hookPoint = this.game.entities.hookPoint;
    let newGame = this.newGame.bind(this);
    let game = this.game;
    let imageX = 0;
    // debugger
    
    let run = setInterval(function () {
      if(newPlayer.y > 700){
        newGame();
        clearInterval(run);
      }
      context.clearRect(0, 0, canvas.attributes.width.value, canvas.attributes.height.value);
      
      
      // plain background
      // context.fillStyle = 'gray'; //background 
      // context.fillRect(0, 0, canvas.attributes.width.value, canvas.attributes.height.value);
      
      //city background
      // debugger
      // imageX += 0.5;
      context.drawImage(game.background, imageX, 300, 4192, 1024, 0, 0, 4192, 1024);
      
      
      getInput();
      // if(!hookPoint.collided){
        
        applyPhysics(newPlayer);
      // }
      
      newPlayer.move();
      
      hook.x = newPlayer.x + newPlayer.x_len/2;
      hook.y = newPlayer.y + newPlayer.y_len/2;
      if(!hookPoint.active){
        hookPoint.x = newPlayer.x + newPlayer.x_len / 2;
        hookPoint.y = newPlayer.y + newPlayer.y_len / 2;
      }

      // console.log(newPlayer.x, newPlayer.y);
      hookPoint.move();
      // for(let i = 0; i < platforms.length; i++){
      //   platforms[i].move();
      // }
      
      for(let i = 0; i < Object.values(entities).length; i++){
        if(Object.values(entities)[i].active){
          requestAnimationFrame(Object.values(entities)[i].draw);
        }
      }
      context.beginPath();
      context.strokeStyle = 'red';
      context.arc(mousePos.x, mousePos.y, 10, 0, 2* Math.PI);
      context.stroke();
      
    }, 1000 / 60);
  }
}

module.exports = Display;

      //Test Purposes
      // if (entities.staticEntity.y > 200) {
      //   move_dir = -2;
      // } else if (entities.staticEntity.y < 100) {
        //   move_dir = 2;
      // }
      // entities.staticEntity.y += move_dir;
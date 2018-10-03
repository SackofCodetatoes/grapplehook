const Game = require("./game.js");
const Player = require("./player.js");
const GameEntity = require("./game_entity.js");
const PLAYER_KEYS = ['w', 'a', 's', 'd', 'f'];
const WebFont = require('webfontloader');

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
    WebFont.load({
      google: {
        families: ['M PLUS Rounded 1c']
      }
    });

    this.viewPort = {
      x: 0,
      y: 0
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
      this.playerInput.hookTarget = {x: event.clientX - this.game.canvas.offsetLeft + this.viewPort.x, y: event.clientY - this.game.canvas.offsetTop + this.viewPort.y};

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

      if(this.game.entities.newPlayer.state != 'swing'){
        this.game.entities.newPlayer.hspd = -this.game.entities.newPlayer.moveSpd;
        // this.game.entities.newPlayer.move();
      }
   
    } 
  
    else if(this.playerInput['d'] === true) {
        if(this.game.entities.newPlayer.state != 'swing'){
          this.game.entities.newPlayer.faceDir = 1;
          // this.game.entities.newPlayer.hspd = 2;
          this.game.entities.newPlayer.hspd = this.game.entities.newPlayer.moveSpd;
          // this.game.entities.newPlayer.move();
        }
      }
       
    else {
      this.game.entities.newPlayer.hspd = 0;
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

          if(newPlayer.x < newPlayer.targetPoint.x) {
            // console.log('spds', newPlayer.hspd, newPlayer.vspd);
            newPlayer.rotateSpd = Math.abs(newPlayer.rotateSpd) * -1; 
            // newPlayer.rotateSpd = (Math.abs(newPlayer.hspd) + Math.abs(newPlayer.vspd))/150 * -1; 
          } 
          else {
            newPlayer.rotateSpd = Math.abs(newPlayer.rotateSpd);
            // newPlayer.rotateSpd = (Math.abs(newPlayer.hspd) + Math.abs(newPlayer.vspd)) / 150;
          }
        }
        this.game.entities.hookPoint.collided = true;
        this.game.entities.newPlayer.state = 'swing';
        this.game.context.beginPath();
        this.game.context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.game.context.arc(hookPoint.x - this.viewPort.x, hookPoint.y - this.viewPort.y,
          this.playerInput.ropeLen, 0, 2 * Math.PI);
        this.game.context.stroke();
      }
      //set hsnapshot, also draws line
      this.game.entities.hook.draw(this.viewPort);
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
        while (!this.game.collisionCheck(obj)) {
          this.game.entities.newPlayer.y += 2;
        }
        this.game.entities.newPlayer.y -= 2;

      }
    }

  }


  newGame(){
    this.game.init();
    this.render();

  }


  startScreenRender(canvas, context, game, mousePos, imageX){
    if(this.playerInput.shootHook){
      this.render();
    }
    else {
      context.clearRect(0, 0, canvas.attributes.width.value, canvas.attributes.height.value);
      if(imageX + 0.2 >= 4192 - canvas.attributes.width.value){
        imageX = 0;
      }
      imageX += 0.2;
      
      context.drawImage(game.background, imageX, 300, 4192, 1024, 0, 0, 4192, 1024);
      
      context.fillStyle= 'white'
      context.font = "64px Helvetica";
      context.fillText("GrappleHook", canvas.attributes.width.value / 2 - (30 * 6), canvas.attributes.height.value / 2 - 10);
      context.font = "32px Arial";
      context.fillText("Click on screen to Start", canvas.attributes.width.value / 2 - (30 * 5), canvas.attributes.height.value / 2 + 30);
  
      
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
  
  }


  render(){  
    const canvas = this.game.canvas;
    const context = this.game.context;
    const backCanvas = this.game.backCanvas;
    const backContext = this.game.backContext;


    let newPlayer = this.game.entities.newPlayer;
    let staticEntity = this.game.entities.staticEntity;
    let move_dir = this.game.entities.move_dir;
    let entities = this.game.entities;
    let getInput = this.getInput;
    let mousePos = this.playerInput.mousePos;
    let platforms = this.game.platforms;
    let applyPhysics = this.applyPhysics;
    let shootHook = this.playerInput.shootHook;
    let hookTarget = this.playerInput.hookTarget;
    let hook = this.game.entities.hook;
    let hookPoint = this.game.entities.hookPoint;
    let ropeLen = this.playerInput.ropeLen;
    let newGame = this.newGame.bind(this);
    let startScreen = this.startRender.bind(this);
    let game = this.game;
    let imageX = 0;
    let coinCounter = 0;
    let viewPort = this.viewPort;


    let coins = this.game.coins;
    
    const moveSpd = 0;
    
    let run = setInterval(function () {
      context.clearRect(0, 0, canvas.attributes.width.value, canvas.attributes.height.value);
      
      if(newPlayer.y >  900 || newPlayer.x < 0){
        newGame();
        clearInterval(run);
      }
      else {
        // imageX += 0.5;
        
        context.drawImage(game.background, imageX, 300, 4192, 1024, 0 - (viewPort.x * 0.2), 0 - (viewPort.y * 0.3), 4192, 1024);
        
        viewPort.x = newPlayer.x - (1280 / 2);
        viewPort.y = newPlayer.y - (720 / 2);
        if(!hookPoint.collided){
          
          applyPhysics(newPlayer);
        }
        
        
        for(let i = 0; i < coins.length; i++){
          coins[i].move(moveSpd);
          if(newPlayer.positionMeeting(newPlayer.x, newPlayer.y, coins[i])){
            if(!coins[i].active) { continue; }
            coinCounter += 1;
            coins[i].active = false;
          }
        }
        
        
        hook.x = newPlayer.x + newPlayer.x_len/2;
        hook.y = newPlayer.y + newPlayer.y_len/2;
        if(!hookPoint.active){
          hookPoint.x = newPlayer.x + newPlayer.x_len / 2;
          hookPoint.y = newPlayer.y + newPlayer.y_len / 2;
        }
        
        hookPoint.move(moveSpd);
        for(let i = 0; i < platforms.length; i++){
          platforms[i].move(moveSpd, newPlayer);
        }
        
        newPlayer.move(moveSpd);
        getInput();

        
        for(let i = 0; i < Object.values(entities).length; i++){
          if(Object.values(entities)[i].active){
            Object.values(entities)[i].draw(viewPort);
          }
        }
        
        if(newPlayer.y < 0){
          //draw triangle at x position
          context.beginPath();
          context.moveTo(newPlayer.x + newPlayer.x_len / 2, 25);
          context.lineTo(newPlayer.x + newPlayer.x_len, 50);
          context.lineTo(newPlayer.x, 50);
          context.closePath();
        
          context.fillStyle = "red";
          context.fill();
        
        }
        
        context.fillStyle = 'white'
        context.font = "bold 24px Helvetica";
        context.fillText(`Score: ${coinCounter}`, canvas.attributes.width.value - 200, 100);
        context.beginPath();
        context.strokeStyle = 'red';
        context.lineWidth= 2.5;
        context.arc(mousePos.x, mousePos.y, 10, 0, 2* Math.PI);
        context.stroke();
      }    
      
    }, 1000 / 60);
  }
}

module.exports = Display;

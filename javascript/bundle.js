/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./javascript/grapplehook.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascript/coin.js":
/*!****************************!*\
  !*** ./javascript/coin.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameEntitiy = __webpack_require__(/*! ./game_entity.js */ "./javascript/game_entity.js");

class Coin extends GameEntitiy {
  constructor(options){
    super(options);
  }

  draw() {
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'orange';
    this.context.fillStyle = 'yellow';
    this.context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
  }


  move(moveSpd){
    this.x += moveSpd;
  }

}

module.exports = Coin;

/***/ }),

/***/ "./javascript/display.js":
/*!*******************************!*\
  !*** ./javascript/display.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game.js */ "./javascript/game.js");
const Player = __webpack_require__(/*! ./player.js */ "./javascript/player.js");
const GameEntity = __webpack_require__(/*! ./game_entity.js */ "./javascript/game_entity.js");
const PLAYER_KEYS = ['w', 'a', 's', 'd', 'f'];
const WebFont = __webpack_require__(/*! webfontloader */ "./node_modules/webfontloader/webfontloader.js");

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
    // if (this.playerInput['w'] === true) {
    //   this.game.entities.newPlayer.y -= 10;
    //   next = {
    //     y: player.y - player.moveSpd
    //   }
    //   if (this.game.collisionCheck(Object.assign({}, player, next))) {
    //     while (!this.game.collisionCheck(player)) {
    //       this.game.entities.newPlayer.y -= 1;
    //     }
    //     this.game.entities.newPlayer.y+=1;
    //   }
    //   else this.game.entities.newPlayer.y -= this.game.entities.newPlayer.moveSpd;
    // }


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
            // newPlayer.rotateSpd = Math.abs(newPlayer.rotateSpd) * -1; 
            newPlayer.rotateSpd = (Math.abs(newPlayer.hspd) + Math.abs(newPlayer.vspd))/150 * -1; 
          } 
          else {
            // newPlayer.rotateSpd = Math.abs(newPlayer.rotateSpd);
            newPlayer.rotateSpd = (Math.abs(newPlayer.hspd) + Math.abs(newPlayer.vspd)) / 150;
          }
        }
        this.game.entities.hookPoint.collided = true;
        this.game.entities.newPlayer.state = 'swing';
        this.game.context.beginPath();
        this.game.context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.game.context.arc(hookPoint.x, hookPoint.y,
        this.playerInput.ropeLen, 0, 2 * Math.PI);
        this.game.context.stroke();
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

    let coins = this.game.coins;
    
    const moveSpd = -4;
    
    let run = setInterval(function () {
      context.clearRect(0, 0, canvas.attributes.width.value, canvas.attributes.height.value);
      
      if(newPlayer.y > 700){
        newGame();
        clearInterval(run);
      }
      else {
        imageX += 0.5;
        context.drawImage(game.background, imageX, 300, 4192, 1024, 0, 0, 4192, 1024);
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

        getInput();
        // if(!hookPoint.collided){
          
          applyPhysics(newPlayer);
        // }
        
        newPlayer.move();

        for(let i = 0; i < coins.length; i++){
          coins[i].move(moveSpd);
          if(newPlayer.positionMeeting(newPlayer.x, newPlayer.y, coins[i])){
            if(!coins[i].active) { continue; }
            coinCounter += 1;
            coins[i].active = false;
            // console.log('oo a penny');
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
          platforms[i].move(moveSpd);
        }
        
        for(let i = 0; i < Object.values(entities).length; i++){
          if(Object.values(entities)[i].active){
            requestAnimationFrame(Object.values(entities)[i].draw);
          }
        }
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


/***/ }),

/***/ "./javascript/game.js":
/*!****************************!*\
  !*** ./javascript/game.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(/*! ./player.js */ "./javascript/player.js");
const GameEntity = __webpack_require__(/*! ./game_entity.js */ "./javascript/game_entity.js");
const Platform = __webpack_require__(/*! ./platform.js */ "./javascript/platform.js");
const Coin = __webpack_require__(/*! ./coin.js */ "./javascript/coin.js");
const Hook = __webpack_require__(/*! ./hook.js */ "./javascript/hook.js");
const HookPoint = __webpack_require__(/*! ./hook_point.js */ "./javascript/hook_point.js");

class Game {
  constructor() {
    this.entities = {};
    this.canvas = document.getElementById('game-canvas');
    this.context = this.canvas.getContext('2d');
    this.platforms = [];
    this.coins = [];
    this.spriteSheet;
    // this.spriteSheet.onload = draw;
  }


  init() {
    //testing purposes
    // debugger
    this.platforms = [];

    const coinOptions = {
        x: 200,
        y: 500,
        context: this.context,
        color: 'yellow',
        x_len: 25,
        y_len: 25,
        game: this,
        // image: this.spriteSheet
    };

    const playerOptions = {
      x: 25,
      y: 25,
      context: this.context,
      color: 'blue',
      x_len: 25,
      y_len: 25,
      game: this,
      image: this.spriteSheet,
    };

    const platformOptions = {
      x: 0,
      y: 700,
      color: 'black',
      context: this.context,
      x_len: 640,
      y_len: 100,
      image: this.spriteSheet,
    }
    const platformOptions2 = {
      x: 320,
      y: 350,
      color: 'black',
      context: this.context,
      x_len: 100,
      y_len: 50,
      image: this.spriteSheet,
    }
    const platformOptions3 = {
      x: 400,
      y: 0,
      color: 'black',
      context: this.context,
      x_len: 20,
      y_len: 400,
      image: this.spriteSheet,
    }
    const grappleHookOptions = {
      x: playerOptions.x,
      y: playerOptions.y,
      color: 'black',
      context: this.context,
      x_len: 0,
      y_len: 0,
    }
    const hookPointOptions = {
      x: playerOptions.x + playerOptions.x_len/2,
      y: playerOptions.y + playerOptions.y_len/2,
      color: 'yellow',
      context: this.context,
      x_len: 10,
      y_len: 10,
    }


    // this.move_dir = 1;
    this.entities['coin'] = new Coin(coinOptions);
    this.coins.push(this.entities.coin);

    this.entities['platform'] = new Platform(platformOptions);
    platformOptions2.y = 650; 
    platformOptions2.x = 620;
    this.entities['platform2'] = new Platform(platformOptions2);
    platformOptions2.y = 250;

    // this.entities['platform2'] = new Platform(platformOptions3);
    platformOptions.x = 600;
    this.entities['platform3'] = new Platform(platformOptions);
    
    platformOptions2.x = 600;
    platformOptions2.y = 650;
    platformOptions2.x_len = 300;
    platformOptions2.y_len = 200;
    this.entities['platform4'] = new Platform(platformOptions2);


    platformOptions2.x = 1200;
    platformOptions2.y = 650;
    this.entities['platform5'] = new Platform(platformOptions2);
    
    platformOptions2.x = 1400;
    platformOptions2.y = 600;
    this.entities['platform20'] = new Platform(platformOptions2);

    platformOptions2.x_len = 100
    platformOptions2.y_len = 50
    platformOptions2.y = 550;
    platformOptions2.x = 1800;
    this.entities['platform6'] = new Platform(platformOptions2);
    
    
    
    platformOptions2.x = 2100;
    this.entities['platform7'] = new Platform(platformOptions2);
    
    platformOptions2.x = 2400;
    this.entities['platform8'] = new Platform(platformOptions2)

    //add some coins
    
    platformOptions2.y = 250;
    platformOptions.x = 2500;
    platformOptions.x_len = 1500;
    this.entities['platform9'] = new Platform(platformOptions);

    platformOptions3.x = 2700;
    platformOptions3.x_len = 50;

    this.entities['platform10'] = new Platform(platformOptions3);
    platformOptions2.x = 2700;
    platformOptions2.x_len = 950;
    platformOptions2.y_len = 350;
    platformOptions2.y = 0;
    this.entities['platform11'] = new Platform(platformOptions2);
    
    platformOptions2.y = 650;
    platformOptions2.x_len = 100
    platformOptions2.y_len = 50
    platformOptions2.x = 3900;
    this.entities['platform12'] = new Platform(platformOptions2);

    platformOptions2.x = 4000;
    platformOptions2.y = 600;
    platformOptions2.y_len = 600;

    this.entities['platform13'] = new Platform(platformOptions2);
    // platformOptions2.x_len = 100
    // platformOptions2.y_len = 50
    
    
    this.entities['newPlayer'] = new Player(playerOptions);
    this.entities['hook'] = new Hook(grappleHookOptions);
    this.entities['hookPoint'] = new HookPoint(hookPointOptions);
    
    this.platforms.push(this.entities.platform); 
    this.platforms.push(this.entities.platform2); 
    this.platforms.push(this.entities.platform3); 
    this.platforms.push(this.entities.platform4); 
    this.platforms.push(this.entities.platform5); 
    this.platforms.push(this.entities.platform6); 
    this.platforms.push(this.entities.platform7); 
    this.platforms.push(this.entities.platform8); 
    this.platforms.push(this.entities.platform9); 
    this.platforms.push(this.entities.platform10); 
    this.platforms.push(this.entities.platform11); 
    this.platforms.push(this.entities.platform12); 
    this.platforms.push(this.entities.platform13); 
    
    for(let i = 14; i < 20; i ++){
      let name = 'platform';
      platformOptions2.x += 100;
      platformOptions2.y -= 50;

      this.entities[name+i] = new Platform(platformOptions2);
      this.platforms.push(this.entities[name+i]);
    }
    this.platforms.push(this.entities.platform20);
    
    platformOptions2.x = 4650;
    platformOptions2.y = 0;
    platformOptions2.y_len = 50;
    platformOptions2.x_len = 750;
    this.entities['platform21'] = new Platform(platformOptions2);
    this.platforms.push(this.entities.platform21);

    platformOptions2.x = 5400;
    platformOptions2.y = 650;
    platformOptions2.y_len = 50;
    platformOptions2.x_len = 2500;
    this.entities['platform22'] = new Platform(platformOptions2);
    this.platforms.push(this.entities.platform22);

    

    this.entities.newPlayer.collisionCheck = this.collisionCheck;
    // this.entities['camera'] = {prevX: this.entities.newPlayer.x}
  }
  gravStep(obj){
    obj.vspd += 2;
    return obj;
  }

  collisionCheck(obj) {
    // debugger
    let platforms = this.platforms;
    for(let i = 0; i < platforms.length; i++){
      // obj.positionMeeting(obj.x, obj.y, platforms[i]);
      if( 
        (
          (obj.x + obj.x_len > platforms[i].x && obj.x < platforms[i].x + platforms[i].x_len) &&
          (obj.y + obj.y_len > platforms[i].y && obj.y < platforms[i].y + platforms[i].y_len))
        ) {
          return true;
      }
    }
    return false;
  }


} //end of scope

module.exports = Game;

/***/ }),

/***/ "./javascript/game_entity.js":
/*!***********************************!*\
  !*** ./javascript/game_entity.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

class GameEntity {
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.context = options.context;
    this.color = options.color;
    this.x_len = options.x_len;
    this.y_len = options.y_len;
    this.draw = this.draw.bind(this);
    this.hspd = 0;
    this.vspd = 0;
    this.active = true;
    this.faceDir = 1;
  }
  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.x_len, this.y_len);
  }

  move() {
    this.x += this.hspd;
    this.y += this.vspd;
  }
  
  positionMeeting(x, y, otherObj){
    //return true or false if new position intersects other objects position

    //check right side
    if((x + this.x_len > otherObj.x && x < otherObj.x + otherObj.x_len) && 
      (y + this.y_len > otherObj.y && y < otherObj.y + otherObj.y_len)
    ) {
      // console.log('aw shoot');
      return true;
    }// end of if
    return false;
  }
}
module.exports = GameEntity;

/***/ }),

/***/ "./javascript/grapplehook.js":
/*!***********************************!*\
  !*** ./javascript/grapplehook.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Display = __webpack_require__(/*! ./display.js */ "./javascript/display.js");
const Game = __webpack_require__(/*! ./game.js */ "./javascript/game.js");
// const WebFont = require('webfontloader');


// console.log('all is dandy!');
let spriteSheet = new Image();
spriteSheet.src = "./images/industrial.v2.png";

let background = new Image();
background.src = "./images/city_background_night.png";
const game = new Game();
game.spriteSheet = spriteSheet;
game.background = background;
game.init();
const testDisplay = new Display(game);
background.onload = testDisplay.startRender;









/***/ }),

/***/ "./javascript/hook.js":
/*!****************************!*\
  !*** ./javascript/hook.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameEntity = __webpack_require__(/*! ./game_entity.js */ "./javascript/game_entity.js");

class GrappleHook extends GameEntity {
  constructor(options){
    super(options);
    this.active = false;
  }

  draw(){
    this.context.strokeStyle = 'lightgray';
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.targetX, this.targetY);
    this.context.stroke();
  }
  snapshot(){
    return {x: this.x, y: this.y}
  }
}
module.exports = GrappleHook;

/***/ }),

/***/ "./javascript/hook_point.js":
/*!**********************************!*\
  !*** ./javascript/hook_point.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameEntity = __webpack_require__(/*! ./game_entity.js */ "./javascript/game_entity.js");

class HookPoint extends GameEntity {
  constructor(options){
    super(options);
    this.active = false;
    this.moveSpd = 40;
    this.target = {x: 0, y: 0};
    this.collided = false;
    this.snapCalc = false;
  }
  draw() {
    this.context.fillStyle = 'yellow';
    this.context.fillRect(this.x, this.y, 10, 10);
    // this.context.restore();
  }
  reset(x, y){
    this.x = x;
    this.y = y;
    this.hspd = 0;
    this.vspd = 0;
    this.collided = false;
  }
  calcSpd(){
    // https: //gist.github.com/conorbuck/2606166
    let angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
    // console.log('heres an angle', angle);
    this.hspd = this.moveSpd * Math.cos(angle);
    this.vspd = this.moveSpd * Math.sin(angle);
    // debugger

  }
  move(moveSpd){
    if(this.active){
     if(!this.collided){
       this.x += this.hspd;
       this.y += this.vspd;
      }
      else if(this.collided){
        this.x += moveSpd;
      }
    }

    //  else {

    //   // debugger
    //   console.log('spds', this.hspd, this.vspd)
    //   this.x += this.hspd;
    //   this.y += this.vspd;
    //  }
  //      this.hspd = 0;
  //      this.vspd = 0;
  //    }
  //  }

   } 
  
}
module.exports = HookPoint;

/***/ }),

/***/ "./javascript/platform.js":
/*!********************************!*\
  !*** ./javascript/platform.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameEntity = __webpack_require__(/*! ./game_entity */ "./javascript/game_entity.js");

class Platform extends GameEntity {
  constructor(options){
    super(options);
    this.color = 'darkgray';
    this.image = options.image;

  }
  draw(){
    // if(this.y_len > this.x_len){
      // this.context.drawImage(this.image, 214, 128, 14, 81, this.x, this.y, 14, 81);
    // } else {
      this.context.fillStyle = this.color;
      this.context.fillRect(this.x, this.y, this.x_len, this.y_len);
    // }
  }

  move(moveSpd){
    this.x += moveSpd;
  }
  
}
module.exports = Platform;

/***/ }),

/***/ "./javascript/player.js":
/*!******************************!*\
  !*** ./javascript/player.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameEntity = __webpack_require__(/*! ./game_entity.js */ "./javascript/game_entity.js")

const MOVE_STATES = ['move', 'fixed']
// const KEY_LEFT = (event.key === 'a');
class Player extends GameEntity {
  constructor(options) {
    super(options);
    this.moveSpd = 4;
    this.state = 'move';
    this.ropeLen = 0;
    this.ropeAngle;
    this.targetPoint = {}
    this.rotateSpd = .05;
    this.collsionCheck;
    this.game = options.game;
    this.image = options.image;
    // debugger
  }
  
  move(){
    // console.log('spds', this.hspd, this.vspd)
    // if(this.collided === true){
    //   // console.log('set!');
    // }
    switch (this.state) {
      case 'move':
        this.x += this.hspd;
        this.y += this.vspd;
        // this.rotateSpd = 0.6;
        break;


      case 'swing':
        let center = this.targetPoint;
        this.ropeAngle = Math.atan2(this.targetPoint.y - this.y, this.targetPoint.x - this.x) * 180 / Math.PI;
        if(this.y + this.vspd > this.ropeLen){
          while(!this.y > this.ropeLen ){
            this.y+=1;
          }
        }
        //to the mathman i never could be:
        //https://math.stackexchange.com/questions/103202/calculating-the-position-of-a-point-along-an-arc
        let nextX = (center.x + (this.x - center.x) * Math.cos(this.rotateSpd) + (center.y - this.y) * Math.sin(this.rotateSpd));
        let nextY = (center.y + (this.y - center.y) * Math.cos(this.rotateSpd) + (this.x - center.x) * Math.sin(this.rotateSpd));
        // debugger
        this.hspd = nextX - this.x;
        this.vspd = nextY - this.y;
        if(nextY < this.y && this.vspd > -4){
          this.vspd -= 1;
        }
        let test = Object.assign({}, this, {x: this.x, y: this.y+ this.vspd});
        if(!this.game.collisionCheck(test)){
          
          this.y += this.vspd;
          this.x += this.hspd;
        } 
        else {
          //add bounce
          this.rotateSpd = this.rotateSpd * -0.51;
        }
        
        
        // console.log('x and y spd', this.hspd, this.vspd );
        break;

      default:
        break;
    }
    // console.log('avg spds', this.hspd, this.vspd)
  }
    draw(){
      let count = 0;
      let x;
      let y;
      // if(this.faceDir === -1){
      //   this.context.scale(-1,1);
      // }
      // else {
      //   this.context.scale(1,1);
      // }
    
      // this.context.scale(-1, 1);

      this.context.drawImage(this.image, 0, 257, 14, 16, this.x, this.y, 30, 28);
      
    }

}





module.exports = Player;


/***/ }),

/***/ "./node_modules/webfontloader/webfontloader.js":
/*!*****************************************************!*\
  !*** ./node_modules/webfontloader/webfontloader.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.o=b||a;this.c=this.o.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function ea(a){return a.o.location.hostname||a.a.location.hostname}function z(a,b,c){function d(){m&&e&&f&&(m(g),m=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,m=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
function A(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function B(){this.a=0;this.c=null}function C(a){a.a++;return function(){a.a--;D(a)}}function E(a,b){a.c=b;D(a)}function D(a){0==a.a&&a.c&&(a.c(),a.c=null)};function F(a){this.a=a||"-"}F.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function G(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return H(a)+" "+(a.f+"00")+" 300px "+I(a.c)}function I(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function J(a){return a.a+a.f}function H(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.o.document.documentElement;this.h=b;this.a=new F("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);K(a,"loading")}function L(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}K(a,"inactive")}function K(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,J(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function M(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function N(a){u(a.c,"body",a.a)}function O(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+I(a.c)+";"+("font-style:"+H(a)+";font-weight:"+(a.f+"00")+";")};function P(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0}P.prototype.start=function(){var a=this.c.o.document,b=this,c=q(),d=new Promise(function(d,e){function f(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(f,25)},function(){e()})}f()}),e=null,f=new Promise(function(a,d){e=setTimeout(d,b.f)});Promise.race([f,d]).then(function(){e&&(clearTimeout(e),e=null);b.g(b.a)},function(){b.j(b.a)})};function Q(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.m=this.j=this.h=this.g=null;this.g=new M(this.c,this.s);this.h=new M(this.c,this.s);this.j=new M(this.c,this.s);this.m=new M(this.c,this.s);a=new G(this.a.c+",serif",J(this.a));a=O(a);this.g.a.style.cssText=a;a=new G(this.a.c+",sans-serif",J(this.a));a=O(a);this.h.a.style.cssText=a;a=new G("serif",J(this.a));a=O(a);this.j.a.style.cssText=a;a=new G("sans-serif",J(this.a));a=
O(a);this.m.a.style.cssText=a;N(this.g);N(this.h);N(this.j);N(this.m)}var R={D:"serif",C:"sans-serif"},S=null;function T(){if(null===S){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);S=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return S}Q.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.m.a.offsetWidth;this.A=q();U(this)};
function la(a,b,c){for(var d in R)if(R.hasOwnProperty(d)&&b===a.f[R[d]]&&c===a.f[R[d]])return!0;return!1}function U(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=T()&&la(a,b,c));d?q()-a.A>=a.w?T()&&la(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):ma(a):V(a,a.v)}function ma(a){setTimeout(p(function(){U(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.m.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.m=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,J(a).toString(),"active")],[b.a.c("wf",a.c,J(a).toString(),"loading"),b.a.c("wf",a.c,J(a).toString(),"inactive")]);K(b,"fontactive",a);this.m=!0;na(this)};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,J(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,J(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,J(a).toString(),"inactive"));w(b.f,d,e)}K(b,"fontinactive",a);na(this)};function na(a){0==--a.f&&a.j&&(a.m?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),K(a,"active")):L(a.a))};function oa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}oa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;pa(this,new ha(this.c,a),a)};
function qa(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,m=d||null||{};if(0===c.length&&f)L(b.a);else{b.f+=c.length;f&&(b.j=f);var h,l=[];for(h=0;h<c.length;h++){var k=c[h],n=m[k.c],r=b.a,x=k;r.g&&w(r.f,[r.a.c("wf",x.c,J(x).toString(),"loading")]);K(r,"fontloading",x);r=null;if(null===X)if(window.FontFace){var x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),xa=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);
X=x?42<parseInt(x[1],10):xa?!1:!0}else X=!1;X?r=new P(p(b.g,b),p(b.h,b),b.c,k,b.s,n):r=new Q(p(b.g,b),p(b.h,b),b.c,k,b.s,a,n);l.push(r)}for(h=0;h<l.length;h++)l[h].start()}},0)}function pa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){qa(a,f,b,d,c)})};function ra(a,b){this.c=a;this.a=b}
ra.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var l=0;l<c.length;l++){var k=c[l].fontfamily;void 0!=c[l].fontStyle&&void 0!=c[l].fontWeight?(h=c[l].fontStyle+c[l].fontWeight,e.push(new G(k,h))):e.push(new G(k))}a(e)}else setTimeout(function(){b()},50)}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.o;A(this.c,(c.a.api||"https://fast.fonts.net/jsapi")+"/"+d+".js"+(e?"?v="+e:""),function(e){e?a([]):(f["__MonotypeConfiguration__"+
d]=function(){return c.a},b())}).id="__MonotypeAPIScript__"+d}else a([])};function sa(a,b){this.c=a;this.a=b}sa.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new B;b=0;for(c=d.length;b<c;b++)z(this.c,d[b],C(g));var m=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),l=0;l<h.length;l+=1)m.push(new G(d[0],h[l]));else m.push(new G(d[0]));E(g,function(){a(m,f)})};function ta(a,b){a?this.c=a:this.c=ua;this.a=[];this.f=[];this.g=b||""}var ua="https://fonts.googleapis.com/css";function va(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
function wa(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function ya(a){this.f=a;this.a=[];this.c={}}
var za={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Aa={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ba={i:"i",italic:"i",n:"n",normal:"n"},
Ca=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Da(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var m=d[1];g=[];if(m)for(var m=m.split(","),h=m.length,l=0;l<h;l++){var k;k=m[l];if(k.match(/^[\w-]+$/)){var n=Ca.exec(k.toLowerCase());if(null==n)k="";else{k=n[2];k=null==k||""==k?"n":Ba[k];n=n[1];if(null==n||""==n)n="4";else var r=Aa[n],n=r?r:isNaN(n)?"4":n.substr(0,1);k=[k,n].join("")}}else k="";k&&g.push(k)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=za[d[0]])&&(a.c[e]=d))}a.c[e]||(d=za[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new G(e,f[d]))}};function Ea(a,b){this.c=a;this.a=b}var Fa={Arimo:!0,Cousine:!0,Tinos:!0};Ea.prototype.load=function(a){var b=new B,c=this.c,d=new ta(this.a.api,this.a.text),e=this.a.families;va(d,e);var f=new ya(e);Da(f);z(c,wa(d),C(b));E(b,function(){a(f.a,f.c,Fa)})};function Ga(a,b){this.c=a;this.a=b}Ga.prototype.load=function(a){var b=this.a.id,c=this.c.o;b?A(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],m=b[f+1],h=0;h<m.length;h++)e.push(new G(g,m[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(l){}a(e)}},2E3):a([])};function Ha(a,b){this.c=a;this.f=b;this.a=[]}Ha.prototype.load=function(a){var b=this.f.id,c=this.c.o,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,m=c.fonts.length;g<m;++g){var h=c.fonts[g];d.a.push(new G(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},A(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new oa(window);Y.a.c.custom=function(a,b){return new sa(b,a)};Y.a.c.fontdeck=function(a,b){return new Ha(b,a)};Y.a.c.monotype=function(a,b){return new ra(b,a)};Y.a.c.typekit=function(a,b){return new Ga(b,a)};Y.a.c.google=function(a,b){return new Ea(b,a)};var Z={load:p(Y.load,Y)}; true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return Z}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):undefined;}());


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
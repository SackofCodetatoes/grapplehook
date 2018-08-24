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
    document.addEventListener('mousemove', (event) => {
      this.playerInput.mousePos.x = event.clientX;
      this.playerInput.mousePos.y = event.clientY;
    })
    document.addEventListener('mousedown', (event) => {
      let player = this.game.entities.newPlayer;
      this.playerInput.shootHook = true;
      this.playerInput.hookTarget = {x: event.clientX, y: event.clientY};
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
            console.log('exceed max capacity');
          }

          if(newPlayer.x < newPlayer.targetPoint.x) {
            console.log('spds', newPlayer.hspd, newPlayer.vspd);
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
        console.log('ahh im stuck');
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
    // debugger
    
    let run = setInterval(function () {
      if(newPlayer.y > 700){
        // alert('git outa here');
        newGame();
        clearInterval(run);
      }
      context.clearRect(0, 0, canvas.attributes.width.value, canvas.attributes.height.value);
      context.fillStyle = 'gray'; //background 
      // context.scale(2,2);
      context.fillRect(0, 0, canvas.attributes.width.value, canvas.attributes.height.value);

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
      hookPoint.move();

      for(let i = 0; i < platforms.length; i++){
        platforms[i].move();
      }
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
const Hook = __webpack_require__(/*! ./hook.js */ "./javascript/hook.js");
const HookPoint = __webpack_require__(/*! ./hook_point.js */ "./javascript/hook_point.js");

class Game {
  constructor() {
    this.entities = {};
    this.canvas = document.getElementById('game-canvas');
    this.context = this.canvas.getContext('2d');
    this.platforms = [];
    this.spriteSheet;
    // this.spriteSheet.onload = draw;
  }
  init() {
    //testing purposes
    // debugger
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
    const staticOptions = {
      x: 0,
      y: 0,
      context: this.context,
      color: 'red',
      x_len: 40,
      y_len: 40,
      context: this.context,
    };
    const platformOptions = {
      x: 0,
      y: 600,
      color: 'black',
      context: this.context,
      x_len: 640,
      y_len: 100,
      image: this.spriteSheet,
    }
    const platformOptions2 = {
      x: 320,
      y: 250,
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
    this.entities['platform'] = new Platform(platformOptions);
    platformOptions.x = 800;
    this.entities['platform4'] = new Platform(platformOptions);
    this.entities['platform2'] = new Platform(platformOptions2);
    this.entities['platform3'] = new Platform(platformOptions3);
    // this.entities['staticEntity'] = new GameEntity(staticOptions);
    this.entities['newPlayer'] = new Player(playerOptions);
    this.entities['hook'] = new Hook(grappleHookOptions);
    this.entities['hookPoint'] = new HookPoint(hookPointOptions);
    this.platforms.push(this.entities.platform); 
    this.platforms.push(this.entities.platform2); 
    this.platforms.push(this.entities.platform3); 
    this.platforms.push(this.entities.platform4); 
    this.entities.newPlayer.collisionCheck = this.collisionCheck;

  }
  gravStep(obj){
    obj.vspd += 2;
    return obj;
  }
  xCollisionCheck(obj){
      let platforms = this.platforms;
      for (let i = 0; i < platforms.length; i++) {
        if (
          (
            (obj.x + obj.x_len > platforms[i].x && obj.x < platforms[i].x + platforms[i].x_len) &&
            (obj.y + obj.y_len > platforms[i].y && obj.y < platforms[i].y + platforms[i].y_len))
        ) {
          return true;
        }
      }
      return false;
  }
  collisionCheck(obj) {
    // debugger
    let platforms = this.platforms;
    for(let i = 0; i < platforms.length; i++){
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



console.log('all is dandy!');
let spriteSheet = new Image();
spriteSheet.src = "./images/industrial.v2.png";
const game = new Game();
game.spriteSheet = spriteSheet;
game.init();
const testDisplay = new Display(game);
spriteSheet.onload = testDisplay.render;









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
    this.context.strokeStyle = 'black';
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
    // this.context.rotate(0.3);
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
  move(){
    if(this.active){
     if(!this.collided){
       this.x += this.hspd;
       this.y += this.vspd;
      }
      else if(this.collided){
        this.x -= 1;
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

  move(){
    this.x -= 1;
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
    if(this.collided === true){
      // console.log('set!');
    }
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
      if(this.faceDir === -1){
        // this.context.scale(-1,1);
      }
      else {
        // this.context.scale(1,1);
      }
    
      // this.context.scale(-1, 1);
      // this.context.translate(-14, 0)
      this.context.drawImage(this.image, 0, 257, 14, 16, this.x, this.y, 30, 28);
      
    }

}





module.exports = Player;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
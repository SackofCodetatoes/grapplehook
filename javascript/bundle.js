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
      // shootHook: false,
    }
    this.keyBind();
    // debugger
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
      // let shootHook = this.playerInput.shootHook;
      this.playerInput.shootHook = true;
      console.log('down')
      timer = setInterval(() => {this.playerInput['shootHook'] = true}, 50)
      // this.playerInput.shootHook = true;
    })
    document.addEventListener('mouseup', (event) => {
      this.playerInput['shootHook'] = false;
      console.log('up')
      clearInterval(timer);
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
    let shootHook = this.playerInput.shootHook;
    debugger
    let hook = this.game.entities.hook;
    
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
      console.log('Hook Value', shootHook);
      


      context.fillStyle = 'black';
      context.beginPath();
      context.arc(mousePos.x, mousePos.y, 20, 0, 2* Math.PI);
      context.stroke();
      hook.x = newPlayer.x;
      hook.y = newPlayer.y;
      hook.targetX = mousePos.x;
      hook.targetY = mousePos.y;
      entities.staticEntity.y += move_dir;
      
      for(let i = 0; i < Object.values(entities).length; i++){
        // debugger
        if(Object.values(entities)[i].constructor.name != 'GrappleHook'){
          requestAnimationFrame(Object.values(entities)[i].draw);
        }
      }
      // requestAnimationFrame(entities.staticEntity.draw);
      // requestAnimationFrame(entities.newPlayer.draw);

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
const Hook = __webpack_require__(/*! ./hook.js */ "./javascript/hook.js");

class Game {
  constructor() {
    this.entities = {};
    this.canvas = document.getElementById('game-canvas');
    this.context = this.canvas.getContext('2d');
    this.platforms = [];
  }
  init() {
    //testing purposes
    const playerOptions = {
      x: 25,
      y: 25,
      context: this.context,
      color: 'blue',
      x_len: 25,
      y_len: 25,
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
      y: 450,
      color: 'black',
      context: this.context,
      x_len: 640,
      y_len: 20,
    }
    const platformOptions3 = {
      x: 640,
      y: 0,
      color: 'black',
      context: this.context,
      x_len: 640,
      y_len: 20,
    }
      const platformOptions4 = {
        x: 0,
        y: 450,
        color: 'black',
        context: this.context,
        x_len: 640,
        y_len: 20,
      }
    const platformOptions2 = {
      x: 200,
      y: 220,
      color: 'black',
      context: this.context,
      x_len: 100,
      y_len: 50,
    }
    const grappleHookOptions = {
      x: playerOptions.x,
      y: playerOptions.y,
      color: 'black',
      context: this.context,
      x_len: 0,
      y_len: 0,
    }


    // this.move_dir = 1;
    this.entities['platform'] = new Platform(platformOptions);
    this.entities['platform2'] = new Platform(platformOptions2);
    this.entities['staticEntity'] = new GameEntity(staticOptions);
    this.entities['newPlayer'] = new Player(playerOptions);
    this.entities['hook'] = new Hook(grappleHookOptions);
    this.platforms.push(this.entities.platform); 
    this.platforms.push(this.entities.platform2); 
  }
  gravStep(obj){
    obj.vspd += 2;
    // console.log(obj);
    return obj;
  }
  collisionCheck(obj) {
    // debugger
    let platforms = this.platforms;
    for(let i = 0; i < platforms.length; i++){
      if( 
        ((obj.x + obj.x_len > platforms[i].x && obj.x < platforms[i].x + platforms[i].x_len) &&
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
const game = new Game();
game.init();
const testDisplay = new Display(game);
testDisplay.render();








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
    this.targetX = 0;
    this.targetY = 0;
  }

  draw(){
    this.context.fillStyle = 'black';
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.targetX, this.targetY);
    this.context.stroke();
  }
}
module.exports = GrappleHook;

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
    // this.color = 'black';
    //replace the above with sprite dimensions
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

// const KEY_LEFT = (event.key === 'a');
class Player extends GameEntity {
  constructor(options) {
    super(options);
    this.moveSpd = 4;
  }
}





module.exports = Player;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
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
const PLAYER_KEYS = ['w', 'a', 's', 'd', " "];

class Display {
  constructor(game){
    this.game = game;  
    this.game = this.game  
    this.playerInput = {
      a: false,
      d: false,
      w: false,
      s: false,
      Space: false,
    }
    this.keyBind();
    this.getInput = this.getInput.bind(this);

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
  }
  getInput() {
    if (this.playerInput['a'] === true) {
      this.game.entities.newPlayer.x -= this.game.entities.newPlayer.move_spd;
    }
    if (this.playerInput['d'] === true) {
      this.game.entities.newPlayer.x += this.game.entities.newPlayer.move_spd;
    }
    if (this.playerInput['w'] === true) {
      this.game.entities.newPlayer.y -= this.game.entities.newPlayer.move_spd;
    }
    if (this.playerInput['s'] === true) {
      this.game.entities.newPlayer.y += this.game.entities.newPlayer.move_spd;
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
    
    setInterval(function () {
      context.clearRect(0, 0, 640, 480);

      context.fillStyle = 'orange'; //background 
      context.fillRect(0, 0, 640, 480);
      getInput();
      
    //Test Purposes
      if (entities.staticEntity.y > 200) {
        move_dir = -2;
      } else if (entities.staticEntity.y < 100) {
        move_dir = 2;
      }

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

class Game {
  constructor() {
    this.entities = {};
    this.canvas = document.getElementById('game-canvas');
    this.context = this.canvas.getContext('2d');
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
      y: 400,
      color: 'black',
      context: this.context,
      x_len: 300,
      y_len: 20,
    }
    // this.move_dir = 1;
    this.entities['platform'] = new Platform(platformOptions);
    this.entities['staticEntity'] = new GameEntity(staticOptions);
    this.entities['newPlayer'] = new Player(playerOptions);
    
  }
}

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
  }
  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.x_len, this.y_len);
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
    this.move_spd = 2;
  }
}





module.exports = Player;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
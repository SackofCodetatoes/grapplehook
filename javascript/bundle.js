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

/***/ "./javascript/camera.js":
/*!******************************!*\
  !*** ./javascript/camera.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_entity.js */ "./javascript/game_entity.js");


class Camera extends _game_entity_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options){
    super(options);
  }


  draw(){
    this.context.beginPath();
    this.context.rect(0, 0, 1280, 720);
    this.context.stroke();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Camera);

/***/ }),

/***/ "./javascript/coin.js":
/*!****************************!*\
  !*** ./javascript/coin.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_entity.js */ "./javascript/game_entity.js");


class Coin extends _game_entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]{
  constructor(options){
    super(options);

  }

}
/* harmony default export */ __webpack_exports__["default"] = (Coin);

/***/ }),

/***/ "./javascript/cursor.js":
/*!******************************!*\
  !*** ./javascript/cursor.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui_entity.js */ "./javascript/ui_entity.js");


class Cursor extends _ui_entity_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options){
    super(options);
    this.defaultColor = 'yellow';
    this.active = true;
    this.keybind();
  }

  keybind(){
    this.canvas.addEventListener('mousemove', (event) => {
      this.x = event.clientX - this.canvas.offsetLeft;
      this.y = event.clientY - this.canvas.offsetTop;
    })
  }

  draw(){
    // unique draw
    this.context.beginPath();
    this.context.strokeStyle = 'yellow';
    this.context.lineWidth = 2.5;
    this.context.arc(this.x, this.y, 10, 0, 2* Math.PI);
    this.context.stroke();
  }

  update(viewPort){
    this.draw(viewPort)
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Cursor);

/***/ }),

/***/ "./javascript/display.js":
/*!*******************************!*\
  !*** ./javascript/display.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./javascript/game.js");


class Display {
  constructor(){
    this.canvas = document.getElementById('game-canvas');
    this.context = this.canvas.getContext('2d');
    this.spriteSheet;
    console.log(this.background)
    this.viewPort = {
      x: 0,
      y: 0,
    }

    let gameConfig = {
      canvas: this.canvas,
      context: this.context,
      viewPort: this.viewPort,
      spriteSheet: this.spriteSheet,
    }
    // this.spriteSheet.onload = this.game = new Game(gameConfig);
    this.game = new _game_js__WEBPACK_IMPORTED_MODULE_0__["default"](gameConfig);
    // this.game.initialize();


    this.render = this.render.bind(this);
  }

  render(){
    //create request animation loop
    this.context.clearRect(0, 0, 1280, 720);
    //draw UI (title screen, instructions, game)
    this.context.drawImage(this.background, 0, 300, 8192, 1020, -this.viewPort.x, -this.viewPort.y, 8192, 1020);

    this.game.update();
    

    requestAnimationFrame(() => this.render());
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Display);

/***/ }),

/***/ "./javascript/game.js":
/*!****************************!*\
  !*** ./javascript/game.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./javascript/player.js");
/* harmony import */ var _camera_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camera.js */ "./javascript/camera.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hook.js */ "./javascript/hook.js");
/* harmony import */ var _game_entity_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_entity.js */ "./javascript/game_entity.js");
/* harmony import */ var _platform_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./platform.js */ "./javascript/platform.js");
/* harmony import */ var _cursor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cursor.js */ "./javascript/cursor.js");
/* harmony import */ var _coin_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./coin.js */ "./javascript/coin.js");








const PLAYER_KEYS = ['a', 'd', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '];


class Game {
  constructor(options){
   //preload 
    const spriteSheet = new Image();
    this.canvas = options.canvas;
    this.context = options.context;
    this.viewPort = options.viewPort;
    spriteSheet.src = "./images/industrial.v2.png";
    this.spriteSheet = spriteSheet;
    this.keyCodePress = {13: false}
    this.score = 0;
    
    this.gameState = 0;
    //state 0 = title screen, state 1 = active, possibly each state represents a level?
    
    this.platforms = [];
    this.entities = [];
    this.coins = [];
    
    this.physicsObjs = [];
    this.staticObjs = [];
    this.activeEntities = {};
    
    this.gravDir = 1;

    this.platformCollision = this.platformCollision.bind(this);
    this.physicsCollision = this.physicsCollision.bind(this);
    this.addEntity = this.addEntity.bind(this);
    this.deleteEntity = this.deleteEntity.bind(this);
    
    const canvas = document.getElementById('game-canvas');

    document.addEventListener('keydown', (event) => {
      if(event.keyCode === 13){
        this.keyCodePress['enter'] = true;
      }
    });
    //add keybind to change states
    window.onkeydown = function (event) {
      console.log('prevent input');
      //prevent screen from moving
      // return (!event.keycode == 32);
    }
    let cursorConfig = {
      x: 300,
      y: 300,
      xLen: 25,
      yLen: 25,
      context: this.context,
    }
    this.run = false;
    this.cursor = new _cursor_js__WEBPACK_IMPORTED_MODULE_5__["default"](cursorConfig);
    

    //test timer
    // window.run = false;
    // this.preview = window.setInterval(function(){
    //   console.log('hey there')
    //   window.run = !window.run;
    // }, 3000)

    // this.entities.push(this.cursor);
    // this.activeEntities['cursor'] = this.cursor;
  }
  
  
  initialize(){
    //give each object an id
    
    //init with seed file?
    //game init
    let playerConfig = {
      x: 205,
      y: 566,
      xLen: 25,
      yLen: 30,
      context: this.context,
      game: this,
      platformCollision: this.platformCollision,
      physicsObj: true,
      physicsCollision: this.physicsCollision,
      viewPort: this.viewPort,
      // addEntity: this.addEntity,  //inteded to add hok atfirst
      deleteEntity: this.deleteEntity,
      image: this.spriteSheet,
    }
    
    let hookConfig = {
      x: playerConfig.x,
      y: playerConfig.y,
      xLen: 10,
      yLen: 10,
      active: false,
      context: this.context,
      game: this,
      platformCollision: this.platformCollision,
      viewPort: this.viewPort,
    }
    this.hook = new _hook_js__WEBPACK_IMPORTED_MODULE_2__["default"](hookConfig);
    
    playerConfig.hook = this.hook;
    
    
    let coinConfig = {
      x: 600,
      y: 566,
      xLen: 40,
      yLen: 40,
      context: this.context,
      color: "yellow",
    };

    let testCoin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"](coinConfig);
    this.activeEntities['coin1'] = testCoin;
    this.coins.push(testCoin);
    // this.coins.push(testCoin);

    //put all these in a seed file and use call/apply 
    this.platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      x: 0,
      y: this.canvas.attributes.height.value - 50,
      xLen: this.canvas.attributes.width.value,
      yLen: 25,
      context: this.context
    })
    this.platforms.push(this.platform);
    // this.entities.push(this.platform);
    this.activeEntities['platform1'] = this.platform;

    this.platform2 = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      x: 50,
      y: 0,
      xLen: 25,
      yLen: this.canvas.attributes.height.value,
      context: this.context
    })
    this.platforms.push(this.platform2);
    // this.entities.push(this.platform2);
    this.activeEntities['platform2'] = this.platform2;

    this.platform3 = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      x: 0,
      y: 25,
      xLen: this.canvas.attributes.width.value,
      yLen: 25,
      context: this.context
    })
    this.platforms.push(this.platform3);
    // this.entities.push(this.platform3);
    this.activeEntities['platform3'] = this.platform3;

    this.platform4 = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      x: this.canvas.attributes.width.value - 50,
      y: 0,
      xLen: 25,
      yLen: this.canvas.attributes.height.value,
      context: this.context
    })
    this.platforms.push(this.platform4);
    // this.entities.push(this.platform2);
    this.activeEntities['platform4'] = this.platform4;


    this.platform5 = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
      x: 400,
      y: 400,
      xLen: 40,
      yLen: 40,
      context: this.context
    })
    this.platforms.push(this.platform5);
    // this.entities.push(this.platform2);
    this.activeEntities['platform5'] = this.platform5;


    //old physics box
    this.box = new _game_entity_js__WEBPACK_IMPORTED_MODULE_3__["default"](Object.assign({}, playerConfig, {x: 255, y: 205}));
    // this.entities.push(this.box);
    this.activeEntities['box'] = this.box;
    this.physicsObjs.push(this.box);






    //add player to game
    //hook object created below hookConfig
    this.player = new _player_js__WEBPACK_IMPORTED_MODULE_0__["default"](playerConfig);
    this.camera = new _camera_js__WEBPACK_IMPORTED_MODULE_1__["default"](playerConfig);
    this.camera.x = 0;
    this.camera.y = 0;
    this.camera.center = {x: this.x + (1280 / 2), y: this.y + (720 / 2)}



    // this.entities.push(this.player);
    this.activeEntities['player'] = this.player;
    this.activeEntities['hook'] = this.hook;

    
    this.physicsObjs.push(this.player);


    this.entities = Object.values(this.activeEntities);
  }

  
  addEntity(entity, id) {
    this.activeEntities[id] = entity;
    this.entities = Object.values(this.activeEntities);
  }
  

  deleteEntity(id) {
    delete this.activeEntities[id];
    this.entities = Object.values(this.activeEntities)
  }

  //main game logic loop
  update(){
    //each game step
    switch(this.gameState){
      //start screen
      case 0: 
      this.context.fillStyle = 'white'
      this.context.font = "bold 64px Montserrat";
      this.context.fillText("GrappleHook", 120, 150);
      // this.context.fillText("GrappleHook", this.canvas.attributes.width.value / 2 - (30 * 6), this.canvas.attributes.height.value / 2 - 10);
      this.context.font = "32px Montserrat";
      this.context.fillText("Press Enter to Start", this.canvas.attributes.width.value - 400, this.canvas.attributes.height.value - 50);
      // this.context.fillText("Press Enter to Start", this.canvas.attributes.width.value / 2 - (30 * 5), this.canvas.attributes.height.value / 2 + 30);
      
      if(this.keyCodePress['enter'] === true){
        this.gameState = 1;
        clearInterval(this.preview);
        this.initialize();
      }

      // if(window.run){
      //   this.viewPort.x += 0.2;
      // }
      //run preview


      let viewMove = 0.5;
      // console.log(this.viewPort.x)
      if(this.viewPort.x + viewMove >= 4192){
        this.viewPort.x = 0;
      } 
      this.viewPort.x += viewMove;
      this.cursor.draw();
      break;


      //game logic
      case 1: 
      this.viewPort.x = this.player.x - (this.canvas.attributes.width.value / 2);
      this.viewPort.y = this.player.y - (this.canvas.attributes.height.value / 2);
      
      this.applyGravity();
      
      // this.camera.x = this.player.x - (1280 / 2);
      // this.camera.y = this.player.y - (720 / 2);
      
      for(let i = 0; i < this.entities.length; i++){
        if(this.entities[i].active) {
          this.entities[i].update(this.viewPort);
        }
      }
      //coins can either be implemented thorugh the object itself checking reference and updating the game, or do the check from the game object;
      for(let i = 0; i < this.coins.length; i++){
        if(this.player.positionMeeting(this.player.x, this.player.y, this.coins[i]) && this.coins[i].active){
            this.score += 10;
            this.coins[i].active = false;
          }
        }
        //draw in game UI (score)
        this.context.fillStyle = 'white'
        this.context.font = "bold 32px Montserrat";
        this.context.fillText(`Points: ${this.score}`, this.canvas.attributes.width.value - 220, 100);
        this.cursor.draw();
        break;
      }
    
  }



  physicsCollision(x, y, obj){
    //check collision with physics objs
    for (let i = 0; i < this.physicsObjs.length; i++) {
      // obj.positionMeeting(obj.x, obj.y, platforms[i]);
      if (
        (
          (x + obj.xLen > this.physicsObjs[i].x && x < this.physicsObjs[i].x + this.physicsObjs[i].xLen) &&
          (y + obj.yLen > this.physicsObjs[i].y && y < this.physicsObjs[i].y + this.physicsObjs[i].yLen) && 
          obj != this.physicsObjs[i]
        )
      ) {
        return true;
      }
    }
    return false;
  }

  platformCollision(x, y, obj){
  //check if new position overlaps with any platforms in platforms entitity
    for (let i = 0; i < this.platforms.length; i++) {
      // obj.positionMeeting(obj.x, obj.y, platforms[i]);
      if (
        (
          (x + obj.xLen > this.platforms[i].x && x < this.platforms[i].x + this.platforms[i].xLen) &&
          (y + obj.yLen > this.platforms[i].y && y < this.platforms[i].y + this.platforms[i].yLen)
          )
      ) {
        return true;
      }
    }
    return false;
  }


  applyGravity(){
    //iterate over list of entities and apply gravity
    for(let i = 0; i < this.physicsObjs.length; i++){
      let curObj = this.physicsObjs[i];
      
      //normal gravity
      if(this.gravDir > 0){
        if(curObj.vspd < 6 && !this.platformCollision(curObj.x, curObj.y + curObj.vspd, curObj)){
          curObj.vspd += 0.2;
        }
      }
      else {
        if(curObj.vspd > -6 && !this.platformCollision(curObj.x, curObj.y + curObj.vspd, curObj)) {
          curObj.vspd -= 0.2;
        }
      }
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./javascript/game_entity.js":
/*!***********************************!*\
  !*** ./javascript/game_entity.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class GameEntity {
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.xLen = options.xLen;
    this.yLen = options.yLen;
    this.defaultColor = options.color || 'gray'
    this.context = options.context;
    this.platformCollision = options.platformCollision;
    this.physicsCollision = options.physicsCollision;
    this.active = options.active || true;
    this.physicsObj = false || options.physicsObj;
    
    
    
    this.vspd = 0;
    this.hspd = 0;


    this.draw = this.draw.bind(this);
    this.stepCollisionCheck = this.stepCollisionCheck.bind(this);
  }

  draw(viewPort){
    //check if sprite, else draw green
    this.context.fillStyle = this.defaultColor;
    this.context.fillRect(this.x - viewPort.x, this.y - viewPort.y, this.xLen, this.yLen);
  }

  update(viewPort){
    if(this.physicsObj){
      this.stepCollisionCheck();
    }
    this.draw(viewPort);
  }

  stepCollisionCheck(){
    if (!this.platformCollision(this.x + this.hspd, this.y, this) ) {
      this.x += this.hspd;
    } else {
      let sign = 1;
      this.hspd < 0 ? sign = -1 : sign = sign;
      while (!this.platformCollision(this.x + sign, this.y, this) ) {
        if(this.state === 1){
          this.ropeAngleVelocity = 0;
        }
        this.x += sign;
      }
    }

    this.hspd = 0;

    if (!this.platformCollision(this.x, this.y + this.vspd, this)) {
      this.y += this.vspd;
    } else {
      let sign = 1;
      this.vspd < 0 ? sign = -1 : sign = sign;
      while (!this.platformCollision(this.x, this.y + sign, this)) {
        if (this.state === 1) {
          this.ropeAngleVelocity = 0;
        }
        this.y += sign;
      }


      this.vspd = 0;
    }
  }

  stepPhysicsCollisionCheck(){
    if (!this.physicsCollision(this.x + this.hspd, this.y, this)) {
      this.x += this.hspd;
    } else {
      let sign = 1;
      this.hspd < 0 ? sign = -1 : sign = sign;
      while (!this.physicsCollision(this.x + sign, this.y, this)) {
        this.x += sign;
      }
    }

    this.hspd = 0;

    if (!this.physicsCollision(this.x, this.y + this.vspd, this)) {
      this.y += this.vspd;
    } else {
      let sign = 1;
      this.vspd < 0 ? sign = -1 : sign = sign;
      while (!this.physicsCollision(this.x, this.y + sign, this)) {
        this.y += sign;
      }


      this.vspd = 0;
    }
  }




  positionMeeting(x = this.x, y = this.y, obj){
    if ((x + this.xLen > obj.x && x < obj.x + obj.xLen) &&
      (y + this.yLen > obj.y && y < obj.y + obj.yLen)
    ) {
      return true;
    } // end of if
    return false;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (GameEntity);

/***/ }),

/***/ "./javascript/grapplehook.js":
/*!***********************************!*\
  !*** ./javascript/grapplehook.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display.js */ "./javascript/display.js");



const display = new _display_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
const background = new Image();
const spriteSheet = new Image();
background.src = "./images/city_background_night.png";
spriteSheet.src = "./images/industrial.v2.png";
display.background = background;
display.spriteSheet = spriteSheet;
// console.log(display.spriteSheet);
background.onload = display.render;

// display.render;

/***/ }),

/***/ "./javascript/hook.js":
/*!****************************!*\
  !*** ./javascript/hook.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_entity */ "./javascript/game_entity.js");



//hook object is the moving grapplehook
class Hook extends _game_entity__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options){
    super(options)
    this.defaultColor = 'red';
    this.spd = 20;
    this.moving = false;
    this.state = 'ready';
  }

  //collides with walls and hook points

  update(viewPort){
    if(this.state === 'moving' || this.state === 'hooked') {
      if(this.platformCollision(this.x + this.hspd, this.y + this.vspd, this)){
        this.state = 'hooked';
      }
      else{
        // console.log('move me')
        this.x += this.hspd;
        this.y += this.vspd;
      }
      this.draw(viewPort)
      //bug where while hooked, rehooking will immediatley spin in new pos
    }
  }  

  updateTarget(target, from){
    this.angle = Math.atan2(target.y - from.y, target.x - from.x);
    // console.log("angle is: ", -this.angle * (180 / Math.PI));
    this.x = from.x;
    this.y = from.y;
    this.hspd = this.spd * Math.cos(this.angle);
    this.vspd = this.spd * Math.sin(this.angle);
    // this.moving = true;
    this.state = 'moving';
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Hook);

//if hook is off screen by x amount, reset
//review angles and speed

/***/ }),

/***/ "./javascript/platform.js":
/*!********************************!*\
  !*** ./javascript/platform.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_entity.js */ "./javascript/game_entity.js");


class Platform extends _game_entity_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options){
    super(options);
  }


}

/* harmony default export */ __webpack_exports__["default"] = (Platform);

/***/ }),

/***/ "./javascript/player.js":
/*!******************************!*\
  !*** ./javascript/player.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_entity.js */ "./javascript/game_entity.js");
/* harmony import */ var _hook_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hook.js */ "./javascript/hook.js");



const PLAYER_KEYS = ['a', 'd', 's', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', '1', '2'];
// const PLAYER_KEYS = ['a', 'd', ' '];

class Player extends _game_entity_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(options){
    super(options);
    this.image = options.image;
    this.addEntity = options.addEntity;
    // this.deleteEntity = options.deleteEntity;
    this.hook = options.hook;
    this.moveSpd = 4.5;
    this.jumpSpd = 6;
    this.game = options.game;
    this.platformCollision = options.platformCollision;
    this.viewPort = options.viewPort;
    this.hook = options.hook;
    this.debug = false;
    this.swingNext = {x: this.x, y: this.y};
    this.rotateSpd = 0.05;

    //state 0 = not-swinging, state 1 = swinging
    this.ropeLength = 0;
    this.state = 0;
    this.spinDir = -1;



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
      mousePos: {x: 0, y: 0}
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

    canvas.addEventListener('mousemove', (event) => {
      this.playerInput.mousePos.x = event.clientX - canvas.offsetLeft + this.viewPort.x;
      this.playerInput.mousePos.y = event.clientY - canvas.offsetTop + this.viewPort.y;
    })

  }// end of keybind

  draw(viewPort){
    if(this.hook.state === 'moving' || this.hook.state === 'hooked'){
      // this.ropeLength = Math.sqrt(Math.pow(Math.abs(this.x - this.hook.x), 2) + Math.pow(Math.abs(this.y - this.hook.y), 2));
      this.context.beginPath();
      this.context.strokeStyle = 'rgba(255, 255, 255, 0.5)';

      //view for dynamic viewport (centers on player)
      this.context.moveTo(this.x + this.xLen / 2 - (viewPort.x), this.y + this.yLen / 2 - (viewPort.y));
      this.context.lineTo(this.hook.x + this.hook.xLen / 2 - (viewPort.x), this.hook.y + this.yLen / 2 - (viewPort.y));

      //view for static viewport
      // this.context.moveTo(this.x + this.xLen / 2, this.y + this.yLen / 2);
      // this.context.lineTo(this.hook.x + this.hook.xLen / 2, this.hook.y + this.yLen / 2);


      this.context.stroke();

      //draws ring around targetpoint (swing path)
      // this.context.beginPath();
      // this.context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      // this.context.arc(this.hook.x - viewPort.x, this.hook.y - viewPort.y, this.ropeLength, 0, 2 * Math.PI);
      // this.context.stroke();
      //bug with radial path expanding / decreasing 
    }

    //draw default player
    // this.context.fillStyle = 'blue';
    // this.context.fillRect(this.x - viewPort.x, this.y - viewPort.y, 25, 25);
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

  update(viewPort){
    if(this.debug){
      console.log('X: ', this.playerInput.mousePos.x, 'Y: ', this.playerInput.mousePos.y)
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



        this.stepCollisionCheck();
        break;

    }

    // this.stepPhysicsCollisionCheck();
    
    //reset jump limit
    if (this.platformCollision(this.x, this.y + (1 * this.game.gravDir), this) || this.physicsCollision(this.x, this.y + (1 * this.game.gravDir), this)) {
      this.playerInput.canJump = true;
      this.playerInput.canInvert = true;
    }

    this.draw(viewPort);
  }
  

  swingStep(){

  }


}


/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ }),

/***/ "./javascript/ui_entity.js":
/*!*********************************!*\
  !*** ./javascript/ui_entity.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class UIEntitiy {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.xLen = options.xLen;
    this.yLen = options.yLen;
    this.canvas = document.getElementById('game-canvas');
    this.defaultColor = options.color || 'yellow'
    // this.active = options.active

    this.context = options.context;

    this.draw = this.draw.bind(this);
  }

  draw(viewPort) {
    //check if sprite, else draw default color box
    this.context.fillStyle = this.defaultColor;
    this.context.fillRect(this.x, this.y, this.xLen, this.yLen);
  }

  update(viewPort) {
    this.draw(viewPort);
  }


  

  positionMeeting(x, y, obj) {
    if ((x + this.xLen > obj.x && x < obj.x + obj.xLen) &&
      (y + this.yLen > obj.y && y < obj.y + obj.yLen)
    ) {
      return true;
    } // end of if
    return false;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (UIEntitiy);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
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

/***/ "./javascript/audioplayer.js":
/*!***********************************!*\
  !*** ./javascript/audioplayer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class audioPlayer {

  constructor(){
    this.audio = {}
    this.muted = 1;
    this.playing = 0;
    // this.volume = 0;
    this.currentBGM;
    this.text = 'unmute';

    this.audio['title'] = document.querySelector('audio[data-sound="title"]');
    this.audio['level_1'] = document.querySelector('audio[data-sound="level_1"]');
    this.audio['jump'] = document.querySelector('audio[data-sound="jump"]');
    this.audio['coin'] = document.querySelector('audio[data-sound="coin"]');
    this.audio['hurt'] = document.querySelector('audio[data-sound="hurt"]');
    this.audio['fire'] = document.querySelector('audio[data-sound="fire"]');
    this.toggleMute();
    
    this.currentBGM = this.audio['title'];
    
  }

  play(){
    this.playing = 1;
    this.currentBGM.play();
  }

  playEffect(effect){
    this.audio[`${effect}`].currentTime = 0;
    this.audio[`${effect}`].play();
  }

  playMusic(name){  
    this.audio[`${name}`].play();
  }

  changeMusicTo(name){
    if (!this.audio[`${name}`]) {
      return;
    }
    if(this.currentBGM){
      console.log('trigger?')
      this.currentBGM.pause();
    }

    this.currentBGM = this.audio[`${name}`];
    this.currentBGM.currentTime = 0;
    this.currentBGM.loop = 1;
    this.currentBGM.play();
    
  }
  
  toggleMute(){
    if(!this.playing){return}
    switch(this.muted){
      case 1: 
        this.muted = 0.5;
        this.text = "Low"
        break;
      case 0.5: 
        this.muted = 0;
        this.text = "Muted"
        break;
      case 0:
        this.muted = 1;
        this.text = 'High'
        break;
    }

    let keys = Object.keys(this.audio);
    for(let i = 0; i < keys.length; i++){
      this.audio[keys[i]].volume = this.muted; 
    }
  }



}

/* harmony default export */ __webpack_exports__["default"] = (audioPlayer);

/***/ }),

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
    this.context.rect(0, 0, this.canvas.attributes.width.value, this.canvas.attributes.height.value);
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
    this.defaultColor = 'yellow';
  }
//add gravity mechanic to move towards player when near.
  draw(viewPort){
    this.context.beginPath();
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'orange';
    this.context.fillStyle = 'yellow';
    this.context.arc(this.x + this.xLen / 2 - viewPort.x, this.y + this.yLen / 2 - viewPort.y, 20, 0, 2 * Math.PI);
    this.context.fill();
    this.context.stroke();
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
    this.defaultColor = 'red';
    // this.defaultColor = 'yellow';
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
    this.context.strokeStyle = this.defaultColor;
    this.context.lineWidth = 2.5;
    this.context.setLineDash([10,10]);
    // this.context.setLineDash([4,5]);
    this.context.arc(this.x, this.y, 10, 0, 2* Math.PI);
    this.context.stroke();
  }

  update(viewPort){
    this.draw(viewPort)
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Cursor);

/***/ }),

/***/ "./javascript/debug.js":
/*!*****************************!*\
  !*** ./javascript/debug.js ***!
  \*****************************/
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









const debugSeed = function (game) {
    // //give each object an id

  let playerConfig = {
        x: 205,
        y: 566,
        xLen: 25,
        yLen: 30,
        context: game.context,
        game: game,
        platformCollision: game.platformCollision,
        physicsObj: true,
        physicsCollision: game.physicsCollision,
        viewPort: game.viewPort,
        // addEntity: game.addEntity,  //inteded to add hok atfirst
        deleteEntity: game.deleteEntity,
        image: game.spriteSheet,
      }
      
  let hookConfig = {
    x: playerConfig.x,
    y: playerConfig.y,
    xLen: 10,
    yLen: 10,
    active: false,
    context: game.context,
    game: game,
    platformCollision: game.platformCollision,
    viewPort: game.viewPort,
  }
  game.hook = new _hook_js__WEBPACK_IMPORTED_MODULE_2__["default"](hookConfig);
  
  playerConfig.hook = game.hook;
  
  
  let coinConfig = {
    x: 600,
    y: 566,
    xLen: 40,
    yLen: 40,
    context: game.context,
    color: "yellow",
  };

  let testCoin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"](coinConfig);
  game.activeEntities['coin1'] = testCoin;
  game.coins.push(testCoin);
  // game.coins.push(testCoin);

  //put all these in a seed file and use call/apply 
  let platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 0,
    y: game.canvas.attributes.height.value - 50,
    xLen: game.canvas.attributes.width.value,
    yLen: 25,
    context: game.context
  })
  game.platforms.push(platform);
  // game.entities.push(game.platform);
  game.activeEntities['platform1'] = platform;

  game.platform2 = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 50,
    y: 0,
    xLen: 25,
    yLen: game.canvas.attributes.height.value,
    context: game.context
  })
  game.platforms.push(game.platform2);
  // game.entities.push(game.platform2);
  game.activeEntities['platform2'] = game.platform2;

  game.platform3 = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 0,
    y: 25,
    xLen: game.canvas.attributes.width.value,
    yLen: 25,
    context: game.context
  })
  game.platforms.push(game.platform3);
  // game.entities.push(game.platform3);
  game.activeEntities['platform3'] = game.platform3;

  game.platform4 = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: game.canvas.attributes.width.value - 50,
    y: 0,
    xLen: 25,
    yLen: game.canvas.attributes.height.value,
    context: game.context
  })
  game.platforms.push(game.platform4);
  // game.entities.push(game.platform2);
  game.activeEntities['platform4'] = game.platform4;


  game.platform5 = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 400,
    y: 400,
    xLen: 40,
    yLen: 40,
    context: game.context
  })
  game.platforms.push(game.platform5);
  // game.entities.push(game.platform2);
  game.activeEntities['platform5'] = game.platform5;


  //old physics box
  game.box = new _game_entity_js__WEBPACK_IMPORTED_MODULE_3__["default"](Object.assign({}, playerConfig, {x: 255, y: 205}));
  // game.entities.push(game.box);
  game.activeEntities['box'] = game.box;
  game.physicsObjs.push(game.box);






  //add player to game
  //hook object created below hookConfig
  game.player = new _player_js__WEBPACK_IMPORTED_MODULE_0__["default"](playerConfig);
  game.camera = new _camera_js__WEBPACK_IMPORTED_MODULE_1__["default"](playerConfig);
  game.camera.x = 0;
  game.camera.y = 0;
  game.camera.center = {x: game.x + (1280 / 2), y: game.y + (720 / 2)}



  // game.entities.push(game.player);
  game.activeEntities['player'] = game.player;
  game.activeEntities['hook'] = game.hook;

  
  game.physicsObjs.push(game.player);


  game.entities = Object.values(game.activeEntities);
}

/* harmony default export */ __webpack_exports__["default"] = (debugSeed);

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
    this.viewPort = {
      x: 0,
      y: 0,
    }

    let gameConfig = {
      canvas: this.canvas,
      context: this.context,
      viewPort: this.viewPort,
      spriteSheet: this.spriteSheet,
      background: this.background,
    }
    // this.spriteSheet.onload = this.game = new Game(gameConfig);
    this.game = new _game_js__WEBPACK_IMPORTED_MODULE_0__["default"](gameConfig);
    // this.game.initialize();


    this.render = this.render.bind(this);
  }

  render(){
    //create request animation loop
    this.context.clearRect(0, 0, this.canvas.attributes.width.value, this.canvas.attributes.height.value);
    // this.context.clearRect(0, 0, 1280, 720);
    //draw UI (title screen, instructions, game)
    // this.context.drawImage(this.background, 0, 300, 8192, 1020, -this.viewPort.x, -this.viewPort.y, 8192, 1020);

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
/* harmony import */ var _debug_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./debug.js */ "./javascript/debug.js");
/* harmony import */ var _levelOneSeed_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./levelOneSeed.js */ "./javascript/levelOneSeed.js");
/* harmony import */ var _audioplayer_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./audioplayer.js */ "./javascript/audioplayer.js");











const PLAYER_KEYS = ['a', 'd', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '];
const startLives = 5;


class Game {
  constructor(options){
   //preload 
    const spriteSheet = new Image();
    const background = new Image();
    
    this.canvas = options.canvas;
    this.context = options.context;
    this.viewPort = options.viewPort;
    spriteSheet.src = "./images/industrial.v2.png";
    background.src = "./images/city_background_night_big.png";
    
    this.audioPlayer = new _audioplayer_js__WEBPACK_IMPORTED_MODULE_9__["default"]();


    this.spriteSheet = spriteSheet;
    this.background = background;
    this.keyCodePress = {13: false}
    this.score = 0;
    this.lives = startLives;
    this.playerStart = {x: 0, y: 0};
    this.maxCoins = 0;
    this.gameover = 0;
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
      //keycode 77 == m
      if(event.keyCode === 77){
        //add delay from player controls to prevent continuos toggle?
        //Initial start to music
        if(!this.audioPlayer.playing){
          this.audioPlayer.muted = 1;
          this.audioPlayer.play();
        }
        else{
          this.audioPlayer.toggleMute();
        }
      }
    });
    document.addEventListener('keyup', (event) => {
      if(event.keyCode === 13){
        this.keyCodePress['enter'] = false;
      }
    });
    //add keybind to change states
    window.onkeydown = function (event) {
      //prevent screen from moving      
      if(!event.keycode == 32) {
        event.preventDefault();
      }
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
    // debugSeed(this);
    Object(_levelOneSeed_js__WEBPACK_IMPORTED_MODULE_8__["default"])(this);
    this.maxCoins = this.coins.length;
    this.playerStart = {x: this.player.x, y: this.player.y};

  }

  
  addEntity(entity, id) {
    this.activeEntities[id] = entity;
    this.entities = Object.values(this.activeEntities);
  }
  

  deleteEntity(id) {
    delete this.activeEntities[id];
    this.entities = Object.values(this.activeEntities)
  }

  resetGame(){
    this.lives = startLives;
    this.gameover = 0;
    this.initialize();
  }

  //main game logic loop
  update(){
    //each game step
    switch(this.gameState){
      //start screen
      case 0: 

      // this.audioPlayer.playMusic('title');

      this.context.drawImage(this.background, 0, 0, 8192, 2324, -this.viewPort.x, -this.viewPort.y - 850, 8192, 2324);

      this.context.fillStyle = 'white'
      this.context.font = "bold 64px Montserrat";
      this.context.fillText("GrappleHook", 120, 150);
      
      
      this.context.font = "32px Montserrat";
      this.context.fillText("Press 'A' and 'D' to move Left and Right", 150, 240);
      this.context.fillText("Press the Space Bar to Jump", 150, 280);
      this.context.fillText("Use the mouse to aim and Left Click to fire a Hook", 150, 320);
      this.context.fillText("While Swinging, Jump or fire a Hook to cancel.", 150, 400);
      this.context.fillText("Press M to toggle Volume", 150, 440);

      this.context.fillText("Collect all the Coins to win!", 150, 540);

      this.context.fillText("Credits + Info in HTML elements! Chrome: CTRL + SHIFT + I", 150, 580);
      // this.context.fillText("GrappleHook", this.canvas.attributes.width.value / 2 - (30 * 6), this.canvas.attributes.height.value / 2 - 10);
      this.context.font = "32px Montserrat";
      this.context.fillText("Press Enter to Start", this.canvas.attributes.width.value - 400, this.canvas.attributes.height.value - 50);
      // this.context.fillText("Press Enter to Start", this.canvas.attributes.width.value / 2 - (30 * 5), this.canvas.attributes.height.value / 2 + 30);
      
      if(this.keyCodePress['enter'] === true){
        this.gameState = 1;
        this.audioPlayer.changeMusicTo('level_1');
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
      this.context.drawImage(this.background, 0, 0, 8192, 2324, -this.viewPort.x * 0.3 - 500, -this.viewPort.y * 0.9 - 850, 8192, 2324);
      
      this.applyGravity();
      
      // this.camera.x = this.player.x - (1280 / 2);
      // this.camera.y = this.player.y - (720 / 2);

      //draw guideline infront
      this.context.beginPath();
      // this.context.setLineDash([5, 15]);
      this.context.setLineDash([5, 10]);
      this.context.strokeStyle = 'rgba(178, 34, 34, 0.5)';
      this.context.moveTo((this.canvas.attributes.width.value / 2) + (this.player.xLen / 2), (this.canvas.attributes.height.value / 2) + (this.player.yLen / 2));
      this.context.lineTo(this.cursor.x, this.cursor.y);
      this.context.stroke();
      this.context.setLineDash([]);


      for(let i = 0; i < this.entities.length; i++){
        if(this.entities[i].active) {
          this.entities[i].update(this.viewPort);
        }
      }
      //coins can either be implemented thorugh the object itself checking reference and updating the game, or do the check from the game object;
      for(let i = 0; i < this.coins.length; i++){
        if(this.player.positionMeeting(this.player.x, this.player.y, this.coins[i]) && this.coins[i].active){
            this.audioPlayer.playEffect('coin');
            this.score += 1;
            this.coins[i].active = false;
          }
        }
        //draw in game UI (score)
        this.context.fillStyle = 'white'
        this.context.font = "bold 32px Montserrat";
        this.context.shadowOffsetX = 3;
        this.context.shadowOffsetY = 3;
        this.context.shadowColor = "rgba(0,0,0,0.3)";
        this.shadowBlur = 4;
        this.context.fillText(`Lives: ${this.lives}`, 100, 100);
        this.context.fillText(`Coins: ${this.score} / ${this.maxCoins}`, this.canvas.attributes.width.value - 220, 100);
        this.context.fillText(`M to toggle Volume: ${this.audioPlayer.text}`, 100, 640);

        
        
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;

        //draw cursor infront
        this.cursor.draw();
        
        
        if(this.score === this.maxCoins){
          this.context.fillStyle = "rgba(0, 200, 200, 0.5)"
          this.context.fillRect(0, 0, this.canvas.attributes.width.value, this.canvas.attributes.height.value);
          this.context.fillStyle = 'white'
          this.context.fillText(`You Win!`, 400, 300);
          this.context.fillText(`Press Enter to Restart`, 400, 350);
          if (this.keyCodePress.enter) {
            this.resetGame();
          }
        }
        else if(this.player.y > 1100){
          this.audioPlayer.playEffect('hurt');
          if(this.lives > 0){
            this.lives--;
            // this.initialize();
            this.player.x = this.playerStart.x;
            this.player.y = this.playerStart.y;
          }
          else {
            this.gameover = 1;
          }
        }
        if(this.gameover){
          //dark overlay with gameover and enable press enter to restart
          this.player.x = 0;
          this.player.y = 1100
          this.context.fillStyle = "rgba(200, 200, 200, 0.5)"
          this.context.fillRect(0, 0, this.canvas.attributes.width.value, this.canvas.attributes.height.value);
          this.context.fillStyle = 'white'
          this.context.fillText(`Game Over`, 400, 300);
          this.context.fillText(`Press Enter to Restart`, 400, 350);
          if(this.keyCodePress.enter){
            this.resetGame();
          }
        }
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
// display.background = background;
// display.spriteSheet = spriteSheet;
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
    this.spd = 31;
    this.moving = false;
    this.state = 'ready';
  }

  //collides with walls and hook points

  update(viewPort){
    // console.log('hook state: ', this.state)
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

/***/ "./javascript/levelOneSeed.js":
/*!************************************!*\
  !*** ./javascript/levelOneSeed.js ***!
  \************************************/
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









const levelOneSeed = function (game) {
  //give each object an id
  let coinConfig, coin, platformConfig, platform;
  game.score = 0;
  game.entities = [];
  game.platforms = [];
  game.coins = [];
  // let coinConfig = {
  //   x: 600,
  //   y: 566,
  //   xLen: 40,
  //   yLen: 40,
  //   context: game.context,
  //   color: "yellow",
  // };
  // ===============================================================
  //Seed Platforms
  
  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 1152,
    y: 800,
    xLen: 32,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);
  
  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 1600,
    y: 960,
    xLen: 64,
    yLen: 64,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);
  
  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 0,
    y: 992,
    xLen: 2336,
    yLen: 64,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);
  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 1728,
    y: 928,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);
  
  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 1856,
    y: 896,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);
  
  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 1952,
    y: 704,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 2240,
    y: 800,
    xLen: 96,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 2464,
    y: 608,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 2790,
    y: 608,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 3040,
    y: 832,
    xLen: 576,
    yLen: 64,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 3680,
    y: 800,
    xLen: 96,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 3840,
    y: 768,
    xLen: 96,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 4000,
    y: 608,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 4032,
    y: 352,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 4224,
    y: 96,
    xLen: 32,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 4544,
    y: 192,
    xLen: 256,
    yLen: 64,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 5184,
    y: 256,
    xLen: 32,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 5536,
    y: 416,
    xLen: 32,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 5792,
    y: 448,
    xLen: 160,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 5952,
    y: 928,
    xLen: 416,
    yLen: 64,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 6400,
    y: 768,
    xLen: 32,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 6560,
    y: 854,
    xLen: 96,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 6848,
    y: 704,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 6784,
    y: 480,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 6784,
    y: 256,
    xLen: 64,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 7072,
    y: 224,
    xLen: 96,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 7136,
    y: 96,
    xLen: 640,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 7584,
    y: 544,
    xLen: 32,
    yLen: 32,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);

  platform = new _platform_js__WEBPACK_IMPORTED_MODULE_4__["default"]({
    x: 7616,
    y: 896,
    xLen: 384,
    yLen: 64,
    context: game.context
  })
  game.platforms.push(platform);
  game.entities.push(platform);



// ================================================================
  //Seed Coins
  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 480,
    y: 928,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 864,
    y: 864,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 1152,
    y: 640,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 1664,
    y: 896,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 1792,
    y: 864,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 1952,
    y: 608,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 2272,
    y: 736,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 2464,
    y: 800,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 2624,
    y: 704,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 2688,
    y: 512,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 2880,
    y: 416,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 3040,
    y: 512,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 3296,
    y: 768,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 3616,
    y: 736,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 3808,
    y: 704,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 4032,
    y: 704,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 4128,
    y: 576,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  // ???????
  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 4032,
    y: 480,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 3904,
    y: 352,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 4032,
    y: 224,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 4224,
    y: 192,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 4384,
    y: 96,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 4576,
    y: 96,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 4992,
    y: 192,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 5088,
    y: 384,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 5312,
    y: 384,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 5440,
    y: 256,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 5632,
    y: 256,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 5792,
    y: 352,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6016,
    y: 416,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6016,
    y: 640,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6016,
    y: 832,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6464,
    y: 832,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6464,
    y: 832,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6720,
    y: 768,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6848,
    y: 832,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6976,
    y: 736,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6880,
    y: 576,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6688,
    y: 544,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6656,
    y: 416,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6816,
    y: 352,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 6912,
    y: 256,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 7232,
    y: 256,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 7456,
    y: 192,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 7648,
    y: 192,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 7776,
    y: 256,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 7776,
    y: 480,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);

  coin = new _coin_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
    x: 7776,
    y: 704,
    xLen: 40,
    yLen: 40,
    context: game.context,
  })
  game.coins.push(coin);
  game.entities.push(coin);




  
  //offset is temporary fix to platform placements
  let offset = 150;

  let playerConfig = {
    x: 192,
    y: 928 - offset,
    xLen: 25,
    yLen: 30,
    context: game.context,
    game: game,
    platformCollision: game.platformCollision,
    physicsObj: true,
    physicsCollision: game.physicsCollision,
    viewPort: game.viewPort,
    // addEntity: game.addEntity,  //inteded to add hok atfirst
    deleteEntity: game.deleteEntity,
    image: game.spriteSheet,
    audioPlayer: game.audioPlayer,
  }

  let hookConfig = {
    x: playerConfig.x,
    y: playerConfig.y,
    xLen: 10,
    yLen: 10,
    active: false,
    context: game.context,
    game: game,
    platformCollision: game.platformCollision,
    viewPort: game.viewPort,
  }
  let hook = new _hook_js__WEBPACK_IMPORTED_MODULE_2__["default"](hookConfig);

  playerConfig.hook = hook;

  //add player to game
  //hook object created below hookConfig
  //player and camera should be game attritbutes for update funciton
  game.player = new _player_js__WEBPACK_IMPORTED_MODULE_0__["default"](playerConfig);
  game.camera = new _camera_js__WEBPACK_IMPORTED_MODULE_1__["default"](playerConfig);
  game.camera.x = 0;
  game.camera.y = 0;
  game.camera.center = {
    x: game.x + (1280 / 2),
    y: game.y + (720 / 2)
  }



  // game.entities.push(game.player);
  game.activeEntities['player'] = game.player;
  game.activeEntities['hook'] = game.hook;
  
  
  game.entities.push(game.player);
  game.entities.push(hook);

  game.physicsObjs.push(game.player);

  for(let i = 0; i < game.entities.length; i++){
    game.entities[i].y -= offset;
  }
  for(let i = 0; i < game.coins.length; i++){
    game.coins[i].y -= offset;
  }
  for(let i = 0; i < game.platforms.length; i++){
    game.platforms[i].y -= offset;
  }


  // game.entities = Object.values(game.activeEntities);
}

/* harmony default export */ __webpack_exports__["default"] = (levelOneSeed);

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

  draw(viewPort){
    this.context.shadowOffsetX = 3;
    this.context.shadowOffsetY = 3;
    this.context.shadowColor = "rgba(0,0,0,0.3)";
    this.shadowBlur = 4;

    this.context.fillStyle = this.defaultColor;
    this.context.fillRect(this.x - viewPort.x, this.y - viewPort.y, this.xLen, this.yLen);
    this.context.shadowOffsetX = 0;
    this.context.shadowOffsetY = 0;
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



const PLAYER_KEYS = ['a', 'A', 'd', 'D', 's', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', '1', '2'];
// const PLAYER_KEYS = ['a', 'd', ' '];

class Player extends _game_entity_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    this.context.shadowOffsetX = 3;
    this.context.shadowOffsetY = 3;
    this.context.shadowColor = "rgba(0,0,0,0.3)";
    this.shadowBlur = 4;
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
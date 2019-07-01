import Player from "./player.js";
import Camera from "./camera.js";
import Hook from "./hook.js";
import GameEntity from "./game_entity.js";
import Platform from "./platform.js";
import Cursor from "./cursor.js";
import Coin from "./coin.js";
import debugSeed from "./debug.js";
import levelOneSeed from "./levelOneSeed.js";
import audioPlayer from "./audioplayer.js";

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
    
    this.audioPlayer = new audioPlayer();


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
          // this.audioPlayer.muted = 1;
          this.audioPlayer.play();
        }
        else{
          console.log('waduhek')
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
    this.cursor = new Cursor(cursorConfig);
    

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
    levelOneSeed(this);
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
        console.log(this.audioPlayer.muted)
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

export default Game;
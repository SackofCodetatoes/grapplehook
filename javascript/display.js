import Game from "./game.js";

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
    this.game = new Game(gameConfig);
    // this.game.initialize();


    this.render = this.render.bind(this);
  }

  render(){
    //create request animation loop
    this.context.clearRect(0, 0, 1280, 720);

    this.context.drawImage(this.background, 0, 300, 1584, 1020, -this.viewPort.x, -this.viewPort.y, 1584, 1020);

    this.game.update();

    requestAnimationFrame(() => this.render());
  }

}

export default Display;
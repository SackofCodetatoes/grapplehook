const GameEntity = require("./game_entity.js")
const PLAYER_KEYS = ['w', 'a', 's', 'd', " "];
class Player extends GameEntity {
  constructor(options) {
    //arbitrary start
    super(options);
    this.x_len = 25;
    this.y_len = 25;
    this.keyBind();
    this.draw = this.draw.bind(this);
  }


  keyBind() {
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if (PLAYER_KEYS.includes(event.key)) {
        if (event.key === 'a') {
          this.x -= 1;
        }
        if (event.key === 'd') {
          this.x += 1;
        }
        if (event.key === 'w') {
          this.y -= 1;
        }
        if (event.key === 's') {
          this.y += 1;
        }
        if (event.key === ' '){
          this.y -= 10;
        }
        // requestAnimationFrame(this.draw);
      }
    });
  }
  draw() {
    // this.context.clearRect(0, 0, 640, 480);
    this.context.fillStyle = 'blue';
    this.context.fillRect(this.x, this.y, this.x_len, this.y_len);
  }
  getInput(){

  }
}

module.exports = Player;

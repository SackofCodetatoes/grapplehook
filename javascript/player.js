const GameEntity = require("./game_entity.js")
const PLAYER_KEYS = ['w', 'a', 's', 'd', " "];
// const KEY_LEFT = (event.key === 'a');
class Player extends GameEntity {
  constructor(options) {
    super(options);
    this.player_moves = {
      a: false,
      d: false,
      w: false,
      s: false,
      Space: false,
    }

    this.keyBind();
    this.move_spd = 2;
  }
//source of inspiration for omni-directional movement/fluidity
//https://stackoverflow.com/questions/12273451/how-to-fix-delay-in-javascript-keydown
  keyBind() {
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if (PLAYER_KEYS.includes(event.key)) {
        this.player_moves[event.key] = true;
      }
    });
    document.addEventListener('keyup', (event) => {
      if (PLAYER_KEYS.includes(event.key)) {
        this.player_moves[event.key] = false;
      }
    });
  }

  getInput(){
    if (this.player_moves['a'] === true) {
      this.x -= this.move_spd;
    }
    if (this.player_moves['d'] === true) {
      this.x += this.move_spd;
    }
    if (this.player_moves['w'] === true) {
      this.y -= this.move_spd;
    }
    if (this.player_moves['s'] === true) {
      this.y += this.move_spd;
    }
  }
}


module.exports = Player;

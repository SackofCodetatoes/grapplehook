const Player = require("./player.js");
const GameEntity = require("./game_entity.js");
window.player = Player;
console.log('all is dandy!');

const canvas = document.getElementById('game-canvas');
let context = canvas.getContext('2d');
const playerOptions = { x: 25, y: 25, context: context };

window.move_dir = 1;
window.newPlayer = new Player(playerOptions);
window.staticEntity = new GameEntity(playerOptions);
 requestAnimationFrame(window.staticEntity.draw);

setInterval(function () {
  context.clearRect(0, 0, 640, 480);
  requestAnimationFrame(newPlayer.draw);
  // animiate something
  if(window.staticEntity.y > 200){
    window.move_dir = -1;
  }else
  if(window.staticEntity.y < 100) {
    window.move_dir = 1;
  }
  window.staticEntity.y += window.move_dir;
  requestAnimationFrame(window.staticEntity.draw);
}, 1000 / 60);
const Player = require("./player.js")

window.player = Player;
console.log('all is dandy!');

const canvas = document.getElementById('game-canvas');
let context = canvas.getContext('2d');
const playerOptions = { x: 25, y: 25, context: context };

window.newPlayer = new Player(playerOptions);

setInterval(function () {
  requestAnimationFrame(newPlayer.draw);
  // animiate something
}, 1000 / 60);
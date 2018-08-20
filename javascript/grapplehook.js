const Player = require("./player.js")

window.player = Player;
console.log('all is dandy!');

const canvas = document.getElementById('game-canvas');
let context = canvas.getContext('2d');
context.fillStyle = 'red';
context.fillRect(100,100,100,200);
document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (event.key === 'a' || event.key === 's') {
    alert(`we have input ${keyName}`);
    window.player.x += 1;

  }
});

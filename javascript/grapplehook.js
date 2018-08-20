const Player = require("./player.js")

window.player = Player;
window.newPlayer = new Player();
console.log('all is dandy!');

const canvas = document.getElementById('game-canvas');
let context = canvas.getContext('2d');

const draw = function (context, newPlayer) {
  // context.fillStyle = 'red';
  // content.fillRect()
  // context.fillRect(newPlayer.x, newPlayer.y, newPlayer.x + 25, newPlayer.y + 25);
};
// context.fillStyle = 'red';
// draw(context, window.newPlayer);


document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (event.key === 'a' || event.key === 's') {
    // alert(`we have input ${keyName}`);
    if(event.key === 'a'){
      window.newPlayer.x -= 5;
    } 
    if(event.key === 's'){
      window.newPlayer.x += 5;
    }
    context.clearRect(0,0, 640, 480);
    context.fillStyle = 'red';
    // context.fillRect()
    context.fillRect(newPlayer.x, newPlayer.y, 25, 25);

    
  }
});

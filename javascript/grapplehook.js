const Player = require("./player.js")

window.player = Player;
console.log('all is dandy!');

const canvas = document.getElementById('game-canvas');
let context = canvas.getContext('2d');
context.fillStyle = 'red';
context.fillRect(100,100,100,200);

const Display = require("./display.js");
const Game = require("./game.js");



console.log('all is dandy!');
let spriteSheet = new Image();
spriteSheet.src = "./images/industrial.v2.png";
const game = new Game();
game.spriteSheet = spriteSheet;
game.init();
const testDisplay = new Display(game);
spriteSheet.onload = testDisplay.render;








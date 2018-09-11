const Display = require("./display.js");
const Game = require("./game.js");



// console.log('all is dandy!');
let spriteSheet = new Image();
spriteSheet.src = "./images/industrial.v2.png";

let background = new Image();
background.src = "./images/city_background_night.png";
const game = new Game();
game.spriteSheet = spriteSheet;
game.background = background;
game.init();
const testDisplay = new Display(game);
background.onload = testDisplay.render;








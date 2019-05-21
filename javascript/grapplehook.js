import Display from "./display.js"


const display = new Display();
const background = new Image();
const spriteSheet = new Image();
background.src = "./images/city_background_night.png";
spriteSheet.src = "./images/industrial.v2.png";
display.background = background;
display.spriteSheet = spriteSheet;
// console.log(display.spriteSheet);
background.onload = display.render;

// display.render;
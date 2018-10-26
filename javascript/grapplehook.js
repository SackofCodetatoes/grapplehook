import Display from "./display.js"


const display = new Display();
const background = new Image();
background.src = "./images/city_background_night.png";
display.background = background;
background.onload = display.render;
display.render;
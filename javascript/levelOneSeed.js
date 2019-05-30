import Player from "./player.js";
import Camera from "./camera.js";
import Hook from "./hook.js";
import GameEntity from "./game_entity.js";
import Platform from "./platform.js";
import Cursor from "./cursor.js";
import Coin from "./coin.js";


const levelOneSeed = function(){
  let coinConfig = {
    x: 700,
    y: 566,
    xLen: 40,
    yLen: 40,
    context: this.context,
    color: "yellow",
  };
  let testCoin = new Coin(coinConfig);
  this.activeEntities[coin1] = testCoin;
  this.coins.push(testCoin);

}
class UIEntitiy {
  constructor(options) {
    this.x = options.x;
    this.y = options.y;
    this.xLen = options.xLen;
    this.yLen = options.yLen;
    this.canvas = document.getElementById('game-canvas');
    this.defaultColor = options.color || 'yellow'
    // this.active = options.active

    this.context = options.context;

    this.draw = this.draw.bind(this);
  }

  draw(viewPort) {
    //check if sprite, else draw default color box
    this.context.fillStyle = this.defaultColor;
    this.context.fillRect(this.x, this.y, this.xLen, this.yLen);
  }

  update(viewPort) {
    this.draw(viewPort);
  }


  

  positionMeeting(x, y, obj) {
    if ((x + this.xLen > obj.x && x < obj.x + obj.xLen) &&
      (y + this.yLen > obj.y && y < obj.y + obj.yLen)
    ) {
      return true;
    } // end of if
    return false;
  }
}

export default UIEntitiy;
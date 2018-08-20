class Player {
  constructor(options) {
    //arbitrary start
    this.x = options.x;
    this.y = options.y;
    this.context = options.context
    this.x_len = 25;
    this.y_len = 25;
    this.keyBind();

    this.draw =  () => {
      this.context.clearRect(0, 0, 640, 480);
      this.context.fillStyle = 'blue';
      this.context.fillRect(this.x, this.y, this.x_len, this.y_len);
    }
  }
  keyBind() {
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if (event.key === 'a' || event.key === 's') {
        if (event.key === 'a') {
          this.x -= 5;
        }
        if (event.key === 's') {
          this.x += 5;
        }
        requestAnimationFrame(this.draw);
        // this.draw();
      }
    });
  }
  // draw(){
  //   this.context.clearRect(0, 0, 640, 480);
  //   this.context.fillStyle = 'blue';
  //   this.context.fillRect(this.x, this.y, this.x_len, this.y_len);

  // }
  getInput(){
    //check keyboard movements

  }
}

module.exports = Player;

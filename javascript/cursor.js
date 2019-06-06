import UIEntity from "./ui_entity.js"

class Cursor extends UIEntity {
  constructor(options){
    super(options);
    this.defaultColor = 'red';
    // this.defaultColor = 'yellow';
    this.active = true;
    this.keybind();
  }

  keybind(){
    this.canvas.addEventListener('mousemove', (event) => {
      this.x = event.clientX - this.canvas.offsetLeft;
      this.y = event.clientY - this.canvas.offsetTop;
    })
  }

  draw(){
    // unique draw
    this.context.beginPath();
    this.context.strokeStyle = this.defaultColor;
    this.context.lineWidth = 2.5;
    this.context.setLineDash([10,10]);
    // this.context.setLineDash([4,5]);
    this.context.arc(this.x, this.y, 10, 0, 2* Math.PI);
    this.context.stroke();
  }

  update(viewPort){
    this.draw(viewPort)
  }

}

export default Cursor;
import UIEntity from "./ui_entity.js"

class Cursor extends UIEntity {
  constructor(options){
    super(options);
    this.defaultColor = 'yellow';

    this.keybind();
  }

  keybind(){
    this.canvas.addEventListener('mousemove', (event) => {
      this.x = event.clientX - this.canvas.offsetLeft;
      this.y = event.clientY - this.canvas.offsetTop;
    })
  }

  update(viewPort){
    this.draw(viewPort)
  }

}

export default Cursor;
class GameEntity {
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.xLen = options.xLen;
    this.yLen = options.yLen;
    this.defaultColor = options.color || 'gray'
    this.context = options.context;
    this.platformCollision = options.platformCollision;
    this.physicsCollision = options.physicsCollision;
    this.active = options.active || true;
    this.physicsObj = false || options.physicsObj;
    
    
    
    this.vspd = 0;
    this.hspd = 0;


    this.draw = this.draw.bind(this);
    this.stepCollisionCheck = this.stepCollisionCheck.bind(this);
  }

  draw(viewPort){
    //check if sprite, else draw green
    this.context.fillStyle = this.defaultColor;
    this.context.fillRect(this.x - viewPort.x, this.y - viewPort.y, this.xLen, this.yLen);
  }

  update(viewPort){
    if(this.physicsObj){
      this.stepCollisionCheck();
    }
    this.draw(viewPort);
  }

  stepCollisionCheck(){
    if (!this.platformCollision(this.x + this.hspd, this.y, this) ) {
      this.x += this.hspd;
    } else {
      let sign = 1;
      this.hspd < 0 ? sign = -1 : sign = sign;
      while (!this.platformCollision(this.x + sign, this.y, this) ) {
        if(this.state === 1){
          this.ropeAngleVelocity = 0;
        }
        this.x += sign;
      }
    }

    this.hspd = 0;

    if (!this.platformCollision(this.x, this.y + this.vspd, this)) {
      this.y += this.vspd;
    } else {
      let sign = 1;
      this.vspd < 0 ? sign = -1 : sign = sign;
      while (!this.platformCollision(this.x, this.y + sign, this)) {
        if (this.state === 1) {
          this.ropeAngleVelocity = 0;
        }
        this.y += sign;
      }


      this.vspd = 0;
    }
  }

  stepPhysicsCollisionCheck(){
    if (!this.physicsCollision(this.x + this.hspd, this.y, this)) {
      this.x += this.hspd;
    } else {
      let sign = 1;
      this.hspd < 0 ? sign = -1 : sign = sign;
      while (!this.physicsCollision(this.x + sign, this.y, this)) {
        this.x += sign;
      }
    }

    this.hspd = 0;

    if (!this.physicsCollision(this.x, this.y + this.vspd, this)) {
      this.y += this.vspd;
    } else {
      let sign = 1;
      this.vspd < 0 ? sign = -1 : sign = sign;
      while (!this.physicsCollision(this.x, this.y + sign, this)) {
        this.y += sign;
      }


      this.vspd = 0;
    }
  }




  positionMeeting(x = this.x, y = this.y, obj){
    if ((x + this.xLen > obj.x && x < obj.x + obj.xLen) &&
      (y + this.yLen > obj.y && y < obj.y + obj.yLen)
    ) {
      return true;
    } // end of if
    return false;
  }
}

export default GameEntity;
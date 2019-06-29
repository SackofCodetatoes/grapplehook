class audioPlayer {

  constructor(){
    this.audio = {}
    this.muted = 1;
    this.playing = 0;
    // this.volume = 0;
    this.currentBGM;
    this.text = 'unmute';

    this.audio['title'] = document.querySelector('audio[data-sound="title"]');
    this.audio['level_1'] = document.querySelector('audio[data-sound="level_1"]');
    this.audio['jump'] = document.querySelector('audio[data-sound="jump"]');
    this.audio['coin'] = document.querySelector('audio[data-sound="coin"]');
    this.audio['hurt'] = document.querySelector('audio[data-sound="hurt"]');
    this.audio['fire'] = document.querySelector('audio[data-sound="fire"]');

    let keys = Object.keys(this.audio);
    for (let i = 0; i < keys.length; i++) {
      this.audio[keys[i]].volume = 0;
    }
    // this.toggleMute();
    
    this.currentBGM = this.audio['title'];
    
  }

  play(){
    this.playing = 1;
    this.muted = 0;
    this.toggleMute()
    this.currentBGM.play();
  }

  playEffect(effect){
    this.audio[`${effect}`].currentTime = 0;
    this.audio[`${effect}`].play();
  }

  playMusic(name){  
    this.audio[`${name}`].play();
  }

  changeMusicTo(name){
    if (!this.audio[`${name}`]) {
      return;
    }
    if(this.currentBGM){
      this.currentBGM.pause();
    }

    this.currentBGM = this.audio[`${name}`];
    this.currentBGM.currentTime = 0;
    this.currentBGM.loop = 1;
    this.currentBGM.play();
    
  }
  
  toggleMute(){
    // if(this.playing){return}
    switch(this.muted){
      case 1: 
        this.muted = 0.5;
        this.text = "Low"
        break;
      case 0.5: 
        this.muted = 0;
        this.text = "Muted"
        break;
      case 0:
        this.muted = 1;
        this.text = 'High'
        break;
    }

    let keys = Object.keys(this.audio);
    for(let i = 0; i < keys.length; i++){
      this.audio[keys[i]].volume = this.muted; 
    }
  }



}

export default audioPlayer;
class audioPlayer {

  constructor(){
    this.audio = {}
    this.muted = 1;
    this.playing = 0;
    this.currentBGM;

    this.audio['title'] = document.querySelector('audio[data-sound="title"]');
    this.audio['level_1'] = document.querySelector('audio[data-sound="level_1"]');
    this.audio['jump'] = document.querySelector('audio[data-sound="jump"]');
    this.toggleMute();
    
    this.currentBGM = this.audio['title'];
    
  }

  play(){
    this.playing = 1;
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
      this.currentBGM.pause;
    }

    this.currentBGM = this.audio[`${name}`];
    this.currentBGM.currentTime = 0;
    this.currentBGM.loop = 1;
    this.currentBGM.play();
    
  }

  toggleMute(){
    this.muted = !this.muted;

    let keys = Object.keys(this.audio);
    for(let i = 0; i < keys.length; i++){
      this.audio[keys[i]].volume = this.muted; 
    }
  }



}

export default audioPlayer;
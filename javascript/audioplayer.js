class audioPlayer {

  constructor(){
    this.audio = {}
    this.muted = 0;

    this.audio['title'] = document.querySelector('audio[data-sound="title"]');
    this.audio['level_1'] = document.querySelector('audio[data-sound="level_1"]');
    this.audio['jump'] = document.querySelector('audio[data-sound="jump"]');
    
  }

  playEffect(effect){
    this.audio[`${effect}`].currentTime = 0;
    this.audio[`${effect}`].play();
  }

  playMusic(name){      
    this.audio[`${name}`].play();
    

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
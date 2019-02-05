import {
  AfterViewInit,
  Directive,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[audioEffectsClick]'
})
export class AudioEffectsClick implements AfterViewInit{
  audioUrl = '../../assets/sound/audioEffects_click.wav';

  ngAfterViewInit(){}

  @HostListener('click') onClick() {
    playAudio(this.audioUrl);
  }
}

@Directive({
  selector: '[audioEffectsHover]'
})
export class AudioEffectsHover implements AfterViewInit{
  audioUrl = '../../assets/sound/audioEffects_hover.wav';

  ngAfterViewInit(){}

  @HostListener('mouseenter') onMouseEnter() {
   playAudio(this.audioUrl);
  }
}

function playAudio(url){
  let audio = new Audio();
  audio.src = url;
  audio.volume = .2;
  audio.load();
  audio.play();
}
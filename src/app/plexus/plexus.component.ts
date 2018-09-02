import { Component, OnInit } from '@angular/core';
import { pageLoadAnimation } from '../_lib/animations.page';
import { AudioEffectsClick, AudioEffectsHover } from '../_lib/audio.effects';

@Component({
  selector: 'app-plexus',
  templateUrl: './plexus.component.html',
  styleUrls: ['./plexus.component.scss'],
  animations: [pageLoadAnimation]
})
export class PlexusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

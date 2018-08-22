import { Component, OnInit } from '@angular/core';
import { pageLoadAnimation } from '../_lib/animations.page';
import { AudioEffectsClick, AudioEffectsHover } from '../_lib/audio.effects';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss'],
  animations: [pageLoadAnimation]
})
export class DossierComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

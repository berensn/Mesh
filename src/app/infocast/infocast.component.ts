import { Component, OnInit } from '@angular/core';
import { pageLoadAnimation } from '../_lib/animations.page';
import { AudioEffectsClick, AudioEffectsHover } from '../_lib/audio.effects';
import { JsonService } from '../_lib/service.json';

@Component({
  selector: 'app-infocast',
  templateUrl: './infocast.component.html',
  styleUrls: ['./infocast.component.scss'],
  animations: [pageLoadAnimation]
})
export class InfocastComponent implements OnInit {

  // Variables
  public jsonInfocasts = [];           // Array of news from infocast.json
  private _jsonUrl: string = "../assets/data/infocast.json";    // Url of infocast.json file

  // Constructors
  constructor(private jsonService: JsonService) { }

  // Methods
  ngOnInit() {
    this.getInfocast();
  }

  // Gets infocasts via [article.service.ts][getInfocast()]
  getInfocast(): void {
    this.jsonService.getInfocast(this._jsonUrl)
      .subscribe(data => {
        this.jsonInfocasts = data;
      });
  }
}
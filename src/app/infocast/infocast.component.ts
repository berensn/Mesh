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
  public jsonInfocasts = [];
  private _jsonUrl: string = '../cockpit/api/collections/get/News?token=b54bd207c7ff89454a03d17f810cb5';
  // Constructors
  constructor(private jsonService: JsonService) {}

  // Methods
  ngOnInit() {
    this.getInfocast();
  }

  getInfocast(): void {
    this.jsonService.getInfocast(this._jsonUrl)
      .subscribe(data => {
        this.jsonInfocasts = data,
        console.log(this.jsonInfocasts);
      });
  }
}
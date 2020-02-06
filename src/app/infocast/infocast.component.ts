import { Component, OnInit } from '@angular/core';
import { pageLoadAnimation } from '../_lib/animations.page';
import { AudioEffectsClick, AudioEffectsHover } from '../_lib/audio.effects';
import { Globals } from '../_lib/globals';
import { JsonService } from '../_lib/service.json';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-infocast',
  templateUrl: './infocast.component.html',
  styleUrls: ['./infocast.component.scss'],
  animations: [pageLoadAnimation]
})
export class InfocastComponent implements OnInit {

  // Variables
  public jsonInfocasts;
  private _jsonUrl: string = 'https://berens.ink/cockpit/api/collections/get/News?token=b54bd207c7ff89454a03d17f810cb5';
  //private _jsonUrl: string = '../cockpit/api/collections/get/News?token=b54bd207c7ff89454a03d17f810cb5';
  // Constructors
  constructor(private _g: Globals, private jsonService: JsonService) {}

  // Formatting and on/off values for console.log
  loc = this._g.loc;        // Location color
  item = this._g.item;      // Item color
  val = this._g.val;        // Value color
  log = this._g.log;        // Logging on/off
  
  // Methods
  ngOnInit() {
    this.getInfocast();
  }

  getInfocast(): void {
    this.jsonService.getInfocast(this._jsonUrl)
      .subscribe(data => {
        this.jsonInfocasts = data['entries'];
        if (this.log) console.log(this.jsonInfocasts[0]._created);
      });
  }

  dateConvert(timestamp){
    if (this.log) console.log(timestamp);
    let ts = new Date(timestamp); //EEEE, MMMM d, y
    if (this.log) console.log(ts);
    return ts;
  }
}
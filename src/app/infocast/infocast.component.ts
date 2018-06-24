import { Component, OnInit } from '@angular/core';
import { JsonService } from '../helpers/json.service';

@Component({
  selector: 'app-infocast',
  templateUrl: './infocast.component.html',
  styleUrls: ['./infocast.component.scss']
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
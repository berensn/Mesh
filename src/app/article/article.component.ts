/*
  Retrieves article list from articles.json and displays the first one
*/

import { Component, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Globals } from '../helpers/globals';
import { JsonService } from '../helpers/json.service';
import { Paginator } from '../helpers/paginator';
import { TransferService } from '../helpers/transfer.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  // Variables
  public jsonArticles = [];           // Array of articles from articles.json
  public pageJumper: number[] = [];   // Array {pageNum, subStart, subEnd}
  public content;                     // Newest article from articles.json via paginator.ts
  public contentBox: ElementRef;      // DOM element to hold content
  private currentPage = 1;            // Set current page to 1
  private pageList: any[] = [];       // Array containing the list of page numbers [First, Prev, 1, 2, ...]
  private _jsonUrl: string = "../assets/data/articles.json";    // Url of articles.json file

  // Consturctors
  constructor(private _g: Globals, private jsonService: JsonService, public ts: TransferService, private cdr: ChangeDetectorRef) { }
  
  // Formatting and on/off values for console.log
  loc = this._g.loc;        // Location color
  item = this._g.item;      // Item color
  val = this._g.val;        // Value color
  log = this._g.log;        // Logging on/off 

  // Methods
  ngOnInit(){
    this.getArticles();
  }

  ngDoCheck(){
    // Subscribe to variables from transfer.service.ts
    this.ts.pageJumpTransfer.subscribe(message => this.pageJumper = message);
    this.ts.contentTransfer.subscribe(message => this.content = message);
    this.ts.elementTransfer.subscribe(message => this.contentBox = message);
    if (this.log) console.log('%c[article.component.ts][ngDoCheck()] %cpageJumper: ', this.loc, this.item), console.log(this.pageJumper)
    this.cdr.detectChanges();
    this.pageList =  this._g.pageNumberList(this.pageJumper.length, this.currentPage); 
  }

  // Gets articles via article.service.ts
  getArticles(): void {
    this.jsonService.getArticles(this._jsonUrl)
      .subscribe(data => {
        this.jsonArticles = data;         
      });      
  }

  // Returns substring (page) that corresponds to page number
  jumpToPage(newpage){  
    this.currentPage = this._g.pageJump(newpage, this.currentPage, this.pageJumper.length);
    this.contentBox.nativeElement.innerHTML = 
      this.content.substring(
        this.pageJumper[this.currentPage - 1]['subStart'],
        this.pageJumper[this.currentPage - 1]['subEnd']).trim();

    // Logging
    if (this.log) console.log('%c[article.component.ts][jumpToPage()] %ccurrentPage: %c%s', this.loc, this.val, this.val, this.currentPage);
    if (this.log) console.log('%c[article.component.ts][jumpToPage()] %csubStart %c%s', this.loc, this.val, this.val, this.pageJumper[this.currentPage - 1]['subStart']);
    if (this.log) console.log('%c[article.component.ts][jumpToPage()] %csubEnd %c%s', this.loc, this.val, this.val, this.pageJumper[this.currentPage - 1]['subEnd']);  
    if (this.log) console.log('%c[article.component.ts][jumpToPage()] %cpageSize: %c%s', this.loc, this.val, this.val, 
      (this.pageJumper[this.currentPage - 1]['subEnd'] - 
      this.pageJumper[this.currentPage - 1]['subStart']));
  }
}
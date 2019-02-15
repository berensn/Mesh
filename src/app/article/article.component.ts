import { Component, OnInit, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { articleAnimation, pageInOutAnimation, pageLoadAnimation } from '../_lib/animations.page';
import { AudioEffectsClick, AudioEffectsHover } from '../_lib/audio.effects';
import { Globals } from '../_lib/globals';
import { Paginator } from '../_lib/paginator';
import { JsonService } from '../_lib/service.json';
import { TransferService } from '../_lib/service.transfer';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [articleAnimation, pageInOutAnimation, pageLoadAnimation]
})
export class ArticleComponent implements OnInit {

  // Variables
  public jsonArticles;           // Array of articles from articles.json
  public pageJumper: number[] = [];   // Array {pageNum, subStart, subEnd}
  public content;                     // Newest article from articles.json via paginator.ts
  public contentBox: ElementRef;      // DOM element to hold content
  private currentPage = 1;            // Set current page to 1
  public pageList: any[] = [];       // Array containing the list of page numbers [First, Prev, 1, 2, ...]
  private _jsonUrl: string = 'https://berens.ink/cockpit/api/collections/get/Content?token=33ea141ab00269a1e071e4ee66c1c1';
  articleState = 'articleLoading';
  pageInOut = 'pageIn';

  // Consturctors
  constructor(
    private _g: Globals,
    private jsonService: JsonService,
    public ts: TransferService,
    private cdr: ChangeDetectorRef,
    private render: Renderer2,
  ) { }

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
    setTimeout(() => {this.articleState = "articleLoaded"}, 300);
  }

  // Gets articles via article.service.ts
  getArticles(): void {
    this.jsonService.getArticles(this._jsonUrl)
      .subscribe(data => {
        this.jsonArticles = data['entries'],
        console.log(this.jsonArticles);
      });
  }

  // Returns substring (page) that corresponds to page number
  jumpToPage(newpage){
    this.pageInOut = 'pageOut';
    this.currentPage = this._g.pageJump(newpage, this.currentPage, this.pageJumper.length);

    setTimeout(() => {
      this.contentBox.nativeElement.innerHTML =
      this.content.substring(
        this.pageJumper[this.currentPage - 1]['subStart'],
        this.pageJumper[this.currentPage - 1]['subEnd']).trim();
      if (this.currentPage == 1){
        this.render.addClass(this.contentBox.nativeElement, 'firstLetter');
      }else{
        this.render.removeClass(this.contentBox.nativeElement, 'firstLetter');
      }
      this.pageInOut = 'pageIn';
      },
      300);

    // Logging
    if (this.log) console.log('%c[article.component.ts][jumpToPage()] %ccurrentPage: %c%s', this.loc, this.val, this.val, this.currentPage);
    if (this.log) console.log('%c[article.component.ts][jumpToPage()] %csubStart %c%s', this.loc, this.val, this.val, this.pageJumper[this.currentPage - 1]['subStart']);
    if (this.log) console.log('%c[article.component.ts][jumpToPage()] %csubEnd %c%s', this.loc, this.val, this.val, this.pageJumper[this.currentPage - 1]['subEnd']);  
    if (this.log) console.log('%c[article.component.ts][jumpToPage()] %cpageSize: %c%s', this.loc, this.val, this.val, 
      (this.pageJumper[this.currentPage - 1]['subEnd'] - 
      this.pageJumper[this.currentPage - 1]['subStart']));
  }
}
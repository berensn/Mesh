import { Component, OnInit, Inject, ElementRef, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { pageInOutAnimation, pageLoadAnimation } from '../_lib/animations.page';
import { AudioEffectsClick, AudioEffectsHover } from '../_lib/audio.effects';
import { Globals } from '../_lib/globals';
import { JsonFormat } from '../_lib/json.format';
import { Paginator } from '../_lib/paginator';
import { JsonService } from '../_lib/service.json';
import { TransferService } from '../_lib/service.transfer';

@Component({
  selector: 'app-fictionarium',
  templateUrl: './fictionarium.component.html',
  styleUrls: ['./fictionarium.component.scss'],
  animations: [pageLoadAnimation]
})
export class FictionariumComponent implements OnInit {

  // Variables
  public jsonArticles;
  private _jsonUrl: string = 'https://berens.ink/cockpit/api/collections/get/Content?token=33ea141ab00269a1e071e4ee66c1c1';
  //private _jsonUrl: string = '../cockpit/api/collections/get/Content?token=33ea141ab00269a1e071e4ee66c1c1';

  // Constructors
  constructor(private jsonService: JsonService, public dialog: MatDialog) { }

  // Methods
  ngOnInit() {
    this.getArticles();
  }

  ngOnDestroy(){
    this.dialog.closeAll();
  }

  // Gets articles via article.service.ts
  getArticles(): void {
    this.jsonService.getArticles(this._jsonUrl)
      .subscribe(data => {
        this.jsonArticles = data['entries'],
        console.log(this.jsonArticles);
      });
  }

  // Opens modal with selected article as content. HTML template uses data.title, data.content, data.article as variables
  onSelect(article: JsonFormat): void {
    let dialogRef = this.dialog.open(ModalComponentDialog, {
      width: '90%',
      data: { title: article.title, content: article.content, date: article._created }
    });
  }

  // Displays the first 100 words of an article
  introArticle(article: string): string {
    let intro = '';
    let count = 0;
    for (let n of article){
      intro += n;
      if (n == " "){count++;}
      if (count == 100){intro = intro.trim(); intro +="..."; break;}
    }
    return intro;
  }
}


@Component({
  selector: 'modal-component-dialog',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [pageInOutAnimation]
})
export class ModalComponentDialog {

  // Variables
  public pageJumper: number[] = [];     // Array containing the list of page numbers [First, Prev, 1, 2, ...]
  public content;                       // Selected article from articles.json via paginator.ts
  public contentBox: ElementRef;        // DOM element to hold content
  private currentPage = 1;              // Set current page to 1
  public pageList: any[] = [];         // Array containing the list of page numbers [First, Prev, 1, 2, ...]
  pageInOut = 'pageIn';

  // Constructors
  constructor( private _g: Globals, public dialogRef: MatDialogRef<ModalComponentDialog>, @Inject(MAT_DIALOG_DATA) public data: any, public ts: TransferService, private cdr: ChangeDetectorRef, private render: Renderer2) { }

  // Formatting and on/off values for console.log
  loc = this._g.loc;        // Location color
  item = this._g.item;      // Item color
  val = this._g.val;        // Value color
  log = this._g.log;        // Logging on/off

  ngDoCheck(){
    // Subscribe to variables from transfer.service.ts
    this.ts.pageJumpTransfer.subscribe(message => this.pageJumper = message);
    this.ts.contentTransfer.subscribe(message => this.content = message);
    this.ts.elementTransfer.subscribe(message => this.contentBox = message);
    if (this.log) console.log('%c[fictionarium.component.ts][ngDoCheck()] %cpageJumper: ', this.loc, this.item), console.log(this.pageJumper)
    this.cdr.detectChanges();
    this.pageList =  this._g.pageNumberList(this.pageJumper.length, this.currentPage);
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
    if (this.log) console.log('%c[fictionarium.component.ts][jumpToPage()] %ccurrentPage: %c%s', this.loc, this.item, this.val, this.currentPage);
    if (this.log) console.log('%c[fictionarium.component.ts][jumpToPage()] %csubStart: %c%s', this.loc, this.item, this.val, this.pageJumper[this.currentPage - 1]['subStart']);
    if (this.log) console.log('%c[fictionarium.component.ts][jumpToPage()] %csubEnd: %c%s', this.loc, this.item, this.val, this.pageJumper[this.currentPage - 1]['subEnd']);  
    if (this.log) console.log('%c[fictionarium.component.ts][jumpToPage()] %cpageSize: %c%s', this.loc, this.item, this.val,  
      (this.pageJumper[this.currentPage - 1]['subEnd'] - 
      this.pageJumper[this.currentPage - 1]['subStart']));
  }
}
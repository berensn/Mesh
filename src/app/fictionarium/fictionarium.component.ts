/*
  Retrives the list of articles from articles.json and displays them in a grid showing 
  the first 100 words. When selected, a modal appears with the selected article displayed in it.
*/

import { Component, OnInit, Inject, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Globals } from '../helpers/globals';
import { JsonFormat } from '../helpers/json.format';
import { JsonService } from '../helpers/json.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransferService } from '../helpers/transfer.service';
import { Paginator } from '../helpers/paginator';

@Component({
  selector: 'app-fictionarium',
  templateUrl: './fictionarium.component.html',
  styleUrls: ['./fictionarium.component.scss']
})
export class FictionariumComponent implements OnInit {

  // Variables
  public jsonArticles = [];       // Array to hold articles from articles.json
  private _jsonUrl: string = "../assets/data/articles.json";      // URL of articles.json file

  // Constructors
  constructor(private jsonService: JsonService, public dialog: MatDialog) { }

  // Methods
  ngOnInit() {
    this.getArticles();
  }

  // Gets articles via article.service.ts
  getArticles(): void {
    this.jsonService.getArticles(this._jsonUrl)
      .subscribe(data => {
        this.jsonArticles = data;         
      });
  }

  // Opens modal with selected article as content. HTML template uses data.title, data.content, data.article as variables
  onSelect(article: JsonFormat): void {  
    let dialogRef = this.dialog.open(ModalComponentDialog, {
      width: '90%',
      data: { title: article.title, content: article.content, date: article.publishDate }
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
  styleUrls: ['./modal.component.scss']
})
export class ModalComponentDialog {
  
  // Variables
  public pageJumper: number[] = [];     // Array containing the list of page numbers [First, Prev, 1, 2, ...]
  public content;                       // Selected article from articles.json via paginator.ts
  public contentBox: ElementRef;        // DOM element to hold content
  private currentPage = 1;              // Set current page to 1
  private pageList: any[] = [];         // Array containing the list of page numbers [First, Prev, 1, 2, ...]

  // Constructors
  constructor( private _g: Globals, public dialogRef: MatDialogRef<ModalComponentDialog>, @Inject(MAT_DIALOG_DATA) public data: any, public ts: TransferService, private cdr: ChangeDetectorRef) { }

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
    this.currentPage = this._g.pageJump(newpage, this.currentPage, this.pageJumper.length);
    this.contentBox.nativeElement.innerHTML = 
      this.content.substring(
        this.pageJumper[this.currentPage - 1]['subStart'],
        this.pageJumper[this.currentPage - 1]['subEnd']).trim();

    // Logging
    if (this.log) console.log('%c[fictionarium.component.ts][jumpToPage()] %ccurrentPage: %c%s', this.loc, this.item, this.val, this.currentPage);
    if (this.log) console.log('%c[fictionarium.component.ts][jumpToPage()] %csubStart: %c%s', this.loc, this.item, this.val, this.pageJumper[this.currentPage - 1]['subStart']);
    if (this.log) console.log('%c[fictionarium.component.ts][jumpToPage()] %csubEnd: %c%s', this.loc, this.item, this.val, this.pageJumper[this.currentPage - 1]['subEnd']);  
    if (this.log) console.log('%c[fictionarium.component.ts][jumpToPage()] %cpageSize: %c%s', this.loc, this.item, this.val,  
      (this.pageJumper[this.currentPage - 1]['subEnd'] - 
      this.pageJumper[this.currentPage - 1]['subStart']));
  }
}
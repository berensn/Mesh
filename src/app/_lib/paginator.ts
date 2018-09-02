/*
  Pages are created by finding the length of the content, dividing by the character length of each page to give
  the number of pages. Average page size is created by dividing content length by number of pages. This is done
  to balance the number of chars across all the pages so that the last page isn't a single line.
  Transfer service transfers variables so that the Paginator Directive can be used by any component.
  Whitespace function is used to ensure page breaks don't fall in the middle of words.
*/

import { 
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,  
  Renderer2
} from '@angular/core';
import { Globals } from './globals';
import { TransferService } from './service.transfer';

@Directive({
  selector: '[paginator]'
})
export class Paginator implements AfterViewInit{
  avgPageSize = 0;          // Avg char length of a page, used to create equal sized pages    
  content = '';             // Article as string from JSON file 
  contentBox = undefined;   // HTML element to place contnet in
  contentHeight = 0;        // Sets content container height
  contentLen = 0;           // Length of content
  maxPage = 0;              // the biggest page, used to set page height
  numPages = 0;             // Number of pages base on contentLen and pageLen
  pageJump = [];            // Array holding number of pages, char start and char end points for each page
  pageLen = 0;              // Character length of each page
  subStart = 0;             // Char position of each page start
  subEnd = 0;               // Char position of each page end

  @Input() paginator;       // Gets input from HTML template via paginator selector
  
  // On window size change, resizes the contentBox and adjusts other variables accordingly
  @HostListener('window:resize') 
    onResize() {
      // Reset appropriate vars
      this.avgPageSize = 0;
      this.content = '';
      this.contentBox = undefined;
      this.contentHeight = 0;
      this.contentLen = 0;
      this.maxPage = 0;
      this.numPages = 0; 
      this.pageJump = [];
      this.pageLen = 0; 
      this.subEnd = 0;   
      this.subStart = 0;
      this.pageContent(this.el, this.paginator);  
    }    
  
  // Constructors
  constructor(
    private el: ElementRef, 
    private _g: Globals, 
    private render: Renderer2,  
    private ts: TransferService,
  ){}

  // Formatting and on/off values for console.log
  item = this._g.item;      // Item color
  loc = this._g.loc;        // Location color
  log = this._g.log;        // Logging on/off 
  val = this._g.val;        // Value color

  ngAfterViewInit(){   
    if (this.log) console.log('%c[paginator.ts][ngAfterViewInit()] %cMessage: %cIN ', this.loc, this.item, this.val);
    this.pageContent(this.el, this.paginator);
  }

  // Sets page size and creates pagination
  pageContent(contentBox: ElementRef, content){
    if (this.log) console.log('%c[paginator.ts][pageContent()] %cMessage: %cIN ', this.loc, this.item, this.val);
    this.content = content;
    this.contentBox = contentBox;
    this.contentLen = this.content.length;
    this.contentBox.nativeElement.style.height = 'initial';

    // Add a span element with a single char and get the w/h of the span then remove it
    const span = this.render.createElement('span');
    const text = this.render.createText('W');
    this.render.setStyle(span, 'opacity', 0);
    this.render.appendChild(span, text);
    this.render.appendChild(contentBox.nativeElement, span);      
    let width = span.getBoundingClientRect().width;
    let height = span.getBoundingClientRect().height;
    this.render.removeChild(contentBox, span);
    
    // Get window w/h and use char dimensions to calculate chars per row, num of rows, and total num of chars
    let windowHeight = window.innerHeight;
    let contentWidth = contentBox.nativeElement.getBoundingClientRect().width;
    let numChar = Math.floor((contentWidth - 40)/(Math.ceil(width)));
    let numLine = Math.floor(((windowHeight/(Math.ceil(height))) - 1));
    this.pageLen = Math.floor((numChar * numLine) * 1.4);
          
    // Insert first page content    
    this.numPages = Math.ceil((this.contentLen / this.pageLen));
    this.avgPageSize = Math.floor(this.contentLen / this.numPages); 
    this.subEnd = this.avgPageSize;
    this.whitespace();
    this.contentBox.nativeElement.innerHTML = this.content.substring(this.subStart, this.subEnd).trim();
    this.render.addClass(contentBox.nativeElement, 'firstLetter');

    // Set up Pagination
    for (let i = 1; i <= this.numPages; i++){
      if (i == this.numPages){
        this.subEnd += (this.contentLen - this.subEnd);
      }
      this.pageJump.push({pageNum: i, subStart: this.subStart, subEnd: this.subEnd});
      this.subStart = this.subEnd;
      this.subEnd += this.avgPageSize;
      this.whitespace();
    }

    // Pass variables via transferservice.ts to components 
    this.ts.updatePageJump(this.pageJump);
    this.ts.updateContent(this.content);
    this.ts.updateElement(this.contentBox);

    /*
      This sets the contentBox to the height of the largest page to prevent the contentBox
      DOM element from resizing to the size of each page.
      multiplier is the percentage of how much larger maxPage is than avgPageSize
      the current element height is retrieved
      element height is set by multiplying the current height by multiplier
    */
    // Finds the largest page
    this.maxPage = this.avgPageSize;
    for (let i in this.pageJump){
      if ((this.pageJump[i]['subEnd'] - this.pageJump[i]['subStart']) > this.maxPage){
        this.maxPage = (this.pageJump[i]['subEnd'] - this.pageJump[i]['subStart']);
      } 
    }
    // Set the multiplier
    let multiplier = this.maxPage / this.avgPageSize;
    // Get current DOM element height
    this.contentHeight = contentBox.nativeElement.getBoundingClientRect().height;
    // Set DOM element height 
    this.contentBox.nativeElement.style.height = (this.contentHeight * multiplier) + 'px';

    /* Logging for troubleshooting */  
    if (this.log) {
      console.log('%c[paginator.ts] Log Start -------------------', this.loc);
      console.log('  %ccontentLen: %c%s', this.item, this.val, this.contentLen);
      console.log('  %cwidth: %c%s', this.item, this.val, width);
      console.log('  %cheight: %c%s', this.item, this.val, height);
      console.log('  %ccontentHeight: %c%s', this.item, this.val, this.contentHeight);
      console.log('  %ccontentWidth: %c%s', this.item, this.val, contentWidth);
      console.log('  %cnumChar: %c%s', this.item, this.val, numChar);
      console.log('  %cnumLine: %c%s', this.item, this.val, numLine)
      console.log('  %cpageLen: %c%s', this.item, this.val, this.pageLen);
      console.log('  %cwindowHeight: %c%s', this.item, this.val, windowHeight);
      console.log('  %ccharAt %c%s%c: "%c%s%c"', this.item, this.val, (this.pageLen - 1), this.item, this.val, this.content.charAt(this.pageLen - 1), this.item);
      console.log('  %cnumPages: %c%s', this.item, this.val, this.numPages);
      console.log('  %cavgPageSize: %c%s', this.item, this.val, this.avgPageSize);
      console.log('  %clargest page: %c%s', this.item, this.val, this.maxPage);
      console.log('  %cmultiplier: %c%s', this.item, this.val, multiplier);
      console.log('  %cactual contentHeight: %c%s', this.item, this.val, this.contentBox.nativeElement.style.height);
      console.log('%c[paginator.ts] Log End -------------------', this.loc);
    }
  }
  
  // Tweak avgPageSize to fall on whitespace      
  whitespace(): void{
    while (this.content.charAt(this.subEnd) != ' '){
      this.subEnd -= 1;
    }
  }
}
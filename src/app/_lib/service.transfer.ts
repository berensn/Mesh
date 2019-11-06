import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TransferService {

  // Variables that can be subscribed to

  // Array {pageNum, subStart, subEnd}
  private pageJumpSource = new BehaviorSubject(<number[]>([]));
  pageJumpTransfer = this.pageJumpSource.asObservable();

  // Selected article from articles.json via paginator.ts
  private contentSource = new BehaviorSubject(<string>(''));
  contentTransfer = this.contentSource.asObservable();

  // DOM element to hold content
  private elementSource = new BehaviorSubject(<ElementRef>(null));
  elementTransfer = this.elementSource.asObservable();

  constructor(){}

  // Methods
  updatePageJump(update: number []){
    this.pageJumpSource.next(update);
  }

  updateContent(update: string){
    this.contentSource.next(update);
  }

  updateElement(update: ElementRef){
    this.elementSource.next(update);
  }
}

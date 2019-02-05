import {
  Component,
  QueryList,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { AudioEffectsClick, AudioEffectsHover } from '../_lib/audio.effects';
import {
  dossierToolTipAnimation,
  fictionariumToolTipAnimation,
  infoBoxAnimation,
  infocastToolTipAnimation,
  menuAnimation,
  menuRootAnimation,
  plexusToolTipAnimation
} from '../_lib/animations.menu';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: [
    './nav.component.scss',
  ],
  animations: [
    dossierToolTipAnimation,
    fictionariumToolTipAnimation,
    infoBoxAnimation,
    infocastToolTipAnimation,
    menuAnimation,
    menuRootAnimation,
    plexusToolTipAnimation
  ]
})
export class NavComponent implements AfterViewInit {

  constructor() {}

  menuRoot = 'inactive';
  dossierToolTip = 'inactive';
  fictionariumToolTip = 'inactive';
  infoBox = 'inactive';
  infocastToolTip = 'inactive';
  plexusToolTip = 'inactive';

  @ViewChildren('menuItem') private menuItems: QueryList<any>

  ngAfterViewInit(){
    this.setMenuItemPosition(this.menuItems);
  }

  nodeWidth(selector, nodeList){
    let element = nodeList.nativeElement.querySelectorAll(selector);
    return element[0].naturalWidth;
  }

  setMenuItemPosition(items){
    let angle = 0;
    let menuItemsArray = [];
    items.forEach(i => menuItemsArray.push(i));
    let radians = 0;
    let radius = this.nodeWidth(".menuImg", menuItemsArray[0]);
    let step = 90/(items.length + 1);
    let count = 1;
    let x = 0;
    let y = 0;

    items.forEach(i => {
      angle = angle + step;
      radians = angle * (Math.PI / 180);
      if(count === 1 || count === 4){
        // Calculates positions of first and last elements on the arc
        x = Math.round(3.3 * radius * Math.cos(radians) + (radius / 3));
        y = Math.round(3.3 * radius * Math.sin(radians) + (radius / 3));
      }else if (count === 2){
        // Calculates position of second element on the arc with a position adjustment
        x = Math.round(3.3 * radius * Math.cos(radians) + (radius / 1.75));
        y = Math.round(3.3 * radius * Math.sin(radians) + (radius / 1.95));
      }else if (count === 3){
        // Calculates position of third element on the arc with a position adjustment
        x = Math.round(3.3 * radius * Math.cos(radians) + (radius / 1.95));
        y = Math.round(3.3 * radius * Math.sin(radians) + (radius / 1.75));
      }
      i.nativeElement.style.position = 'absolute';
      i.nativeElement.style.left = x - 100 + 'px';
      i.nativeElement.style.top = y - 100 + 'px';
      count++;
    })
  }

  menuRootEnter(e){
    this.menuRoot = 'active';
  }

  menuRootLeave(e){
    this.menuRoot = 'inactive';
  }

  menuItemEnter(e){
    this.menuRoot = 'active';

    switch (e){
      case 'dossier': {
        this.dossierToolTip = 'active';
        break;
      }
      case 'fictionarium': {
        this.fictionariumToolTip = 'active';
        break;
      }
      case 'infocast': {
        this.infocastToolTip = 'active';
        break;
      }
      case 'plexus': {
        this.plexusToolTip = 'active';
        break;
      }
      case 'infoBox': {
        this.infoBox = 'active';
        break;
      }
      default: {}
    }
  }

  menuItemLeave(e){
    this.menuRoot = 'inactive';
    switch (e){
      case 'dossier': {
        this.dossierToolTip = 'inactive';
        break;
      }
      case 'fictionarium': {
        this.fictionariumToolTip = 'inactive';
        break;
      }
      case 'infocast': {
        this.infocastToolTip = 'inactive';
        break;
      }
      case 'plexus': {
        this.plexusToolTip = 'inactive';
        break;
      }
      case 'infoBox': {
        this.infoBox = 'inactive';
        break;
      }
      default: {}
    }
  }
}

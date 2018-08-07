import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  radius = parseInt($('.menuImg').css('width'));
	fields = $(this).find('.menuItem');
  step = 90/(this.fields.length + 1);
  angle = 0;
  radians = 0;
  x = 0;
  y = 0;
  mouseFlag = 0;
  tooltipTimer;
  menuTimer;
  
  constructor(private el: ElementRef, private render: Renderer2) { }

  ngOnInit() {
  }

}

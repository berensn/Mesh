import { Component } from '@angular/core';
import { pageLoadAnimation } from './_lib/animations.page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [pageLoadAnimation]
})
export class AppComponent {
  title = 'Nathaniel Berens';
}

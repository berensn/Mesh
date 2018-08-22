import { animate, group, query, style, transition, trigger } from '@angular/animations';
 
export const routeAnimation =
  trigger('routeAnimation', [
    transition('* <=> *', [    
      query(':enter, :leave', style({ position: 'fixed', opacity: 1 })),
      group([ 
        query(':enter', [
          style({ opacity:0 }),
          animate('1200ms ease-in-out', style({ opacity:1 }))
        ]),
        query(':leave', [
          style({ opacity:1 }),
          animate('1200ms ease-in-out', style({ opacity:0 }))]),
      ])
    ])
  ]);
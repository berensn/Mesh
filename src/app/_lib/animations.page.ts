import { animate, state, style, transition, trigger } from '@angular/animations';

export const pageInOutAnimation =
  trigger('pageInOutAnimation', [
    state('pageOut', style({'opacity': 0})),
    state('pageIn', style({'opacity': 1})),
    transition('pageIn => pageOut', animate('300ms ease-out')),
    transition('pageOut => pageIn', animate('300ms 100ms ease-out'))
  ]);

export const pageLoadAnimation = 
  trigger('pageLoadAnimation', [
    transition(":enter", [
      style({ opacity: 0 }),
      animate(300, style({ opacity: 1 }))
      ]),
    transition(":leave", [
      animate(300, style({ opacity: 0 }))
      ])
  ]);

export const articleAnimation = 
  trigger('articleAnimation', [
    state('articleLoaded', style({'opacity': 1})),
    state('articleLoading', style({'opacity': 0})),
    transition('articleLoading => articleLoaded', animate('300ms ease-out')),
    transition('articleLoaded => articleLoading', animate('50ms ease-out'))
  ])
import { animate, state, style,  transition, trigger } from '@angular/animations';

export const dossierToolTipAnimation = 
  trigger('dossierToolTipAnimation', [
    state('inactive', style({visibility: 'hidden', opacity: 0})),
    state('active', style({visibility: 'visible', opacity: 1})),
    transition('inactive => active', animate('200ms ease-out')),
    transition('active => inactive', animate('200ms 100ms ease-out'))
  ]);

export const fictionariumToolTipAnimation = 
  trigger('fictionariumToolTipAnimation', [
    state('inactive', style({visibility: 'hidden', opacity: 0})),
    state('active', style({visibility: 'visible', opacity: 1})),
    transition('inactive => active', animate('200ms ease-out')),
    transition('active => inactive', animate('200ms 100ms ease-out'))
  ]);

export const infoBoxAnimation = 
  trigger('infoBoxAnimation', [
    state('inactive', style({visibility: 'hidden', opacity: 0})),
    state('active', style({visibility: 'visible', opacity: 1})),
    transition('inactive => active', animate('600ms ease-out')),
    transition('active => inactive', animate('600ms 50ms ease-out'))
  ]);

export const infocastToolTipAnimation = 
  trigger('infocastToolTipAnimation', [
    state('inactive', style({visibility: 'hidden', opacity: 0})),
    state('active', style({visibility: 'visible', opacity: 1})),
    transition('inactive => active', animate('200ms ease-out')),
    transition('active => inactive', animate('200ms 100ms ease-out'))
  ]);

export const menuAnimation = 
  trigger('menuAnimation', [
    state('inactive', style({visibility: 'hidden', opacity: 0})),
    state('active', style({visibility: 'visible', opacity: 1})),
    transition('inactive => active', animate('600ms ease-out')),
    transition('active => inactive', animate('600ms 1500ms ease-out'))
  ]);

export const menuRootAnimation = 
  trigger('menuRootAnimation', [
    state('inactive', style({opacity: .2})),
    state('active', style({opacity: 1})),
    transition('inactive => active', animate('600ms ease-out')),
    transition('active => inactive', animate('600ms 1500ms ease-out'))
  ]);

export const plexusToolTipAnimation = 
  trigger('plexusToolTipAnimation', [
    state('inactive', style({visibility: 'hidden', opacity: 0})),
    state('active', style({visibility: 'visible', opacity: 1})),
    transition('inactive => active', animate('200ms ease-out')),
    transition('active => inactive', animate('200ms 100ms ease-out'))
  ]);

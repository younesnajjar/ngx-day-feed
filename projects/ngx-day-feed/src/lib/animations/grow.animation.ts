import {animate, state, style, transition, trigger} from '@angular/animations';

export const growAnimation = trigger('Grow', [
  state('inactive', style({
    transform: 'scale(0.6)'
  })),
  state('active', style({
    transform: 'scale(1)'
  })),
  transition('inactive => active', animate('90ms ease-in')),
]);

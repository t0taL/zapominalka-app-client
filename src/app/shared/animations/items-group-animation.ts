import { trigger, transition, style, animate } from '@angular/animations';


export const itemsGroupAnimation = trigger('itemsGroupAnimation', [
  transition(':leave', [
    animate('300ms ease', style({ height: '0' }))
  ]),
  transition(':enter', [
    style({ height: '0' }),
    animate('300ms ease')
  ])
]);

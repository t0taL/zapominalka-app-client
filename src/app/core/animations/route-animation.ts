import { trigger, transition, style, query, animate } from '@angular/animations';


export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', [
      animate('300ms ease-in', style({
        position: 'absolute',
        left: 0,
        width: '100%',
        transform: 'translateX(-200%)',
      }))
    ], { optional: true }),
    query(':enter', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        transform: 'translateX(200%)',
      }),
      animate('300ms ease-out', style({ transform: 'translateX(0)'})),
    ], { optional: true })
  ]),
]);

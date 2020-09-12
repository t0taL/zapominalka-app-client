import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthFacade } from '@auth/+state/auth.facade';

import { IUserProfile } from '@api/models/user-profile.model';

import { ColorTypes } from '@shared/enums/color-types';
import { NavLocationTypes } from '@core/enums/nav-location-types';

import { routeAnimation } from '@core/animations/route-animation';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<Partial<IUserProfile>>;
  isLoading$: Observable<boolean>;
  screenWidth$: Observable<number>;
  screenHeight$: Observable<number>;

  private resizeEvent$: Observable<any>;

  readonly colorTypes = ColorTypes;
  readonly navLocationTypes = NavLocationTypes;

  constructor(private authFacade: AuthFacade) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authFacade.isLoggedIn$;
    this.isLoading$ = this.authFacade.isLoading$;
    this.user$ = this.authFacade.user$;

    this.resizeEvent$ = fromEvent(window, 'resize');

    this.screenWidth$ = this.resizeEvent$.pipe(map((event: any) => event.target.visualViewport.width));
    this.screenHeight$ = this.resizeEvent$.pipe(map((event: any) => event.target.visualViewport.height));

    this.authFacade.getUser();
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
  }

  logout(): void {
    this.authFacade.logout();
  }
}

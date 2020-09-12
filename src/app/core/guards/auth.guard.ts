import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LocalStorageService } from '@core/services/local-storage.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private localStorageService: LocalStorageService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isToken = !!this.localStorageService.getToken();

    if (isToken !== null) {
      return true;
    } else {
      this.router.navigate(['/auth', 'sign-in']);
      return false;
    }
  }
}

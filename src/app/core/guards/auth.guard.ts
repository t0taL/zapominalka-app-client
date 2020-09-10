import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LocalStorageJwtService } from '@auth/services/local-storage-jwt.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private localStorageJwtService: LocalStorageJwtService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isToken = !!this.localStorageJwtService.getToken();

    if (isToken !== null) {
      return true;
    } else {
      this.router.navigate(['/auth', 'sign-in']);
      return false;
    }
  }
}

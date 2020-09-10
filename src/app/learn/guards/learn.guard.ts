import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable()
export class LearnGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    switch (state.url) {
      case '/learn':
        return this.matchPreviousRoute(this.router.url, '/learn/start-menu');
      case '/learn/result':
        return this.matchPreviousRoute(this.router.url, '/learn');
    }
  }

  private matchPreviousRoute(previousUrl: string, permittedPreviousUrl: string): boolean {
    if (previousUrl === permittedPreviousUrl) {
      return true;
    } else {
      this.router.navigate(['/learn', 'start-menu']);
      return false;
    }
  }
}

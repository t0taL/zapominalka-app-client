import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LocalStorageJwtService } from './local-storage-jwt.service';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageJwtService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getToken();

    return next.handle(this.addToken(req, token))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.router.navigate(['/info'], { state: { data: 'Connection problem... Try again later' } });
          }
          if (error.status === 401 && !this.router.routerState.snapshot.url.includes('/auth/change-password')) {
            this.localStorageService.clearToken();
            this.router.navigate(['/auth', 'sign-in']);
          }
          return throwError(error);
        })
      );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthService } from '../services/auth.service';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import { NotificationService } from '@core/services/notification.service';

import { SharedFacade } from '@shared/+state/shared.facade';
import * as AuthActions from './auth.actions';

import { HttpErrorResponse } from '@angular/common/http';
import {
  IGetUserResponse,
  ISignInResponse,
  ISignUpResponse,
  IPasswordResetResponse,
  IPasswordChangeResponse
} from '@api/interfaces/auth/auth-response.interface';


@Injectable()
export class AuthEffects {
  getUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.getUser),
      switchMap(action => this.authService.getUser()
        .pipe(
          map((response: IGetUserResponse) => AuthActions.getUserSuccess({ payload: response.userData })),
          catchError((error: HttpErrorResponse) => {
            return of(AuthActions.getUserFail({ payload: error }));
          })
        )
      )
    )
  );

  signIn$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.signIn),
      withLatestFrom(this.sharedFacade.formData$),
      switchMap(([action, formData]) => this.authService.signIn(formData)
        .pipe(
          map((response: ISignInResponse) => {
            this.localStorageJwtService.setToken(response.tokenData);
            this.router.navigate(['../home']);
            this.notificationService.showInfoMessage(`${response.userData.user.name}, welcome!`);
            return AuthActions.signInSuccess({ payload: response.userData });
          }),
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showErrorMessage(error.error);
            return of(AuthActions.signInFail({ payload: error }));
          })
        )
      )
    )
  );

  signUp$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.signUp),
      withLatestFrom(this.sharedFacade.formData$),
      switchMap(([action, formData]) => {
        const { email, name, password } = formData;
        return this.authService.signUp({ email, name, password })
          .pipe(
            map((response: ISignUpResponse) => {
              this.localStorageJwtService.setToken(response.tokenData);
              this.router.navigate(['../home']);
              this.notificationService.showInfoMessage(`${response.userData.user.name}, welcome!`);
              return AuthActions.signUpSuccess({ payload: response.userData });
            }),
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showErrorMessage(error.error);
              return of(AuthActions.signUpFail({ payload: error }));
            })
          );
      })
    )
  );

  resetPassword$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.resetPassword),
      withLatestFrom(this.sharedFacade.formData$),
      switchMap(([action, formData]) => this.authService.resetPassword(formData)
        .pipe(
          map((response: IPasswordResetResponse) => {
            this.router.navigate(['/info'], { state: { data: response.message } });
            return AuthActions.resetPasswordSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showErrorMessage(error.error);
            return of(AuthActions.resetPasswordFail({ payload: error }));
          })
        )
      )
    )
  );

  changePassword$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.changePassword),
      withLatestFrom(this.sharedFacade.formData$),
      switchMap(([action, formData]) => {
        const token: string = action.payload;
        const { password } = formData;
        return this.authService.changePassword({ token, password })
          .pipe(
            map((response: IPasswordChangeResponse) => {
              this.router.navigate(['/auth', 'sign-in']);
              this.router.navigate(['/info'], { state: { data: response.message } });
              return AuthActions.changePasswordSuccess();
            }),
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showErrorMessage(error.error);
              return of(AuthActions.changePasswordFail({ payload: error }));
            })
          );
      })
    )
  );

  logout$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.logout),
      tap(action => {
        this.localStorageJwtService.clearToken();
        this.router.navigate(['/auth', 'sign-in']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private sharedFacade: SharedFacade,
    private authService: AuthService,
    private localStorageJwtService: LocalStorageJwtService,
    private notificationService: NotificationService
  ) {
  }
}

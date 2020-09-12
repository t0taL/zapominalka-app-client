import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SharedFacade } from '@shared/+state/shared.facade';
import { AuthFacade } from '@auth/+state/auth.facade';
import * as UserProfileActions from './user-profile.actions';

import { UserProfileService } from '../services/user-profile.service';
import { LocalStorageService } from '@core/services/local-storage.service';
import { NotificationService } from '@core/services/notification.service';

import { HttpErrorResponse } from '@angular/common/http';
import { IUpdateAuthStateData } from '@auth/+state/auth.reducer';
import {
  IGetUserProfileResponse,
  IEditUserProfileResponse,
  IChangeUserProfilePasswordResponse
} from '@api/interfaces/user-profile/user-profile-response.interface';


@Injectable()
export class UserProfileEffects {
  getUserProfile$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserProfileActions.getUserProfile),
      mergeMap(action => this.userProfileService.getUserProfile()
        .pipe(
          map((response: IGetUserProfileResponse) => UserProfileActions.getUserProfileSuccess({ payload: response.userProfile })),
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showErrorMessage(error.error);
            return of(UserProfileActions.getUserProfileFail({ payload: error }));
          })
        )
      )
    )
  );

  editUserProfile$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserProfileActions.editUserProfile),
      withLatestFrom(this.sharedFacade.formData$),
      mergeMap(([action, formData]) => {
        const { name, imageFile, imageDeleted, email } = formData;
        return this.userProfileService.editUserProfile({ name, email, imageFile, imageDeleted })
          .pipe(
            map((response: IEditUserProfileResponse) => {
              const updatedAuthStateData: IUpdateAuthStateData = {
                stateKey: 'user',
                stateValue: {
                  name: response.userProfile.name,
                  avatar: response.userProfile.avatar
                }
              };
              if (response.tokenData.token !== null) {
                this.localStorageService.setToken(response.tokenData);
              }
              this.router.navigate(['/user-profile']);
              this.notificationService.showInfoMessage('User profile has been successfully edited!');
              this.authFacade.updateAuthStateData(updatedAuthStateData);
              return UserProfileActions.editUserProfileSuccess({ payload: response.userProfile });
            }),
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showErrorMessage(error.error);
              return of(UserProfileActions.editUserProfileFail({ payload: error }));
            })
          );
        })
    )
  );

  changeUserProfilePassword$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserProfileActions.changeUserProfilePassword),
      withLatestFrom(this.sharedFacade.formData$),
      mergeMap(([action, formData]) => {
        const { previousPassword, password } = formData;
        return this.userProfileService.changeUserProfilePassword({ previousPassword, password })
          .pipe(
            map((response: IChangeUserProfilePasswordResponse) => {
              this.router.navigate(['/user-profile']);
              this.notificationService.showInfoMessage(response.message);
              return UserProfileActions.changeUserProfilePasswordSuccess();
            }),
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showErrorMessage(error.error);
              return of(UserProfileActions.changeUserProfilePasswordFail({ payload: error }));
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authFacade: AuthFacade,
    private sharedFacade: SharedFacade,
    private userProfileService: UserProfileService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService
  ) {
  }
}

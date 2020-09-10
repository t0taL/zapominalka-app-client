import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SettingsService } from '../services/settings.service';
import { NotificationService } from '@core/services/notification.service';

import { SharedFacade } from '@shared/+state/shared.facade';
import { AuthFacade } from '@auth/+state/auth.facade';
import * as SettingsActions from './settings.actions';

import { HttpErrorResponse } from '@angular/common/http';
import { IUpdateAuthStateData } from '@auth/+state/auth.reducer';
import { IGetSettingsResponse, IEditSettingsResponse } from '@api/interfaces/settings/settings-response.interface';


@Injectable()
export class SettingsEffects {
  getSettings$ = createEffect(() => this.actions$
    .pipe(
      ofType(SettingsActions.getSettings),
      mergeMap(action => this.settingsService.getSettings()
        .pipe(
          map((response: IGetSettingsResponse) => SettingsActions.getSettingsSuccess({ payload: response.settings })),
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showErrorMessage(error.error);
            return of(SettingsActions.getSettingsFail({ payload: error }));
          })
        )
      )
    )
  );

  editSettings$ = createEffect(() => this.actions$
    .pipe(
      ofType(SettingsActions.editSettings),
      withLatestFrom(this.sharedFacade.formData$),
      mergeMap(([action, formData]) => this.settingsService.editSettings({ settings: formData })
        .pipe(
          map((response: IEditSettingsResponse) => {
            const updatedAuthStateData: IUpdateAuthStateData = {
              stateKey: 'settings',
              stateValue: {
                timerCount: response.settings.timerCount,
                theme: response.settings.theme
              }
            };
            this.router.navigate(['/settings']);
            this.authFacade.updateAuthStateData(updatedAuthStateData);
            this.notificationService.showInfoMessage('Settings has been successfully edited!');
            return SettingsActions.editSettingsSuccess({ payload: response.settings });
          }),
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showErrorMessage(error.error);
            return of(SettingsActions.editSettingsFail({ payload: error }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private sharedFacade: SharedFacade,
    private authFacade: AuthFacade,
    private settingsService: SettingsService,
    private notificationService: NotificationService
  ) {
  }
}

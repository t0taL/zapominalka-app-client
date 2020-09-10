import { createAction, props } from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';
import { ISettings } from '@api/models/settings.model';


export const getSettings = createAction('[settings] GET_SETTINGS');
export const getSettingsSuccess = createAction('[settings] GET_SETTINGS_SUCCESS', props<{ payload: ISettings }>());
export const getSettingsFail = createAction('[settings] GET_SETTINGS_FAIL', props<{ payload: HttpErrorResponse }>());

export const editSettings = createAction('[settings] EDIT_SETTINGS');
export const editSettingsSuccess = createAction('[settings] EDIT_SETTINGS_SUCCESS', props<{ payload: ISettings }>());
export const editSettingsFail = createAction('[settings] EDIT_SETTINGS_FAIL', props<{ payload: HttpErrorResponse }>());

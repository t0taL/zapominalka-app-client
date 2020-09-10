import { createAction, props } from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';
import { IUserProfile } from '@api/models/user-profile.model';


export const getUserProfile = createAction('[user-profile] GET_USER_PROFILE');
export const getUserProfileSuccess = createAction('[user-profile] GET_USER_PROFILE_SUCCESS', props<{ payload: IUserProfile }>());
export const getUserProfileFail = createAction('[user-profile] GET_USER_PROFILE_FAIL', props<{ payload: HttpErrorResponse }>());

export const editUserProfile = createAction('[user-profile] EDIT_USER_PROFILE');
export const editUserProfileSuccess = createAction('[user-profile] EDIT_USER_PROFILE_SUCCESS', props<{ payload: IUserProfile }>());
export const editUserProfileFail = createAction('[user-profile] EDIT_USER_PROFILE_FAIL', props<{ payload: HttpErrorResponse }>());

export const changeUserProfilePassword = createAction('[user-profile] CHANGE_USER_PROFILE_PASSWORD');
export const changeUserProfilePasswordSuccess = createAction('[user-profile] CHANGE_USER_PROFILE_PASSWORD_SUCCESS');
export const changeUserProfilePasswordFail = createAction(
  '[user-profile] CHANGE_USER_PROFILE_PASSWORD_FAIL',
  props<{ payload: HttpErrorResponse }>()
);

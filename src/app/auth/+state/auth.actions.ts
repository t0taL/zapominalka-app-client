import { createAction, props } from '@ngrx/store';

import { IUpdateAuthStateData } from './auth.reducer';

import { HttpErrorResponse } from '@angular/common/http';
import { IUserData } from '@api/models/user-data.model';


export const getUser = createAction('[auth] GET_USER');
export const getUserSuccess = createAction('[auth] GET_USER_SUCCESS', props<{ payload: IUserData }>());
export const getUserFail = createAction('[auth] GET_USER_FAIL', props<{ payload: HttpErrorResponse }>());

export const signIn = createAction('[auth] SIGN_IN');
export const signInSuccess = createAction('[auth] SIGN_IN_SUCCESS', props<{ payload: IUserData }>());
export const signInFail = createAction('[auth] SIGN_IN_FAIL', props<{ payload: HttpErrorResponse }>());

export const signUp = createAction('[auth] SIGN_UP' );
export const signUpSuccess = createAction('[auth] SIGN_UP_SUCCESS', props<{ payload: IUserData}>());
export const signUpFail = createAction('[auth] SIGN_UP_FAIL', props<{ payload: HttpErrorResponse }>());

export const resetPassword = createAction('[auth] RESET_PASSWORD' );
export const resetPasswordSuccess = createAction('[auth] RESET_PASSWORD_SUCCESS');
export const resetPasswordFail = createAction('[auth] RESET_PASSWORD_FAIL', props<{ payload: HttpErrorResponse }>());

export const changePassword = createAction('[auth] CHANGE_PASSWORD', props<{ payload: string }>());
export const changePasswordSuccess = createAction('[auth] CHANGE_PASSWORD_SUCCESS');
export const changePasswordFail = createAction('[auth] CHANGE_PASSWORD_FAIL', props<{ payload: HttpErrorResponse }>());

export const updateAuthStateData = createAction('[auth] UPDATE_STATE_DATA', props<{ payload: IUpdateAuthStateData }>());

export const logout = createAction('[auth] LOGOUT');

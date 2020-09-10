import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

import { IUserData, IAuthUser, IAuthSettings } from '@api/models/user-data.model';


export const authFeatureKey = 'auth';

export interface IAuthState {
  readonly [authFeatureKey]: IAuth;
}

export interface IAuth {
  loggedIn: boolean;
  loading: boolean;
  userData: IUserData;
}

const userInitialState: IAuthUser = {
  name: null, avatar: null
};

const settingsInitialState: IAuthSettings = {
  timerCount: 0, theme: null
};

const userDataInitialState: IUserData = {
  user: userInitialState, settings: settingsInitialState
};

export const authInitialState: IAuth = {
  loggedIn: false,
  loading: false,
  userData: userDataInitialState
};

export interface IUpdateAuthStateData {
  stateKey: string;
  stateValue: IAuthUser | IAuthSettings;
}

const reducer = createReducer(
  authInitialState,
  on(
    AuthActions.getUser,
    AuthActions.signIn,
    AuthActions.signUp,
    AuthActions.resetPassword,
    AuthActions.changePassword,
    (state: IAuth) => ({ ...state, loading: true })
  ),
  on(
    AuthActions.getUserSuccess,
    AuthActions.signInSuccess,
    AuthActions.signUpSuccess,
    (state: IAuth, action: { payload: IUserData }) => {
      return { ...state, loggedIn: true, loading: false, userData: action.payload };
    }
  ),
  on(AuthActions.resetPasswordSuccess, AuthActions.changePasswordSuccess, (state: IAuth) => ({ ...state, loading: false })),
  on(
    AuthActions.getUserFail,
    AuthActions.signInFail,
    AuthActions.signUpFail,
    AuthActions.resetPasswordFail,
    AuthActions.changePasswordFail,
    (state: IAuth) => ({ ...state, loading: false })
  ),
  on(AuthActions.updateAuthStateData, (state: IAuth, action: { payload: IUpdateAuthStateData }) => {
    return { ...state, userData: { ...state.userData, [action.payload.stateKey]: action.payload.stateValue } };
  }),
  on(AuthActions.logout, () => authInitialState)
);

export function authReducer(state: IAuth | undefined, action: Action): IAuth {
  return reducer(state, action);
}

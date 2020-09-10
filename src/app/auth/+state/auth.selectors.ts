import { createSelector, createFeatureSelector } from '@ngrx/store';

import { authFeatureKey, IAuth } from './auth.reducer';

import { IUserData } from '@api/models/user-data.model';


const getAuthState = createFeatureSelector<IAuth>(authFeatureKey);

export const getLoggedIn = createSelector(getAuthState, (state: IAuth) => state.loggedIn);
export const getLoading = createSelector(getAuthState, (state: IAuth) => state.loading);

const getUserData = createSelector(getAuthState, (state: IAuth) => state.userData);

export const getUser = createSelector(getUserData, (userData: IUserData) => userData.user);
export const getSettings = createSelector(getUserData, (userData: IUserData) => userData.settings);

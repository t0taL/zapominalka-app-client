import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IUserProfile, userProfileFeatureKey } from './user-profile.reducer';


const getUserProfileState = createFeatureSelector<IUserProfile>(userProfileFeatureKey);

export const getLoading = createSelector(getUserProfileState, (state: IUserProfile) => state.loading);
export const getUserProfile = createSelector(getUserProfileState, (state: IUserProfile) => state.userProfile);

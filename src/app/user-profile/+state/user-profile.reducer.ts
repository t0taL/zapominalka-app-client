import { Action, createReducer, on } from '@ngrx/store';

import * as UserProfileActions from './user-profile.actions';

import { IUserProfile as IUserProfileModel } from '@api/models/user-profile.model';


export const userProfileFeatureKey = 'user-profile';

export interface IUserProfileState {
  readonly [userProfileFeatureKey]: IUserProfile;
}

export interface IUserProfile {
  loading: boolean;
  userProfile: IUserProfileModel;
}

export const userProfileInitialState: IUserProfile = {
  loading: false,
  userProfile: null
};

const reducer = createReducer(
  userProfileInitialState,
  on(UserProfileActions.getUserProfile, UserProfileActions.editUserProfile, (state: IUserProfile) => ({ ...state, loading: true })),
  on(
    UserProfileActions.getUserProfileSuccess,
    UserProfileActions.editUserProfileSuccess,
    (state: IUserProfile, action: { payload: IUserProfileModel }) => ({ ...state, loading: false, userProfile: action.payload })
  ),
  on(UserProfileActions.getUserProfileFail, UserProfileActions.editUserProfileFail, (state: IUserProfile) => ({ ...state, loading: false }))
);

export function userProfileReducer(state: IUserProfile | undefined, action: Action): IUserProfile {
  return reducer(state, action);
}

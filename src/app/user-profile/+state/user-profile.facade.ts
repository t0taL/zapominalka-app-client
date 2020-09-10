import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IUserProfileState } from './user-profile.reducer';
import * as UserProfileSelectors from './user-profile.selectors';
import * as UserProfileActions from './user-profile.actions';


@Injectable()
export class UserProfileFacade {
  isLoading$ = this.store.select(UserProfileSelectors.getLoading);
  userProfile$ = this.store.select(UserProfileSelectors.getUserProfile);

  constructor(private store: Store<{ state: IUserProfileState }>) {
  }

  getUserProfile(): void {
    this.store.dispatch(UserProfileActions.getUserProfile());
  }

  editUserProfile(): void {
    this.store.dispatch(UserProfileActions.editUserProfile());
  }

  changeUserProfilePassword(): void {
    this.store.dispatch(UserProfileActions.changeUserProfilePassword());
  }
}

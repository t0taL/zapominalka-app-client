import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAuthState, IUpdateAuthStateData } from './auth.reducer';
import * as AuthSelectors from './auth.selectors';
import * as AuthActions from './auth.actions';



@Injectable()
export class AuthFacade {
  isLoggedIn$ = this.store.select(AuthSelectors.getLoggedIn);
  isLoading$ = this.store.select(AuthSelectors.getLoading);
  user$ = this.store.select(AuthSelectors.getUser);
  settings$ = this.store.select(AuthSelectors.getSettings);

  constructor(private store: Store<{ state: IAuthState }>) {
  }

  getUser(): void {
    this.store.dispatch(AuthActions.getUser());
  }

  signIn(): void {
    this.store.dispatch(AuthActions.signIn());
  }

  signUp(): void {
    this.store.dispatch(AuthActions.signUp());
  }

  resetPassword(): void {
    this.store.dispatch(AuthActions.resetPassword());
  }

  changePassword(token: string): void {
    this.store.dispatch(AuthActions.changePassword({ payload: token }));
  }

  updateAuthStateData(data: IUpdateAuthStateData): void {
    this.store.dispatch(AuthActions.updateAuthStateData({ payload: data }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}

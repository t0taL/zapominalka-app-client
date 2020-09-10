import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ISettingsState } from './settings.reducer';
import * as SettingsSelectors from './settings.selectors';
import * as SettingsActions from './settings.actions';


@Injectable()
export class SettingsFacade {
  isLoading$ = this.store.select(SettingsSelectors.getLoading);
  settings$ = this.store.select(SettingsSelectors.getSettings);

  constructor(private store: Store<{ state: ISettingsState }>) {
  }

  getSettings(): void {
    this.store.dispatch(SettingsActions.getSettings());
  }

  editSettings(): void {
    this.store.dispatch(SettingsActions.editSettings());
  }
}

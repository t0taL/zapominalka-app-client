import { Action, createReducer, on } from '@ngrx/store';

import * as SettingsActions from './settings.actions';

import { ISettings as ISettingsModel } from '@api/models/settings.model';


export const settingsFeatureKey = 'settings';

export interface ISettingsState {
  readonly [settingsFeatureKey]: ISettings;
}

export interface ISettings {
  loading: boolean;
  settings: ISettingsModel;
}

export const settingsInitialState: ISettings = {
  loading: false,
  settings: null
};

const reducer = createReducer(
  settingsInitialState,
  on(SettingsActions.getSettings, SettingsActions.editSettings, (state: ISettings) => ({ ...state, loading: true })),
  on(
    SettingsActions.getSettingsSuccess,
    SettingsActions.editSettingsSuccess,
    (state: ISettings, action: { payload: ISettingsModel }) => ({ ...state, loading: false, settings: action.payload })
  ),
  on(SettingsActions.getSettingsFail, SettingsActions.editSettingsFail, (state: ISettings) => ({ ...state, loading: false }))
);

export function settingsReducer(state: ISettings | undefined, action: Action): ISettings {
  return reducer(state, action);
}

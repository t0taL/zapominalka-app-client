import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ISettings, settingsFeatureKey } from './settings.reducer';


const getSettingsState = createFeatureSelector<ISettings>(settingsFeatureKey);

export const getLoading = createSelector(getSettingsState, (state: ISettings) => state.loading);
export const getSettings = createSelector(getSettingsState, (state: ISettings) => state.settings);

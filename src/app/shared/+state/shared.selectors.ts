import { createSelector, createFeatureSelector } from '@ngrx/store';

import { sharedFeatureKey, IShared } from './shared.reducer';


const getSharedState = createFeatureSelector<IShared>(sharedFeatureKey);

export const getFormData = createSelector(getSharedState, (state: IShared) => state.formData);

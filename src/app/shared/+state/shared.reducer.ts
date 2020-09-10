import { Action, createReducer, on } from '@ngrx/store';

import * as SharedActions from './shared.actions';


export const sharedFeatureKey = 'shared';

export interface ISharedState {
  readonly [sharedFeatureKey]: IShared;
}

export interface IShared {
  formData: any;
}

export const sharedInitialState: IShared = {
  formData: null
};

const reducer = createReducer(
  sharedInitialState,
  on(SharedActions.updateFormData, (state: IShared, action: { payload: any }) => {
    return { ...state, formData: { ...state.formData, ...action.payload } };
  }),
  on(SharedActions.resetFormData, (state: IShared) => ({ ...state, formData: null }))
);

export function sharedReducer(state: IShared | undefined, action: Action): IShared {
  return reducer(state, action);
}

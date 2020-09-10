import { createAction, props } from '@ngrx/store';


// form actions
export const updateFormData = createAction('[shared-form] UPDATE_FORM_DATA', props<{ payload: any }>());
export const resetFormData = createAction('[shared-form] RESET_FORM_DATA');

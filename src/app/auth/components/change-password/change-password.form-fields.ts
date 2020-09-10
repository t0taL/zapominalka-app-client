import { Validators } from '@angular/forms';

import { CustomValidators } from '@core/utils/custom-validators';

import { IField } from '@shared/models/field.model';

import { FieldTypes } from '@shared/enums/field-types';


export const changePasswordFields: IField[] = [
  {
    type: FieldTypes.INPUT,
    name: 'password',
    label: 'New Password',
    validators: [ Validators.required, CustomValidators.password ],
    attrs: { type: 'password', required: true, clearButton: true }
  },
  {
    type: FieldTypes.INPUT,
    name: 'confirmedPassword',
    label: 'Confirm New Password',
    validators: [ Validators.required, CustomValidators.confirmPassword ],
    attrs: { type: 'password', required: true, clearButton: true }
  }
];

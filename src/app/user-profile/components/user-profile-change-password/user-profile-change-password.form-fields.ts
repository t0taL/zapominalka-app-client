import { Validators } from '@angular/forms';

import { CustomValidators } from '@core/utils/custom-validators';

import { IField } from '@shared/models/field.model';

import { FieldTypes } from '@shared/enums/field-types';


export const changeUserProfilePasswordFields: IField[] = [
  {
    type: FieldTypes.INPUT,
    name: 'previousPassword',
    label: 'Previous password',
    validators: [ Validators.required, Validators.maxLength(50) ],
    attrs: { type: 'password', required: true, clearButton: true }
  },
  {
    type: FieldTypes.INPUT,
    name: 'password',
    label: 'Password',
    validators: [ Validators.required, CustomValidators.password ],
    attrs: { type: 'password', required: true, clearButton: true }
  },
  {
    type: FieldTypes.INPUT,
    name: 'confirmedPassword',
    label: 'Confirm Password',
    validators: [ Validators.required, CustomValidators.confirmPassword ],
    attrs: { type: 'password', required: true, clearButton: true }
  }
];

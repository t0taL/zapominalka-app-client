import { Validators } from '@angular/forms';

import { CustomValidators } from '@core/utils/custom-validators';

import { IField } from '@shared/models/field.model';

import { FieldTypes } from '@shared/enums/field-types';


export const signInFields: IField[] = [
  {
    type: FieldTypes.INPUT,
    name: 'email',
    label: 'Email',
    validators: [ Validators.required, Validators.maxLength(50), CustomValidators.email ],
    attrs: { required: true, clearButton: true }
  },
  {
    type: FieldTypes.INPUT,
    name: 'password',
    label: 'Password',
    validators: [ Validators.required, Validators.maxLength(50) ],
    attrs: { type: 'password', required: true, clearButton: true }
  }
];

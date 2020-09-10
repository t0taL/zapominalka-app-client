import { Validators } from '@angular/forms';

import { CustomValidators } from '@core/utils/custom-validators';

import { IField } from '@shared/models/field.model';

import { FieldTypes } from '@shared/enums/field-types';


export const resetPasswordFields: IField[] = [
  {
    type: FieldTypes.INPUT,
    name: 'email',
    label: 'Email',
    validators: [ Validators.required, Validators.maxLength(50), CustomValidators.email ],
    attrs: { required: true, clearButton: true }
  }
];

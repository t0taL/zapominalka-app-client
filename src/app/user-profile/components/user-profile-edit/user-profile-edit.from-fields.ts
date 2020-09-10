import { Validators } from '@angular/forms';

import { IField } from '@shared/models/field.model';

import { FieldTypes } from '@shared/enums/field-types';


export const userProfileEditFields: IField[] = [
  {
    type: FieldTypes.IMAGE_UPLOAD,
    name: 'avatar'
  },
  {
    type: FieldTypes.INPUT,
    name: 'name',
    label: 'Name',
    validators: [ Validators.required, Validators.maxLength(50) ],
    attrs: { clearButton: true }
  },
  {
    type: FieldTypes.INPUT,
    name: 'email',
    label: 'Email',
    validators: [ Validators.required, Validators.maxLength(50) ],
    attrs: { clearButton: true }
  }
];

import { Validators } from '@angular/forms';

import { IField } from '@shared/models/field.model';

import { FieldTypes } from '@shared/enums/field-types';


export const learnFields: IField[] = [
  {
    type: FieldTypes.INPUT,
    name: 'translate',
    label: 'Translate',
    validators: [ Validators.required, Validators.maxLength(2000) ]
  }
];

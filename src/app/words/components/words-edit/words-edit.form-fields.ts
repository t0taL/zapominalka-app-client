import { Validators } from '@angular/forms';

import { IField } from '@shared/models/field.model';
import { Locale } from '@api/models/word.model';

import { FieldTypes } from '@shared/enums/field-types';


export const editWordFields: IField[] = [
  {
    type: FieldTypes.RADIO,
    name: 'locale',
    label: 'Locale',
    validators: [ Validators.required ],
    attrs: {
      options: [
        { value: Locale.EN, viewValue: 'En' },
        { value: Locale.RU, viewValue: 'Ru' },
      ]
    }
  },
  {
    type: FieldTypes.INPUT,
    name: 'value',
    label: 'Value',
    validators: [ Validators.required, Validators.maxLength(20) ],
    attrs: { clearButton: true }
  },
  {
    type: FieldTypes.CHIPS_INPUT,
    name: 'translation',
    label: 'Translation',
    validators: [ Validators.required, Validators.maxLength(2000) ],
    attrs: { required: true, placeholder: 'Translation...' }
  }
];

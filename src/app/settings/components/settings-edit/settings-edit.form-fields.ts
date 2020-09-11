import { Validators } from '@angular/forms';

import { IField } from '@shared/models/field.model';

import { FieldTypes } from '@shared/enums/field-types';
import { Themes } from '@shared/enums/themes';

import { getThemeName } from '@shared/utils/themes-mappers';


export const editSettingsFields: IField[] = [
  {
    type: FieldTypes.INPUT,
    name: 'repeatCount',
    label: 'Repeat count',
    validators: [ Validators.required, Validators.min(5), Validators.max(100) ],
    attrs: { type: 'number', clearButton: true }
  },
  {
    type: FieldTypes.INPUT,
    name: 'timerCount',
    label: 'Timer count',
    validators: [ Validators.required, Validators.min(5), Validators.max(60) ],
    attrs: { type: 'number', clearButton: true }
  },
  {
    type: FieldTypes.RADIO,
    name: 'theme',
    label: 'Theme',
    validators: [ Validators.required ],
    attrs: {
      options: [
        { value: Themes.LIGHT_DEFAULT, viewValue: getThemeName(Themes.LIGHT_DEFAULT) },
        { value: Themes.DARK_DEFAULT, viewValue: getThemeName(Themes.DARK_DEFAULT) },
        { value: Themes.LIGHT_GREEN, viewValue: getThemeName(Themes.LIGHT_GREEN) },
        { value: Themes.DARK_GREEN, viewValue: getThemeName(Themes.DARK_GREEN) },
        { value: Themes.LIGHT_BLUE, viewValue: getThemeName(Themes.LIGHT_BLUE) },
        { value: Themes.DARK_BLUE, viewValue: getThemeName(Themes.DARK_BLUE) },
        { value: Themes.LIGHT_PURPLE, viewValue: getThemeName(Themes.LIGHT_PURPLE) },
        { value: Themes.DARK_PURPLE, viewValue: getThemeName(Themes.DARK_PURPLE) }
      ],
      customWidth: '50%'
    }
  }
];

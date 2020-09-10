import { ValidatorFn } from '@angular/forms';

import { FieldTypes } from '../enums/field-types';


export interface IField {
  type: FieldTypes;
  name: string;
  label?: string;
  validators?: ValidatorFn[];
  value?: string;
  attrs?: IFieldAttrs;
}

interface IFieldAttrs {
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: IFieldOption[];
  clearButton?: boolean;
  customWidth?: string;
}

interface IFieldOption {
  value: string;
  viewValue: string;
}

import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IField } from '../../models/field.model';

import { FieldTypes } from '../../enums/field-types';

import { InputComponent } from './input/input.component';
import { ChipsInputComponent } from './chips-input/chips-input.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { RadioComponent } from './radio/radio.component';


const componentsMapper: { [key: string]: Type<any> } = {
  [FieldTypes.INPUT]: InputComponent,
  [FieldTypes.CHIPS_INPUT]: ChipsInputComponent,
  [FieldTypes.RADIO]: RadioComponent,
  [FieldTypes.IMAGE_UPLOAD]: ImageUploadComponent
};

@Directive({ selector: '[appForm]' })
export class FormDirective implements OnInit, OnChanges {
  @Input() field: IField;
  @Input() group: FormGroup;

  component: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {
  }

  ngOnChanges(): void {
    if (this.component) {
      this.component.instance.group = this.group;
      this.component.instance.field = this.field;
    }
  }

  ngOnInit(): void {
    const component = this.resolver.resolveComponentFactory<any>(componentsMapper[this.field.type]);

    this.component = this.container.createComponent(component);
    this.component.instance.group = this.group;
    this.component.instance.field = this.field;
  }
}

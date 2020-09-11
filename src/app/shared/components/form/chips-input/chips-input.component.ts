import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup } from '@angular/forms';

import { SharedFacade } from '@shared/+state/shared.facade';

import { IField } from '@shared/models/field.model';


@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipsInputComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() field: IField;
  values: string[] = [];

  constructor(private sharedFacade: SharedFacade) {
  }

  ngOnInit(): void {
    this.values = [...this.group.controls[this.field.name].value];
  }

  private updateFormData(): void {
    const fieldValue = [...this.values];
    this.group.controls[this.field.name].setValue(fieldValue);
    this.group.markAsDirty();
    this.sharedFacade.updateFormData(this.group.value);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.values.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.updateFormData();
  }

  remove(value: string): void {
    const index = this.values.indexOf(value);

    if (index >= 0) {
      this.values.splice(index, 1);
    }
  }
}

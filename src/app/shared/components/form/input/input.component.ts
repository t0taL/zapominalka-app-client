import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SharedFacade } from '../../../+state/shared.facade';

import { IField } from '../../../models/field.model';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() field: IField;

  constructor(private sharedFacade: SharedFacade) {
  }

  ngOnInit(): void {
    this.updateFormData();
  }

  updateFormData(): void {
    this.sharedFacade.updateFormData(this.group.value);
  }

  clear(): void {
    this.group.controls[this.field.name].reset();
    this.updateFormData();
  }
}

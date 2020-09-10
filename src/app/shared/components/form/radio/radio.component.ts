import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SharedFacade } from '../../../+state/shared.facade';

import { IField } from '../../../models/field.model';


@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent implements OnInit {
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
}

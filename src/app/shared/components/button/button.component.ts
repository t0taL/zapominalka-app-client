import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ColorTypes } from '../../enums/color-types';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {
  @Input() color: ColorTypes = ColorTypes.BASIC;
  @Input() maxWidth: boolean;
  @Input() disabled = false;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  click() {
    this.clickEvent.emit();
  }
}

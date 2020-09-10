import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnInit {
  @Input() successCount: number;
  @Input() failCount: number;
  @Input() totalCount: number;
  @Input() isSoundsMuted: boolean;
  @Output() muteSoundsEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  muteSounds(state: boolean): void {
    this.muteSoundsEvent.emit(state);
  }
}

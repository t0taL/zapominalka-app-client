import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'app-info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoItemComponent implements OnInit {
  @Input() name: string;
  @Input() value: string;
  @Input() titleWidth: string = '50%';

  constructor() {
  }

  ngOnInit(): void {
  }
}

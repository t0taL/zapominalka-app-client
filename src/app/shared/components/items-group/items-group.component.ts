import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { itemsGroupAnimation } from '../../animations/items-group-animation';


@Component({
  selector: 'app-items-group',
  templateUrl: './items-group.component.html',
  styleUrls: ['./items-group.component.scss'],
  animations: [ itemsGroupAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsGroupComponent implements OnInit {
  @Input() title: string;
  @Input() itemsCount: number;

  isGroupOpened: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleGroupState(): void {
    this.isGroupOpened = !this.isGroupOpened;
  }
}

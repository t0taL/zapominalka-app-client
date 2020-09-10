import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ColorTypes } from '@shared/enums/color-types';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  readonly colorTypes = ColorTypes;

  constructor() {
  }

  ngOnInit(): void {
  }
}

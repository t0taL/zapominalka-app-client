import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IUserProfile } from '@api/models/user-profile.model';

import { ColorTypes } from '@shared/enums/color-types';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() user: Partial<IUserProfile>;
  @Input() isLoggedIn: boolean;
  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  readonly colorTypes = ColorTypes;

  constructor() {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.logoutEvent.emit();
  }
}

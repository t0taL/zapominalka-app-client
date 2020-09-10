import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { NavLocationTypes } from '@core/enums/nav-location-types';


interface INavItem {
  title: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  @Input() navLocation: NavLocationTypes;

  navItems: INavItem[];

  constructor() {
  }

  ngOnInit(): void {
    this.navItems = [
      { title: 'home', icon: 'home', path: '/home' },
      { title: 'words', icon: 'menu_book', path: '/words' },
      { title: 'settings', icon: 'settings', path: '/settings' },
      { title: 'profile', icon: 'person', path: '/user-profile' }
    ];
  }
}

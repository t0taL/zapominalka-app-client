import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { SettingsFacade } from 'app/settings/+state/settings.facade';

import { ISettings } from '@api/models/settings.model';

import { Themes } from '@shared/enums/themes';
import { ColorTypes } from '@shared/enums/color-types';

import { getThemeName } from '@shared/utils/themes-mappers';


@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.component.html',
  styleUrls: ['./settings-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsViewComponent implements OnInit {
  isLoading$: Observable<boolean>;
  settings$: Observable<ISettings>;

  readonly colorTypes = ColorTypes;

  constructor(private settingsFacade: SettingsFacade) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.settingsFacade.isLoading$;
    this.settings$ = this.settingsFacade.settings$;

    this.settingsFacade.getSettings();
  }

  getThemeName(theme: Themes): string {
    return getThemeName(theme);
  }
}

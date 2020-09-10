import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SharedFacade } from '@shared/+state/shared.facade';
import { SettingsFacade } from '../../+state/settings.facade';

import { IField } from '@shared/models/field.model';
import { ISettings } from '@api/models/settings.model';

import { ColorTypes } from '@shared/enums/color-types';

import { editSettingsFields } from './settings-edit.form-fields';


@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsEditComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  data$: Observable<ISettings>;

  readonly fields: IField[] = editSettingsFields;
  readonly colorTypes = ColorTypes;

  constructor(private sharedFacade: SharedFacade, private settingsFacade: SettingsFacade) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.settingsFacade.isLoading$;
    this.data$ = this.settingsFacade.settings$
      .pipe(
        tap((data: ISettings) => {
          if (data === null) {
            this.settingsFacade.getSettings();
          }
        })
      );
  }

  ngOnDestroy(): void {
    this.sharedFacade.resetFormData();
  }

  saveChanges(): void {
    this.settingsFacade.editSettings();
  }
}

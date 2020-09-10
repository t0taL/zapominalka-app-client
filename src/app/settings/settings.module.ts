import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';

import { SettingsService } from './services/settings.service';

import { SettingsEffects } from './+state/settings.effects';
import { settingsFeatureKey, settingsReducer, settingsInitialState } from './+state/settings.reducer';
import { SettingsFacade } from './+state/settings.facade';

import { SettingsViewComponent } from './components/settings-view/settings-view.component';
import { SettingsEditComponent } from './components/settings-edit/settings-edit.component';


@NgModule({
  declarations: [ SettingsViewComponent, SettingsEditComponent ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule,

    StoreModule.forFeature(settingsFeatureKey, settingsReducer, { initialState: settingsInitialState }),
    EffectsModule.forFeature([ SettingsEffects ])
  ],
  providers: [ SettingsService, SettingsEffects, SettingsFacade ]
})
export class SettingsModule {
}

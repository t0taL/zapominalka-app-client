import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';
import { LearnRoutingModule } from './learn-routing.module';

import { LearnService } from './services/learn.service';
import { SoundsService } from './services/sounds.service';

import { LearnGuard } from './guards/learn.guard';

import { learnFeatureKey, learnReducer, learnInitialState } from './+state/learn.reducer';
import { LearnEffects } from './+state/learn.effects';
import { LearnFacade } from './+state/learn.facade';

import { StartMenuComponent } from './components/start-menu/start-menu.component';
import { LearnComponent } from './components/learn/learn.component';
import { ProgressBarComponent } from './components/learn/progress-bar/progress-bar.component';
import { TimerComponent } from './components/learn/timer/timer.component';
import { ResultComponent } from './components/result/result.component';


@NgModule({
  declarations: [
    StartMenuComponent,
    LearnComponent,
    ProgressBarComponent,
    TimerComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LearnRoutingModule,

    StoreModule.forFeature(learnFeatureKey, learnReducer, { initialState: learnInitialState }),
    EffectsModule.forFeature([ LearnEffects ])
  ],
  providers: [ LearnService, SoundsService, LearnGuard,  LearnEffects, LearnFacade ]
})
export class LearnModule {
}

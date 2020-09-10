import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';
import { WordsRoutingModule } from './words-routing.module';

import { WordsService } from './services/words.service';

import { wordsFeatureKey, wordsReducer, wordsInitialState } from './+state/words.reducer';
import { WordsEffects } from './+state/words.effects';
import { WordsFacade } from './+state/words.facade';

import { WordsViewComponent } from './components/words-view/words-view.component';
import { WordsAddComponent } from './components/words-add/words-add.component';
import { WordsEditComponent } from './components/words-edit/words-edit.component';


@NgModule({
  declarations: [ WordsViewComponent, WordsAddComponent, WordsEditComponent ],
  imports: [
    CommonModule,
    SharedModule,
    WordsRoutingModule,

    StoreModule.forFeature(wordsFeatureKey, wordsReducer, { initialState: wordsInitialState }),
    EffectsModule.forFeature([ WordsEffects ])
  ],
  providers: [ WordsService, WordsEffects, WordsFacade ]
})
export class WordsModule {
}

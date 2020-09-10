import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ILearnState, LearnMode } from './learn.reducer';
import * as LearnSelectors from './learn.selectors';
import * as LearnActions from './learn.actions';


@Injectable()
export class LearnFacade {
  mode$ = this.store.select(LearnSelectors.getMode);
  isLoading$ = this.store.select(LearnSelectors.getLoading);
  words$ = this.store.select(LearnSelectors.getWords);
  status$ = this.store.select(LearnSelectors.getStatus);
  isSoundsMuted$ = this.store.select(LearnSelectors.getSoundsMuted);
  currentWord$ = this.store.select(LearnSelectors.getCurrentWord);
  correctlyTranslatedWords$ = this.store.select(LearnSelectors.getCorrectlyTranslatedWords);
  incorrectlyTranslatedWords$ = this.store.select(LearnSelectors.getIncorrectlyTranslatedWords);

  constructor(private store: Store<{ state: ILearnState }>) {
  }

  startLearning(): void {
    this.store.dispatch(LearnActions.startLearning());
  }

  setLearningMode(mode: LearnMode): void {
    this.store.dispatch(LearnActions.setLearningMode({ payload: mode }));
  }

  setCurrentWord(): void {
    this.store.dispatch(LearnActions.setCurrentWord());
  }

  skipCurrentWord(): void {
    this.store.dispatch(LearnActions.skipCurrentWord());
  }

  checkTranslate(): void {
    this.store.dispatch(LearnActions.checkTranslate());
  }

  endLearning(): void {
    this.store.dispatch(LearnActions.endLearning());
  }

  muteSounds(state: boolean): void {
    this.store.dispatch(LearnActions.muteSounds({ payload: state }));
  }
}

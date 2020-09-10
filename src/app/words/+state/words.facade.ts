import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { IWordsState } from './words.reducer';
import * as WordsSelectors from './words.selectors';
import * as WordsActions from './words.actions';


@Injectable()
export class WordsFacade {
  isLoading$ = this.store.select(WordsSelectors.getLoading);
  newWords$ = this.store.select(WordsSelectors.getNewWords);
  completedWords$ = this.store.select(WordsSelectors.getCompletedWords);

  constructor(private store: Store<{ state: IWordsState }>) {
  }

  getWords(): void {
    this.store.dispatch(WordsActions.getWords());
  }

  addWord(): void {
    this.store.dispatch(WordsActions.addWord());
  }

  editWord(): void {
    this.store.dispatch(WordsActions.editWord());
  }

  openDeleteWordDialog(wordId: string): void {
    this.store.dispatch(WordsActions.openDeleteWordDialog({ payload: wordId }));
  }

  openCompleteWordDialog(wordId: string): void {
    this.store.dispatch(WordsActions.openCompleteWordDialog({ payload: wordId }));
  }

  openReturnWordDialog(wordId: string): void {
    this.store.dispatch(WordsActions.openReturnWordDialog({ payload: wordId }));
  }
}

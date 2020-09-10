import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IWords, wordsFeatureKey } from './words.reducer';


const getWordsState = createFeatureSelector<IWords>(wordsFeatureKey);

export const getLoading = createSelector(getWordsState, (state: IWords) => state.loading);
export const getNewWords = createSelector(getWordsState, (state: IWords) => (state.words !== null) ? state.words.newWords : []);
export const getCompletedWords = createSelector(getWordsState, (state: IWords) => (state.words !== null) ? state.words.completedWords : []);

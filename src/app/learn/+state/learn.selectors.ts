import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ILearn, learnFeatureKey } from './learn.reducer';


const getLearnState = createFeatureSelector<ILearn>(learnFeatureKey);

export const getMode = createSelector(getLearnState, (state: ILearn) => state.mode);
export const getLoading = createSelector(getLearnState, (state: ILearn) => state.loading);
export const getStatus = createSelector(getLearnState, (state: ILearn) => state.status);
export const getSoundsMuted = createSelector(getLearnState, (state: ILearn) => state.soundsMuted);
export const getWords = createSelector(getLearnState, (state: ILearn) => state.words);
export const getCurrentWord = createSelector(getLearnState, (state: ILearn) => state.currentWord);
export const getCorrectlyTranslatedWords = createSelector(getLearnState, (state: ILearn) => state.correctlyTranslatedWords);
export const getIncorrectlyTranslatedWords = createSelector(getLearnState, (state: ILearn) => state.incorrectlyTranslatedWords);

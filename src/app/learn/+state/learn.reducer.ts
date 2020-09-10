import { Action, createReducer, on } from '@ngrx/store';

import * as LearnActions from './learn.actions';

import { IWord } from '@api/models/word.model';


export const learnFeatureKey = 'learn';

export interface ILearnState {
  readonly [learnFeatureKey]: ILearn;
}

export enum LearnStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
  PENDING = 'pending'
}

export enum LearnMode {
  SIMPLE = 'simple',
  TIMING = 'timing'
}

export interface ILearn {
  mode: LearnMode;
  loading: boolean;
  status: LearnStatus;
  soundsMuted: boolean;
  words: IWord[];
  currentWord: IWord;
  correctlyTranslatedWords: IWord[];
  incorrectlyTranslatedWords: IWord[];
}

export const learnInitialState = {
  mode: null,
  loading: false,
  status: LearnStatus.PENDING,
  soundsMuted: false,
  words: [],
  currentWord: null,
  correctlyTranslatedWords: [],
  incorrectlyTranslatedWords: []
};

const reducer = createReducer(
  learnInitialState,
  on(LearnActions.startLearning, LearnActions.setCurrentWord, LearnActions.checkTranslate, (state: ILearn) => {
    return { ...state, loading: true };
  }),
  on(LearnActions.setLearningMode, (state: ILearn, action: { payload: LearnMode }) => {
    return { ...state, mode: action.payload };
  }),
  on(LearnActions.startLearningSuccess, (state: ILearn, action: { payload: IWord[] }) => {
    return { ...state, loading: false, words: action.payload, correctlyTranslatedWords: [], incorrectlyTranslatedWords: [] };
  }),
  on(LearnActions.startLearningFail, (state: ILearn) => {
    return learnInitialState;
  }),
  on(LearnActions.setCurrentWordSuccess, (state: ILearn, action: { payload: IWord }) => {
    const updatedWords: IWord[] = state.words.filter(word => word._id !== action.payload._id);
    return {
      ...state,
      loading: false,
      status: LearnStatus.PENDING,
      words: updatedWords,
      currentWord: action.payload
    };
  }),
  on(LearnActions.setCurrentWordFail, (state: ILearn) => ({ ...state, loading: false, currentWord: null })),
  on(LearnActions.checkTranslateSuccess, (state: ILearn, action: { payload: IWord }) => {
    const updatedWord: IWord = { ...action.payload, repeatCount: action.payload.repeatCount + 1 };
    const updatedCorrectlyTranslatedWords: IWord[] = [ ...state.correctlyTranslatedWords, updatedWord ];
    return {
      ...state,
      loading: false,
      status: LearnStatus.SUCCESS,
      correctlyTranslatedWords: updatedCorrectlyTranslatedWords
    };
  }),
  on(LearnActions.checkTranslateFail, (state: ILearn, action: { payload: IWord }) => {
    const updatedIncorrectlyTranslatedWords: IWord[] = [ ...state.incorrectlyTranslatedWords, action.payload ];
    return {
      ...state,
      loading: false,
      status: LearnStatus.FAIL,
      incorrectlyTranslatedWords: updatedIncorrectlyTranslatedWords
    };
  }),
  on(LearnActions.endLearning, (state: ILearn) => {
    const currentWord: IWord = state.currentWord;
    const words: IWord[] = state.words;
    const updatedIncorrectlyTranslatedWords: IWord[] = [ ...state.incorrectlyTranslatedWords, ...words ];
    if (currentWord !== null) {
      updatedIncorrectlyTranslatedWords.push(currentWord);
    }
    return { ...state, loading: true, incorrectlyTranslatedWords: updatedIncorrectlyTranslatedWords };
  }),
  on(LearnActions.endLearningFail, (state: ILearn) => {
    return learnInitialState;
  }),
  on(LearnActions.startLearningFail, (state: ILearn) => ({ ...state, loading: false })),
  on(LearnActions.muteSounds, (state: ILearn, action: { payload: boolean }) => ({ ...state, soundsMuted: action.payload }))
);

export function learnReducer(state: ILearn | undefined, action: Action): ILearn {
  return reducer(state, action);
}

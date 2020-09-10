import { Action, createReducer, on } from '@ngrx/store';

import * as WordsActions from './words.actions';

import { IWord, IWords as IWordsModel } from '@api/models/word.model';


export const wordsFeatureKey = 'words';

export interface IWordsState {
  readonly [wordsFeatureKey]: IWords;
}

export interface IWords {
  loading: boolean;
  words: IWordsModel;
}

export const wordsInitialState: IWords = {
  loading: false,
  words: {
    newWords: [],
    completedWords: []
  }
};

const reducer = createReducer(
  wordsInitialState,
  on(
    WordsActions.getWords,
    WordsActions.addWord,
    WordsActions.editWord,
    WordsActions.deleteWord,
    WordsActions.completeWord,
    WordsActions.returnWord,
    (state: IWords) => ({ ...state, loading: true })
  ),
  on(WordsActions.getWordsSuccess, (state: IWords, action: { payload: IWordsModel }) => {
    return { ...state, loading: false, words: action.payload };
  }),
  on(WordsActions.addWordSuccess, (state: IWords, action: { payload: IWord }) => {
    const newWordIdx = state.words.newWords.findIndex(word => word._id === action.payload._id);
    const completedWordIdx = state.words.completedWords.findIndex(word => word._id === action.payload._id);
    let words: IWordsModel;
    if (newWordIdx !== -1) {
      const updatedNewWords: IWord[] = [ ...state.words.newWords ];
      updatedNewWords[newWordIdx] = action.payload;
      words = { ...state.words, newWords: updatedNewWords };
    } else if (completedWordIdx !== -1) {
      const updatedCompletedWords: IWord[] = [ ...state.words.completedWords ];
      updatedCompletedWords[completedWordIdx] = action.payload;
      words = { ...state.words, completedWords: updatedCompletedWords };
    } else {
      const updatedNewWords: IWord[] = [ ...state.words.newWords, action.payload ];
      words = { ...state.words, newWords: updatedNewWords };
    }
    return { ...state, loading: false, words };
  }),
  on(WordsActions.editWordSuccess, (state: IWords, action: { payload: IWord }) => {
    const newWordIdx = state.words.newWords.findIndex(word => word._id === action.payload._id);
    const completedWordIdx = state.words.completedWords.findIndex(word => word._id === action.payload._id);
    let words: IWordsModel;
    if (newWordIdx !== -1) {
      const updatedNewWords: IWord[] = [ ...state.words.newWords ];
      updatedNewWords[newWordIdx] = action.payload;
      words = { ...state.words, newWords: updatedNewWords };
    } else if (completedWordIdx !== -1) {
      const updatedCompletedWords: IWord[] = [ ...state.words.completedWords ];
      updatedCompletedWords[completedWordIdx] = action.payload;
      words = { ...state.words, completedWords: updatedCompletedWords };
    }
    return { ...state, loading: false, words };
  }),
  on(WordsActions.deleteWordSuccess, (state: IWords, action: { payload: string }) => {
    const newWordIdx = state.words.newWords.findIndex(word => word._id === action.payload);
    const completedWordIdx = state.words.completedWords.findIndex(word => word._id === action.payload);
    let words: IWordsModel;
    if (newWordIdx !== -1) {
      const updatedNewWords: IWord[] = [
        ...state.words.newWords.slice(0, newWordIdx),
        ...state.words.newWords.slice(newWordIdx + 1),
      ];
      words = { ...state.words, newWords: updatedNewWords };
    } else if (completedWordIdx !== -1) {
      const updatedCompletedWords: IWord[] = [
        ...state.words.completedWords.slice(0, completedWordIdx),
        ...state.words.completedWords.slice(completedWordIdx + 1),
      ];
      words = { ...state.words, completedWords: updatedCompletedWords };
    }
    return { ...state, loading: false, words };
  }),
  on(WordsActions.completeWordSuccess, (state: IWords, action: { payload: IWord }) => {
    const newWordIdx = state.words.newWords.findIndex(word => word._id === action.payload._id);
    const words: IWordsModel = {
      newWords: [
        ...state.words.newWords.slice(0, newWordIdx),
        ...state.words.newWords.slice(newWordIdx + 1)
      ],
      completedWords: [
        ...state.words.completedWords,
        action.payload
      ].sort((a, b) => a.value.localeCompare(b.value))
    };
    return { ...state, loading: false, words };
  }),
  on(WordsActions.returnWordSuccess, (state: IWords, action: { payload: IWord }) => {
    const completedWordIdx = state.words.completedWords.findIndex(word => word._id === action.payload._id);
    const words: IWordsModel = {
      newWords: [
        ...state.words.newWords,
        action.payload
      ].sort((a, b) => a.value.localeCompare(b.value)),
      completedWords: [
        ...state.words.completedWords.slice(0, completedWordIdx),
        ...state.words.completedWords.slice(completedWordIdx + 1)
      ]
    };
    return { ...state, loading: false, words };
  }),
  on(
    WordsActions.addWordFail,
    WordsActions.editWordFail,
    WordsActions.deleteWordFail,
    WordsActions.completeWordFail,
    WordsActions.returnWordFail,
    (state: IWords) => ({ ...state, loading: false })
  )
);

export function wordsReducer(state: IWords | undefined, action: Action): IWords {
  return reducer(state, action);
}

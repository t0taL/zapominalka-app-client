import { createAction, props } from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';
import { IWord } from '@api/models/word.model';

import { LearnMode } from './learn.reducer';


export const startLearning = createAction('[learn] START_LEARNING');
export const startLearningSuccess = createAction('[learn] START_LEARNING_SUCCESS', props<{ payload: IWord[] }>());
export const startLearningFail = createAction('[learn] START_LEARNING_FAIL', props<{ payload: HttpErrorResponse }>());

export const setLearningMode = createAction('[learn] SET_LEARNING_MODE', props<{ payload: LearnMode }>());

export const setCurrentWord = createAction('[learn] SET_CURRENT_WORD');
export const setCurrentWordSuccess = createAction('[learn] SET_CURRENT_WORD_SUCCESS', props<{ payload: IWord }>());
export const setCurrentWordFail = createAction('[learn] SET_CURRENT_WORD_FAIL');

export const skipCurrentWord = createAction('[learn] SKIP_CURRENT_WORD');

export const checkTranslate = createAction('[learn] CHECK_TRANSLATE');
export const checkTranslateSuccess = createAction('[learn] CHECK_TRANSLATE_SUCCESS', props<{ payload: IWord }>());
export const checkTranslateFail = createAction('[learn] CHECK_TRANSLATE_FAIL', props<{ payload: IWord }>());

export const endLearning = createAction('[learn] END_LEARNING');
export const endLearningSuccess = createAction('[learn] END_LEARNING_SUCCESS', props<{ payload: string }>());
export const endLearningFail = createAction('[learn] END_LEARNING_FAIL', props<{ payload: HttpErrorResponse }>());

export const muteSounds = createAction('[learn] MUTE_SOUNDS', props<{ payload: boolean }>());

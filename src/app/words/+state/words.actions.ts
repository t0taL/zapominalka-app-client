import { createAction, props } from '@ngrx/store';

import { HttpErrorResponse } from '@angular/common/http';
import { IWord, IWords } from '@api/models/word.model';


export const getWords = createAction('[words] GET_WORDS');
export const getWordsSuccess = createAction('[words] GET_WORDS_SUCCESS', props<{ payload: IWords }>());
export const getWordsFail = createAction('[words] GET_WORDS_FAIL', props<{ payload: HttpErrorResponse }>());

export const addWord = createAction('[words] ADD_WORD');
export const addWordSuccess = createAction('[words] ADD_WORD_SUCCESS', props<{ payload: IWord }>());
export const addWordFail = createAction('[words] ADD_WORD_FAIL', props<{ payload: HttpErrorResponse }>());

export const editWord = createAction('[words] EDIT_WORD');
export const editWordSuccess = createAction('[words] EDIT_WORD_SUCCESS', props<{ payload: IWord }>());
export const editWordFail = createAction('[words] EDIT_WORD_FAIL', props<{ payload: HttpErrorResponse }>());

export const openDeleteWordDialog = createAction('[words] OPEN_DELETE_WORD_DIALOG', props<{ payload: string }>());
export const deleteWord = createAction('[words] DELETE_WORD', props<{ payload: string }>());
export const deleteWordSuccess = createAction('[words] DELETE_WORD_SUCCESS', props<{ payload: string }>());
export const deleteWordFail = createAction('[words] DELETE_WORD_FAIL', props<{ payload: HttpErrorResponse }>());

export const openCompleteWordDialog = createAction('[words] OPEN_COMPLETE_WORD_DIALOG', props<{ payload: string }>());
export const completeWord = createAction('[words] COMPLETE_WORD', props<{ payload: string }>());
export const completeWordSuccess = createAction('[words] COMPLETE_WORD_SUCCESS', props<{ payload: IWord }>());
export const completeWordFail = createAction('[words] COMPLETE_WORD_FAIL', props<{ payload: HttpErrorResponse }>());

export const openReturnWordDialog = createAction('[words] OPEN_RETURN_WORD_DIALOG', props<{ payload: string }>());
export const returnWord = createAction('[words] RETURN_WORD', props<{ payload: string }>());
export const returnWordSuccess = createAction('[words] RETURN_WORD_SUCCESS', props<{ payload: IWord }>());
export const returnWordFail = createAction('[words] RETURN_WORD_FAIL', props<{ payload: HttpErrorResponse }>());

export const closeDialog = createAction('[words] CLOSE_DIALOG');

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { WordsService } from '@words/services/words.service';
import { NotificationService } from '@core/services/notification.service';

import { SharedFacade } from '@shared/+state/shared.facade';
import * as WordsActions from './words.actions';

import { HttpErrorResponse } from '@angular/common/http';

import {
  IGetWordsResponse,
  IAddWordResponse,
  IEditWordResponse,
  IDeleteWordResponse,
  ICompleteWordResponse,
  IReturnWordResponse
} from '@api/interfaces/words/words-response.interface';
import {
  IAddWordRequest,
  IEditWordRequest,
  IDeleteWordRequest,
  ICompleteWordRequest,
  IReturnWordRequest
} from '@api/interfaces/words/words-request.interface';

import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';


@Injectable()
export class WordsEffects {
  getWords$ = createEffect(() => this.actions$
    .pipe(
      ofType(WordsActions.getWords),
      switchMap(action => this.wordsService.getWords()
        .pipe(
          map((response: IGetWordsResponse) => WordsActions.getWordsSuccess({ payload: response.words })),
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showErrorMessage(error.error);
            return of(WordsActions.getWordsFail({ payload: error }));
          })
        )
      )
    )
  );

  addWord$ = createEffect(() => this.actions$
    .pipe(
      ofType(WordsActions.addWord),
      withLatestFrom(this.sharedFacade.formData$),
      switchMap(([action, formData]) => {
        const addWordRequest: IAddWordRequest = { word: formData };
        return this.wordsService.addWord(addWordRequest)
          .pipe(
            map((response: IAddWordResponse) => {
              this.router.navigate(['/words']);
              this.notificationService.showInfoMessage('The new word has been successfully added!');
              return WordsActions.addWordSuccess({ payload: response.word });
            }),
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showErrorMessage(error.error);
              return of(WordsActions.addWordFail({ payload: error }));
            })
          );
      })
    )
  );

  editWord$ = createEffect(() => this.actions$
    .pipe(
      ofType(WordsActions.editWord),
      withLatestFrom(this.sharedFacade.formData$),
      switchMap(([action, formData]) => {
        const editWordRequest: IEditWordRequest = { word: formData };
        return this.wordsService.editWord(editWordRequest)
          .pipe(
            map((response: IEditWordResponse) => {
              this.router.navigate(['/words']);
              this.notificationService.showInfoMessage('The word has been successfully edited!');
              return WordsActions.editWordSuccess({ payload: response.word });
            }),
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showErrorMessage(error.error);
              return of(WordsActions.editWordFail({ payload: error }));
            })
          );
      })
    )
  );

  openDeleteWordDialog$ = createEffect(() => this.actions$
    .pipe(
      ofType(WordsActions.openDeleteWordDialog),
      switchMap(action => {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: { title: 'The word will be deleted!', wordId: action.payload }
        });
        return dialogRef.afterClosed();
      }),
      map((wordId: string) => {
        return (wordId !== null) ? WordsActions.deleteWord({ payload: wordId }) : WordsActions.closeDialog();
      })
    )
  );

  deleteWord$ = createEffect(() => this.actions$
    .pipe(
      ofType(WordsActions.deleteWord),
      switchMap(action => {
        const deleteWordRequest: IDeleteWordRequest = { wordId: action.payload };
        return this.wordsService.deleteWord(deleteWordRequest)
          .pipe(
            map((response: IDeleteWordResponse) => {
              this.notificationService.showInfoMessage('The word has been successfully deleted!');
              return WordsActions.deleteWordSuccess({ payload: response.wordId });
            }),
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showErrorMessage(error.error);
              return of(WordsActions.deleteWordFail({ payload: error }));
            })
          );
      })
    )
  );

  openCompleteWordDialog$ = createEffect(() => this.actions$
    .pipe(
      ofType(WordsActions.openCompleteWordDialog),
      switchMap(action => {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: { title: 'The word will be completed!', wordId: action.payload }
        });
        return dialogRef.afterClosed();
      }),
      map((wordId: string) => {
        return (wordId !== null) ? WordsActions.completeWord({ payload: wordId }) : WordsActions.closeDialog();
      })
    )
  );

  completeWord$ = createEffect(() => this.actions$
    .pipe(
      ofType(WordsActions.completeWord),
      switchMap(action => {
        const completeWordRequest: ICompleteWordRequest = { wordId: action.payload };
        return this.wordsService.completeWord(completeWordRequest)
          .pipe(
            map((response: ICompleteWordResponse) => {
              this.notificationService.showInfoMessage('The word has been successfully completed!');
              return WordsActions.completeWordSuccess({ payload: response.word });
            }),
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showErrorMessage(error.error);
              return of(WordsActions.completeWordFail({ payload: error }));
            })
          );
      })
    )
  );

  openReturnWordDialog$ = createEffect(() => this.actions$
    .pipe(
      ofType(WordsActions.openReturnWordDialog),
      switchMap(action => {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: { title: 'The word will be returned!', wordId: action.payload }
        });
        return dialogRef.afterClosed();
      }),
      map((wordId: string) => {
        return (wordId !== null) ? WordsActions.returnWord({ payload: wordId }) : WordsActions.closeDialog();
      })
    )
  );

  returnWord$ = createEffect(() => this.actions$
    .pipe(
      ofType(WordsActions.returnWord),
      switchMap(action => {
        const returnWordRequest: IReturnWordRequest = { wordId: action.payload };
        return this.wordsService.returnWord(returnWordRequest)
          .pipe(
            map((response: IReturnWordResponse) => {
              this.notificationService.showInfoMessage('The word has been successfully returned!');
              return WordsActions.returnWordSuccess({ payload: response.word });
            }),
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showErrorMessage(error.error);
              return of(WordsActions.returnWordFail({ payload: error }));
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    public dialog: MatDialog,
    private sharedFacade: SharedFacade,
    private wordsService: WordsService,
    private notificationService: NotificationService
  ) {
  }
}

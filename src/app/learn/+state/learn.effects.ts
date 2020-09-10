import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom, delay, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { LearnService } from '../services/learn.service';
import { SoundsService } from '../services/sounds.service';
import { NotificationService } from '@core/services/notification.service';

import { LearnFacade } from './learn.facade';
import { SharedFacade } from '@shared/+state/shared.facade';
import * as LearnActions from './learn.actions';

import { HttpErrorResponse } from '@angular/common/http';
import { IWord } from '@api/models/word.model';
import { IGetWordsResponse, ISaveLearnResultResponse } from '@api/interfaces/learn/learn-response.interface';
import { ISaveLearnResultRequest } from '@api/interfaces/learn/learn-request.interface';


@Injectable()
export class LearnEffects {
  startLearning$ = createEffect(() => this.actions$
    .pipe(
      ofType(LearnActions.startLearning),
      mergeMap(action => this.learnService.getWords()
        .pipe(
          map((response: IGetWordsResponse) => {
            return LearnActions.startLearningSuccess({ payload: response.words });
          }),
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showErrorMessage(error.error);
            return of(LearnActions.startLearningFail({ payload: error }));
          })
        )
      )
    )
  );

  setLearningMode$ = createEffect(() => this.actions$
    .pipe(
      ofType(LearnActions.setLearningMode),
      map(action => {
        this.router.navigate(['/learn']);
        this.soundsService.setLearnMode(action.payload);
        this.notificationService.showInfoMessage('Good luck!');
        return LearnActions.setCurrentWord();
      })
    )
  );

  setCurrentWord$ = createEffect(() => this.actions$
    .pipe(
      ofType(LearnActions.setCurrentWord),
      withLatestFrom(this.learnFacade.words$),
      map(([action, words]) => {
        if (words.length > 0) {
          this.soundsService.playPendingSound();
          return LearnActions.setCurrentWordSuccess({ payload: words[0] });
        } else {
          this.router.navigate(['/learn', 'result']);
          this.notificationService.showInfoMessage('Let is check the result!');
          return LearnActions.setCurrentWordFail();
        }
      })
    )
  );

  checkTranslate$ = createEffect(() => this.actions$
    .pipe(
      ofType(LearnActions.checkTranslate),
      withLatestFrom(this.learnFacade.currentWord$, this.sharedFacade.formData$),
      map(([action, word, formData]) => {
        const translate: string = (formData?.translate) ? formData.translate.toLowerCase().trim() : '';
        if (word.translation.includes(translate)) {
          this.soundsService.playSuccessSound();
          this.notificationService.showInfoMessage('Success!', 3000);
          return LearnActions.checkTranslateSuccess({ payload: word });
        } else {
          this.soundsService.playFailSound();
          this.notificationService.showErrorMessage('Fail!', 3000);
          return LearnActions.checkTranslateFail({ payload: word });
        }
      })
    )
  );

  checkTranslateSuccessAndFail$ = createEffect(() => this.actions$
    .pipe(
      ofType(LearnActions.checkTranslateSuccess, LearnActions.checkTranslateFail),
      delay(3000),
      map(action => LearnActions.setCurrentWord())
    )
  );

  skipCurrentWord$ = createEffect(() => this.actions$
    .pipe(
      ofType(LearnActions.skipCurrentWord),
      withLatestFrom(this.learnFacade.currentWord$),
      map(([action, word]) => {
        this.soundsService.playSkipSound();
        return LearnActions.checkTranslateFail({ payload: word });
      })
    )
  );

  endLearning$ = createEffect(() => this.actions$
    .pipe(
      ofType(LearnActions.endLearning),
      withLatestFrom(this.learnFacade.correctlyTranslatedWords$, this.learnFacade.incorrectlyTranslatedWords$),
      mergeMap(([action, correctlyTranslatedWords, incorrectlyTranslatedWords]) => {
        const saveLearnResultRequest: ISaveLearnResultRequest = {
          words: [ ...correctlyTranslatedWords, ...incorrectlyTranslatedWords ]
        };
        return this.learnService.saveLearnResult(saveLearnResultRequest)
          .pipe(
            map((response: ISaveLearnResultResponse) => {
              this.notificationService.showInfoMessage(response.message);
              return LearnActions.endLearningSuccess({ payload: response.message });
            }),
            catchError((error: HttpErrorResponse) => {
              this.notificationService.showErrorMessage(error.error);
              return of(LearnActions.endLearningFail({ payload: error }));
            })
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private sharedFacade: SharedFacade,
    private learnFacade: LearnFacade,
    private learnService: LearnService,
    private soundsService: SoundsService,
    private notificationService: NotificationService
  ) {
  }
}

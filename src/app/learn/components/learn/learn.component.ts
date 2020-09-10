import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SoundsService } from '@learn/services/sounds.service';

import { SharedFacade } from '@shared/+state/shared.facade';
import { AuthFacade } from '@auth/+state/auth.facade';
import { LearnFacade } from '../../+state/learn.facade';

import { IField } from '@shared/models/field.model';
import { IWord } from '@api/models/word.model';
import { IAuthSettings } from '@api/models/user-data.model';

import { LearnStatus, LearnMode } from '../../+state/learn.reducer';
import { learnFields } from './learn.form-fields';
import { ColorTypes } from '@shared/enums/color-types';

import { FormComponent } from '@shared/components/form/form.component';


@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearnComponent implements OnInit, OnDestroy {
  mode$: Observable<LearnMode>;
  status$: Observable<LearnStatus>;
  isSoundsMuted$: Observable<boolean>;
  currentWord$: Observable<IWord>;
  words$: Observable<IWord[]>;
  correctlyTranslatedWords$: Observable<IWord[]>;
  incorrectlyTranslatedWords$: Observable<IWord[]>;

  settings$: Observable<IAuthSettings>;

  readonly fields: IField[] = learnFields;
  readonly learnStatus = LearnStatus;
  readonly learnMode = LearnMode;
  readonly colorTypes = ColorTypes;

  constructor(
    private router: Router,
    private sharedFacade: SharedFacade,
    private authFacade: AuthFacade,
    private learnFacade: LearnFacade,
    private soundsService: SoundsService
  ) {
  }

  ngOnInit(): void {
    this.mode$ = this.learnFacade.mode$;
    this.status$ = this.learnFacade.status$;
    this.isSoundsMuted$ = this.learnFacade.isSoundsMuted$
      .pipe(tap((state: boolean) => this.soundsService.muteSounds(state)));
    this.currentWord$ = this.learnFacade.currentWord$;
    this.words$ = this.learnFacade.words$;
    this.correctlyTranslatedWords$ = this.learnFacade.correctlyTranslatedWords$;
    this.incorrectlyTranslatedWords$ = this.learnFacade.incorrectlyTranslatedWords$;

    this.settings$ = this.authFacade.settings$;
  }

  ngOnDestroy(): void {
    this.soundsService.stopPendingSound();
  }

  muteSounds(state: boolean): void {
    this.learnFacade.muteSounds(state);
  }

  private clearForm(form: FormComponent): void {
    setTimeout(() => {
      form.form.reset();
      this.sharedFacade.resetFormData();
    }, 3000);
  }

  checkTranslate(form: FormComponent): void {
    this.clearForm(form);
    this.learnFacade.checkTranslate();
  }

  skipCurrentWord(form: FormComponent): void {
    this.clearForm(form);
    this.learnFacade.skipCurrentWord();
  }

  endLearning(form: FormComponent): void {
    this.clearForm(form);
    this.router.navigate(['/learn', 'result']);
  }
}

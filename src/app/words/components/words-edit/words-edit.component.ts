import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { SharedFacade } from '@shared/+state/shared.facade';
import { WordsFacade } from '../../+state/words.facade';

import { IWord } from '@api/models/word.model';
import { IField } from '@shared/models/field.model';

import { ColorTypes } from '@shared/enums/color-types';

import { editWordFields } from './words-edit.form-fields';

import { wordTranslationToFormAdapter } from '@words/utils/word-form-adapter';


@Component({
  selector: 'app-words-edit',
  templateUrl: './words-edit.component.html',
  styleUrls: ['./words-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsEditComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  data$: Observable<IWord>;

  readonly fields: IField[] = editWordFields;
  readonly colorTypes = ColorTypes;

  constructor(
    private router: Router,
    private sharedFacade: SharedFacade,
    private wordsFacade: WordsFacade
  ) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.wordsFacade.isLoading$;

    const editingWord: IWord = window.history.state.data;
    if (!editingWord) {
      this.router.navigate(['/words']);
    }

    this.data$ = of(wordTranslationToFormAdapter(editingWord));

    // this.data$ = this.activatedRoute.paramMap.pipe(map(() => wordTranslationToFormAdapter(window.history.state.data)));
  }

  ngOnDestroy(): void {
    this.sharedFacade.resetFormData();
  }

  editWord(): void {
    this.wordsFacade.editWord();
  }
}

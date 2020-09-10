import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { SharedFacade } from '@shared/+state/shared.facade';
import { WordsFacade } from '../../+state/words.facade';

import { IField } from '@shared/models/field.model';

import { ColorTypes } from '@shared/enums/color-types';

import { addWordFields } from './words-add.form-fields';


@Component({
  selector: 'app-words-add',
  templateUrl: './words-add.component.html',
  styleUrls: ['./words-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsAddComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;

  readonly fields: IField[] = addWordFields;
  readonly colorTypes = ColorTypes;

  constructor(private sharedFacade: SharedFacade, private wordsFacade: WordsFacade) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.wordsFacade.isLoading$;
  }

  ngOnDestroy(): void {
    this.sharedFacade.resetFormData();
  }

  addWord(): void {
    this.wordsFacade.addWord();
  }
}

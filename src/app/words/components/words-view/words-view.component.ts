import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { WordsFacade } from '../../+state/words.facade';

import { IWord } from '@api/models/word.model';

import { ColorTypes } from '@shared/enums/color-types';


@Component({
  selector: 'app-words-view',
  templateUrl: './words-view.component.html',
  styleUrls: ['./words-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsViewComponent implements OnInit {
  isLoading$: Observable<boolean>;
  newWords$: Observable<IWord[]>;
  completedWords$: Observable<IWord[]>;

  readonly colorTypes = ColorTypes;
  searchedValue: string = '';

  constructor(private router: Router, private wordsFacade: WordsFacade) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.wordsFacade.isLoading$;
    this.newWords$ = this.wordsFacade.newWords$;
    this.completedWords$ = this.wordsFacade.completedWords$;

    this.wordsFacade.getWords();
  }

  newWordsTrackByFn(index: number, item: IWord): IWord {
    return item;
  }

  completedWordsTrackByFn(index: number, item: IWord): IWord {
    return item;
  }

  setSearchedValue(value: string): void {
    this.searchedValue = value;
  }

  addWord(): void {
    this.router.navigateByUrl('/words/add');
  }

  editWord(word: IWord): void {
    this.router.navigateByUrl('/words/edit', { state: { data: word } });
  }

  openDeleteWordDialog(wordId: string): void {
    this.wordsFacade.openDeleteWordDialog(wordId);
  }

  openCompleteWordDialog(wordId: string): void {
    this.wordsFacade.openCompleteWordDialog(wordId);
  }

  openReturnWordDialog(wordId: string): void {
    this.wordsFacade.openReturnWordDialog(wordId);
  }
}

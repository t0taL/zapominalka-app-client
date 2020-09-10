import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LearnFacade } from '@learn/+state/learn.facade';

import { IWord } from '@api/models/word.model';

import { LearnMode } from '@learn/+state/learn.reducer';
import { ColorTypes } from '@shared/enums/color-types';


@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartMenuComponent implements OnInit {
  isLoading$: Observable<boolean>;
  wordsCount$: Observable<number>;

  readonly colorTypes = ColorTypes;

  constructor(private learnFacade: LearnFacade) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.learnFacade.isLoading$;
    this.wordsCount$ = this.learnFacade.words$.pipe(map((words: IWord[]) => words.length));

    this.learnFacade.startLearning();
  }

  startSimpleLearning(): void {
    this.learnFacade.setLearningMode(LearnMode.SIMPLE);
  }

  startTimingLearning(): void {
    this.learnFacade.setLearningMode(LearnMode.TIMING);
  }
}

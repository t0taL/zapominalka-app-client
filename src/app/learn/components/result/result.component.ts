import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { SoundsService } from '@learn/services/sounds.service';

import { LearnFacade } from '../../+state/learn.facade';

import { IWord } from '@api/models/word.model';

import { ColorTypes } from '@shared/enums/color-types';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent implements OnInit, OnDestroy {
  correctlyTranslatedWords$: Observable<IWord[]>;
  incorrectlyTranslatedWords$: Observable<IWord[]>;

  readonly colorTypes = ColorTypes;

  constructor(private learnFacade: LearnFacade, private soundsService: SoundsService) {
  }

  ngOnInit(): void {
    this.correctlyTranslatedWords$ = this.learnFacade.correctlyTranslatedWords$;
    this.incorrectlyTranslatedWords$ = this.learnFacade.incorrectlyTranslatedWords$;

    this.soundsService.playEndLearnSound();
  }

  ngOnDestroy(): void {
    this.learnFacade.endLearning();
  }
}

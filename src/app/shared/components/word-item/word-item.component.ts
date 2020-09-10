import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { IWord } from '@api/models/word.model';

import { wordItemAnimation } from '@shared/animations/word-animation';


@Component({
  selector: 'app-word-item',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.scss'],
  animations: [ wordItemAnimation ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordItemComponent implements OnInit {
  @Input() word: IWord;
  @Input() completeButton: boolean;
  @Input() returnButton: boolean;
  @Input() withoutActions: boolean;
  @Output() wordEditEvent: EventEmitter<IWord> = new EventEmitter<IWord>();
  @Output() wordDeleteEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() wordCompleteEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() wordReturnEvent: EventEmitter<string> = new EventEmitter<string>();

  isExtContentOpened: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleExtContentState(): void {
    this.isExtContentOpened = !this.isExtContentOpened;
  }

  editWord(): void {
    this.wordEditEvent.emit(this.word);
  }

  deleteWord(): void {
    this.wordDeleteEvent.emit(this.word._id);
  }

  completeWord(): void {
    this.wordCompleteEvent.emit(this.word._id);
  }

  returnWord(): void {
    this.wordReturnEvent.emit(this.word._id);
  }
}

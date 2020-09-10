import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil, repeatWhen, map } from 'rxjs/operators';

import { LearnStatus } from '@learn/+state/learn.reducer';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() status$: Observable<LearnStatus>;
  @Input() timerCount: number;
  @Output() timerStopEvent: EventEmitter<void> = new EventEmitter<void>();

  timer$: Observable<any>;

  private readonly stopTimer$: Subject<void> = new Subject<void>();
  private readonly startTimer$: Subject<void> = new Subject<void>();
  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor() {
  }

  ngOnInit(): void {
    this.timer$ = timer(0, 1500)
      .pipe(
        takeUntil(this.stopTimer$),
        repeatWhen(() => this.startTimer$),
        map((timerValue: number) => {
          if (timerValue >= this.timerCount) {
            this.stopTimer(true);
          }
          return this.timerCount - timerValue;
        })
      );

    this.status$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((learnStatus: LearnStatus) => {
        switch (learnStatus) {
          case LearnStatus.PENDING:
            this.startTimer();
            break;
          case LearnStatus.SUCCESS:
          case LearnStatus.FAIL: {
            this.stopTimer(false);
            break;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private stopTimer(withOutputEmit: boolean): void {
    this.stopTimer$.next();

    if (withOutputEmit) {
      this.timerStopEvent.emit();
    }
  }

  private startTimer(): void {
    this.startTimer$.next();
  }
}

import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearcherComponent implements OnInit, OnDestroy {
  @ViewChild('input') inputElement: ElementRef;
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  private readonly debounce$: Subject<string> = new Subject<string>();
  private readonly unsubscribe$: Subject<void> = new Subject<void>();

  constructor() {
  }

  ngOnInit(): void {
    this.debounce$
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value: string) => this.searchEvent.emit(value));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  search(): void {
    this.debounce$.next(this.inputElement.nativeElement.value);
  }

  clear(): void {
    this.inputElement.nativeElement.value = '';
    this.inputElement.nativeElement.blur();
    this.debounce$.next(this.inputElement.nativeElement.value);
  }
}

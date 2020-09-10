import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  Input
} from '@angular/core';


@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayoutComponent implements OnInit, AfterViewInit {
  @Input() isLoading: boolean = false;
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('pageLayout') pageLayout: ElementRef;

  private wrapperHeight: number;
  private pageLayoutHeight: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.resize();
  }

  @HostListener('window:resize')
  resize(): void {
    if (this.pageLayout) {
      this.wrapperHeight = this.wrapper.nativeElement.offsetHeight;
      this.pageLayoutHeight = this.pageLayout.nativeElement.offsetHeight;
    }

    if (this.pageLayoutHeight >= this.wrapperHeight) {
      this.wrapper.nativeElement.style.alignItems = 'flex-start';
    } else {
      this.wrapper.nativeElement.style.alignItems = 'center';
    }
  }
}

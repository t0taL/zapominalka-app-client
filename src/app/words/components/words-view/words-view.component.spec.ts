import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsViewComponent } from './words-view.component';

describe('WordsViewComponent', () => {
  let component: WordsViewComponent;
  let fixture: ComponentFixture<WordsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

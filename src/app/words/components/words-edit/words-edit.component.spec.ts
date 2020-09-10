import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsEditComponent } from './words-edit.component';

describe('WordsEditComponent', () => {
  let component: WordsEditComponent;
  let fixture: ComponentFixture<WordsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

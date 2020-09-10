import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsAddComponent } from './words-add.component';

describe('WordsAddComponent', () => {
  let component: WordsAddComponent;
  let fixture: ComponentFixture<WordsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

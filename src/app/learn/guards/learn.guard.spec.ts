import { TestBed } from '@angular/core/testing';

import { LearnGuard } from './learn.guard';

describe('LearnGuard', () => {
  let guard: LearnGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LearnGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

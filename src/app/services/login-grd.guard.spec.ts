import { TestBed } from '@angular/core/testing';

import { LoginGrdGuard } from './login-grd.guard';

describe('LoginGrdGuard', () => {
  let guard: LoginGrdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginGrdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

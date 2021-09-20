import { TestBed } from '@angular/core/testing';

import { AltoTokenInterceptor } from './alto-token.interceptor';

describe('AltoTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AltoTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AltoTokenInterceptor = TestBed.inject(AltoTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

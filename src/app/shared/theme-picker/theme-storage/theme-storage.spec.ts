/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThemeStorage } from './theme-storage';

describe('Service: ThemeStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeStorage]
    });
  });

  it('should ...', inject([ThemeStorage], (service: ThemeStorage) => {
    expect(service).toBeTruthy();
  }));
});

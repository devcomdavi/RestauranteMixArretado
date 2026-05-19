import { TestBed } from '@angular/core/testing';

import { MixDatabase } from './mix-database';

describe('MixDatabase', () => {
  let service: MixDatabase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MixDatabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

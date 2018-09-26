/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewService } from './new.service';

describe('Service: New', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewService]
    });
  });

  it('should ...', inject([NewService], (service: NewService) => {
    expect(service).toBeTruthy();
  }));
});

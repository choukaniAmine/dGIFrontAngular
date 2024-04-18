/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContribuableServiceService } from './ContribuableService.service';

describe('Service: ContribuableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContribuableServiceService]
    });
  });

  it('should ...', inject([ContribuableServiceService], (service: ContribuableServiceService) => {
    expect(service).toBeTruthy();
  }));
});

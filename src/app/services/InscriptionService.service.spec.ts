/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InscriptionServiceService } from './InscriptionService.service';

describe('Service: InscriptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InscriptionServiceService]
    });
  });

  it('should ...', inject([InscriptionServiceService], (service: InscriptionServiceService) => {
    expect(service).toBeTruthy();
  }));
});

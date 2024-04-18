/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormeJuridiqueServiceService } from './FormeJuridiqueService.service';

describe('Service: FormeJuridiqueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormeJuridiqueServiceService]
    });
  });

  it('should ...', inject([FormeJuridiqueServiceService], (service: FormeJuridiqueServiceService) => {
    expect(service).toBeTruthy();
  }));
});

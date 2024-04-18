/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaysServiceService } from './PaysService.service';

describe('Service: PaysService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaysServiceService]
    });
  });

  it('should ...', inject([PaysServiceService], (service: PaysServiceService) => {
    expect(service).toBeTruthy();
  }));
});

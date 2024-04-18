/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActiviteServiceService } from './ActiviteService.service';

describe('Service: ActiviteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiviteServiceService]
    });
  });

  it('should ...', inject([ActiviteServiceService], (service: ActiviteServiceService) => {
    expect(service).toBeTruthy();
  }));
});

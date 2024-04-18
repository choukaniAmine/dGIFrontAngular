/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StorageServiceService } from './StorageService.service';

describe('Service: StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageServiceService]
    });
  });

  it('should ...', inject([StorageServiceService], (service: StorageServiceService) => {
    expect(service).toBeTruthy();
  }));
});

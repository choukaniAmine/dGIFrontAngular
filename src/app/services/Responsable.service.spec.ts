/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResponsableService } from './Responsable.service';

describe('Service: Responsable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResponsableService]
    });
  });

  it('should ...', inject([ResponsableService], (service: ResponsableService) => {
    expect(service).toBeTruthy();
  }));
});

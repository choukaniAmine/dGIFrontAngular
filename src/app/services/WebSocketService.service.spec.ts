/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebSocketServiceService } from './WebSocketService.service';

describe('Service: WebSocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebSocketServiceService]
    });
  });

  it('should ...', inject([WebSocketServiceService], (service: WebSocketServiceService) => {
    expect(service).toBeTruthy();
  }));
});

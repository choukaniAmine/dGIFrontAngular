/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PayementFailedComponent } from './PayementFailed.component';

describe('PayementFailedComponent', () => {
  let component: PayementFailedComponent;
  let fixture: ComponentFixture<PayementFailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayementFailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayementFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LesObligationsComponent } from './LesObligations.component';

describe('LesObligationsComponent', () => {
  let component: LesObligationsComponent;
  let fixture: ComponentFixture<LesObligationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesObligationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesObligationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

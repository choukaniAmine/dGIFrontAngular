/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LesImpotsComponent } from './LesImpots.component';

describe('LesImpotsComponent', () => {
  let component: LesImpotsComponent;
  let fixture: ComponentFixture<LesImpotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesImpotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesImpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

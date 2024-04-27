/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LesComptesComponent } from './LesComptes.component';

describe('LesComptesComponent', () => {
  let component: LesComptesComponent;
  let fixture: ComponentFixture<LesComptesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesComptesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

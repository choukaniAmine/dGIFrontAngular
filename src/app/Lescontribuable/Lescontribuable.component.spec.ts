/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LescontribuableComponent } from './Lescontribuable.component';

describe('LescontribuableComponent', () => {
  let component: LescontribuableComponent;
  let fixture: ComponentFixture<LescontribuableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LescontribuableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LescontribuableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

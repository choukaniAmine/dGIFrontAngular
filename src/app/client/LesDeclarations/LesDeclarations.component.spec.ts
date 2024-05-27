/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LesDeclarationsComponent } from './LesDeclarations.component';

describe('LesDeclarationsComponent', () => {
  let component: LesDeclarationsComponent;
  let fixture: ComponentFixture<LesDeclarationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesDeclarationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesDeclarationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

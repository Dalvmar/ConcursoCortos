/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FechasPasosComponent } from './fechas-pasos.component';

describe('FechasPasosComponent', () => {
  let component: FechasPasosComponent;
  let fixture: ComponentFixture<FechasPasosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechasPasosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FechasPasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

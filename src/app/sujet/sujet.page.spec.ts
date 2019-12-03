import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetPage } from './sujet.page';

describe('SujetPage', () => {
  let component: SujetPage;
  let fixture: ComponentFixture<SujetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SujetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SujetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

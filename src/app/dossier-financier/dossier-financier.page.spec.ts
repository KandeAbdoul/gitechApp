import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierFinancierPage } from './dossier-financier.page';

describe('DossierFinancierPage', () => {
  let component: DossierFinancierPage;
  let fixture: ComponentFixture<DossierFinancierPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierFinancierPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierFinancierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumsPage } from './forums.page';

describe('ForumsPage', () => {
  let component: ForumsPage;
  let fixture: ComponentFixture<ForumsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

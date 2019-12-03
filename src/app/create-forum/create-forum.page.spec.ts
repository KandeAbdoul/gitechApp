import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateForumPage } from './create-forum.page';

describe('CreateForumPage', () => {
  let component: CreateForumPage;
  let fixture: ComponentFixture<CreateForumPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateForumPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateForumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

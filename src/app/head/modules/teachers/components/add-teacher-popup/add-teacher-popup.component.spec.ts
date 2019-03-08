import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherPopupComponent } from './add-teacher-popup.component';

describe('CreateTeacherPopupComponent', () => {
  let component: AddTeacherPopupComponent;
  let fixture: ComponentFixture<AddTeacherPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeacherPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeacherPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeacherPopupComponent } from './edit-teacher-popup.component';

describe('EditTeacherPopupComponent', () => {
  let component: EditTeacherPopupComponent;
  let fixture: ComponentFixture<EditTeacherPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTeacherPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeacherPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

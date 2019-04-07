import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoursePopupComponent } from './edit-course-popup.component';

describe('EditCoursePopupComponent', () => {
  let component: EditCoursePopupComponent;
  let fixture: ComponentFixture<EditCoursePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCoursePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCoursePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

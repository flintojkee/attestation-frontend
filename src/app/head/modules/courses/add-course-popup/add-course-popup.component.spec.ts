import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoursePopupComponent } from './add-course-popup.component';

describe('AddCoursePopupComponent', () => {
  let component: AddCoursePopupComponent;
  let fixture: ComponentFixture<AddCoursePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoursePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoursePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

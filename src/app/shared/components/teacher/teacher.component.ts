import { Component, OnInit, OnDestroy } from '@angular/core';
import { Teacher } from '@atestattion/shared/models/teacher';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddCoursePopupComponent } from '@atestattion/head/modules/courses/add-course-popup/add-course-popup.component';
import { EditCoursePopupComponent } from '@atestattion/head/modules/courses/edit-course-popup/edit-course-popup.component';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.sass']
})
export class TeacherComponent implements OnInit, OnDestroy {

  teacher: Teacher;
  subjects: string;
  departments: string[];
  departmentsStr: string;
  private alive: boolean;

  constructor(
    private route: ActivatedRoute,
    public popup: MatDialog,
  ) { }

  ngOnInit() {
    this.alive = true;
    this.route.data
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe((data: { teacher: Teacher }) => {
        this.teacher = data.teacher;
        console.log(this.teacher);
        this.departments = Array.from(new Set(this.teacher.subjects.map(sub => sub.department)));
        this.departmentsStr = this.departments.join(', ');
        this.subjects = this.teacher.subjects.map(subject => subject.subject_name).join(', ');
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  openAddCoursesPopup(): void {
    const popupConfig = new MatDialogConfig();

    popupConfig.disableClose = true;
    popupConfig.data = { personnel_number: this.teacher.personnel_number };
    this.popup.open(AddCoursePopupComponent, popupConfig);
  }

  openEditCoursesPopup(): void {
    const popupConfig = new MatDialogConfig();

    popupConfig.disableClose = true;
    popupConfig.data = {
      personnel_number: this.teacher.personnel_number,
      course: {
        referral_number: this.teacher.referral_number,
        proff_course_start_date: this.teacher.proff_course_start_date,
        proff_course_end_date: this.teacher.proff_course_end_date,
        sertificate: this.teacher.sertificate,
        selective_courses: this.teacher.selective_courses
      }
     };
    this.popup.open(EditCoursePopupComponent, popupConfig);
  }

}


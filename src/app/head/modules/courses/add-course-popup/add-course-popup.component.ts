import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeadService } from '@atestattion/head/shared/head.service';
import { Course } from '@atestattion/shared/models/course';

@Component({
  selector: 'app-add-course-popup',
  templateUrl: './add-course-popup.component.html',
  styleUrls: ['./add-course-popup.component.sass']
})
export class AddCoursePopupComponent implements OnInit {
  courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddCoursePopupComponent>,
    private headService: HeadService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.courseForm = this.formBuilder.group({
      referral_number: ['', Validators.required],
      proff_course_start_date: ['', Validators.required],
      proff_course_end_date: ['', Validators.required],
      date_of_course1: ['', Validators.required],
      date_of_course2: ['', Validators.required],
      date_of_course3: ['', Validators.required],
      date_of_course4: ['', Validators.required],
      date_of_course5: ['', Validators.required],
  });
  }

  saveCourse() {
    if (this.courseForm.invalid) {
      return;
    }
    this.dialogRef.close();
    const  course: Course = {
      referral_number: this.courseForm.controls.referral_number.value,
      proff_course_start_date: this.courseForm.controls.proff_course_start_date.value,
      proff_course_end_date: this.courseForm.controls.proff_course_end_date.value,
      sertificate: false,
      personnel_number: this.data.personnel_number,
      selective_courses: [
        {date_of_course: this.courseForm.controls.date_of_course1.value},
        {date_of_course: this.courseForm.controls.date_of_course2.value},
        {date_of_course:  this.courseForm.controls.date_of_course3.value},
        {date_of_course: this.courseForm.controls.date_of_course4.value},
        {date_of_course: this.courseForm.controls.date_of_course5.value}
      ]
    };
    this.headService.saveCourse(course).subscribe(res => {
      console.log(res);
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}

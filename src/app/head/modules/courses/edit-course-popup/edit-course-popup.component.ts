import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeadService } from '@atestattion/head/shared/head.service';
import { Course } from '@atestattion/shared/models/course';

@Component({
  selector: 'app-edit-course-popup',
  templateUrl: './edit-course-popup.component.html',
  styleUrls: ['./edit-course-popup.component.sass']
})
export class EditCoursePopupComponent implements OnInit {
  courseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditCoursePopupComponent>,
    private headService: HeadService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    console.log(this.data);
    this.initForm();
  }
  initForm() {
    this.courseForm = this.formBuilder.group({
      referral_number: [
        {
          value: this.data.course.referral_number,
          disabled: this.data.course.sertificate
        },
        Validators.required
      ],
      proff_course_start_date: [
        {
          value: this.data.course.proff_course_start_date,
          disabled: this.data.course.sertificate
        },
         Validators.required
      ],
      proff_course_end_date: [
        {
          value: this.data.course.proff_course_end_date,
          disabled: this.data.course.sertificate
        },
         Validators.required
      ],
      date_of_course1: [
        {
          value: this.data.course.selective_courses[0].date_of_course,
          disabled: this.data.course.sertificate
        },
         Validators.required
      ],
      date_of_course2: [
        {
          value: this.data.course.selective_courses[1].date_of_course,
          disabled: this.data.course.sertificate
        },
        Validators.required
      ],
      date_of_course3: [
        {
          value: this.data.course.selective_courses[2].date_of_course,
          disabled: this.data.course.sertificate
        },
        Validators.required
      ],
      date_of_course4: [
        {
          value: this.data.course.selective_courses[3].date_of_course,
          disabled: this.data.course.sertificate
        },
        Validators.required
      ],
      date_of_course5: [
        {
          value: this.data.course.selective_courses[4].date_of_course,
          disabled: this.data.course.sertificate
        },
         Validators.required
        ],
    });
  }

  updateCourse() {
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
        {
          date_of_course: this.courseForm.controls.date_of_course1.value,
          date_of_course_id: this.data.course.selective_courses[0].date_of_course_id
        },
        {
          date_of_course: this.courseForm.controls.date_of_course2.value,
          date_of_course_id: this.data.course.selective_courses[1].date_of_course_id
        },
        {
          date_of_course:  this.courseForm.controls.date_of_course3.value,
          date_of_course_id: this.data.course.selective_courses[2].date_of_course_id
        },
        {
          date_of_course: this.courseForm.controls.date_of_course4.value,
          date_of_course_id: this.data.course.selective_courses[3].date_of_course_id
        },
        {
          date_of_course: this.courseForm.controls.date_of_course5.value,
          date_of_course_id: this.data.course.selective_courses[4].date_of_course_id
        }
      ]
    };
    console.log(course);
    this.headService.updateCourse(course, course.referral_number).subscribe(res => {
      console.log(res);
    });
  }
  sertificateCourse() {
    if (this.courseForm.invalid) {
      return;
    }
    if (!this.canBeSertificated()) {
      alert('Не можна сертифікувати курс до завершення фахового курсу і усіх вибіркових');
      return;
    }
    this.dialogRef.close();
    const  course: Course = {
      referral_number: this.courseForm.controls.referral_number.value,
      proff_course_start_date: this.courseForm.controls.proff_course_start_date.value,
      proff_course_end_date: this.courseForm.controls.proff_course_end_date.value,
      sertificate: true,
      personnel_number: this.data.personnel_number,
      selective_courses: [
        {
          date_of_course: this.courseForm.controls.date_of_course1.value,
          date_of_course_id: this.data.course.selective_courses[0].date_of_course_id
        },
        {
          date_of_course: this.courseForm.controls.date_of_course2.value,
          date_of_course_id: this.data.course.selective_courses[1].date_of_course_id
        },
        {
          date_of_course:  this.courseForm.controls.date_of_course3.value,
          date_of_course_id: this.data.course.selective_courses[2].date_of_course_id
        },
        {
          date_of_course: this.courseForm.controls.date_of_course4.value,
          date_of_course_id: this.data.course.selective_courses[3].date_of_course_id
        },
        {
          date_of_course: this.courseForm.controls.date_of_course5.value,
          date_of_course_id: this.data.course.selective_courses[4].date_of_course_id
        }
      ]
    };
    this.headService.updateCourse(course, course.referral_number).subscribe(res => {
      console.log(res);
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  canBeSertificated(): boolean {
    const today = new Date().getTime();
    const dates = [];
    dates.push(new Date(this.data.course.proff_course_end_date).getTime());
    this.data.course.selective_courses.forEach(element => {
      dates.push(new Date(element.date_of_course).getTime());
    });
    return dates.filter(date => today < date).length ? true : false;
  }

}

import { Component, OnInit } from '@angular/core';
import { HeadService } from '@atestattion/head/shared/head.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-head-home',
  templateUrl: './head-home.component.html',
  styleUrls: ['./head-home.component.sass']
})
export class HeadHomeComponent implements OnInit {

  teacherForm: FormGroup;
  toggleValue: string;

  constructor(
      private headService: HeadService,
      private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.teacherForm = this.formBuilder.group({
        teacherId: ['', Validators.required],
        lastName: ['', Validators.required]
    });
  }

  get f() { return this.teacherForm.controls; }

  createTeacher() {
    const teacher = {
      teacher_id: this.f.teacherId.value,
      last_name: this.f.lastName.value
    };
    this.headService.createTeacher(teacher);
  }

}

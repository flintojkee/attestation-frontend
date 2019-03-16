import { Component, OnInit, OnDestroy } from '@angular/core';
import { Teacher } from '@atestattion/shared/models/teacher';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

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
  ) { }

  ngOnInit() {
    this.alive = true;
    this.route.data
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe((data: { teacher: Teacher }) => {
        this.teacher = data.teacher;
        this.departments = Array.from(new Set(this.teacher.subjects.map(sub => sub.department)));
        this.departmentsStr = this.departments.join(', ');
        this.subjects = this.teacher.subjects.map(subject => subject.subject_name).join(', ');
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}

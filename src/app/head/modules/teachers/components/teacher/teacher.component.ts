import { Component, OnInit, OnDestroy } from '@angular/core';
import { Teacher } from '@atestattion/head/shared/teacher';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.sass']
})
export class TeacherComponent implements OnInit, OnDestroy {

  teacher: Teacher;
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
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HeadService } from '@atestattion/head/shared/head.service';
import { Teacher } from '@atestattion/shared/models/teacher';
import { TeacherService } from './teacher.service';

@Injectable()
export class TeacherProfileResolver implements Resolve<Teacher> {
  constructor(
    private teacherService: TeacherService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot
  ) {
    return this.teacherService.getTeacherProfile()
      .pipe( map(teacher => {
        this.teacherService.setTeacher(teacher);
        return teacher;
      })
      // catchError((err) => {
      //   console.log(err);
      //   this.router.navigate(['']);
      //   return of(err);
      // })
    );
  }
}

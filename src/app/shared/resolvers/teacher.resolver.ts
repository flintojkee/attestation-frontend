import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { Teacher } from '../models/teacher';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HeadService } from '@atestattion/head/shared/head.service';

@Injectable()
export class TeacherResolver implements Resolve<Teacher> {
  constructor(
    private headService: HeadService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot
  ) {
    const teacherId: number = route.params['id'];
    return this.headService.getTeacherById(teacherId)
      .pipe(
      catchError((err) => {
        this.router.navigate(['']);
        return of(err);
      })
    );
  }
}

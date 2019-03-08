import { Injectable } from '@angular/core';

import { URL_CONFIG } from '@atestattion/config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Teacher } from './teacher';
@Injectable()
export class HeadService {

  constructor(private http: HttpClient) { }
  private teacherUrl = URL_CONFIG.teacherUrl;

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<any>(this.teacherUrl, JSON.stringify(teacher));
  }
  getAllTeachers(): Observable<Array<Teacher>> {
    return this.http.get<Array<Teacher>>(this.teacherUrl + 's');
  }

}

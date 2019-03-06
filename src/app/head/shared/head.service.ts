import { Injectable } from '@angular/core';

import { URL_CONFIG } from '@atestattion/config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class HeadService {

  constructor(private http: HttpClient) { }
  private teacherUrl = URL_CONFIG.teacherUrl;

  createTeacher(teacher): Observable<any> {
    return this.http.post(this.teacherUrl, JSON.stringify(teacher));
  }
  getAllTeachers(): Observable<any> {
    return this.http.get<any>(this.teacherUrl + 's');
  }

}

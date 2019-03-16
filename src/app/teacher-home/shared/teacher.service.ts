import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_CONFIG } from '@atestattion/config/config';
import { Teacher } from '@atestattion/shared/models/teacher';
import { Observable } from 'rxjs';

@Injectable()
export class TeacherService {

  constructor(private http: HttpClient) { }

  private teacherProfileUrl = URL_CONFIG.teacherProfileUrl;
  private headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  getTeacher(): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.teacherProfileUrl}`);
  }
}

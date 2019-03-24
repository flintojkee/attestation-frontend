import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_CONFIG } from '@atestattion/config/config';
import { Teacher } from '@atestattion/shared/models/teacher';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private currentTeacherSubject: BehaviorSubject<Teacher>;
  public currentTeacher: Observable<Teacher>;


  constructor(private http: HttpClient) {
   }

  private teacherProfileUrl = URL_CONFIG.teacherProfileUrl;
  private headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  getTeacherProfile(): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.teacherProfileUrl}`).pipe(map (teacher => {
      if (this.currentTeacherSubject) {
        this.currentTeacherSubject.next(teacher);
      }
      return teacher;
    }));
  }
  public setTeacher(teacher: Teacher) {
    if (this.currentTeacherSubject) {
      this.currentTeacherSubject.next(teacher);
    } else {
      this.currentTeacherSubject = new BehaviorSubject<Teacher>(teacher);
      this.currentTeacher = this.currentTeacherSubject.asObservable();
    }
  }
}

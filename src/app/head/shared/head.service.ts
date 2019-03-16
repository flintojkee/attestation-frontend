import { Injectable } from '@angular/core';

import { URL_CONFIG } from '@atestattion/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Teacher, TeacherFilters, Category, Rank } from '../../shared/models/teacher';
import { BehaviorSubject, of } from 'rxjs';
import { Subject } from '@atestattion/shared/models/subject';
@Injectable()
export class HeadService {

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }
  private teachers$: BehaviorSubject<Array<Teacher>> = new BehaviorSubject(Array());
  public teachers: Observable<Array<Teacher>> = this.teachers$.asObservable();

  private teacherUrl = URL_CONFIG.teacherUrl;
  private subjectUrl = URL_CONFIG.subjectUrl;
  private teachersUrl = URL_CONFIG.teachersUrl;
  private headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  public get teachersValue() {
    return this.teachers;
  }

  private get teachers$Value() {
    return this.teachers$.value;
  }

  addTeacher(teacher: Teacher) {
    console.log(teacher);
    this.createTeacher(teacher).subscribe(res => {
     if (res.status === 201) {
        teacher.qualification_category = Category[teacher.qualification_category];
        teacher.rank = Rank[teacher.rank];
        this.teachers$Value.push(teacher);
        this.teachers$.next(this.teachers$Value);
     }
    });
  }
  editTeacher(teacher: Teacher, oldTeacher: Teacher) {
    this.updateTeacher(teacher).subscribe(res => {
      if (res.status === 200) {
        const index = this.teachers$Value.findIndex(el => el.personnel_number === oldTeacher.personnel_number);
        if (index > -1) {
          teacher.qualification_category = Category[teacher.qualification_category];
          teacher.rank = Rank[teacher.rank];
          this.teachers$Value[index] = teacher;
          this.teachers$.next(this.teachers$Value);
        }
      }
    });
  }
  // getLocalTeacherById(id: number): Teacher {
  //   return this.teachers$Value.filter(el => el.personnel_number === id)[0];
  // }

  removeTeacher(id: number) {
    this.deleteTeacher(id).subscribe(res => {
      if (res.status === 200) {
        this.teachers$.next(this.teachers$Value.filter(el => el.personnel_number !== id));
      }
    });
  }

  private createTeacher(teacher: Teacher): Observable<any> {
    return this.http.post<Teacher>(this.teacherUrl, JSON.stringify(teacher), {headers: this.headers, observe: 'response'});
  }
  private deleteTeacher(id: number) {
    return this.http.delete(`${this.teacherUrl}/${id}`, {headers: this.headers, observe: 'response'});
  }
  private updateTeacher(teacher: Teacher) {
    return this.http
    .put(
      `${this.teacherUrl}/${teacher.personnel_number}`,
      JSON.stringify(teacher),
      {headers: this.headers, observe: 'response'}
    );
  }
  getAllTeachers(): Observable<Array<Teacher>> {
    return this.http.get<Array<Teacher>>(this.teachersUrl);
  }
  getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.teacherUrl}/${id}`);
  }

  getAllSubjects(): Observable<Array<Subject>> {
    return this.http.get<Array<Subject>>(`${this.subjectUrl}`);
  }

  filterTeachers(filters: TeacherFilters) {
    const filterUrl = this.getFilterUrl(filters);
    this.http.get<Array<Teacher>>(filterUrl).subscribe(filteredTeachers => {
      console.log(filteredTeachers);
      this.teachers$.next(filteredTeachers);
    });
  }

  private getFilterUrl(teacherFilters: TeacherFilters) {
    let url = `${this.teachersUrl}/filtered?`;
    if (teacherFilters.qualification_category) {
      url += `&qualification_category=${teacherFilters.qualification_category}`;
    }
    if (teacherFilters.rank) {
      url += `&rank=${teacherFilters.rank}`;
    }
    if (teacherFilters.subject_name) {
      url += `&subject_name=${teacherFilters.subject_name}`;
    }

    return url;
  }

  private loadInitialData() {
    this.getAllTeachers().subscribe(data => {
      this.teachers$.next(data);
    });
  }

}

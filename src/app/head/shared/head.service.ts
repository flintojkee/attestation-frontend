import { Injectable } from '@angular/core';

import { URL_CONFIG } from '@atestattion/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Teacher, TeacherFilters, Category, Rank } from '../../shared/models/teacher';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { Subject as Subj } from '@atestattion/shared/models/subject';
import { ApplicationStatus } from '@atestattion/shared/models/application';
import { Attestation } from '@atestattion/shared/models/attestation';
import { MatSnackBar } from '@angular/material';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeadService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.loadInitialData();
  }
  private teachers$: BehaviorSubject<Array<Teacher>> = new BehaviorSubject(Array());
  public teachers: Observable<Array<Teacher>> = this.teachers$.asObservable();

  public extraApplications = new BehaviorSubject<Array<any>>(Array());
  public defermentApplications = new BehaviorSubject<Array<any>>(Array());

  private teacherUrl = URL_CONFIG.teacherUrl;
  private subjectUrl = URL_CONFIG.subjectUrl;
  private teachersUrl = URL_CONFIG.teachersUrl;
  private applicationUrl = URL_CONFIG.applicationUrl;
  private attestationUrl = URL_CONFIG.attestationUrl;
  private headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  openSnackBar(message: string, action: string, settings: any) {
    this.snackBar.open(message, action, settings);
  }

  public get teachersValue() {
    return this.teachers;
  }

  private get teachers$Value() {
    return this.teachers$.value;
  }

  addTeacher(teacher: Teacher) {
    console.log(teacher);
    this.createTeacher(teacher).subscribe(res => {
     if (res.status === 202 || res.status === 200 || res.status === 201) {
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
    return this.http.delete(`${this.teacherUrl}/${id}`, {headers: this.headers, observe: 'response'}).pipe(
      catchError(error => {
        if (error.status === 400) {
          this.openSnackBar('Не можна видалити вчителя, доки є його атестації', 'Ок', {
            duration: 100000,
            panelClass: 'error'
          });
        }
        return throwError(error);
      })
    );
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

  getAllSubjects(): Observable<Array<Subj>> {
    return this.http.get<Array<Subj>>(`${this.subjectUrl}`);
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

  getApplications(type: string, status?: string, personnel_number?: number): Observable<Array<any>> {
    let filterUrl = `${this.applicationUrl}/${type}?`;
    if (status) {
      filterUrl += `status=${status}`;
    }
    if (personnel_number) {
      filterUrl += `&personnel_number=${personnel_number}`;
    }
    return this.http.get<Array<any>>(filterUrl);
  }

  private loadInitialData() {
    this.getAllTeachers().subscribe(data => {
      this.teachers$.next(data);
    });
  }

  updateApplication(type: string, id: number, application: any) {
    return this.http.put(`${this.applicationUrl}/${type}/${id}`, JSON.stringify(application),
    {headers: this.headers, observe: 'response'});
  }

  saveAttestation(atestattion: Attestation): any {
    this.createAttestation(atestattion).subscribe(res => {
      if (res.status === 200) {
        const index = this.teachers$Value.findIndex(el => el.personnel_number === atestattion.personnel_number);
        if (index > -1) {
          this.teachers$Value[index].qualification_category = atestattion.on_category;
          this.teachers$Value[index].rank = atestattion.on_rank;
          this.teachers$.next(this.teachers$Value);
        }
      }
    });
  }

  private createAttestation(attestation: Attestation) {
    return this.http.post(this.attestationUrl, JSON.stringify(attestation), {headers: this.headers, observe: 'response'});
  }

  getAttestations(year?: number): Observable<Array<Attestation>> {
    const filter = year ? `?year=${year}` : '';
    return this.http.get<Array<Attestation>>(this.attestationUrl + filter);
  }

}

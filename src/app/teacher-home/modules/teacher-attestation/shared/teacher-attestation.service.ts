import { Injectable } from '@angular/core';
import { TeacherService } from '@atestattion/teacher-home/shared/teacher.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_CONFIG } from '@atestattion/config/config';
import { ExtraApplication } from '@atestattion/shared/models/extra-application';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class TeacherAttestationService {
  private applicationUrl = URL_CONFIG.applicationUrl;
  constructor(private http: HttpClient) { }
  private headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  addExtraApplication(extraApplication: ExtraApplication) {
    this.createExtraApplication(extraApplication).subscribe(data => {
      console.log(data);
    });
  }
  private createExtraApplication(extraApplication: ExtraApplication): Observable<any> {
// tslint:disable-next-line: max-line-length
    return this.http.post<any>(this.applicationUrl + '/extra', JSON.stringify(extraApplication), {headers: this.headers, observe: 'response'});
  }
}



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_CONFIG } from '@atestattion/config/config';
import { ExtraApplication } from '@atestattion/shared/models/extra-application';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefermentApplication } from '@atestattion/shared/models/deferment-application';


@Injectable({
  providedIn: 'root',
})
export class TeacherAttestationService {
  private applicationUrl = URL_CONFIG.applicationUrl;
  constructor(private http: HttpClient) { }
  private headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  addApplication(extraApplication: ExtraApplication | DefermentApplication, type: string) {
    this.createApplication(extraApplication, type).subscribe(data => {
      console.log(data);
    });
  }

  private createApplication(extraApplication: ExtraApplication | DefermentApplication, type: string): Observable<any> {
    return this.http.post<any>(this.applicationUrl + `/${type}`,
                               JSON.stringify(extraApplication),
                               {headers: this.headers, observe: 'response'});
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
}



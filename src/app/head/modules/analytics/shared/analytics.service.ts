import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_CONFIG } from '@atestattion/config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  private analyticsUrl = URL_CONFIG.analyticsUrl;
  private headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'});

  downloadExcel(): Observable<Blob> {
    return this.http.get(this.analyticsUrl + '/plan/download', { responseType: 'blob' });
  }
}

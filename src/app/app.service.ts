import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {
  }


  testRoute() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get('https://attestation-backend.herokuapp.com/api/ping', { headers});
  }

}

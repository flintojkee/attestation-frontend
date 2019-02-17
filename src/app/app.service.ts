import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {
  }

  testRoute() {
    return this.http.get('https://attestation-backend.herokuapp.com/api/ping');
  }

}

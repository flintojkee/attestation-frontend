import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string ): Observable<any> {
    return this.http.post<any>('/api/login', {email, password}).pipe(
      tap(res => this.setSession),
      shareReplay(1)
    );
  }

  private setSession(authResult) {
    // const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    // jlocalStorage.setItem("expires_at", JSON.stringify();
  }
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    // return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    // return !this.isLoggedIn();
  }

    // getExpiration() {
    //     const expiration = localStorage.getItem("expires_at");
    //     const expiresAt = JSON.parse(expiration);
    //     return moment(expiresAt);
    // }

  private handleError(error: Response): Observable<never> {
    console.error(error);
    return throwError(error);
  }
}

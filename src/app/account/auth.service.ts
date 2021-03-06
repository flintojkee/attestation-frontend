import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { URL_CONFIG } from '@atestattion/config/config';
import { User } from '@atestattion/shared/models/user';
import { MatSnackBar } from '@angular/material';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(login: string, password: string ): Observable<User> {
    return this.http.post<any>(URL_CONFIG.loginUrl, {login, password}).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
            // tore user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.openSnackBar('Вітаємо в системі атестації вчителів', 'Ок', {
              duration: 10000,
              panelClass: 'success'
            });
        }

        return user;
      }),
      catchError(error => this.handleError(error))
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

  private handleError(error: Response): Observable<never> {
    if (error.status === 401) {
      this.openSnackBar('Неправильний логін або пароль', 'Ок', {
        duration: 10000,
        panelClass: 'error'
      });
    }
    return throwError(error);
  }

  openSnackBar(message: string, action: string, settings: any) {
    this.snackBar.open(message, action, settings);
  }

}

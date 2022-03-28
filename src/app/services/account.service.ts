import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, shareReplay, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IUser } from '../model';
import { USER_DATA } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<IUser | null>;
  user$: Observable<IUser | null>;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<IUser | null>(JSON.parse(sessionStorage.getItem(USER_DATA)|| '{}'));
    this.user$ = this.userSubject.asObservable();
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user?.id));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
  }

  getUser() {
    return this.userSubject.value;
  }

  login(userId: string, password: string): Observable<IUser> {
    // const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post<IUser>("/api/login", { userId, password })
      .pipe(
        tap(user => {
          console.log(user);
          this.userSubject.next(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          window.sessionStorage.removeItem(USER_DATA);
          window.sessionStorage.setItem(USER_DATA, JSON.stringify(user));
        }),
        shareReplay({bufferSize: 1, refCount: true}),
        catchError(err => {
          console.log('login error... ', err);
          return throwError(() => new Error(err));
        })
      );
  }

  logout() {
    this.userSubject.next(null);
    window.sessionStorage.clear();
    
    this.router.navigate(['login']);
  }
}

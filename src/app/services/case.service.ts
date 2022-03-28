import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICase, IUser } from '../../app/model';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map, shareReplay, filter } from 'rxjs/operators';
import { retryWithDelay, USER_DATA } from '../../app/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private http: HttpClient) { }

  findAllCases(): Observable<ICase[]> {

    return this.http.get<ICase[]>('/api/cases', {})
    .pipe(
      filter(res => !!res),
      map(res => (res as any).cases),
      tap(cases => console.log('Getting cases(findAllCases): ', cases)),
      shareReplay({bufferSize: 1, refCount: true}),
      retryWithDelay(),
      catchError(err => {
        console.log('Getting cases(findAllCases) has error... ', err);
        return throwError(() => new Error(err));
      })
    );
  }

  findCaseById(id: number): Observable<ICase> {
    console.log("findCaseById:",id);
    return this.http.get<ICase>(`/api/case/${id}`)
    .pipe(
      tap(res => console.log('Case: ',res)),
      shareReplay({bufferSize: 1, refCount: true}),
      retryWithDelay(),
      catchError(err => {
        console.log('Getting Case Detail has error... ', err);
        return throwError(() => new Error(err));
      })
    );
  }

  saveCase(caseInstance: ICase) {
    console.log(caseInstance);
    return this.http.post<ICase>('/api/case', caseInstance)
    .pipe(      
      filter(res => !!res),
      tap(res => console.log('Saving case): ',res)),
      shareReplay({bufferSize: 1, refCount: true}),
      retryWithDelay(),
      catchError(err => {
        console.log('Saving case has error... ', err);
        return throwError(() => new Error(err));
      })
    );
  }
}

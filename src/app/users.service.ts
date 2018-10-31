import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { User } from './user';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/JSON;charset = UTF-8' })
};

class Response{
  data:any;
  status:Number;
  message:String;
}

@Injectable({
  providedIn: 'root',
})
export class userService {

  constructor(private http: HttpClient) { }

  private Url = 'http://localhost:3000/api/notes-de-frais/users';

  getusers(): Observable<User[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Response>(this.Url)
    .pipe(
      map(users => users.data.docs),
      catchError(this.handleError('getusers', []))
    );
  }

  getuser(id: string): Observable<User> {
    console.log(this.http.get<Response>(this.Url).pipe(
      map(users=> users.data.docs.find(user => {console.log(user._id);user._id == id;})),
      catchError(this.handleError<User>(`getusers id=${id}`))
  ));
    return this.http.get<Response>(this.Url).pipe(
      map(users=> users.data.docs.find(user => user._id === id)),
      catchError(this.handleError<User>(`getusers id=${id}`))
  );
  }

      /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    /** PUT: update the hero on the server */
  updateuser (user: User): Observable<any> {
    return this.http.put(this.Url, user, httpOptions).pipe(
      tap(_ => console.log(`updated user id=${user._id}`)),
      catchError(this.handleError<any>('updatenote'))
    );
  }

  /** POST: add a new hero to the server */
  adduser (user: User): Observable<User> {
    return this.http.post<User>(this.Url, user, httpOptions).pipe(
      tap((user: User) => console.log(`added user w/ id=${user._id}`)),
      catchError(this.handleError<User>('adduser'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteuser (user: User | string): Observable<User> {
    const id = typeof user === 'string' ? user : user._id;
    const url = `${this.Url}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteuser'))
    );
  }

  /* GET heroes whose name contains search term */
  searchuser(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.Url}/?nom=${term}`).pipe(
      tap(_ => console.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchuser', []))
    );
  }
}
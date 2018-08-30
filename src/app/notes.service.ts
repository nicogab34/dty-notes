import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Note } from './note_de_frais';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

class Response{
  data:any;
  status:Number;
  message:String;
}

@Injectable({
  providedIn: 'root',
})
export class noteService {

  constructor(private http: HttpClient) { }

  private notesUrl = 'http://localhost:3000/notes';

  getnotes(): Observable<Note[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Response>(this.notesUrl)
    .pipe(
      map(notes => notes.data.docs),
      catchError(this.handleError('getnotes', []))
    );
  }

  getnote(id: string): Observable<Note> {
    console.log(id)
    return this.http.get<Response>(this.notesUrl).pipe(
      map(notes=> {
        console.log(notes);
        const result = notes.data.docs.find(note => {console.log(note);return note._id == id});
        console.log(result);
        return result;
      }),
      catchError(this.handleError<Note>(`getnotes id=${id}`))
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
  updatenote (note: Note): Observable<any> {
    return this.http.put(this.notesUrl, note, httpOptions).pipe(
      tap(_ => console.log(`updated note id=${note.id}`)),
      catchError(this.handleError<any>('updatenote'))
    );
  }

  /** POST: add a new hero to the server */
  addnote (note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, httpOptions).pipe(
      tap((note: Note) => console.log(`added note w/ id=${note.id}`)),
      catchError(this.handleError<Note>('addnote'))
    );
  }

  /** DELETE: delete the hero from the server */
  deletenote (note: Note | number): Observable<Note> {
    const id = typeof note === 'number' ? note : note.id;
    const url = `${this.notesUrl}/${id}`;

    return this.http.delete<Note>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted note id=${id}`)),
      catchError(this.handleError<Note>('deletenote'))
    );
  }

  /* GET heroes whose name contains search term */
  searchnote(term: string): Observable<Note[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Note[]>(`${this.notesUrl}/?nom=${term}`).pipe(
      tap(_ => console.log(`found notes matching "${term}"`)),
      catchError(this.handleError<Note[]>('searchnote', []))
    );
  }
}
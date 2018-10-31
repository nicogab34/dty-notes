import { Injectable } from '@angular/core';
import { Message } from './message';
import { Observable, of } from 'rxjs';
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
export class MessageService {

  constructor(private http: HttpClient) { }

  private Url = 'http://localhost:3000/api/notes-de-frais/messages';
 
  addmessage(message: Message) {
    return this.http.post<Message>(this.Url, message, httpOptions).pipe(
      tap((message: Message) => console.log(`added message`)),
      catchError(this.handleError<Message>('addnote'))
    );
  }

  getmessages(): Observable<Message[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Response>(this.Url)
    .pipe(
      map(messages => messages.data.docs),
      catchError(this.handleError('getnotes', []))
    );
  }

  getmessage(id: string): Observable<Message> {
    console.log(this.http.get<Response>(this.Url).pipe(
      map(messages=> messages.data.docs.find(message => {console.log(message._id);message._id == id;})),
      catchError(this.handleError<Message>(`getmessages id=${id}`))
  ));
    return this.http.get<Response>(this.Url).pipe(
      map(messages=> messages.data.docs.find(message => message._id === id)),
      catchError(this.handleError<Message>(`getmessage id=${id}`))
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
}
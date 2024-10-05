import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/event';
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No auth token found');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  public getAllEvents():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAll`);
  }

  public getEventById(id:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getById/${id}`, { headers: this.getHeaders() });
  }

  public saveEvent(event:Event): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`,event, { headers: this.getHeaders() });
  }

  public updateEvent(event:Event): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`,event, { headers: this.getHeaders() });
  }

  public deleteEvent(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() });
  }
  public countEvent(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/countEvent`, { headers: this.getHeaders() });
  }
}

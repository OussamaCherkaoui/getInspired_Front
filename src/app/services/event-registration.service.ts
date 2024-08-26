import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventRegistration} from "../models/event-registration";

@Injectable({
  providedIn: 'root'
})
export class EventRegistrationService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/eventRegistration';
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

  public getAllEventRegistration():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAll`, { headers: this.getHeaders() });
  }
  public getAllEventRegistrationByIdEvent(id:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllEventRegistrationByIdEvent/${id}`, { headers: this.getHeaders() });
  }
  public saveEvent(eventRegistration:EventRegistration): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`,eventRegistration, { headers: this.getHeaders() });
  }
  public confirmRegistration(id:number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/confirmRegistration/${id}`,null, { headers: this.getHeaders() });
  }

}

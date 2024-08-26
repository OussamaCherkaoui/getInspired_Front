import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../models/reservation";
import {Subscription} from "../models/subscription";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/subscription';
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

  public getAllSubscription():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAll`, { headers: this.getHeaders() });
  }
  public saveSubscription(subscription:Subscription): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`,subscription, { headers: this.getHeaders() });
  }
  public renewalSubscription(subscription:Subscription): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/renewal`,subscription, { headers: this.getHeaders() });
  }
  public confirmSubscription(id:number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/confirmSubscription/${id}`,null, { headers: this.getHeaders() });
  }
  public sendNotification(idSubscription:number,notification:string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/sendNotification/${idSubscription}/${notification}`,null, { headers: this.getHeaders() });
  }

}

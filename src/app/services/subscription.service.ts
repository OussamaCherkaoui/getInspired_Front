import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
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
  public countSubscriptionConfirmed(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/countSubscriptionConfirmed`, { headers: this.getHeaders() });
  }
  public getSubscriptionCountByType(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/count-by-type`, { headers: this.getHeaders() });
  }

  public getAllSubscriptionMonthly() {
    return this.http.get<any>(`${this.apiUrl}/getAllSubscriptionMonthly`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => new Error('No subscriptions available at the moment'));
        })
      );
  }

  public getAllSubscriptionAnnualy() {
    return this.http.get<any>(`${this.apiUrl}/getAllSubscriptionAnnualy`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => new Error( 'No subscriptions available at the moment'));
        })
      );
  }

  public getAllRequestSubscription() {
    return this.http.get<any>(`${this.apiUrl}/getAllRequestSubscription`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
        return throwError(() => new Error('No subscriptions available at the moment'));
        })
      );
  }

  public cancelSubscription(id:number) {
    return this.http.put<any>(`${this.apiUrl}/cancelSubscription/${id}`,null, { headers: this.getHeaders() });
  }

  public deleteSubscription(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/deleteSubscription/${id}`,{ headers: this.getHeaders() });
  }

  public getAllSubscriptionMonthlyByUsername(username:string):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllSubscriptionMonthlyByUsername/${username}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => new Error('No subscriptions with username already exists'));
        })
      );
  }

  public getAllSubscriptionAnnualyByUsername(username:string) {
    return this.http.get<any>(`${this.apiUrl}/getAllSubscriptionAnnualyByUsername/${username}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => new Error('No subscriptions with username already exists'));
        })
      );
  }

  public getAllRequestSubscriptionByUsername(username:string) {
    return this.http.get<any>(`${this.apiUrl}/getAllRequestSubscriptionByUsername/${username}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          return throwError(() => new Error('No subscriptions with username already exists'));
        })
      );
  }

  public getSubscriptionByIdMember(id:number) {
    return this.http.get<any>(`${this.apiUrl}/getAllByIdMember/${id}`, { headers: this.getHeaders() });
  }
}

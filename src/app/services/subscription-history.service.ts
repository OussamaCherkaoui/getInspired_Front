import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionHistoryService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/subscriptionHistory';
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

  public getSubscriptionHistoryByIdMembre(id:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getSubscriptionHistoryByIdMembre/${id}`, { headers: this.getHeaders() });
  }

  public getSubscriptionHistoryByIdSubscription(id: number) {
    return this.http.get<any>(`${this.apiUrl}/getSubscriptionHistoryByIdSubscription/${id}`, { headers: this.getHeaders() });
  }
}

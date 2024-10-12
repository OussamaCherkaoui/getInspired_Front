import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../models/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/reservation';
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

  public getAllReservations():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAll`, { headers: this.getHeaders() });
  }
  public getAllReservationsByIdSpace(id:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAllByIdSpace/${id}`, { headers: this.getHeaders() });
  }
  public saveReservation(reservation:Reservation): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`,reservation, { headers: this.getHeaders() });
  }
  public cancelReservation(id: number | undefined): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/cancelReservation/${id}`,null,{ headers: this.getHeaders() });
  }
  public confirmReservation(id:number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/confirmReservation/${id}`,null, { headers: this.getHeaders() });
  }

  public getReservationsByDate(searchDate: string) {
    return this.http.get<any>(`${this.apiUrl}/getAllByDate/${searchDate}`, { headers: this.getHeaders() });
  }

  public getUpcomingReservations() {
    return this.http.get<any>(`${this.apiUrl}/getUpcomingReservations`, { headers: this.getHeaders() });
  }

  public getReservationsByIdMember(id:number) {
    return this.http.get<any>(`${this.apiUrl}/getAllByIdMember/${id}`, { headers: this.getHeaders() });
  }

  public deleteReservation(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/deleteReservation/${id}`,{ headers: this.getHeaders() });
  }

}

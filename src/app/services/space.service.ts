import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Space} from "../models/space";

@Injectable({
  providedIn: 'root'
})
export class SpaceService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/space';
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

  public getAllSpace():Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getAll`, { headers: this.getHeaders() });
  }

  public getSpaceById(id: string | null):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getById/${id}`, { headers: this.getHeaders() });
  }

  public saveSpace(space:Space): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`,space, { headers: this.getHeaders() });
  }

  public updateSpace(space:Space): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update`,space, { headers: this.getHeaders() });
  }

  public deleteSpace(id: number | undefined): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() });
  }

  public changeEtatToReserve(id:number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reserve/${id}`,null, { headers: this.getHeaders() });
  }

  public changeEtatToNotReserve(id:number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/notReserve/${id}`,null, { headers: this.getHeaders() });
  }
  public countFreeSpaceForToday(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/countFreeSpaceForToday`, { headers: this.getHeaders() });
  }

}

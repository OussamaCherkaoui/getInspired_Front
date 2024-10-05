import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Admin} from "../models/admin";
import {Observable} from "rxjs";
import {Membre} from "../models/membre";

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private apiUrl: string;


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

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/membre';
  }

  public registerMembre(membre:Membre): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`,membre);
  }

  public countRegistredUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/countRegistredUser`, { headers: this.getHeaders() });
  }
}

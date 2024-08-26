import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Admin} from "../models/admin";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/admin';
  }

  public registerAdmin(admin:Admin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`,admin);
  }
}

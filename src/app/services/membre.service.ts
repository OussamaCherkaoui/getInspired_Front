import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Admin} from "../models/admin";
import {Observable} from "rxjs";
import {Membre} from "../models/membre";

@Injectable({
  providedIn: 'root'
})
export class MembreService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8081/membre';
  }

  public registerMembre(membre:Membre): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`,membre);
  }

}

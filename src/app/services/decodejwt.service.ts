import { Injectable } from '@angular/core';
import {jwtDecode, JwtPayload} from "jwt-decode";
import {UserService} from "./user.service";
import {CustomJwtPayload} from "../models/custom-jwt-payload";

@Injectable({
  providedIn: 'root'
})
export class DecodejwtService {

  token: string ='' ;

  constructor(private srv:UserService ) {

  }

  public getToken(){
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('jwt')||'';
    }
  }

  public decodeToken(token: string ) {
    return jwtDecode(token);
  }
  public getUsernameFromToken() :any{
    this.getToken();
    const decodedToken:CustomJwtPayload = this.decodeToken(this.token) as CustomJwtPayload;
    return decodedToken.sub;
  }
  public getRoleFromToken() :any{
    this.getToken();
    const decodedToken:CustomJwtPayload = this.decodeToken(this.token) as CustomJwtPayload;
    return decodedToken.role;
  }
  public getIdByUsername() {
    const username = this.getUsernameFromToken()
    return this.srv.findIdByUsername(username);
  }

}

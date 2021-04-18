import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { STORAGE_APP_PREFIX, TOKEN_NAME } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    public jwtHelper: JwtHelperService
    ) { }

  getToken(): string {
    const session = sessionStorage.getItem(STORAGE_APP_PREFIX);
    return JSON.parse(session)[TOKEN_NAME];
  }

  setToken(token: string): void {
    sessionStorage.setItem(JSON.parse(STORAGE_APP_PREFIX)[TOKEN_NAME], token);
  }

  getTokenExpirationDate(token: string): Date {
    const timestamp = this.jwtHelper.getTokenExpirationDate(token);

    if (timestamp === undefined) return null;

    return timestamp;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const expired = this.jwtHelper.isTokenExpired(token);
    const expirationDate = this.getTokenExpirationDate(token);
    if(expirationDate === undefined) return false;
    return !(expirationDate.valueOf() > new Date().valueOf());
  }

  getRefreshToken() {
    return JSON.parse(sessionStorage.getItem(STORAGE_APP_PREFIX)).refreshToken;
  }

  setRefreshToken(value: string) {
    sessionStorage.setItem(JSON.parse(STORAGE_APP_PREFIX).refreshToken, value);
  }

}

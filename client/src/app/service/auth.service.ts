import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { getHeaders, isEmptyValue } from '../shared/utils/helpers';
import { STORAGE_APP_PREFIX, TOKEN_NAME } from '../constants';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  constructor(
    private httpClient: HttpClient,
    public jwtHelper: JwtHelperService
    ) {
      this.accountSubject = new BehaviorSubject<Account>(null);
      this.account = this.accountSubject.asObservable();
    }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  getToken(): string {
    const session = sessionStorage.getItem(STORAGE_APP_PREFIX);
    return !isEmptyValue(session) ? JSON.parse(session)?.[TOKEN_NAME] : null;
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
    const session = sessionStorage.getItem(STORAGE_APP_PREFIX);
    return !isEmptyValue(session) ?  JSON.parse(session)?.refreshToken : null;
  }

  setRefreshToken(value: string) {
    sessionStorage.setItem(JSON.parse(STORAGE_APP_PREFIX).refreshToken, value);
  }

  /**
   *
   * @param auth : json from auth
   * @function login
   * @returns true and false, if exist user
   */
  login(auth: any) {
    return this.httpClient.post(`${environment.host}auth/login`, auth, { headers: this.headers });
  }

  /**
   * @function logout
   * @returns true and false, delete token
   */
  logout() {
    return this.httpClient.get(`${environment.host}auth/logout`, getHeaders())
      .toPromise()
      .then(res => {
        sessionStorage.removeItem(STORAGE_APP_PREFIX);
        //this.stopRefreshTokenTimer();
        this.accountSubject.next(null);
        return res;
      });
  }

  refreshToken() {
    return this.httpClient.post<any>(`${environment.host}auth/refresh-token`, {}, { withCredentials: true })
        .pipe(map((account) => {
            this.accountSubject.next(account);
            this.startRefreshTokenTimer();
            return account;
        }));
  }

  register(account: Account) {
    return this.httpClient.post(`${environment.host}auth/register`, account);
  }

  verifyEmail(token: string) {
    return this.httpClient.post(`${environment.host}auth/verify-email`, { token });
  }

  forgotPassword(email: string) {
    return this.httpClient.post(`${environment.host}auth/forgot-password`, { email });
  }

  newPassword(data: any) {
    return this.httpClient.get(`${environment.host}auth/new-password`, { params: data});
  }

  validateResetToken(token: string) {
    return this.httpClient.post(`${environment.host}auth/validate-reset-token`, { token });
  }

  resetPassword(data: any) {
    return this.httpClient.post(`${environment.host}auth/reset-password`, data);
  }

  // helper methods

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
      // parse json object from base64 encoded jwt token
      const jwtToken = JSON.parse(atob(this.getToken().split('.')[1]));

      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
  }

}

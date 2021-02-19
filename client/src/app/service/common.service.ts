//import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
/*
@Injectable({
  providedIn: 'root'
})
*/
export function getHeaders() {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "authorization": `${JSON.parse(sessionStorage.getItem('validate')).token_type} ${JSON.parse(sessionStorage.getItem('validate')).access_token}`
    })
  };

}

export class CommonService {

  constructor(private httpClient: HttpClient) { }

}

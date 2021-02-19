import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from './common.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private httpClient: HttpClient) { }

  getListPersona() {
    return this.httpClient.get(`${environment.host}personas`, getHeaders())
  }
  searchPersona(data) {
    return this.httpClient.post(`${environment.host}personas/search`, data , getHeaders())
  }

  createPersona(data) {
    return this.httpClient.post(`${environment.host}personas`, data, getHeaders());
  }

  updatePersona(codeRol, data) {
    return this.httpClient.put(`${environment.host}personas/${codeRol}`, data, getHeaders());
  }

  deletePersona(id) {
    return this.httpClient.delete(`${environment.host}personas/${id}`, getHeaders())
  }

}

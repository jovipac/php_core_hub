import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private httpClient: HttpClient) { }

  getListPersona() {
    return this.httpClient.get(`${environment.host}personas`, getHeaders())
  }
  searchPersona(data: any) {
    return this.httpClient.post(`${environment.host}personas/search`, data , getHeaders())
  }

  createPersona(data: any) {
    return this.httpClient.post(`${environment.host}personas`, data, getHeaders());
  }

  updatePersona(id: number, data: any) {
    return this.httpClient.put(`${environment.host}personas/${id}`, data, getHeaders());
  }

  deletePersona(id: number) {
    return this.httpClient.delete(`${environment.host}personas/${id}`, getHeaders())
  }

}

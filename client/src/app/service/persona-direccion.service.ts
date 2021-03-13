import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaDireccionService {

  constructor(private httpClient: HttpClient) { }

  getListPersonaDireccion() {
    return this.httpClient.get(`${environment.host}persona-direccion`, getHeaders())
  }

  searchPersonaDireccion(data: any) {
    return this.httpClient.post(`${environment.host}persona-direccion/search`, data , getHeaders())
  }

  getPersonaDireccion(id: number) {
    return this.httpClient.get(`${environment.host}persona-direccion/${id}`, getHeaders())
  }

  createPersonaDireccion(data: any) {
    return this.httpClient.post(`${environment.host}persona-direccion`, data, getHeaders())
  }

  updatePersonaDireccion(id: number, data:any) {
    return this.httpClient.put(`${environment.host}persona-direccion/${id}`, data, getHeaders())
  }

  deletePersonaDireccion(id: number) {
    return this.httpClient.delete(`${environment.host}persona-direccion/${id}`, getHeaders())
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscapacidadPersonaService {

  constructor(private httpClient: HttpClient) { }

  getListDiscapacidadPersona() {
    return this.httpClient.get(`${environment.host}persona-discapacidad`, getHeaders())
  }

  getDiscapacidadPersona(id: number) {
    return this.httpClient.get(`${environment.host}persona-discapacidad/${id}`, getHeaders())
  }

  createDiscapacidadPersona(data: any): any {
    return this.httpClient.post(`${environment.host}persona-discapacidad`, data, getHeaders())
  }

  updateDiscapacidadPersona(id: number, data: any) {
    return this.httpClient.put(`${environment.host}persona-discapacidad/${id}`, data, getHeaders())
  }

  deleteDiscapacidadPersona(id: number) {
    return this.httpClient.delete(`${environment.host}persona-discapacidad/${id}`, getHeaders())
  }

}

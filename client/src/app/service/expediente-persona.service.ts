import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedientePersonaService {

  constructor(private httpClient: HttpClient) { }

  searchExpedientePersona(data: any) {
    return this.httpClient.post(`${environment.host}expediente-personas/search`, data , getHeaders())
  }

  getExpedientePersona(id: number) {
    return this.httpClient.get(`${environment.host}expediente-personas/${id}`, getHeaders())
  }

  createExpedientePersona(data) {
    return this.httpClient.post(`${environment.host}expediente-personas`, data, getHeaders());
  }

  updateExpedientePersona(id: number, data: any) {
    return this.httpClient.put(`${environment.host}expediente-personas/${id}`, data, getHeaders());
  }

  deleteExpedientePersona(id: number) {
    return this.httpClient.delete(`${environment.host}expediente-personas/${id}`, getHeaders())
  }

}

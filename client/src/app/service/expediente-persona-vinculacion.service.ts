import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedientePersonaVinculacionService {

  constructor(private httpClient: HttpClient) { }

  searchExpedientePersonaVinculacion(data: any) {
    return this.httpClient.post(`${environment.host}expediente-persona-vinculacion/search`, data , getHeaders())
  }

  getExpedientePersonaVinculacion(id: number) {
    return this.httpClient.get(`${environment.host}expediente-persona-vinculacion/${id}`, getHeaders())
  }

  createExpedientePersonaVinculacion(data) {
    return this.httpClient.post(`${environment.host}expediente-persona-vinculacion`, data, getHeaders());
  }

  updateExpedientePersonaVinculacion(id: number, data: any) {
    return this.httpClient.put(`${environment.host}expediente-persona-vinculacion/${id}`, data, getHeaders());
  }

  deleteExpedientePersonaVinculacion(id: number) {
    return this.httpClient.delete(`${environment.host}expediente-persona-vinculacion/${id}`, getHeaders())
  }

}

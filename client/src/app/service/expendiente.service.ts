import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  constructor(private httpClient: HttpClient) { }

  getListExpediente() {
    return this.httpClient.get(`${environment.host}expedientes`, getHeaders())
  }

  searchExpediente(data) {
    return this.httpClient.post(`${environment.host}expedientes/search`, data , getHeaders())
  }

  getExpediente(id) {
    return this.httpClient.get(`${environment.host}expedientes/${id}`, getHeaders())
  }

  createExpediente(data) {
    return this.httpClient.post(`${environment.host}expedientes`, data, getHeaders());
  }

  updateExpediente(id, data) {
    return this.httpClient.put(`${environment.host}expedientes/${id}`, data, getHeaders());
  }

  deleteExpediente(id) {
    return this.httpClient.delete(`${environment.host}expedientes/${id}`, getHeaders())
  }

}

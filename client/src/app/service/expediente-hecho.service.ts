import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteHechoService {

  constructor(private httpClient: HttpClient) { }

  getListExpedienteHecho() {
    return this.httpClient.get(`${environment.host}expediente-hecho`, getHeaders())
  }

  searchExpedienteHecho(data: any) {
    return this.httpClient.post(`${environment.host}expediente-hecho/search`, data , getHeaders())
  }

  getExpedienteHecho(id: number) {
    return this.httpClient.get(`${environment.host}expediente-hecho/${id}`, getHeaders())
  }

  createExpedienteHecho(data: any) {
    return this.httpClient.post(`${environment.host}expediente-hecho`, data, getHeaders())
  }

  updateExpedienteHecho(id: number, data:any) {
    return this.httpClient.put(`${environment.host}expediente-hecho/${id}`, data, getHeaders())
  }

  deleteExpedienteHecho(id: number) {
    return this.httpClient.delete(`${environment.host}expediente-hecho/${id}`, getHeaders())
  }

}

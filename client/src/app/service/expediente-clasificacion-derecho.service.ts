import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteClasificacionDerechoService {

  constructor(private httpClient: HttpClient) { }

  getExpedienteClasificacionDerecho() {
    return this.httpClient.get(`${environment.host}expediente-clasificacion-derechos`, getHeaders())
  }

  searchExpedienteClasificacionDerecho(data: any) {
    return this.httpClient.post(`${environment.host}expediente-clasificacion-derechos/search`, data , getHeaders())
  }

  createExpedienteClasificacionDerecho(data: any) {
    return this.httpClient.post(`${environment.host}expediente-clasificacion-derechos`, data, getHeaders())
  }

  updateExpedienteClasificacionDerecho(id: number, data:any) {
    return this.httpClient.put(`${environment.host}expediente-clasificacion-derechos/${id}`, data, getHeaders())
  }

  deleteExpedienteClasificacionDerecho(id: number) {
    return this.httpClient.delete(`${environment.host}expediente-clasificacion-derechos/${id}`, getHeaders())
  }

}

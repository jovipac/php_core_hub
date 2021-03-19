import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteHechoArchivoService {

  constructor(private httpClient: HttpClient) { }

  getListExpedienteHechoArchivo() {
    return this.httpClient.get(`${environment.host}expediente-hecho-archivos`, getHeaders())
  }

  searchExpedienteHechoArchivo(data: any) {
    return this.httpClient.post(`${environment.host}expediente-hecho-archivos/search`, data , getHeaders())
  }

  getExpedienteHechoArchivo(id: number) {
    return this.httpClient.get(`${environment.host}expediente-hecho-archivos/${id}`, getHeaders())
  }

  createExpedienteHechoArchivo(data: any) {
    return this.httpClient.post(`${environment.host}expediente-hecho-archivos`, data, getHeaders())
  }

  updateExpedienteHechoArchivo(id: number, data:any) {
    return this.httpClient.put(`${environment.host}expediente-hecho-archivos/${id}`, data, getHeaders())
  }

  deleteExpedienteHechoArchivo(id: number) {
    return this.httpClient.delete(`${environment.host}expediente-hecho-archivos/${id}`, getHeaders())
  }

}

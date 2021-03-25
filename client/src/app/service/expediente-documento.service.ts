import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteDocumentoService {

  constructor(private httpClient: HttpClient) { }

  getListExpedienteDocumento() {
    return this.httpClient.get(`${environment.host}expediente-documentos`, getHeaders())
  }

  searchExpedienteDocumento(data: any) {
    return this.httpClient.post(`${environment.host}expediente-documentos/search`, data , getHeaders())
  }

  getExpedienteDocumento(id: number) {
    return this.httpClient.get(`${environment.host}expediente-documentos/${id}`, getHeaders())
  }

  createExpedienteDocumento(data: any) {
    return this.httpClient.post(`${environment.host}expediente-documentos`, data, getHeaders())
  }

  updateExpedienteDocumento(id: number, data:any) {
    return this.httpClient.put(`${environment.host}expediente-documentos/${id}`, data, getHeaders())
  }

  deleteExpedienteDocumento(id: number) {
    return this.httpClient.delete(`${environment.host}expediente-documentos/${id}`, getHeaders())
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteDocumentoService {
  public uploadURL: string;

  constructor(private httpClient: HttpClient) {
    this.uploadURL = `${environment.host}expediente-documento-archivos/upload`;
  }

  getListExpedienteDocumento() {
    return this.httpClient.get(`${environment.host}expediente-documentos`, getHeaders())
  }

  uploadExpedienteDocumento(data: any) {
    return this.httpClient.post(`${environment.host}expediente-documentos/upload`, data, getHeaders())
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
  upgradeExpedienteDocumento(id: number, data:any) {
    return this.httpClient.patch(`${environment.host}expediente-documentos/upgrade/${id}`, data, getHeaders())
  }

}

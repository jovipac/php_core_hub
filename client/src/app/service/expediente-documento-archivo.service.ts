import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteDocumentoArchivoService {
  public uploadURL: string;

  constructor(private httpClient: HttpClient) {
    this.uploadURL = `${environment.host}expediente-documento-archivos/upload`;
  }

  getListExpedienteDocumentoArchivo() {
    return this.httpClient.get(`${environment.host}expediente-documento-archivos`, getHeaders())
  }

  uploadExpedienteDocumentoArchivo(data: any) {
    return this.httpClient.post(`${environment.host}expediente-documento-archivos/upload`, data, getHeaders())
  }

  searchExpedienteDocumentoArchivo(data: any) {
    return this.httpClient.post(`${environment.host}expediente-documento-archivos/search`, data , getHeaders())
  }

  getExpedienteDocumentoArchivo(id: number) {
    return this.httpClient.get(`${environment.host}expediente-documento-archivos/${id}`, getHeaders())
  }

  createExpedienteDocumentoArchivo(data: any) {
    return this.httpClient.post(`${environment.host}expediente-documento-archivos`, data, getHeaders())
  }

  updateExpedienteDocumentoArchivo(id: number, data:any) {
    return this.httpClient.put(`${environment.host}expediente-documento-archivos/${id}`, data, getHeaders())
  }

  deleteExpedienteDocumentoArchivo(id: number) {
    return this.httpClient.delete(`${environment.host}expediente-documento-archivos/${id}`, getHeaders())
  }

}

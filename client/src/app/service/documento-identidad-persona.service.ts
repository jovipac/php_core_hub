import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocumentoIdentidadPersonaService {

  constructor(private httpClient: HttpClient) { }

  getListDocumentoIdentidadPersona() {
    return this.httpClient.get(`${environment.host}documento-identidad-persona`, getHeaders())
  }

  searchDocumentoIdentidadPersona(data: any) {
    return this.httpClient.post(`${environment.host}documento-identidad-persona/search`, data , getHeaders())
  }

  getDocumentoIdentidadPersona(id: number) {
    return this.httpClient.get(`${environment.host}documento-identidad-persona/${id}`, getHeaders())
  }

  createDocumentoIdentidadPersona(data: any) {
    return this.httpClient.post(`${environment.host}documento-identidad-persona`, data, getHeaders())
  }

  updateDocumentoIdentidadPersona(id: number, data:any) {
    return this.httpClient.put(`${environment.host}documento-identidad-persona/${id}`, data, getHeaders())
  }

  deleteDocumentoIdentidadPersona(id: number) {
    return this.httpClient.delete(`${environment.host}documento-identidad-persona/${id}`, getHeaders())
  }

}

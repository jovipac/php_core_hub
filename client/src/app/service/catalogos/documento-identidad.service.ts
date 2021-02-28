import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentoIdentidadService {

  constructor(private httpClient: HttpClient) { }

  getListDocumentoIdentidad() {
    return this.httpClient.get(`${environment.host}documento-identidad`, getHeaders())
  }

  createDocumentoIdentidad(data: any) {
    return this.httpClient.post(`${environment.host}documento-identidad`, data, getHeaders())
  }

  updateDocumentoIdentidad(id: number, data:any) {
    return this.httpClient.put(`${environment.host}documento-identidad/${id}`, data, getHeaders())
  }

  deleteDocumentoIdentidad(id: number) {
    return this.httpClient.delete(`${environment.host}documento-identidad/${id}`, getHeaders())
  }

}

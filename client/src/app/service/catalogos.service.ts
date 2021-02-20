import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private httpClient: HttpClient) { }

  /* routing from catalogo sexo */
  getListSexo() {
    return this.httpClient.get(`${environment.host}sexo`, getHeaders())
  }

  createSexo(data) {
    return this.httpClient.post(`${environment.host}sexo`, data, getHeaders())
  }

  updateSexo(id, data) {
    return this.httpClient.put(`${environment.host}sexo/${id}`, data, getHeaders())
  }

  deleteSexo(id) {
    return this.httpClient.delete(`${environment.host}sexo/${id}`, getHeaders())
  }
}

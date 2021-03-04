import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SexoService {

  constructor(private httpClient: HttpClient) { }

  getListSexo() {
    return this.httpClient.get(`${environment.host}sexo`, getHeaders())
  }

  getSexo(id: number) {
    return this.httpClient.get(`${environment.host}sexo/${id}`, getHeaders())
  }

  createSexo(data: any) {
    return this.httpClient.post(`${environment.host}sexo`, data, getHeaders())
  }

  updateSexo(id: number, data: any) {
    return this.httpClient.put(`${environment.host}sexo/${id}`, data, getHeaders())
  }

  deleteSexo(id: number) {
    return this.httpClient.delete(`${environment.host}sexo/${id}`, getHeaders())
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private httpClient: HttpClient) { }

  getListMunicipio() {
    return this.httpClient.get(`${environment.host}municipio`, getHeaders())
  }

  getMunicipio(id: number) {
    return this.httpClient.get(`${environment.host}municipio/${id}`, getHeaders())
  }

  createMunicipio(data: any) {
    return this.httpClient.post(`${environment.host}municipio`, data, getHeaders())
  }

  updateMunicipio(id: number, data: any) {
    return this.httpClient.put(`${environment.host}municipio/${id}`, data, getHeaders())
  }

  deleteMunicipio(id: number) {
    return this.httpClient.delete(`${environment.host}municipio/${id}`, getHeaders())
  }

}

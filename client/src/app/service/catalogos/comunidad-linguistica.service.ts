import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComunidadLinguisticaService {

  constructor(private httpClient: HttpClient) { }

  getListComunidadLinguistica() {
    return this.httpClient.get(`${environment.host}comunidad-linguistica`, getHeaders())
  }

  searchComunidadLinguistica(data: any) {
    return this.httpClient.post(`${environment.host}comunidad-linguistica/search`, data , getHeaders())
  }

  getComunidadLinguistica(id: number) {
    return this.httpClient.get(`${environment.host}comunidad-linguistica/${id}`, getHeaders())
  }

  createComunidadLinguistica(data: any) {
    return this.httpClient.post(`${environment.host}comunidad-linguistica`, data, getHeaders())
  }

  updateComunidadLinguistica(id: number, data:any) {
    return this.httpClient.put(`${environment.host}comunidad-linguistica/${id}`, data, getHeaders())
  }

  deleteComunidadLinguistica(id: number) {
    return this.httpClient.delete(`${environment.host}comunidad-linguistica/${id}`, getHeaders())
  }

}

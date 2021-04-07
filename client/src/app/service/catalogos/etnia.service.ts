import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtniaService {

  constructor(private httpClient: HttpClient) { }

  getListEtnia() {
    return this.httpClient.get(`${environment.host}etnia`, getHeaders())
  }

  getEtnia(id: number) {
    return this.httpClient.get(`${environment.host}etnia/${id}`, getHeaders())
  }

  createEtnia(data: any) {
    return this.httpClient.post(`${environment.host}etnia`, data, getHeaders())
  }

  updateEtnia(id: number, data: any) {
    return this.httpClient.put(`${environment.host}etnia/${id}`, data, getHeaders())
  }

  deleteEtnia(id: number) {
    return this.httpClient.delete(`${environment.host}etnia/${id}`, getHeaders())
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViaService {

  constructor(private httpClient: HttpClient) { }

  getListVia() {
    return this.httpClient.get(`${environment.host}via`, getHeaders())
  }

  getVia(id: number) {
    return this.httpClient.get(`${environment.host}via/${id}`, getHeaders())
  }

  createVia(data: any) {
    return this.httpClient.post(`${environment.host}via`, data, getHeaders())
  }

  updateVia(id: number, data: any) {
    return this.httpClient.put(`${environment.host}via/${id}`, data, getHeaders())
  }

  deleteVia(id: number) {
    return this.httpClient.delete(`${environment.host}via/${id}`, getHeaders())
  }

}

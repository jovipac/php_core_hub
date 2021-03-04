import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MotivoService {

  constructor(private httpClient: HttpClient) { }

  getListMotivo() {
    return this.httpClient.get(`${environment.host}motivos`, getHeaders())
  }

  getMotivo(id: number) {
    return this.httpClient.get(`${environment.host}motivos/${id}`, getHeaders())
  }

  createMotivo(data: any) {
    return this.httpClient.post(`${environment.host}motivos`, data, getHeaders())
  }

  updateMotivo(id: number, data: any) {
    return this.httpClient.put(`${environment.host}motivos/${id}`, data, getHeaders())
  }

  deleteMotivo(id: number) {
    return this.httpClient.delete(`${environment.host}motivos/${id}`, getHeaders())
  }

}

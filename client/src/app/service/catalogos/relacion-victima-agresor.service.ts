import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelacionVictimaAgresorService {

  constructor(private httpClient: HttpClient) { }

  getListRelacionVictimaAgresor() {
    return this.httpClient.get(`${environment.host}relacion-victima-agresor`, getHeaders())
  }

  getRelacionVictimaAgresor(id: number) {
    return this.httpClient.get(`${environment.host}relacion-victima-agresor/${id}`, getHeaders())
  }

  createRelacionVictimaAgresor(data: any): any {
    return this.httpClient.post(`${environment.host}relacion-victima-agresor`, data, getHeaders())
  }

  updateRelacionVictimaAgresor(id: number, data: any) {
    return this.httpClient.put(`${environment.host}relacion-victima-agresor/${id}`, data, getHeaders())
  }

  deleteRelacionVictimaAgresor(id: number) {
    return this.httpClient.delete(`${environment.host}relacion-victima-agresor/${id}`, getHeaders())
  }

}

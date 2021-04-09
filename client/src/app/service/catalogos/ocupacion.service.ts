import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OcupacionService {
  constructor(private httpClient: HttpClient) { }

  getListocupacion() {
    return this.httpClient.get(`${environment.host}ocupacion`, getHeaders())
  }

  getocupacion(id: number) {
    return this.httpClient.get(`${environment.host}ocupacion/${id}`, getHeaders())
  }

  createocupacion(data: any): any {
    return this.httpClient.post(`${environment.host}ocupacion`, data, getHeaders())
  }

  updateocupacion(id: number, data: any) {
    return this.httpClient.put(`${environment.host}ocupacion/${id}`, data, getHeaders())
  }

  deleteocupacion(id: number) {
    return this.httpClient.delete(`${environment.host}ocupacion/${id}`, getHeaders())
  }
}

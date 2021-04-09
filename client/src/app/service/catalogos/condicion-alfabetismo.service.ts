import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CondicionAlfabetismoService {
  constructor(private httpClient: HttpClient) { }

  getListcondicionalfabetismo() {
    return this.httpClient.get(`${environment.host}condicion-alfabetismo`, getHeaders())
  }

  getcondicionalfabetismo(id: number) {
    return this.httpClient.get(`${environment.host}condicion-alfabetismo/${id}`, getHeaders())
  }

  createcondicionalfabetismo(data: any): any {
    return this.httpClient.post(`${environment.host}condicion-alfabetismo`, data, getHeaders())
  }

  updatecondicionalfabetismo(id: number, data: any) {
    return this.httpClient.put(`${environment.host}condicion-alfabetismo/${id}`, data, getHeaders())
  }

  deletecondicionalfabetismo(id: number) {
    return this.httpClient.delete(`${environment.host}condicion-alfabetismo/${id}`, getHeaders())
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaGeograficaService {
  constructor(private httpClient: HttpClient) { }

  getListareageografica() {
    return this.httpClient.get(`${environment.host}area-geografica`, getHeaders())
  }

  getareageografica(id: number) {
    return this.httpClient.get(`${environment.host}area-geografica/${id}`, getHeaders())
  }

  createareageografica(data: any): any {
    return this.httpClient.post(`${environment.host}area-geografica`, data, getHeaders())
  }

  updateareageografica(id: number, data: any) {
    return this.httpClient.put(`${environment.host}area-geografica/${id}`, data, getHeaders())
  }

  deleteareageografica(id: number) {
    return this.httpClient.delete(`${environment.host}area-geografica/${id}`, getHeaders())
  }
}

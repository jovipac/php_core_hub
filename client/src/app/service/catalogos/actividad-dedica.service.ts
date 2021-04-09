import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadDedicaService {
  constructor(private httpClient: HttpClient) { }

  getListactividaddedica() {
    return this.httpClient.get(`${environment.host}actividad-dedica`, getHeaders())
  }

  getactividaddedica(id: number) {
    return this.httpClient.get(`${environment.host}actividad-dedica/${id}`, getHeaders())
  }

  createactividaddedica(data: any): any {
    return this.httpClient.post(`${environment.host}actividad-dedica`, data, getHeaders())
  }

  updateactividaddedica(id: number, data: any) {
    return this.httpClient.put(`${environment.host}actividad-dedica/${id}`, data, getHeaders())
  }

  deleteactividaddedica(id: number) {
    return this.httpClient.delete(`${environment.host}actividad-dedica/${id}`, getHeaders())
  }
}

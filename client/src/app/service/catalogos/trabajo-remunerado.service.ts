import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrabajoRemuneradoService {
  constructor(private httpClient: HttpClient) { }

  getListTrabajoRemunerado() {
    return this.httpClient.get(`${environment.host}trabajo-remunerado`, getHeaders())
  }

  getTrabajoRemunerado(id: number) {
    return this.httpClient.get(`${environment.host}trabajo-remunerado/${id}`, getHeaders())
  }

  createTrabajoRemunerado(data: any): any {
    return this.httpClient.post(`${environment.host}trabajo-remunerado`, data, getHeaders())
  }

  updateTrabajoRemunerado(id: number, data: any) {
    return this.httpClient.put(`${environment.host}trabajo-remunerado/${id}`, data, getHeaders())
  }

  deleteTrabajoRemunerado(id: number) {
    return this.httpClient.delete(`${environment.host}trabajo-remunerado/${id}`, getHeaders())
  }
}

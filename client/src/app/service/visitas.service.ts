import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  constructor(private httpClient: HttpClient) { }

    searchVisit(data) {
      return this.httpClient.post(`${environment.host}visitas/search`, data , getHeaders())
    }

    getVisit(id) {
      return this.httpClient.get(`${environment.host}visitas/${id}`, getHeaders())
    }

    createVisit(data) {
      return this.httpClient.post(`${environment.host}visitas`, data, getHeaders());
    }

    updateVisit(id, data) {
      return this.httpClient.put(`${environment.host}visitas/${id}`, data, getHeaders());
    }

    deleteVisit(id) {
      return this.httpClient.delete(`${environment.host}visitas/${id}`, getHeaders())
    }
}

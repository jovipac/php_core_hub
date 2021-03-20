import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteClasificacionDerechoService {

  constructor(private httpClient: HttpClient) { }

  getCalificacionDerecho() {
    return this.httpClient.get(`${environment.host}clasificacion-derecho`, getHeaders())
  }


}

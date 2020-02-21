import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Evaluacion } from '../models/evaluacion';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

 headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

  baseUrl =  environment.apiUrl +  'Evaluacion/';
  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register' , model );
  }
  getEvaluaciones(): Observable<Evaluacion[]> {
    return this.http.get<Evaluacion[]>(this.baseUrl );
  }
  getEvaluacion(id): Observable<Evaluacion> {
    return this.http.get<Evaluacion>(this.baseUrl + 'GetEvaluacion/' + id);
  }
  update(evaluacion: Evaluacion, id: number) {
    return this.http.put(this.baseUrl +  id, evaluacion );
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl  + id);
  }

}

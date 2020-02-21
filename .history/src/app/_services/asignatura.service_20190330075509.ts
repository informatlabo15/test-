import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Asignatura } from '../models/asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

  baseUrl =  environment.apiUrl +  'Asignatura/';
  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register' , model );
  }
  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(this.baseUrl );
  }
  getAsignaturasByDecano(id): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(this.baseUrl + 'GetAsignaturasByCarrera'  + '?=' + id);
  }
  getAsignatura(id): Observable<Asignatura> {
    return this.http.get<Asignatura>(this.baseUrl + 'GetAsignatura/' + id);
  }
  update(carrera: Asignatura, id: number) {
    return this.http.put(this.baseUrl +  id, carrera );
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl  + id);
  }
}

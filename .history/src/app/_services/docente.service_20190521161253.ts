import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http: HttpClient) { }

  baseUrl =  environment.apiUrl +  'Docente/';
  updateDocente(estudiante: any): any {
    throw new Error('Method not implemented.');
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register' , model );
  }
  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.baseUrl );
  }
  getDocentesByStatus(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.baseUrl + 'GetDocenteByStatus' );
  }
  getDocente(id): Observable<Docente> {
    return this.http.get<Docente>(this.baseUrl + 'GetDocente/' + '?=' + id);
  }
  getDocenteByDecano(id): Observable<Docente> {
    return this.http.get<Docente>(this.baseUrl + 'GetDocente/' + '?=' + id);
  }
  getDocenteByUser(id): Observable<Docente> {
    return this.http.get<Docente>(this.baseUrl + 'GetDocenteByUser' + '?=' + id);
  }
  update(docente: Docente, id: number) {
    return this.http.put(this.baseUrl +  id, docente );
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl  + id);
  }
}

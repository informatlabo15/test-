import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante';
import { filter, map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }

  baseUrl =  environment.apiUrl +  'Estudiante/';
  updateEstudiante(estudiante: any): any {
    throw new Error('Method not implemented.');
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register' , model );
  }
  getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrl );
  }
  getEstudiantesToList(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrl  + 'GetEstudiantesToList'  );
  }
  getEstudiantesByCarrera(carreraId): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrl + 'GetEstudiantesByCarrera'  + '?=' + carreraId);
  }
  getEstudiantesByGrupo(grupoId): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrl + 'GetEstudiantesByGrupo'  + '?=' + grupoId);
  }
  getEstudiantesByCarrera_Periodo(carreraId, periodoId): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.baseUrl + 'GetEstudiantesByCarrera'  + '?=' + carreraId);
  }

  getEstudiante(id): Observable<Estudiante> {
    return this.http.get<Estudiante>(this.baseUrl + 'GetEstudiante/' + id);
  }
  update(estudiante: Estudiante, id: number) {
    return this.http.put(this.baseUrl +  id, estudiante );
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl  + id);
  }
}

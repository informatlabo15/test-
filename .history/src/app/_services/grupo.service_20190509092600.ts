import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Grupo } from '../models/grupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

  baseUrl =  environment.apiUrl +  'Grupo/';
  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register' , model );
  }
  getGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.baseUrl );
  }
  getGruposByCarrera(id): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.baseUrl + 'GetGruposByCarrera'  + '?=' + id);
  }
  getGrupo(id): Observable<Grupo> {
    return this.http.get<Grupo>(this.baseUrl + 'GetGrupo/' + id);
  }
  update(grupo: Grupo, id: number) {
    return this.http.put(this.baseUrl +  id, grupo );
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl  + id);
  }
}

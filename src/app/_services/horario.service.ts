import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Horario } from '../models/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

  baseUrl =  environment.apiUrl +  'Horario/';
  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register' , model );
  }
  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.baseUrl );
  }
  getHorario(id): Observable<Horario> {
    return this.http.get<Horario>(this.baseUrl + 'GetHorario/' + id);
  }
  update(horario: Horario, id: number) {
    return this.http.put(this.baseUrl +  id, horario );
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl  + id);
  }
}

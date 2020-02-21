import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Periodo } from '../models/Periodo';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

  baseUrl =  environment.apiUrl +  'Periodo/';
  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register' , model );
  }
  getPeriodos(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(this.baseUrl );
  }
  getPeriodo(id): Observable<Periodo> {
    return this.http.get<Periodo>(this.baseUrl + 'GetPeriodo/' + id);
  }
  update(Periodo: Periodo, id: number) {
    return this.http.put(this.baseUrl +  id, Periodo );
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl  + id);
  }
}

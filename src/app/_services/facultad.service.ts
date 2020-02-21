import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Facultad } from '../models/facultad';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

 headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

  baseUrl =  environment.apiUrl +  'Facultad/';
  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register' , model );
  }
  getFacultades(): Observable<Facultad[]> {
    return this.http.get<Facultad[]>(this.baseUrl );
  }
  getFacultad(id): Observable<Facultad> {
    return this.http.get<Facultad>(this.baseUrl + 'GetFacultad/' + id);
  }
  update(facultad: Facultad, id: number) {
    return this.http.put(this.baseUrl +  id, facultad );
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl  + id);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Carrera } from '../models/carrera';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

 headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

  baseUrl =  environment.apiUrl +  'Carrera/';
  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register' , model );
  }
  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.baseUrl );
  }
  getCarrera(id): Observable<Carrera> {
    return this.http.get<Carrera>(this.baseUrl + 'GetCarrera/' + id);
  }
  update(carrera: Carrera, id: number) {
    return this.http.put(this.baseUrl +  id, carrera );
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl  + id);
  }

}

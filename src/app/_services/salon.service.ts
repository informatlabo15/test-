import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Salon } from '../models/salon';

@Injectable({
  providedIn: 'root'
})
export class SalonService {

headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

  baseUrl =  environment.apiUrl +  'Salon/';
  constructor(private http: HttpClient) { }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register' , model );
  }
  getSalones(): Observable<Salon[]> {
    return this.http.get<Salon[]>(this.baseUrl );
  }
  getSalon(id): Observable<Salon> {
    return this.http.get<Salon>(this.baseUrl + 'GetSalon/' + id);
  }
  update(salon: Salon, id: number) {
    return this.http.put(this.baseUrl +  id, salon );
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl  + id);
  }
}

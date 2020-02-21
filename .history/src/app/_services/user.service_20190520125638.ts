import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }
  register(model: any) {
    return this.http.post(this.baseUrl + 'auth/register', model, { headers: new HttpHeaders().set('Content-Type', 'application/json')
     });
  }
  update(user: User, id: number) {
    return this.http.put(this.baseUrl  + 'user/' +  id, user );
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/' + id);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'auth/');
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'user/'   + id);
  }
}

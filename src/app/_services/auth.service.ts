import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import { AuthUser } from '../models/authUser';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  userToken: any;
  decodedToken: any;
  currentUser: User;
  jwtHelper = new JwtHelperService();
  constructor(

    private http: HttpClient,
    private jwtHelperService: JwtHelperService,
    private router: Router)  { }

   login(model: any) {
    return this.http.
    post(this.baseUrl + 'login', model)
     .pipe(map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.tokenString);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
          this.currentUser = user.user;
        }
      })
    );
  }

  register(model: any) {
     return this.http.post(this.baseUrl + 'register' , model , {headers: new HttpHeaders()
      .set('Content-Type', 'application/json')});
  }

  loggedIn() {
    const token = this.jwtHelperService.tokenGetter();
    if (!token) {
      return false;
    }
    return !this.jwtHelperService.isTokenExpired(token);
  }
}

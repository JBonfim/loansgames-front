import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'http://localhost:5000/api/users/';
  baseURLLogin = 'http://localhost:5000/api/login'
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http
     .post(this.baseURLLogin, model).pipe(
       map((response: any) => {
         const user = response;
         if(user) {
           localStorage.setItem('token', user.accessToken);
           this.decodedToken = this.jwtHelper.decodeToken(user.accessToken);
          console.log(this.decodedToken)
         }
       })
     );
  }

  register(model: any) {
    return this.http.post(`${this.baseURL}`, model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}

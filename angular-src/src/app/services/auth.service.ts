import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authToken: any;
  user: any;
  expense: any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/users/register",user,{headers: headers})
    .pipe(map(res => res.json()));
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post("http://localhost:3000/users/authenticate",user,{headers: headers})
    .pipe(map(res => res.json()));
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
  //  console.log(this.authToken);
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get("http://localhost:3000/users/profile",{headers: headers})
    .pipe(map(res => res.json()));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token',token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    //console.log(user);
  }

  loadToken(){

    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    this.loadToken(); // Apparently F5 unsets the token otherwise :kasetti:
    const helper = new JwtHelperService();
    const token = this.authToken;
  //  console.log(token);

    return token != null && !helper.isTokenExpired(token);

  /*  if(this.authToken != undefined) { retarded

    if(helper.isTokenExpired(this.authToken)){
      return false;
    } else{
      return true;
    }
  }else {
    return true;
  }*/
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  }

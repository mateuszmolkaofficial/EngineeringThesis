import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {User} from "./user.model";

@Injectable()
export class AuthService {
  constructor(private _http: Http) { }

  createUser(user: User){
    console.log(user);
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3000/user/create',
      body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  signin(user:User){
    const body= JSON.stringify(user);
    const headers= new  Headers({'Content-Type': 'application/json'});
    return this._http.post('http://localhost:3000/user/signin',
      body, {headers: headers})
      .map((response: Response)=> response.json())
      .catch((error: Response)=> Observable.throw(error.json()) );

  }

  isLoggedIn(){
    return localStorage.getItem('token') !== null
  }
  logout(){
    localStorage.clear();
  }

  getCurrentUser(){
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') ? "?token="+localStorage.getItem('token'): '';
    return this._http.get('http://localhost:3000/user/currentuser/'+token)
      .map((response: Response)=>response.json())
      .catch((error: Response)=> Observable.throw(error.json()));
  }

  getUsers(){
    return this._http.get('http://localhost:3000/user/getusers')
      .map((response: Response) => {
        const users = response.json().obj;
        let transformedUsers: User[] = [];
        for (let user of users) {
          transformedUsers.push(new User(
            user.firstName,
            user.lastName,
            user.email,
            user.userName,
            user.password,
            user.type,
            user.imagename,
            user.imageext
            )
          );
        }
        return transformedUsers;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getUser(userName: string){
    return this._http.get('http://localhost:3000/user/getuser/'+userName)
      .map((response: Response)=>response.json())
      .catch((error: Response)=> Observable.throw(error.json()));
  }

  deleteUser(user: User){
    var userName= user.userName;
    return this._http.delete('http://localhost:3000/user/delete/' + userName)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}

import { Injectable } from '@angular/core';
import { Http } from "@angular/http"
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL: string = "http://localhost:3000";
 
constructor( private http:Http ) { }

//list all user when your role admin
getListUsers(){
  return this.http
  .get(`${this.BASE_URL}/userProfile`)
  .pipe(map(res => res.json()));
}
//list all details of user
getDetailsUsers(id) {
  return this.http
    .get(`${this.BASE_URL}/userProfile/${id}`)
    .pipe(map(res => res.json()));
}
// Edit user
editUser(user) {
  return this.http
    .put(`${this.BASE_URL}/userProfile/${user._id}`, user)
    .pipe(map(res => res.json()));
}

//Delete user when your role is admin
removeUser(id) {
  return this.http
    .delete(`${this.BASE_URL}/userProfile/${id}`)
    .pipe(map(res => res.json()));
} 

}

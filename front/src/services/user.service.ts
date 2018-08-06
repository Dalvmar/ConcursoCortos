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
  .get(`${this.BASE_URL}/api/profile`)
  .pipe(map(res => res.json()));
}
//details of user
getDetailsUsers() {
  return this.http
    .get(`${this.BASE_URL}/api/profile`)
    .pipe(map(res => res.json()));
}
get(id) {
  return this.http
    .get(`${this.BASE_URL}/api/profile/${id}`)
    .pipe(map(res => res.json()));
}
// Edit user
editUser(user) {
  return this.http
    .put(`${this.BASE_URL}/api/profile/edit/${user._id}`, user)
    .pipe(map(res => {console.log(user)
      res.json()}))
}

//Delete user when your role is admin
removeUser(id) {
  console.log(id)
  return this.http
    .delete(`${this.BASE_URL}/api/profile/delete/${id}`)
    .pipe(map(res => res.json()));
} 

}



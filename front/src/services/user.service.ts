import { Injectable } from '@angular/core';
import { Http } from "@angular/http"
import { map } from "rxjs/operators";
import { Observable } from "../../node_modules/rxjs";
import {environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  options:object = {withCredentials:true};
 
constructor( private http:Http ) { }

//list all user when your role admin
getListUsers(){
  return this.http
  .get(`${environment.BASEURL}/api/profile`)
  .pipe(map(res => res.json()));
}
//details of user
getDetailsUsers() {
  return this.http
    .get(`${environment.BASEURL}/api/profile`)
    .pipe(map(res => res.json()));
}
get(id) {
  return this.http
    .get(`${environment.BASEURL}/api/profile/${id}`)
    .pipe(map(res => res.json()));
}
// Edit user
editUser(user) {
  return this.http
    .put(`${environment.BASEURL}/api/profile/edit/${user._id}`, user)
    .pipe(map(res => {console.log(user)
      res.json()}))
}
signupAdmin(username:string,name:string,lastname:string,email:string, password:string): Observable<object>{
  return this.http.post(`${environment.BASEURL}/api/profile/newAdmin`,{username,name,lastname,email,password},this.options).pipe(
    map( (res:Response) => {
      let data = res.json();
      return data;
    }),
  
  )
}

//Delete user when your role is admin
removeUser(id) {
  console.log(id)
  return this.http
    .delete(`${environment.BASEURL}/api/profile/delete/${id}`)
    .pipe(map(res => res.json()));
} 

}




import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { environment } from '../environments/environment';
import {map, catchError} from 'rxjs/operators';
import { Observable } from "rxjs";
import { of } from 'rxjs';


const {BASEURL} = environment;

interface UserObject{
  username:string,
  name:string;
  lastname:string;
  email:string;
  logged:boolean
}


@Injectable(
{
  providedIn: 'root'
})
export class SessionService {

  user:UserObject;

  options:object = { withCredentials:true };

  constructor(private http:Http ) {
    this.isLogged().subscribe();
  }

  isLogged():Observable<UserObject>{
    return this.http.get(`${BASEURL}/api/auth/currentuser`,this.options).pipe(
      map( (res:Response) => {
        this.user = res.json();
        console.log(`Automatically login ${this.user.username}`);
        return this.user;
      }),
      catchError(e => {
        console.log("You have to login first!"); 

      return of(e)})
    );
  }
  isLoggedGuard(){
   return this.http.get(`${BASEURL}/api/auth/currentuser`,this.options)
  }

  login(username:string, password:string): Observable<object>{
    return this.http.post(`${BASEURL}/api/auth/login`,{username,password},this.options).pipe(
      map( (res:Response) => {
        let user = res.json();
        let status = res.json().status
        this.user = user;
        return this.user;
      }),
      catchError( e => 
        of(this.errorHandler(e))
      
      )
    )
  }
  
 
  signup(username:string,name:string,lastname:string,email:string, password:string,category:string): Observable<object>{
    return this.http.post(`${BASEURL}/api/auth/signup`,{username,name,lastname,email,password,category},this.options).pipe(
      map( (res:Response) => {
        let data = res.json();
        let status=res.json().status
        this.user = data.user;
        console.log(this.user)
        return this.user;
      }),
      catchError( e => of(this.errorHandler(e)))
    )
  }
  
  logout(){
    return this.http.get(`${BASEURL}/api/auth/logout`,this.options).pipe(
      map( (res:Response) => {
        this.user = null;
      }),
      catchError( e => of(this.errorHandler(e)))
    )
  }

  errorHandler(e){
    console.log('SessionServiceError')
    // console.log(e.message);
    console.log(e);
    return e;
  }

}

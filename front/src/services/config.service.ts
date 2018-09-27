import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { map } from "rxjs/operators";
import { Observable } from "../../node_modules/rxjs";
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

constructor(private http:Http) { }

getConfig(){
  return this.http
  .get(`${environment.BASEURL}/api/config` )
  .pipe(map(resp => 
    resp.json()
  ));

}

editConfig(config) {
  return this.http
    .put(`${environment.BASEURL}/api/config/${config._id}`, config)
    .pipe(map(res => {console.log(config)
      return res.json()}))
}
}

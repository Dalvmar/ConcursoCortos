import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators';


const apiUrl='https://api.microlink.io?url='
@Injectable({
  providedIn: 'root'
})
export class VideoService {
 apiUrl: string= 'https://api.microlink.io?url=';

constructor( private http:Http) { }

getVideo(id){
  
return this.http
.get(`${this.apiUrl}${id}`)
.pipe(map(res=>res.json()))
console.log(`${id}`)
}

}

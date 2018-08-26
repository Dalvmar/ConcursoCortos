import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class VideoService {

 
constructor( private http:Http) { }

getVideo(id){
    return this.http
      .get(`${environment.BASEURL}/api/video/${id}`)
      .pipe(map(res => {
        return res.json()
      }));
  }


  getUserVideos(userId) {
    return this.http
      .get(`${environment.BASEURL}/api/video/user/${userId}`)
      .pipe(map(res => res.json()));
  }

  //Todos los videos de todos los usuarios
  getlistVideos() {
     return this.http
      .get(`${environment.BASEURL}/api/video`)
      .pipe(map(res => res.json()));
  }
  newVideo(url,userId) {
    return this.http
      .post(`${environment.BASEURL}/api/video/new`, { url,userId })
      .pipe(map(res => res.json()));
  }

  //likes y unlikes
  saveLikes(videoId) {
    
    return this.http.post(`${environment.BASEURL}/api/video/${videoId}/like `,{})
      .pipe(map((res) => res.json()
     ));
    } 

    saveUnLikes(videoId) {
     
      return this.http.post(`${environment.BASEURL}/api/video/${videoId}/unlike `,{})
        .pipe(map((res) => res.json()
       ));
      } 

   
  //Delete 
  remove(id) {
    console.log(id)
    return this.http
      .delete(`${environment.BASEURL}/api/video/delete/${id}`)
      .pipe(map(res => res.json()));
  } 

 
}

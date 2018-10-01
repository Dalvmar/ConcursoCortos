import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators';
import {environment} from '../environments/environment';

import {catchError} from 'rxjs/operators';

import { of } from 'rxjs';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class VideoService {


 video;
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
  getlistVideos(since) {
      return this.http
      .get(`${environment.BASEURL}/api/video?desde=`+ since)
      .pipe(map(res => res.json()));
    
  }
  
  newVideo(url,userId) {

      return this.http
      .post(`${environment.BASEURL}/api/video/new`, { url,userId })
      .pipe(map((res) => {
        let data = res.json();
        let status=res.json().status;
        this.video=data.video
        swal('Video Insertado', this.video,'success');
        return this.video;
      }),
      catchError( e => of(this.errorHandler(e)))
      )
  

  }
  errorHandler(e){
    console.log('VideoServiceError')
    console.log(e);
    return e;
  }

  //likes y unlikes
  saveLikes(videoId) {
    
    return this.http.post(`${environment.BASEURL}/api/video/${videoId}/like `,{})
      .pipe(map((res) =>{return res.json()}
     ));
    } 

    saveUnLikes(videoId) {
     
      return this.http.post(`${environment.BASEURL}/api/video/${videoId}/unlike `,{})
        .pipe(map((res) => res.json()
       ));
      } 

   
  //Delete 
  remove(id) {
  
    return this.http
      .delete(`${environment.BASEURL}/api/video/delete/${id}`)
      .pipe(map(res => res.json()));
  } 

  //search videos
  searchVideos( termino: string ) {
      return this.http.get(`${environment.BASEURL}/api/search/coleccion/videos/`+ termino)
        .pipe(map((resp) => 
          resp.json()
        ));

  }
  
}

import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

 BASE_URL: string = "http://localhost:3000";
constructor( private http:Http) { }

getVideo(id){
    return this.http
      .get(`${this.BASE_URL}/api/video/${id}`)
      .pipe(map(res => res.json()));
  }


  getUserVideos(userId) {
    return this.http
      .get(`${this.BASE_URL}/api/video/user/${userId}`)
      .pipe(map(res => res.json()));
  }

  getVideos() {
    return this.http
      .get(`${this.BASE_URL}/api/video/list`)
      .pipe(map(res => res.json()));
  }
  newVideo(url,userId) {
    return this.http
      .post(`${this.BASE_URL}/api/video/new`, { url,userId })
      .pipe(map(res => res.json()));
  }

  remove(id) {
    return this.http
      .delete(`${this.BASE_URL}/api/video/delete/${id}`)
      .pipe(map(res => res.json()));
  } 

}

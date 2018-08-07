import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { map } from 'rxjs/operators';
import 'rxjs';
import {environment} from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {



  constructor(private http: Http) {}

  getComments(id) {
    return this.http.get(`${environment.BASEURL}/api/comments/video/${id}`)
      .pipe(map((res) => res.json()));
  }

  saveComment(videoId,comment, author) {
    return this.http.post(`${environment.BASEURL}/api/comments`,{ videoId, comment, author})
      .pipe(map((res) => res.json()));
  }
}
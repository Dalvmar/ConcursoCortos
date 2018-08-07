import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { map } from 'rxjs/operators';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: Http) {}

  getComments(id) {
    return this.http.get(`${this.BASE_URL}/api/comments/video/${id}`)
      .pipe(map((res) => res.json()));
  }

  saveComment(videoId,comment, author) {
    return this.http.post(`${this.BASE_URL}/api/comments`,{ videoId, comment, author})
      .pipe(map((res) => res.json()));
  }
}
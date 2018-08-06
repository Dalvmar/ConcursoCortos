import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { SessionService } from '../../services/session';
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';
import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';
import { PARAMETERS } from '../../../node_modules/@angular/core/src/util/decorators';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {

  videos;
  video;

  constructor(private videoService: VideoService, private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.getVideos()
  }
  getVideos(){

    this.sessionService.isLogged().subscribe(user=>{
      this.videoService.getlistVideos()
      .subscribe((data)=>{
      console.log(data)
      this.videos=data
    })
   })
  }

  deleteVideo(id) {

    this.videoService
       .remove(id)
       .subscribe(() => this.getVideos());
    }

}

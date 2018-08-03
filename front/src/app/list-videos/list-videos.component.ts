import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { SessionService } from '../../services/session';
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';


@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent implements OnInit {

  videos;
  dangerousUrl = 'javascript:alert("Hi there")';
  trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);

  constructor(private videoService: VideoService, private sessionService: SessionService, private sanitizer: DomSanitizer) {

    this.sessionService.isLogged().subscribe((user) => {
      this.videoService.getUserVideos(user._id)
        .subscribe(data => { 
          data.forEach(obj=>{
            console.log(obj.video)
            obj.video = obj.video.replace('watch?v=','embed/')
          })
          this.videos = data
          console.log(this.videos)
        })
    })

  }


  
  ngOnInit() {

  }



}

import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
// import { CommentService, CommentsService } from '../../services/comments.service';

import { Router, ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  video;
  videoUrl;
  replacevideourl;

  constructor(
  private videoService:VideoService,
  private router: Router,
  private route: ActivatedRoute,

  ) {

    this.route.params.subscribe(params =>{
      this.videoService.getVideo(params.id).subscribe(video => {
        this.video= video;
       
        if(this.video.video.includes('instagram')){
          this.replacevideourl=this.video.video + "embed"
        this.video.video=this.replacevideourl
        }else if (this.video.video.includes('youtube'))
        {
          this.replacevideourl=this.video.video.replace('watch?v=', 'embed/')
        this.video.video=this.replacevideourl
       
        } else if(this.video.video.includes('vimeo')) {
          this.replacevideourl=this.video.video.replace('https://vimeo.com', 'https://player.vimeo.com/video')
          this.video.video=this.replacevideourl

        }
      
        
      })
    }); 
  }
  

  ngOnInit() {}

  deleteVideo() {
    this.videoService
       .remove(this.video._id)
       .subscribe((params) => {
         this.router.navigate(["profile"])
      });
       
    }
}

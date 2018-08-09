import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
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
  private route: ActivatedRoute
  ) {

    this.route.params.subscribe(params =>{
      this.videoService.getVideo(params.id).subscribe(video => {
        this.video= video;
        // console.log(this.video)
        this.replacevideourl=this.video.video.replace('watch?v=', 'embed/')
        console.log(this.replacevideourl)
        this.video.video=this.replacevideourl
        // this.replacevideourl=this.videoUrl.replace('watch?v=', 'embed/')
        // console.log(this.replacevideourl)
        
      })
    }); 
  }
  

  ngOnInit() {}

  deleteVideo() {
    this.videoService
       .remove(this.video._id)
       .subscribe(() => this.router.navigate(["profile"]));
    }
}


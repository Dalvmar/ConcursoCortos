import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
videos: Array<any>;

  constructor(private videoService : VideoService) { 

    // this.videoService.getVideos()
    // .subscribe(data => { 
    //   data.forEach(obj=>{
    //     console.log(obj.video)
    //     obj.video = obj.video.replace('watch?v=','embed/')
    //   })
    //   this.videos = data
    //   console.log(this.videos)
    // }) 
  }

  ngOnInit() {
  }

}

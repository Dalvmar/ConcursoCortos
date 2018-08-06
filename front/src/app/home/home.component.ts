import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
videoList: Array<any>;

  constructor(private videoService:VideoService) { }

  
  ngOnInit() {
    this.getlistVideo()
  }

getlistVideo(){
  this.videoService.getlistVideos().subscribe(data => {
    data.forEach(obj => {
      console.log(obj.video)
      obj.video = obj.video.replace('watch?v=', 'embed/')
    })
   
    this.videoList = data;
    console.log(this.videoList)
})
}

}

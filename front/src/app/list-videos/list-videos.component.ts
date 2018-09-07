import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { SessionService } from '../../services/session.service';
import { CommentsService } from '../../services/comments.service';
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
  totalvideos:number=0;
  since: number = 0;
  loading: boolean = true;

  constructor(private videoService: VideoService, private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private commentsService: CommentsService
  ) {}
  
  ngOnInit() {
    this.getVideos()
  }
  getVideos(){
    this.loading=true;
    // this.sessionService.isLogged().subscribe(user=>{
      this.videoService.getlistVideos(this.since)
      .subscribe((data)=>{
      console.log(data)
       this.totalvideos=data.total;
      this.videos=data.videos
      this.loading=false;
    })
  //  })
  }
  getComments(idvideo){
    this.commentsService.getComments(idvideo).subscribe((data)=>{
      console.log()
    })
  }

  deleteVideo(id) {
    this.videoService
       .remove(id)
       .subscribe(() => {
        swal('Video borrado', 'El video a sido eliminado correctamente', 'success');
                  
        this.getVideos()});
    }


    cambiarDesde( valor: number ) {

      let desde = this.since + valor;
  
      if ( desde >= this.totalvideos ) {
        return;
      }
  
      if ( desde < 0 ) {
        return;
      }
  
      this.since += valor;
      this.getVideos();
  
    }

    
    // searchVideo( termino: string ) {
  
    //   if ( termino.length <= 0 ) {
    //     this.getVideos();
    //     return;
    //   }
  
    //   this.loading = true;
  
    //   this.videoService.searchVideos( termino )
    //           .subscribe( (videos) => {
  
    //             this.videos = videos;
    //             this.loading = false;
    //           });
  
    // }


}

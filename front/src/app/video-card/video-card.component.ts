
import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { CommentsService } from '../../services/comments.service';
import { SessionService } from '../../services/session.service';
import {Videos} from '../../../../server/models/Videos.js';
import { DomSanitizer} from '@angular/platform-browser';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {
  @ViewChild('commentvideo') commentvideo;
	videoList:Videos[]=[];
	videos: Videos[]=[];
	@Input()video;
	comments;
	comment;
	countComments:number=0;
	user;
	search:String;
	since: number = 0;
	hidden:boolean=false;
	status;
	totalVideos:number=0;
	loading: boolean = true;
	@Input() likes =0;
	@Input() unlikes =0;
	totalvideos:number=0;
	url;

  
  constructor(
    private videoService: VideoService,
		private commentsService: CommentsService,
		private sessionService: SessionService,private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getlistVideo();
	

		this.sessionService.isLogged().subscribe(user=>{
			this.user=user
			// console.log(this.user.status)
			if(this.user.status===500){
				this.hidden=false
		
			}else
			this.hidden=true;
			;
		
		})
		this.hidden=false;
  }

  getlistVideo() {	

			this.loading=true;
		this.videoService.getlistVideos(this.since).subscribe((data) => {
			data.videos.forEach((obj) => {
				if (obj.video.includes('instagram')) {
					obj.video = obj.video + "embed";
					
				} else if (obj.video.includes('youtube')) {
					obj.video = obj.video.replace('watch?v=', 'embed/');

			
					console.log(obj.video + 'hola')
					
				} else if (obj.video.includes('vimeo')) {
					obj.video = obj.video.replace('https://vimeo.com', 'https://player.vimeo.com/video')
				
				}

			});
			
			this.totalVideos = data.total;
			this.videoList = data.videos;
			this.loading=false;
		});
	
	}
	
	toggleHidden(e,i) {
		[].slice.call(e.currentTarget.closest('.info').childNodes).forEach(e=>{
			if(e.classList.contains('comment-input')) e.classList.toggle('active')
		})
	}

	saveComment(videoId, comment, i, Value:HTMLInputElement) {
		this.commentsService.saveComment(videoId, comment, this.user._id)
		.subscribe(video => {
			this.videoList[i].commment = video.commment;
			Value.value=null;
		})
	}


	 like (videoId,i) { 
		this.videoService.saveLikes( videoId)
		.subscribe(video=>{
		
			 this.videoList[i].like=video.like +1;

			 swal('LIKE', ':)', 'success');
			
		})
		}

	 unlike (videoId ,i) {
		this.videoService.saveUnLikes(videoId)
		.subscribe(video=>{
		this.videoList[i].unlike=video.unlike+1;
		swal('UNLIKE', ':(', 'error');
			 
		})
	
		}

		cambiarDesde( valor: number ) {

		let since = this.since + valor;
	
		if ( since >= this.totalVideos ) {
		  return;
		}
	
		if ( since < 0 ) {
		  return;
		}
	
		this.since += valor;
		this.getlistVideo();
	
		}
	

		searchVideo( termino: string ) {
      if ( termino.length <= 0 ) {
        this.getlistVideo();
        return;
      }
  
      	this.loading = true;
      	this.videoService.searchVideos(termino).subscribe((resp)=>{
        // console.log(resp)
        this.videoList = resp.videos;
         this.totalvideos= resp.videos.length;
        this.loading = false;
      })
    }


}

import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { CommentsService } from '../../services/comments.service';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {
	videoList: Array<any>;
	video;
	comments;
	comment;
	countComments:number=0;
	user;
	search:String;

	hidden:boolean=false;
	status;
	contLike:number=1;
	likes:number=0;
	unlikes:number=0;

	constructor(
		private videoService: VideoService,
		private commentsService: CommentsService,
		private userService: UserService,
		private sessionService: SessionService
	) {}

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
		
		this.videoService.getlistVideos().subscribe((data) => {
		
			data.forEach((obj) => {
				if (obj.video.includes('instagram')) {
					obj.video = obj.video + "embed";
					
				} else if (obj.video.includes('youtube')) {
					obj.video = obj.video.replace('watch?v=', 'embed/');
				} else if (obj.video.includes('vimeo')) {
					obj.video = obj.video.replace('https://vimeo.com', 'https://player.vimeo.com/video')
				}

				console.log(obj)
			});
			this.videoList = data;
		
			console.log(this.videoList)
		});
	}
	
	toggleHidden(e,i) {
		[].slice.call(e.currentTarget.closest('.info').childNodes).forEach(e=>{
			if(e.classList.contains('comment-input')) e.classList.toggle('active')
		})
	}


	saveComment(videoId, comment, i) {
		this.commentsService.saveComment(videoId, comment, this.user._id)
		.subscribe(video => {
			console.log(video)
			this.comment=''
			this.videoList[i].commment = video.commment;
		})
	}

	
	
	like (videoId) { 
		console.log(videoId)
		
		this.videoService.saveLikes( videoId)
		.subscribe(video=>{
			console.log(video.like);
			 this.likes=video.like;
		})
	
		}

			
	unlike (videoId) { 
		console.log(videoId)
		
		this.videoService.saveUnLikes(videoId)
		.subscribe(video=>{
			console.log(video);
			 this.unlikes=video.unlike;
		})
	
		}
	// unlike(videoId){
	// 	this.unlikes+=1;
	// 	console.log(this.unlikes)
	// 	}

		// like(videodId,newlike,i){

		// 	this.videoService.saveLikes(videodId,newlike).subscribe(video=>{
		// 		console.log(video + 'hola')
		// 		this.video.likes[i]=1
		// 	});
		// }
}

import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { CommentsService } from '../../services/comments.service';
import { SessionService } from '../../services/session';
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
	countComments:number=0;
	user;
	search:String;
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
		})
	}

	getlistVideo() {
		this.videoService.getlistVideos().subscribe((data) => {
			data.forEach((obj) => {
				obj.video = obj.video.replace('watch?v=', 'embed/');
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

	// refreshComments(videoId) {
	// 	console.log(videoId)
	// 	this.commentsService.getComments(videoId).subscribe((comment) => {
	// 		this.comments = comment
		
	// 	});
	// }

	saveComment(videoId, comment, i) {
		this.commentsService.saveComment(videoId, comment, this.user._id)
		.subscribe(video => {
			this.videoList[i].commment = video.commment;
		})
	}

	addAdmin(username: string, name: string, lastname: string, email: string, password: string) {
		this.userService.signupAdmin(username, name, lastname, email, password).subscribe()
	}
}

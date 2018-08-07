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
	isVisible: Boolean = false;
	video;
	comments;
	textComment;
	user;
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
			});
			this.videoList = data;
			console.log(this.videoList)
		});
	}
	toggleHidden(e) {
		this.isVisible = !this.isVisible;
	}

	refreshComments(videoId) {
		this.commentsService.getComments(videoId).subscribe((comments) => (this.comments = comments));
	}

	saveComment(videoId, comment) {
		
		this.commentsService.saveComment(videoId, comment, this.user._id)
		.subscribe(videos => {
			
			
			this.textComment = '';
    	});
	}

	addAdmin(username: string, name: string, lastname: string, email: string, password: string) {
		this.userService.signupAdmin(username, name, lastname, email, password).subscribe()
	}
}

import { Component, OnInit,Input } from '@angular/core';
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
	@Input()video;
	comments;
	comment;
	countComments:number=0;
	user;
	search:String;

	hidden:boolean=false;
	status;
	// contLike:number=1;
	@Input() likes =0;
	@Input() unlikes =0;

	constructor(
		private videoService: VideoService,
		private commentsService: CommentsService,
		private userService: UserService,
		private sessionService: SessionService
	) {}

	ngOnInit() {
		
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

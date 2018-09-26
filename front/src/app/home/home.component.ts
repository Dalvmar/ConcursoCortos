import { Component, OnInit,Input } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { CommentsService } from '../../services/comments.service';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import {Videos} from '../../../../server/models/Videos.js';



@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
})
export class HomeComponent implements OnInit {

	@Input()video;
	role;
	user;
	search:String;
	hidden:boolean=false;
	status;
	isVisible: Boolean = false;
	isVisibleAdmin: Boolean = false;

	constructor(
		private videoService: VideoService,
		private commentsService: CommentsService,
		private userService: UserService,
		private sessionService: SessionService
	) {
	this.sessionService.isLogged()
    .subscribe(user=>{
	
		this.user=user;
		this.role=user.role;
	})
	}

	ngOnInit() {
		
	}
	toggleHidden(e) {
		if(this.isVisibleAdmin!=true)
		this.isVisible = !this.isVisible;
	}
			

	
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { SessionService } from '../../services/session.service';
import { VideoService } from '../../services/video.service';
import { NewVideoComponent } from '../new-video/new-video.component';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
	@ViewChild(NewVideoComponent) NewVideoChild:NewVideoComponent;
	user;
	videoUrl: String;
	isVisible: Boolean = false;
	isVisibleAdmin: Boolean = false;
  	videoList;
	loading:boolean;
	  since: number = 0;
	  
	constructor(
		private sessionService: SessionService,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private videoService: VideoService
	) {}

	ngOnInit() {
		this.sessionService.isLogged().subscribe((user) => {
			this.loading=true;
			this.user = user;
			if(this.user.role==='user'){
			this.videoService.getUserVideos(this.user._id).subscribe(data => {
				data.forEach(obj => {
					console.log(obj.video)
					obj.video = obj.video.replace('watch?v=', 'embed/')
				})
				this.videoList = data
				this.loading=false
				console.log(this.videoList)
			
			});
		}else {
			console.log("admin")
			this.videoService.getlistVideos(this.since).subscribe(data => {
				data.videos.forEach(obj => {
					console.log(obj.video)
					obj.video = obj.video.replace('watch?v=', 'embed/')
				})
				this.videoList = data.videos
				console.log(this.videoList)
		})
	     }
		});
	}
	toggleHidden(e) {
		if(this.isVisibleAdmin!=true)
		this.isVisible = !this.isVisible;
	}
	toggleHiddenAdmin(e) {
		if(this.isVisible!=true)
		this.isVisibleAdmin = !this.isVisibleAdmin;
	}
	
	saveVideo() {
		this.videoService.newVideo(this.videoUrl,this.user._id).subscribe(() => {
			console.log(this.videoUrl);
			this.videoUrl = '';
			this.NewVideoChild.ngOnInit();
		
		});
	}

	refreshAdmin() {
		this.userService.getUserNewDetails(this.user._id)
        .subscribe(data => { 
			console.log(data)
          this.user = data
          console.log(this.user)
	  })
	}
	
	
}




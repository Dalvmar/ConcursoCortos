import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { SessionService } from '../../services/session';
import { VideoService } from '../../services/video.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
})
export class ProfileComponent implements OnInit {
	user;
	videoUrl: String;
	isVisible: Boolean = false;
	isVisibleAdmin: Boolean = false;
  videoList;
	constructor(
		private sessionService: SessionService,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private videoService: VideoService
	) {}

	ngOnInit() {
		this.sessionService.isLogged().subscribe((user) => {
			this.user = user;
			if(this.user.role==='user'){
			this.videoService.getUserVideos(this.user._id).subscribe(data => {
				data.forEach(obj => {
					console.log(obj.video)
					obj.video = obj.video.replace('watch?v=', 'embed/')
				})
				this.videoList = data
				console.log(this.videoList)
			
			});
		}else {
			console.log("admin")
			this.videoService.getlistVideos().subscribe(data => {
				data.forEach(obj => {
					console.log(obj.video)
					obj.video = obj.video.replace('watch?v=', 'embed/')
				})
				this.videoList = data
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
	edit(user) {
		this.userService.editUser(this.user).subscribe((user) => {
			this.user = user;
			// console.log(user)
			// this.router.navigate([ '/profile']);
		});
	}

	saveVideo() {
		this.videoService.newVideo(this.videoUrl,this.user._id).subscribe(() => {
			console.log(this.videoUrl);
			this.videoUrl = '';
			this.refreshVideo()
			this.router.navigate([ '/profile' ]);
		});
	}

	refreshVideo() {
		this.videoService.getUserVideos(this.user._id)
        .subscribe(data => { 
          data.forEach(obj=>{
            // console.log(obj.video)
            obj.video = obj.video.replace('watch?v=','embed/')
          })
          this.videoList = data
        //   console.log(this.videoList)
	  })
	}
	refreshAdmin() {
		this.userService.getUserNewDetails(this.user._id)
        .subscribe(data => { 
			console.log(data)
          this.user = data
          console.log(this.user)
	  })
	}
	addAdmin(usernameAdmin:string,nameAdmin:string,lastnameAdmin:string,passwordAdmin:string,emailAdmin:string){
		if(!usernameAdmin|| !nameAdmin || !lastnameAdmin || !passwordAdmin ||!emailAdmin)
		this.router.navigate(['/profile']);
		else{
		this.userService.signupAdmin(usernameAdmin,nameAdmin,lastnameAdmin,emailAdmin,passwordAdmin)
		.subscribe( (user:any) =>{
			console.log(user);
			//this.router.navigate(['/profile']);
		})
	}
	}
	
}

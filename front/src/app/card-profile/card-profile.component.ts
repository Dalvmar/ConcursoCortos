import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ActivatedRoute, Router } from 'node_modules/@angular/router/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.css']
})
export class CardProfileComponent implements OnInit {

  user;
	videoUrl: String;
	isVisible: Boolean = false;
	isVisibleAdmin: Boolean = false;
  videoList;
  since: number= 0;
  constructor(private sessionService: SessionService,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private videoService: VideoService) { }


    
  ngOnInit() {

    this.sessionService.isLogged().subscribe((user) => {
      this.user = user;
      if (this.user.role === 'user') {
        this.videoService.getUserVideos(this.user._id).subscribe(data => {
          data.forEach(obj => {
       
            obj.video = obj.video.replace('watch?v=', 'embed/')
          })
          this.videoList = data;
        

        });
      } else {
       
        this.videoService.getlistVideos(this.since).subscribe(data => {
          data.videos.forEach(obj => {
         
            obj.video = obj.video.replace('watch?v=', 'embed/')
          })
          this.videoList = data.videos
         
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
      this.toggleHidden(this)
	
		});
	}

  addAdmin(usernameAdmin:string,nameAdmin:string,lastnameAdmin:string,passwordAdmin:string,emailAdmin:string){

		if(!usernameAdmin|| !nameAdmin || !lastnameAdmin || !passwordAdmin ||!emailAdmin)
		this.router.navigate(['/profile']);
		else{
		this.userService.signupAdmin(usernameAdmin,nameAdmin,lastnameAdmin,emailAdmin,passwordAdmin)
		.subscribe( (user:any) =>{

      this.toggleHiddenAdmin(this)
			//this.router.navigate(['/profile']);
		})
	}
	}
}

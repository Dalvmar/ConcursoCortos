
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-card-profile',
  templateUrl: './user-card-profile.component.html',
  styleUrls: ['./user-card-profile.component.css']
})
export class UserCardProfileComponent implements OnInit {

  user;
  pass;
	videoUrl: String;
	isVisible: Boolean = false;
	isVisibleAdmin: Boolean = false;
  videoList;
  since: number= 0;
  addForm: FormGroup;
  constructor(private sessionService: SessionService,
		private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
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
  
	edit(user,newpass,oldpass) {
 const userEdit={
   oldpass,
   newpass,
   user
 }

		this.userService.editUser(userEdit).subscribe((user) => {
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

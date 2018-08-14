import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-Card-Profile',
  templateUrl: './Card-Profile.component.html',
  styleUrls: ['./Card-Profile.component.css']
})
export class CardProfileComponent implements OnInit {

  user;
	videoUrl: String;
	isVisible: Boolean = false;
	isVisibleAdmin: Boolean = false;
  videoList;
  constructor(private sessionService: SessionService,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private videoService: VideoService) { }

  
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

}

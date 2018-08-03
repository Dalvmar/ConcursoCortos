import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { SessionService } from '../../services/session';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  videoUrl:String;
  isVisible:Boolean=false;

  constructor(private sessionService:SessionService , 
    private route:ActivatedRoute,
    private router: Router,private userService:UserService,
    private videoService:VideoService
  ) {}
  
  ngOnInit() {
    this.sessionService.isLogged().subscribe(user => {
      this.user = user
      console.log(this.user)
    })
  }
  toggleHidden(e){
    this.isVisible=!this.isVisible;
  }
  edit(user) {
    this.userService.editUser(this.user).subscribe(user => {
      this.user = user;
      this.router.navigate(["/profile"]);
    });

}

saveVideo(){
this.videoService.newVideo(this.videoUrl).subscribe(()=>{
  console.log(this.videoUrl)
  this.videoUrl= '';
  this.router.navigate(['/profile'])})
}

}
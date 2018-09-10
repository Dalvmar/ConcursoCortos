import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-new-video',
  templateUrl: './new-video.component.html',
  styleUrls: ['./new-video.component.css']
})
export class NewVideoComponent implements OnInit {
  user;
  videoList;
  @Input() video: any = {};
  @Input() index: number;

  @Output() videoSeleccionado: EventEmitter<number>;

  constructor(private router:Router, private sessionService:SessionService, private userService:UserService,
  private videoService:VideoService,  ) {
      this.videoSeleccionado=new EventEmitter();
   }

  ngOnInit() {
    this.sessionService.isLogged().subscribe((user) => {
			this.user = user;
			if(this.user.role==='user'){
			this.videoService.getUserVideos(this.user._id).subscribe(data => {
				data.forEach(obj => {
				
					obj.video = obj.video.replace('watch?v=', 'embed/')
				})
				this.videoList = data
		
			
			});
  }

})}
  

}

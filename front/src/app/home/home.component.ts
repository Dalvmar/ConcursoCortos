import { Component, OnInit,Input } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { ConfigService } from '../../services/config.service';



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
	config;
	data;
	visible;
	isVisible: Boolean = true;
	isVisibleAdmin: Boolean = false;

	constructor(
		private videoService: VideoService,
		private userService: UserService,
		private sessionService: SessionService,
		private configService:ConfigService

	) {
	this.sessionService.isLogged()
    .subscribe(user=>{
	
		this.user=user;
		this.role=user.role;
	})
	
	this.configService.getConfig().subscribe(config=>{
		this.visible=config.config[0].enableVideos;
		
	})
	}

	ngOnInit() {
		
	}

	toggleHidden(e) {
		if (this.role==='admin'){
		this.configService.getConfig().subscribe((config) => {
			this.data=config.config[0];
			if(this.data.enableVideos===true)
			{				
				this.data.enableVideos=false;
				this.visible=false;
			}
			else
			{
				this.data.enableVideos=true;
				this.visible=true;
			}
			this.configService.editConfig(this.data).subscribe()
		});
	}
	
	}

}

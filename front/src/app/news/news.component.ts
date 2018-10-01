import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { NewService } from '../../services/new.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  user:any;
  role;

  loading: boolean = true;
  
  constructor( private sessionService:SessionService, private newService:NewService) { 
    this.sessionService.isLogged()
    .subscribe(user=>{
      this.role=user.role;
      this.user=user;
  
    })
    
  }

  ngOnInit() {

  }



}

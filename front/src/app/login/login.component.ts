import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private sessionService:SessionService, private router:Router) { }
  message
  ngOnInit() {
  }

  login(username:string, password:string){
  
    this.sessionService.login(username,password).subscribe( user => {
     
      if(user['status']>=500) {
        this.message = 'Campos sin rellenar o campos erroneos'
   } 
      else {
        this.router.navigate(['profile'])
      }; 
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  message;
  constructor(private sessionService:SessionService, private router:Router) { }

  ngOnInit() {
  }

  signup(username:string,name:string,lastname:string,email:string,password:string,category:string ){
    console.log("signup....");
    this.sessionService.signup(username,name,lastname,password,email,category).subscribe( (user:any) =>{
      console.log(user['status'])
      if(user['status']>=500) {
        this.message = 'Campos sin rellenar o campos erroneos'
      }
      else{
      console.log(`WELCOME USER ${user.username}, register OK`);
      console.log(user);
      this.router.navigate(['/profile']);
    }
    });
  }
}

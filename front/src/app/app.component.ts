import { Component } from '@angular/core';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  user;
  // title = 'Concurso de Cortos';
  
 constructor(private sessionService:SessionService) { 
  //  this.sessionService.isLogged().subscribe(user=>this.user=user);

 
  };

  // logout(){
  //   this.sessionService.logout().subscribe();
  // }
}


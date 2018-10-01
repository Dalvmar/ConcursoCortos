import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  user;
  title = 'Concurso de Cortos';
  
  constructor(private sessionService:SessionService) { 
  // this.sessionService.isLogged()
  // .subscribe(user=>this.user=user)

};

  logout(){
    this.sessionService.logout().subscribe();
  }
}

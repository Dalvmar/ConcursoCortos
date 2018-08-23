import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
users;
  constructor( private  userService:UserService,private sessionService:SessionService, 
    private route: ActivatedRoute,
    private router: Router) {}

getUsers(){
  this.sessionService.isLogged().subscribe(user=>{
    this.userService.getListUsers()
    .subscribe((data)=>{
    console.log(data)
    this.users=data
  })
 })
}
    
  ngOnInit() {
    this.getUsers()
  }

  deleteUser(id) {
    this.userService
       .removeUser(id)
       .subscribe(() => this.getUsers());
    }
}

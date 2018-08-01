import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-profileUser',
  templateUrl: './profileUser.component.html',
  styleUrls: ['./profileUser.component.css']
})
export class ProfileUserComponent implements OnInit {
 user;
  constructor(private userService: UserService,private route: ActivatedRoute,private router:Router ) { 
     this.route.params.subscribe(params=> this.userService
     .getDetailsUsers(params.id)
     .subscribe(user =>{this.user=user}) )
  }

  ngOnInit() {
  }

  submit() {
    this.userService.editUser(this.user).subscribe(user => this.router.navigate(['userProfile', user._id]));
  }
}

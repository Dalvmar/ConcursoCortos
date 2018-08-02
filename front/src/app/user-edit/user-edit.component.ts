import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    public sessionService: SessionService,private router:Router ) { 
      this.route.params.subscribe(params =>
        this.userService.get(params.id).subscribe(user => {
          this.user = user;
        })
      );
    }
      ngOnInit() {
  }

  edit(user) {
    this.userService.editUser(this.user).subscribe(user => {
      this.user = user;
      this.router.navigate(["/profile"]);
    });
  }
}


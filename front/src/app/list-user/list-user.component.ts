import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { VideoService } from '../../services/video.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
users;
user;
since: number= 0;
totalUsuarios:number= 0;
cargando:boolean= true;
data;
videos;
  constructor( private  userService:UserService,private sessionService:SessionService, 
    private route: ActivatedRoute,
    private router: Router,
  private videoService:VideoService) {}



  ngOnInit() {
    this.getUsers()
    
  }

  getUsers(){
    this.cargando = true;
    this.sessionService.isLogged().subscribe(user=>{
      this.userService.getListUsers(this.since)
      .subscribe((data:any)=>{
      console.log(data )
       this.totalUsuarios=data.total;
      this.users=data.users
      this.cargando = false;
    })
   })
  }

  deleteUser(id) {
    this.videoService.getUserVideos(id)
    .subscribe((data)=>
  {
    data.forEach(obj => {
      console.log(obj.video)
      this.videoService.remove(obj.author)
    });
  })
    this.userService
       .removeUser(id)
       .subscribe(() => this.getUsers());
    }

    searchUser( termino: string ) {

      if ( termino.length <= 0 ) {
        this.getUsers();
        return;
      }
  
      this.cargando = true;
  
      this.userService.searchUser( termino )
              .subscribe( (user) => {

                this.user = user;
                this.cargando = false;
              });
  
    }

    cambiarDesde( valor: number ) {

      let since = this.since + valor;
  
      if ( since >= this.totalUsuarios) {
        return;
      }
  
      if ( since < 0 ) {
        return;
      }
  
      this.since += valor;
      this.getUsers();
  
    }
   

    }

    


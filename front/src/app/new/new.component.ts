import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { NewService } from '../../services/new.service'
import { Router } from '../../../node_modules/@angular/router';

import { ModalUploadService } from '../modal-upload/modal-upload.service';

 declare var swal:any
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  user;
  noticia;
  noticias;
  imagenSubir:File;
  message;

  constructor( private sessionService:SessionService, 
    private newService:NewService,

    private modalUploadService:ModalUploadService) { 

    this.sessionService.isLogged()
    .subscribe(user=>{
      this.user=user;
  
    })
    
  }

  ngOnInit() {
    this.noticia=this.newService.noticia;
    this.cargarNoticias();
    this.modalUploadService.notificacion
    .subscribe( (resp) => this.cargarNoticias() );
}
  

  crearNoticia(title:string,description:string ){
    this.newService.crearNoticia(title,description).subscribe(() => this.cargarNoticias());
  }

  cargarNoticias() {
    this.newService.cargarNoticias()
            .subscribe( noticias => {
              this.noticias = noticias.noticias;
            console.log(this.noticias)
            });
  }
  mostrarModal( id: string ) {

    this.modalUploadService.mostrarModal( 'news', id );
  }
  
  guardarNoticia(noticia) {

    this.newService.actualizarNotica( noticia )
            .subscribe();

  }

  borrarNoticia( noticia ) {

    this.newService.borrarNoticia( noticia._id )
            .subscribe( () =>  this.cargarNoticias() );

  }

  actualizarImagen( noticia) {

    this.modalUploadService.mostrarModal( 'news', noticia._id );

  }

 
}

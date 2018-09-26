import { Injectable } from '@angular/core';
import { New } from '../../../server/models/News.js';
import { Http, Response } from "@angular/http";
import { environment } from '../environments/environment';
import {map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import swal from 'sweetalert';
const {BASEURL} = environment;

@Injectable({
  providedIn: 'root'
})
export class NewService {
noticia;
noticias:New[]= [] ;
totalNoticias: number = 0;

constructor(private http:Http) {

}


cargarNoticias( ) {
  return this.http.get(`${BASEURL}/api/news/`).pipe(
            map( (data:any) => {
              let json=JSON.parse(data._body);
             return json;
           
             }));

}

obtenerNoticia( id:string) {
  return this.http.get( `${BASEURL}/api/news/` + id ).pipe(
            map( (resp: any) => {
            resp.noticias }));

}


borrarNoticia(id:string){
  return this.http.delete( `${BASEURL}/api/news/` + id ).pipe(
    map( (resp: any) => {
      swal('Noticia borrada','Elimina','succes')
      
       resp.noticia }));
 }

crearNoticia(title:string,description:string){
  return this.http.post(`${BASEURL}/api/news/`,{title,description}).pipe(
    map( (res:Response) => {
      swal('Noticia creada', title, 'success' );
      return res;
    }),
    catchError( e => of(this.errorHandler(e)))
  )
}
errorHandler(e){
  console.log('NewServiceError')
  console.log(e);
  return e;
}

 actualizarNotica(noticia){
  return this.http.put( `${BASEURL}/api/news/` + noticia._id, noticia ).pipe(
    map( (resp: any) => {
      console.log(BASEURL)
      swal('Noticia Actualizado', noticia.title, 'success');
               
       resp.noticia }));
 }


}

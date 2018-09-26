import { Injectable } from '@angular/core';

import {environment} from '../environments/environment';
const {BASEURL} = environment;

@Injectable()
export class SubirArchivoService {

  constructor() { }


  subirArchivo( archivo: File, tipo: string, id: string ) {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'img', archivo, archivo.name );

      xhr.onreadystatechange = function() {
console.log(xhr)
        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };

      let url = BASEURL + '/api/uploads/' + tipo + '/' + id;
     console.log(url)
      xhr.open('PUT', url, true );
      xhr.send( formData );

    });




  }

}
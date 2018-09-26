import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
const {BASEURL} = environment;

@Pipe({
  name: 'imagen'
})

export class ImagenPipe implements PipeTransform {


  transform( img: string, tipo: string = 'news'): any {
 
    console.log("funciona pipe")

    let url = BASEURL + '/api/images';


    if ( !img) {
      return url + '/news/xxx';
    }

    switch ( tipo ) {

      case 'news':
        url += '/news/' + img;
        console.log(url)
      break;


      default:
        console.log('tipo de imagen no existe');
        url += '/news/xxx';
    }

    return url;
  }
}

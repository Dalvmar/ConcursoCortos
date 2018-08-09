import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
    transform(input:any, search:string): any {
        if ( !input || !search ) {
            return input;
        }

        return input.filter(cortos =>
           
            cortos.creator.toLowerCase().includes(search.toLowerCase())
        
        );
        }
    
}

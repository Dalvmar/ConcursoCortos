import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
    transform(input:any, search:string,array:any[]): any {
        if ( !input || !search ) {
            return input;
        }

        return input.filter(videos =>
           
            videos.creator.toLowerCase().includes(search.toLowerCase().indexOf(search)>-1)
        
        );
        }
    
}

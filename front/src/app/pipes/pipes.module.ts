import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagenPipe } from './imagen.pipe';
import { SafePipe } from './safe.pipe';
import { SearchFilterPipe } from './search.pipe';
import { OrderByPipe } from './order-by.pipe';



@NgModule({
  imports: [],
  declarations:[
      ImagenPipe,SafePipe,SearchFilterPipe,OrderByPipe
  ],
  exports: [
    ImagenPipe,
    SafePipe,
    SearchFilterPipe,OrderByPipe
],
})
export class PipeModule { }


import { Component, OnInit } from '@angular/core';
import { NewService } from '../../services/new.service';
import { News} from '../../../../server/models/News.js';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {
  news: News[]=[];
  video;
  totalnews:number=0;

  loading: boolean = true;
  constructor( private newService:NewService) { }

  ngOnInit() {
    this.getNoticias()
  }
  getNoticias(){
    this.loading=true;
    // this.sessionService.isLogged().subscribe(user=>{
      this.newService.cargarNoticias()
      .subscribe((data)=>{
    
      this.totalnews=data.total;
      this.news=data.noticias
      this.loading=false;
    })

}
}

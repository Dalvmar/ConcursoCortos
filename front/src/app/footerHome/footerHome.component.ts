import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footerHome',
  templateUrl: './footerHome.component.html',
  styleUrls: ['./footerHome.component.css']
})
export class FooterHomeComponent implements OnInit {
anio:number;

  constructor() { 
    this.anio=new Date().getFullYear();
  }

  ngOnInit() {
  }

}

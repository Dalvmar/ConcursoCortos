import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '../../node_modules/@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import {ReactiveFormsModule} from "@angular/forms";
//Rutas
import { routes } from './routes';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserCardProfileComponent } from './user-card-profile/user-card-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { VideoComponent } from './video/video.component';
import { ListVideosComponent } from './list-videos/list-videos.component';
import { HomeComponent } from './home/home.component';
import { ListUserComponent } from './list-user/list-user.component';
import { AboutComponent } from './about/about.component';
import { FooterHomeComponent } from './footerHome/footerHome.component';
import { FechasPasosComponent } from './fechas-pasos/fechas-pasos.component';
import { SocialComponent } from './social/social.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { NewVideoComponent } from './new-video/new-video.component';
import { LoadingComponent } from './loading/loading.component';
import { PagenofoundComponent } from '../app/shared/pagenofound/pagenofound.component';

import { NavbarComponent } from './navbar/navbar.component';


//Service
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';
import { VideoService } from '../services/video.service';

//Pipes
import { PipeModule } from './pipes/pipes.module';
//Guard
import { IsLoggedOutGuardService } from './guards/isLoggedOut.guard';
import { IsLoggedInGuardService } from './guards/isLoggedIn.guard';
import { VideoCardComponent } from './video-card/video-card.component';
import { NewsComponent } from './news/news.component';
import { NewComponent } from './new/new.component';
import { NewService } from '../services/new.service';
import { UploadComponent } from './upload/upload.component';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';
import { ModalUploadService } from './modal-upload/modal-upload.service';
import { SubirArchivoService } from '../services/subir-archivo.service';
import { ListNewsComponent } from './list-news/list-news.component';





@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      SignupComponent,
      ProfileComponent,
      VideoComponent,
      ListVideosComponent,
      HomeComponent,
      ListUserComponent,
      AboutComponent,
      FooterHomeComponent,
      FechasPasosComponent,
      SocialComponent,
      CarruselComponent,
      NewVideoComponent,
      LoadingComponent,
      PagenofoundComponent,
      NavbarComponent,
      VideoCardComponent,
      UserCardProfileComponent,
      NewsComponent,
      NewComponent,
      UploadComponent,
      ModalUploadComponent,
      ListNewsComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      FormsModule,
      HttpModule,
      HttpClientModule,
      PipeModule,
      ReactiveFormsModule

   ],
   providers: [
      SessionService,
      IsLoggedInGuardService,
      IsLoggedOutGuardService,
      UserService,
      VideoService,
      NewService,
      ModalUploadService,
      SubirArchivoService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '../../node_modules/@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

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
import { CommentsService } from '../services/comments.service';

//Pipes
import { SafePipe } from './safe.pipe';
import { SearchFilterPipe } from './search.pipe';
//Guard
import { IsLoggedOutGuardService } from './guards/isLoggedOut.guard';
import { IsLoggedInGuardService } from './guards/isLoggedIn.guard';
import { VideoCardComponent } from './video-card/video-card.component';






@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      SignupComponent,
      ProfileComponent,
      VideoComponent,
      ListVideosComponent,
      SafePipe,
      SearchFilterPipe,
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
      UserCardProfileComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      FormsModule,
      HttpModule
  ],
  providers: [
    SessionService,
    IsLoggedInGuardService, 
    IsLoggedOutGuardService, 
    UserService,
    CommentsService,
    VideoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

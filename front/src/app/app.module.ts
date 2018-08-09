import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '../../node_modules/@angular/router';
import { routes } from './routes';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session';
import { ProfileComponent } from './profile/profile.component';
import { VideoComponent } from './video/video.component';
import { ListVideosComponent } from './list-videos/list-videos.component';
import { SafePipe } from './safe.pipe';
import { HttpModule } from '@angular/http';
import { UserService } from '../services/user.service';
import { VideoService } from '../services/video.service';
import { NegateUserLoggedInGuard } from './guards/negateuserloggenin.guard';
import { isLoggedInGuardService } from './guards/isloggedin.guard';
import { HomeComponent } from './home/home.component';
import { ListUserComponent } from './list-user/list-user.component';
import { CommentsService } from '../services/comments.service';
import { SearchFilterPipe } from './search.pipe';


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
      ListUserComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      FormsModule,
      HttpModule
  ],
  providers: [
    SessionService,
    isLoggedInGuardService, 
    NegateUserLoggedInGuard, 
    UserService,
    CommentsService,
    VideoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

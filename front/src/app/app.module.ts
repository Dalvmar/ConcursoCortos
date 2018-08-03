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


@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      SignupComponent,
      ProfileComponent,
      //UserEditComponent,
      VideoComponent,
      ListVideosComponent,
      SafePipe
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      FormsModule,
      HttpModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

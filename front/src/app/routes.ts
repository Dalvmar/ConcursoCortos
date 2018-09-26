import { IsLoggedInGuardService } from './guards/isLoggedIn.guard';
import {IsLoggedOutGuardService} from './guards/isLoggedOut.guard';


import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { VideoComponent } from './video/video.component';
import { HomeComponent } from './home/home.component';
import { UserCardProfileComponent } from './user-card-profile/user-card-profile.component';
import { AboutComponent } from './about/about.component';
import { PagenofoundComponent } from './shared/pagenofound/pagenofound.component';
import { NewsComponent } from './news/news.component'
import { NewComponent } from './new/new.component';
import { UploadComponent } from './upload/upload.component';

export const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'signup', component:SignupComponent ,canActivate: [IsLoggedOutGuardService]},
  { path:'login', component:LoginComponent ,canActivate: [IsLoggedOutGuardService]},
  { path:'about', component:AboutComponent},
  { path:'profile',component:ProfileComponent, canActivate:[IsLoggedInGuardService]},
  { path:'profile/delete',component:ProfileComponent,canActivate:[IsLoggedInGuardService] },
  { path:'profile/edit/:id',component:ProfileComponent,canActivate:[IsLoggedInGuardService] },
  { path:'profile/details', component:UserCardProfileComponent,canActivate:[IsLoggedInGuardService]},
  { path:'video/:id', component: VideoComponent,canActivate:[IsLoggedInGuardService] },
  { path:'video/delete/:id', component: VideoComponent,canActivate:[IsLoggedInGuardService] },
  { path:'upload', component: UploadComponent },
  { path:'news', component: NewsComponent },
  { path:'news/new', component: NewComponent,canActivate:[IsLoggedInGuardService] },
   //{ path: 'error', component:PagenofoundComponent },
   { path: '**',component:PagenofoundComponent}
 
  
  
 
]

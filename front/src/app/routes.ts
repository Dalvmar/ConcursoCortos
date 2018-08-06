import { isLoggedInGuardService } from './Guards/isloggedin.guard';
import { NegateUserLoggedInGuard } from './Guards/negateuserloggenin.guard';


import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { VideoComponent } from './video/video.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path:'', component:HomeComponent, canActivate: [ NegateUserLoggedInGuard]},
  { path:'signup', component:SignupComponent, canActivate: [ NegateUserLoggedInGuard]},
  { path:'login', component:LoginComponent, canActivate: [ NegateUserLoggedInGuard]},
  { path:'profile',component:ProfileComponent, canActivate: [ isLoggedInGuardService]},
  { path:'profile/delete',component:ProfileComponent, canActivate: [ isLoggedInGuardService]},
  { path:'profile/edit/:id',component:ProfileComponent,canActivate: [ isLoggedInGuardService]},
  { path:'video/:id', component: VideoComponent },
  { path:'video/delete/:id', component: VideoComponent },
 
  
  
 
]

import { isLoggedInGuardService } from './guards/isloggedin.guard';
import { NegateUserLoggedInGuard } from './guards/negateuserloggenin.guard';


import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { VideoComponent } from './video/video.component';
import { HomeComponent } from './home/home.component';
import { CardProfileComponent } from './card-profile/card-profile.component';
import { AboutComponent } from './about/about.component';


export const routes: Routes = [
  { path:'', component:HomeComponent},
  { path:'signup', component:SignupComponent, canActivate: [ NegateUserLoggedInGuard]},
  { path:'login', component:LoginComponent, canActivate: [ NegateUserLoggedInGuard]},
  { path:'about', component:AboutComponent},
  { path:'profile',component:ProfileComponent, canActivate: [ isLoggedInGuardService]},
  { path:'profile/delete',component:ProfileComponent, canActivate: [ isLoggedInGuardService]},
  { path:'profile/edit/:id',component:ProfileComponent,canActivate: [ isLoggedInGuardService]},
  { path:'profile/details', component:CardProfileComponent},
  { path:'video/:id', component: VideoComponent },
  { path:'video/delete/:id', component: VideoComponent },
 
  
  
 
]

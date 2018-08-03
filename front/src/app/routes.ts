import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { VideoComponent } from './video/video.component';

export const routes: Routes = [
  { path:'signup', component:SignupComponent},
  { path:'login', component:LoginComponent},
  { path:'profile',component:ProfileComponent},
  { path:'profile/edit/:id',component:ProfileComponent},
  { path:'video',component:VideoComponent}
];

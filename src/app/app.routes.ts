import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AdminComponent} from "./admin/admin.component";
import {SpacesComponent} from "./spaces/spaces.component";
import {EventsComponent} from "./events/events.component";
import {SubscriptionComponent} from "./subscription/subscription.component";
import {ProfileComponent} from "./profile/profile.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'logIn', component: LoginComponent},
  { path: 'signUp', component: SignupComponent},
  {path:'admin',component:AdminComponent},
  {path:'spaces',component:SpacesComponent},
  {path:'events',component:EventsComponent},
  {path:'subscription',component:SubscriptionComponent},
  {path:'myProfile',component:ProfileComponent}
];

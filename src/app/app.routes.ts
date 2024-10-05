import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AdminComponent} from "./admin/admin.component";
import {SpacesComponent} from "./spaces/spaces.component";
import {EventsComponent} from "./events/events.component";
import {SubscriptionComponent} from "./subscription/subscription.component";
import {DashboardOverviewComponent} from "./dashboard-overview/dashboard-overview.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'logIn', component: LoginComponent},
  { path: 'signUp', component: SignupComponent},
  {path:'admin',component:AdminComponent,children: [
      {
        path: 'dashboard',
        component: DashboardOverviewComponent
      }
    ]},
  {path:'spaces',component:SpacesComponent},
  {path:'events',component:EventsComponent},
  {path:'subscription',component:SubscriptionComponent},
];

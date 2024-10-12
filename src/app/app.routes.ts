import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {AdminComponent} from "./admin/admin.component";
import {SpacesComponent} from "./spaces/spaces.component";
import {EventsComponent} from "./events/events.component";
import {SubscriptionComponent} from "./subscription/subscription.component";
import {DashboardOverviewComponent} from "./dashboard-overview/dashboard-overview.component";
import {EventsAdminComponent} from "./events-admin/events-admin.component";
import {SpacesAdminComponent} from "./spaces-admin/spaces-admin.component";
import {SubscriptionAdminComponent} from "./subscription-admin/subscription-admin.component";
import {OurSpacesComponent} from "./our-spaces/our-spaces.component";
import {ReservationsAdminComponent} from "./reservations-admin/reservations-admin.component";
import {FormSpaceComponent} from "./form-space/form-space.component";
import {FormEventComponent} from "./form-event/form-event.component";
import {RegistrationEventAdminComponent} from "./registration-event-admin/registration-event-admin.component";
import {HistorySubscriptionAdminComponent} from "./history-subscription-admin/history-subscription-admin.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {adminGuard} from "./guards/admin.guard";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'logIn', component: LoginComponent},
  { path: 'signUp', component: SignupComponent},
  {path:'admin',component:AdminComponent,children: [
      {
        path: 'dashboard',
        component: DashboardOverviewComponent
      },
      {
        path: 'events',
        component: EventsAdminComponent,children: [
          {
            path: 'updateEvent/:id',
            component: FormEventComponent
          },
          {
            path: 'addEvent',
            component: FormEventComponent
          },
          {
            path: 'reservations/:id',
            component: RegistrationEventAdminComponent
          }
        ]
      },
      {
        path: 'spaces',
        component: SpacesAdminComponent,children: [
          {
            path: 'ourSpaces',
            component: OurSpacesComponent,children: [
              {
                path: 'updateSpace/:id',
                component: FormSpaceComponent
              },
              {
                path: 'addSpace',
                component: FormSpaceComponent
              }
            ]
          },
          {
            path: 'reservations',
            component: ReservationsAdminComponent
          }
        ]
      },
      {
        path: 'subscriptions',
        component: SubscriptionAdminComponent
      },
    ],
    canActivate: [adminGuard]},
  {path:'spaces',component:SpacesComponent},
  {path:'events',component:EventsComponent},
  {path:'subscription',component:SubscriptionComponent},
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
];

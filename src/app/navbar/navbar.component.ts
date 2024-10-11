import {Component, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {MatAnchor} from "@angular/material/button";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {UserService} from "../services/user.service";
import {DecodejwtService} from "../services/decodejwt.service";
import {filter} from "rxjs";
import {Role} from "../models/role";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    MatAnchor,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin=false;
  excludedRoutes: string[] = [
    '/logIn',
    '/signUp',
    '/admin/dashboard',
    '/admin/events',
    '/admin/events/addEvent',
    '/admin/spaces',
    '/admin/spaces/ourSpaces',
    '/admin/spaces/reservations',
    '/admin/spaces/ourSpaces/addSpace',
    '/admin/spaces/ourSpaces/updateSpace/id',
    '/admin/subscriptions'
  ];


  constructor(protected router: Router, private authService: UserService,private decodeJwt: DecodejwtService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(
      (loggedIn: boolean) => {
        if (loggedIn)
        {
          this.username=this.decodeJwt.getUsernameFromToken();
          this.isLoggedIn = loggedIn;
          if(this.decodeJwt.getRoleFromToken()===Role.ADMIN){
            this.isAdmin=true;
          }
        }
      }
    );

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
        if (loggedIn) {
          this.username = this.decodeJwt.getUsernameFromToken();
        }
        else{
          this.isAdmin=false;
        }
        this.isLoggedIn = loggedIn;
      });
    });
  }

  username!:string;


  logout() {
    this.isLoggedIn=false;
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  verifyUrl(url: string): boolean {
    if (this.excludedRoutes.includes(url)) {
      return true;
    }

    // Vérification pour la route dynamique 'updateSpace' avec un ID
    const updateSpaceRegex = /^\/admin\/spaces\/ourSpaces\/updateSpace\/\d+$/;
    const updateEventRegex = /^\/admin\/events\/updateEvent\/\d+$/;
    const registrationEventRegex = /^\/admin\/events\/reservations\/\d+$/;
    return updateSpaceRegex.test(url) || updateEventRegex.test(url)||registrationEventRegex.test(url);
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }
}

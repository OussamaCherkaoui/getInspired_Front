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

  constructor(private router: Router, private authService: UserService,private decodeJwt: DecodejwtService) { }

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

  isActive(url: string): boolean {
    return this.router.url === url;
  }
}

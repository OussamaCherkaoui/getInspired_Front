import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {MatAnchor} from "@angular/material/button";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {UserService} from "../services/user.service";
import {DecodejwtService} from "../services/decodejwt.service";

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
export class NavbarComponent {
  isLoggedIn = false;

  constructor(private router: Router, private authService: UserService,private decodeJwt: DecodejwtService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(
      (loggedIn: boolean) => {
        this.username=this.decodeJwt.getUsernameFromToken();
        this.isLoggedIn = loggedIn;
      }
    );
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

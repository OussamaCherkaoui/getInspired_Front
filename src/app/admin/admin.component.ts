import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {UserService} from "../services/user.service";
import {DecodejwtService} from "../services/decodejwt.service";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    MatDivider,
    MatIcon,
    MatListItem,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    NgForOf,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    MatToolbar,
    MatIconButton,
    NgIf
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  menuItems = [
    { icon: 'dashboard', text: 'Dashboard', link: '/admin/dashboard' },
    { icon: 'home', text: 'Home', link: '/' },
    { icon: 'spaces', text: 'Spaces', link: '/admin/spaces' },
    { icon: 'events', text: 'Events', link: '/admin/events' },
    { icon: 'subscriptions', text: 'Subscriptions', link: '/admin/subscriptions' }
  ];

  adminName!: string;
  isScreenSmall = false;
  sidenavOpen = true;

  constructor(private router: Router, private authService: UserService, private decodeJwt: DecodejwtService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(
      (loggedIn: boolean) => {
        if (loggedIn) {
          this.adminName = this.decodeJwt.getUsernameFromToken();
          this.sidenavOpen = true;
        }
      }
    );
    this.checkScreenSize();
  }

  // Gérer le changement de taille d'écran
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isScreenSmall = window.innerWidth < 768;
    this.sidenavOpen = !this.isScreenSmall;
  }

  closeSidenavOnMobile(sidenav: any) {
    if (this.isScreenSmall) {
      sidenav.close();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}

import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {filter} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-spaces-admin',
  standalone: true,
  imports: [
    MatCardTitle,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatIcon,
    MatCardActions,
    MatButton,
    MatCardImage,
    RouterLink,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './spaces-admin.component.html',
  styleUrl: './spaces-admin.component.css'
})
export class SpacesAdminComponent implements OnInit{
  isChildRouteActive: boolean=false;

  constructor(private router: Router,private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isChildRouteActive = this.activatedRoute.firstChild !== null;
    });
  }
}

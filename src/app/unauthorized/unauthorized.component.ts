import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Location} from "@angular/common";

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    MatCardTitle,
    MatCard,
    MatCardHeader,
    MatIcon,
    MatCardContent,
    MatButton
  ],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {

}

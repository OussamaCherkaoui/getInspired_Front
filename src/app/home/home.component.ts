import { Component } from '@angular/core';
import { MatCardContent, MatCardImage, MatCardModule} from "@angular/material/card";
import { MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardContent,
    MatCardImage,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

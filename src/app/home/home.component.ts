import {Component, OnInit} from '@angular/core';
import { MatCardContent, MatCardImage, MatCardModule} from "@angular/material/card";
import { MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Event} from "../models/event";
import {EventService} from "../services/event.service";
import {FooterComponent} from "../footer/footer.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardContent,
    MatCardImage,
    MatButtonModule,
    MatIconModule,
    NgForOf,
    NgOptimizedImage,
    DatePipe,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  events: Event[]=[];

  constructor(
    private eventService: EventService,
  ) {

  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data.slice(0, 3);
    });
  }


}

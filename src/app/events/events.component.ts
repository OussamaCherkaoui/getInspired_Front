import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {DatePipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from "@angular/material/card";
import {Event} from "../models/event";
import {EventService} from "../services/event.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    FooterComponent,
    DatePipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardImage,
    NgForOf,
    MatPaginator
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  events: Event[]=[];
  pagedEvents: Event[] = [];
  pageSize = 6;
  pageIndex = 0;

  constructor(
    private eventService: EventService,
  ) {

  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data;
      this.setPagedEvents();
    });
  }



  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.setPagedEvents();
  }

  setPagedEvents() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedEvents = this.events.slice(startIndex, endIndex);
  }
}

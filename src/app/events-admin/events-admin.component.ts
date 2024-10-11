import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {DatePipe, NgIf, SlicePipe} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatPaginator} from "@angular/material/paginator";
import {EventService} from "../services/event.service";
import {Event} from "../models/event";
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {filter} from "rxjs";

@Component({
  selector: 'app-events-admin',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    MatCard,
    MatCardContent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    RouterLink,
    SlicePipe,
    RouterOutlet,
    DatePipe,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    FormsModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatLabel
  ],
  templateUrl: './events-admin.component.html',
  styleUrl: './events-admin.component.css'
})
export class EventsAdminComponent implements OnInit{
  isChildRouteActive: boolean=false;
  events!: MatTableDataSource<Event>;
  displayedColumns: string[] = ['name', 'description', 'date', 'picture', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private eventService: EventService,private router:Router,private activatedRoute: ActivatedRoute) {}

  editEvent(eventId: number) {
    this.router.navigate(['/admin/events/updateEvent', eventId]);
  }

  deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId).subscribe(response => {
      this.loadEvents();
    });
  }

  viewReservations(eventId: number) {
    this.router.navigate(['/admin/events/reservations', eventId]);
  }


  ngOnInit() {
    this.loadEvents();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isChildRouteActive = this.activatedRoute.firstChild !== null;
      this.loadEvents();
    });
  }

  loadEvents(){
    this.eventService.getAllEvents().subscribe(
      (data: Event[]) => {
        this.events = new MatTableDataSource(data);
        // @ts-ignore
        this.events.paginator = this.paginator;
      });
  }

  searchDate: Date | null = null;

  searchEventByDate() {
    if (this.searchDate) {
      this.eventService.getAllByDate(this.searchDate).subscribe(
        (data: Event[]) => {
          this.events = new MatTableDataSource(data);
          // @ts-ignore
          this.events.paginator = this.paginator;
        });
    }
  }
}

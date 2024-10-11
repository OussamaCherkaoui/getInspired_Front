import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {DatePipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from "@angular/material/card";
import {Event} from "../models/event";
import {EventService} from "../services/event.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Role} from "../models/role";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {DecodejwtService} from "../services/decodejwt.service";
import {
  ReservationConfirmationDialogComponent
} from "../reservation-confirmation-dialog/reservation-confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {UserEventReservationsComponent} from "../user-event-reservations/user-event-reservations.component";

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
  username: string="";
  isLoggedIn: boolean=false;
  isAdmin: boolean=false;
  membreId!: number;

  constructor(
    private eventService: EventService,private router: Router, private authService: UserService,private decodeJwt: DecodejwtService,private dialog: MatDialog
  ) {

  }

  verifyAuth(){
    this.authService.isLoggedIn.subscribe(
      (loggedIn: boolean) => {
        if (loggedIn)
        {
          this.decodeJwt.getIdByUsername().subscribe(data=>{
            this.membreId=data;
          });
          this.username=this.decodeJwt.getUsernameFromToken();
          this.isLoggedIn = loggedIn;
          if(this.decodeJwt.getRoleFromToken()===Role.ADMIN){
            this.isAdmin=true;
          }
        }
      }
    );
  }

  ngOnInit() {
    this.getEvents();
    this.verifyAuth();
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

  reserveEvent(id: number | undefined) {
    if (!this.isLoggedIn)
    {
      this.router.navigate(['/logIn']);
    }
    else if (this.isAdmin)
    {
      alert("You Are Admin , You Can' t reserve !!")
    }
    else{
      const dialogRef = this.dialog.open(ReservationConfirmationDialogComponent, {
        width: '300px',
        data: { memberId: this.membreId, eventId: id }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '300px',
            data: { message: 'Votre demande de réservation a été enregistrée avec succès.' ,username:this.username},
            disableClose: true,
            panelClass: 'custom-dialog-container',
          });
        } else {
          console.log('Réservation annulée');
        }
      });
    }
  }

  viewReservedEvents() {
    if (!this.isLoggedIn)
    {
      this.router.navigate(['/logIn']);
    }
    else if (this.isAdmin)
    {
      alert("You Are Admin , You dont have reserved spaces !!")
    }
    else{
      const dialogRef = this.dialog.open(UserEventReservationsComponent, {
        width: '700px',
        data: { memberId: this.membreId }
      });
    }
  }
}

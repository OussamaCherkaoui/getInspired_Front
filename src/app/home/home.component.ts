import {Component, OnInit} from '@angular/core';
import { MatCardContent, MatCardImage, MatCardModule} from "@angular/material/card";
import { MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";
import {Event} from "../models/event";
import {EventService} from "../services/event.service";
import {FooterComponent} from "../footer/footer.component";
import { Router, RouterLink} from "@angular/router";
import {UserService} from "../services/user.service";
import {Role} from "../models/role";
import {DecodejwtService} from "../services/decodejwt.service";
import {MatDialog} from "@angular/material/dialog";
import {
  ReservationConfirmationDialogComponent
} from "../reservation-confirmation-dialog/reservation-confirmation-dialog.component";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";


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
    FooterComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  events: Event[]=[];
  username: string="";
  isLoggedIn: boolean=false;
  isAdmin: boolean=false;
  membreId!: number;

  constructor(private authService: UserService,
    private eventService: EventService,private router:Router,private decodeJwt: DecodejwtService,private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.getEvents();
    this.verifyAuth();
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

  getEvents(){
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data.slice(0, 3);
    });
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
            data: { message: 'Votre demande de réservation a été enregistrée avec succès.',username:this.username },
            disableClose: true,
            panelClass: 'custom-dialog-container',
          });
        } else {
          console.log('Réservation annulée');
        }
      });

    }
  }
}

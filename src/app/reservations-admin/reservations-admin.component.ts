import {Component, OnInit} from '@angular/core';
import {ReservationService} from "../services/reservation.service";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf} from "@angular/common";
import {Reservation} from "../models/reservation";
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-reservations-admin',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgForOf,
    MatRow,
    MatRowDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatTable,
    MatButton,
    MatInput,
    MatHeaderRow,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderRowDef
  ],
  templateUrl: './reservations-admin.component.html',
  styleUrl: './reservations-admin.component.css'
})
export class ReservationsAdminComponent implements OnInit{
  confirmedReservations:Reservation[] = [];
  unconfirmedReservations:Reservation[] = [];
  reservationHistory:Reservation[] = [];
  searchDate: string="";

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservationsHistory();
    this.loadUpcomingReservations();
  }

  loadReservationsHistory() {
    this.reservationService.getAllReservations().subscribe(reservations => {
      this.reservationHistory = reservations;
    });
  }
  loadUpcomingReservations() {
    this.reservationService.getUpcomingReservations().subscribe(reservations=>{
      this.confirmedReservations = reservations.filter((r:Reservation) => r.isConfirmed);
      this.unconfirmedReservations = reservations.filter((r: Reservation) => !r.isConfirmed);
      console.log(this.confirmedReservations);
      console.log(this.unconfirmedReservations);
    });
  }




  searchByDate() {
    if (this.searchDate) {
      this.reservationService.getReservationsByDate(this.searchDate).subscribe(reservations => {
        this.reservationHistory = reservations;
      });
    }
  }

  cancelReservation(id:number) {
    this.reservationService.cancelReservation(id).subscribe(data => {
      this.loadUpcomingReservations();
    });
  }

  confirmReservation(id:number) {
    this.reservationService.confirmReservation(id).subscribe(data => {
      console.log(data);
      this.loadUpcomingReservations();
    });
  }
}

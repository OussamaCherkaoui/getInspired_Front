import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {DatePipe, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Reservation} from "../models/reservation";
import {ReservationService} from "../services/reservation.service";

@Component({
  selector: 'app-user-reservations-space',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatIcon,
    NgIf,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    DatePipe
  ],
  templateUrl: './user-reservations-space.component.html',
  styleUrl: './user-reservations-space.component.css'
})
export class UserReservationsSpaceComponent implements OnInit{
  reservations: Reservation[] = [];
  id:number=0;
  displayedColumns: string[] = ['name', 'picture', 'date', 'startTime', 'endTime', 'status', 'actions'];

  constructor(
    private dialogRef: MatDialogRef<UserReservationsSpaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { memberId: number },
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.loadReservations(this.id);
  }

  loadReservations(id:number) {
    this.reservationService.getReservationsByIdMember(id).subscribe(
      (data: Reservation[]) => {
        this.reservations = data;
      }
    );
  }

  cancelReservation(id: number) {
    this.reservationService.cancelReservation(id).subscribe(
      () => {
        this.loadReservations(id); // Recharger les réservations après l'annulation
      },
      error => {
        console.error('Erreur lors de l\'annulation de la réservation', error);
      }
    );
  }
}

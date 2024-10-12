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
  displayedColumns: string[] = ['name', 'picture', 'date', 'startTime', 'endTime', 'status', 'actions'];
  memberId!:number;

  constructor(
    private dialogRef: MatDialogRef<UserReservationsSpaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { memberId: number },
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.memberId=this.data.memberId;
    this.loadReservations(this.data.memberId);
  }

  loadReservations(id:number) {
    this.reservationService.getReservationsByIdMember(id).subscribe(
      (data: Reservation[]) => {
        if(data){
          this.reservations = data;
        }
        else {
          this.reservations=[];
        }
      }
    );
  }

  cancelReservation(id: number) {
    this.reservationService.deleteReservation(id).subscribe(
      data => {
        if(data) {
          this.loadReservations(this.memberId);
        }
      }
    );
  }
}

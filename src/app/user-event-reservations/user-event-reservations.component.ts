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
import {EventRegistrationService} from "../services/event-registration.service";
import {EventRegistration} from "../models/event-registration";
import {MatTooltip} from "@angular/material/tooltip";
import {Registration} from "../models/registration";

@Component({
  selector: 'app-user-event-reservations',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCellDef,
    MatHeaderCellDef,
    MatCell,
    MatIcon,
    NgIf,
    MatIconButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    DatePipe,
    MatTooltip
  ],
  templateUrl: './user-event-reservations.component.html',
  styleUrl: './user-event-reservations.component.css'
})
export class UserEventReservationsComponent implements OnInit{
  reservations: Registration[] = [];
  displayedColumns: string[] = ['name','picture', 'date', 'status', 'actions'];

  constructor(
    private dialogRef: MatDialogRef<UserEventReservationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { memberId: number },
    private eventRegistrationService: EventRegistrationService
  ) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.eventRegistrationService.getEventsRegistrationsByIdMember(this.data.memberId).subscribe(
      (data: EventRegistration[]) => {
        console.log(data)
        this.reservations = data;
      }
    );
  }

  cancelReservation(id: number) {
    this.eventRegistrationService.deleteRegistration(id).subscribe(
      data => {
        if(data)
        {
          this.loadReservations();
        }
      }
    );
  }
}

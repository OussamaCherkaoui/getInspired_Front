import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

import {EventRegistrationService} from "../services/event-registration.service";
import {EventRegistration} from "../models/event-registration";

@Component({
  selector: 'app-reservation-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogActions
  ],
  templateUrl: './reservation-confirmation-dialog.component.html',
  styleUrl: './reservation-confirmation-dialog.component.css'
})
export class ReservationConfirmationDialogComponent {
  constructor(private eventRegistrationService: EventRegistrationService,
    public dialogRef: MatDialogRef<ReservationConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { memberId: number, eventId: number }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    const eventRegistration:EventRegistration={id:0,idEvent:this.data.eventId,idMembre:this.data.memberId,isConfirmed:false}
    this.eventRegistrationService.reserveEvent(eventRegistration).subscribe(response=>{
      console.log(response);
      console.log('membre '+ this.data.memberId + 'à réservé l event' + this.data.eventId);
    })

    this.dialogRef.close(true);
  }
}

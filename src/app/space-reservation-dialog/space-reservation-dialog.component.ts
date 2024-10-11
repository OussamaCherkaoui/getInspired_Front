import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {SpaceService} from "../services/space.service";
import {ReservationService} from "../services/reservation.service";
import {Reservation} from "../models/reservation";

@Component({
  selector: 'app-space-reservation-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerInput,
    MatDatepicker,
    MatInputModule,
    MatDialogActions,
    MatButton,
    MatLabel,
    MatHint
  ],
  templateUrl: './space-reservation-dialog.component.html',
  styleUrl: './space-reservation-dialog.component.css'
})
export class SpaceReservationDialogComponent {
  reservationForm: FormGroup;

  minDate: Date;

  constructor(
    public dialogRef: MatDialogRef<SpaceReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { memberId: number, spaceId: number },
    private fb: FormBuilder,private reservationService:ReservationService
  ) {
    this.minDate = new Date();
    this.reservationForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const formValue = this.reservationForm.value;
      const date = formValue.date;
      const startTime = formValue.startTime;
      const endTime = formValue.endTime;

      const startDateTime = new Date(date);
      const [startHour, startMinute] = startTime.split(':').map(Number);
      startDateTime.setUTCHours(startHour, startMinute);

      const endDateTime = new Date(date);
      const [endHour, endMinute] = endTime.split(':').map(Number);
      endDateTime.setUTCHours(endHour, endMinute);

      const reservation:Reservation={id:0,idMembre:this.data.memberId,idSpace:this.data.spaceId,isConfirmed:false,end_time:endDateTime,start_time:startDateTime}

      console.log(reservation);

      this.reservationService.saveReservation(reservation).subscribe(response=>{
        if (response){
          console.log(response);
          this.dialogRef.close(true);
        }
      })
      this.dialogRef.close(false);
    }
  }
}

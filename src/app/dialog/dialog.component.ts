import {Component, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubscriptionService} from "../services/subscription.service";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatInput,
    MatCardActions,
    MatLabel,
    MatHint,
    MatError,
    MatIcon,
    NgIf
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  notification: string='';


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, username: string },private subscripitonService:SubscriptionService
  ) {
    this.notification = '';
  }

  sendNotification(): void {
    if (this.notification.trim()) {
      console.log(`Notification envoyée à ${this.data.username}`);
      this.subscripitonService.sendNotification(this.data.id, this.notification).subscribe(response => {
        this.dialogRef.close({ data: response });
      })
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

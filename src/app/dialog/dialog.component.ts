import {Component, Inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SubscriptionService} from "../services/subscription.service";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton
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

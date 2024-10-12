import {Component, Inject} from '@angular/core';
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
import {MatTooltip} from "@angular/material/tooltip";
import {MatIconButton} from "@angular/material/button";
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {SubscriptionService} from "../services/subscription.service";
import {HistorySubscriptionAdminComponent} from "../history-subscription-admin/history-subscription-admin.component";
import {SubscriptionHistoryService} from "../services/subscription-history.service";

@Component({
  selector: 'app-user-subscription-details',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatIcon,
    NgIf,
    MatTooltip,
    MatIconButton,
    DatePipe,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './user-subscription-details.component.html',
  styleUrl: './user-subscription-details.component.css'
})
export class UserSubscriptionDetailsComponent {
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['type', 'startDate', 'endDate', 'status' ,'notification', 'actions'];

  constructor(
    private subscriptionService: SubscriptionService,
    private subscriptionHistoryService: SubscriptionHistoryService,
    @Inject(MAT_DIALOG_DATA) public data: { memberId: number },
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.subscriptionService.getSubscriptionByIdMember(this.data.memberId).subscribe(
      (data: Subscription[]) => {
        this.subscriptions = data;
      }
    );
  }

  cancelSubscription(id: number) {
    this.subscriptionService.deleteSubscription(id).subscribe(
      () => {
        this.loadSubscriptions();
      }
    );
  }


  showHistory(id: number) {
    this.subscriptionHistoryService.getSubscriptionHistoryByIdSubscription(id).subscribe(response => {
      if (response){
        this.dialog.open(HistorySubscriptionAdminComponent, {
          data: {
            history: response
          }
        });
      }
    })
  }

}

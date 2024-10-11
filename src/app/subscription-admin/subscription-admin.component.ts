import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogContent} from "@angular/material/dialog";
import {DatePipe, NgIf} from "@angular/common";
import {DialogComponent} from "../dialog/dialog.component";
import {SubscriptionService} from "../services/subscription.service";
import {Subscription} from "../models/subscription";
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {filter} from "rxjs";
import {HistorySubscriptionAdminComponent} from "../history-subscription-admin/history-subscription-admin.component";
import {SubscriptionHistoryService} from "../services/subscription-history.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-subscription-admin',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatDialogContent,
    NgIf,
    DatePipe,
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './subscription-admin.component.html',
  styleUrl: './subscription-admin.component.css'
})
export class SubscriptionAdminComponent implements OnInit{
  monthlySubscriptions:Subscription[] = [
  ];

  yearlySubscriptions:Subscription[] = [
  ];


  subscriptionRequests:Subscription[] = [
  ];


  searchMonthly: string = '';
  searchYearly: string = '';
  searchRequest: string = '';

  displayedColumns = ['username', 'start_date', 'end_date', 'notification', 'action'];
  displayedColumnsRequests = ['username', 'start_date', 'end_date', 'notification' , 'type', 'action'];
  errorMessageRequest: string="";
  errorMessageYearly: string="";
  errorMessageMonthly: string="";


  constructor(private dialog: MatDialog,private subscriptionService: SubscriptionService,private subscriptionHistoryService:SubscriptionHistoryService,private route: Router, private activatedRoute:ActivatedRoute) {}

  openNotificationDialog(subscription:Subscription ) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: subscription
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.data.notification) {
        subscription.notification=result.data.notification;
      }
    });
  }

  cancelSubscription(id: number) {
    this.subscriptionService.cancelSubscription(id).subscribe(data => {
      this.loadsubscriptionRequests();
      this.loadmonthlySubscriptions();
      this.loadyearlySubscriptions();
    });
  }

  viewHistory(id: number) {
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

  confirmSubscription(id: number) {
    this.subscriptionService.confirmSubscription(id).subscribe(data => {
      this.loadsubscriptionRequests();
      this.loadmonthlySubscriptions();
      this.loadyearlySubscriptions();
    });
  }

  deleteSubscription(id: number) {
    this.subscriptionService.deleteSubscription(id).subscribe(response => {
      if(response)
      {
        this.loadsubscriptionRequests();
      }
      else{
        alert("imposible to delete subscription");
      }
    });
  }



  ngOnInit(): void {
    this.loadmonthlySubscriptions();
    this.loadyearlySubscriptions();
    this.loadsubscriptionRequests();
  }

  loadmonthlySubscriptions(){
    this.subscriptionService.getAllSubscriptionMonthly().subscribe({
      next: (data) => {
        this.errorMessageMonthly="";
        this.monthlySubscriptions = data;
      },
      error: (error: Error) => {
        this.errorMessageMonthly = error.message;
        this.monthlySubscriptions = [];
      }
    });
  }

  loadyearlySubscriptions(){
    this.subscriptionService.getAllSubscriptionAnnualy().subscribe({
      next: (data) => {
        this.errorMessageYearly = "";
        this.yearlySubscriptions = data;
      },
      error: (error: Error) => {
        this.errorMessageYearly = error.message;
        this.yearlySubscriptions = [];
      }
    });
  }

  loadsubscriptionRequests(){
    this.subscriptionService.getAllRequestSubscription().subscribe({
        next: (data) => {
          this.errorMessageRequest ="";
          this.subscriptionRequests = data;
        },
        error: (error: Error) => {
          this.errorMessageRequest = error.message;
          this.subscriptionRequests = [];
        }
      });
  }

  filterMonthlySubscriptions() {
    if(this.searchMonthly==""){
      this.loadmonthlySubscriptions();
    }
    else{
      this.subscriptionService.getAllSubscriptionMonthlyByUsername(this.searchMonthly).subscribe({
        next: (data) => {
          this.errorMessageMonthly ="";
          this.monthlySubscriptions = data;
        },
        error: (error: Error) => {
          this.errorMessageMonthly = error.message;
          this.monthlySubscriptions = [];
        }
      });
    }
  }

  filterYearlySubscriptions() {
    if(this.searchYearly==""){
      this.loadyearlySubscriptions();
    }
    else{
      this.subscriptionService.getAllSubscriptionAnnualyByUsername(this.searchYearly).subscribe({
        next: (data) => {
          this.errorMessageYearly ="";
          this.yearlySubscriptions = data;
        },
        error: (error: Error) => {
          this.errorMessageYearly = error.message;
          this.yearlySubscriptions = [];
        }
      });
    }
  }

  filterSubscriptionRequests() {
    if(this.searchRequest==""){
      this.loadsubscriptionRequests();
    }
    else{
      this.subscriptionService.getAllRequestSubscriptionByUsername(this.searchRequest).subscribe({
        next: (data) => {
          this.errorMessageRequest ="";
          this.subscriptionRequests = data;
        },
        error: (error: Error) => {
          this.errorMessageRequest = error.message;
          this.subscriptionRequests = [];
        }
      });
    }
  }

}

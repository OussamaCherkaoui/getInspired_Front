import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {Subscription} from "../models/subscription";
import {SubscriptionService} from "../services/subscription.service";
import {UserService} from "../services/user.service";
import {DecodejwtService} from "../services/decodejwt.service";
import {Role} from "../models/role";
import {Router} from "@angular/router";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserReservationsSpaceComponent} from "../user-reservations-space/user-reservations-space.component";
import {UserSubscriptionDetailsComponent} from "../user-subscription-details/user-subscription-details.component";

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    FooterComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatIconModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit{

  subscription : Subscription ={
    end_date: undefined,
    id: 0,
    idMembre: undefined,
    isConfirmed: false,
    notification: undefined,
    start_date: undefined,
    type: undefined
  };
  membreId:number=0;
  subscriptionType: string = '';
  startDate: Date | null = null;
  username: string="";
  isLoggedIn: boolean=false;
  isAdmin: boolean=false;

  constructor(private subscriptionService:SubscriptionService,private router: Router, private authService: UserService,private decodeJwt: DecodejwtService,private dialog:MatDialog) {

  }
  ngOnInit() {
    this.verifyAuth();
  }
  verifyAuth(){
    this.authService.isLoggedIn.subscribe(
      (loggedIn: boolean) => {
        if (loggedIn)
        {
          this.decodeJwt.getIdByUsername().subscribe(data=>{
            this.membreId=data;
          });
          this.username=this.decodeJwt.getUsernameFromToken();
          this.isLoggedIn = loggedIn;
          if(this.decodeJwt.getRoleFromToken()===Role.ADMIN){
            this.isAdmin=true;
          }
        }
      }
    );
  }

  subscribe() {
    this.verifyAuth();
    if (!this.isLoggedIn)
    {
      this.router.navigate(['/logIn']);
    }
    else if (this.isAdmin)
    {
      alert("You Are Admin , You Can' t subscribe !!")
    }
    else{
      if (this.subscriptionType && this.startDate) {
        this.subscription.start_date=this.startDate;
        this.subscription.type=this.subscriptionType;
        this.subscription.idMembre=this.membreId;
        console.log('Subscription Type:', this.subscriptionType);
        console.log('Start Date:', this.startDate);
        if(this.subscriptionType=='monthly')
        {
          let startDate = new Date(this.startDate);
          startDate.setMonth(startDate.getMonth() + 1);
          this.subscription.end_date=startDate;
        }
        else{
          let startDate = new Date(this.startDate);
          startDate.setFullYear(startDate.getFullYear() + 1);
          this.subscription.end_date=startDate;
        }
        this.subscriptionService.saveSubscription(this.subscription).subscribe(data=>{
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '300px',
            data: { message: "Your subscription request has been successfully recorded." ,username:this.username},
            disableClose: true,
            panelClass: 'custom-dialog-container',
          });
        });
      } else {
        alert('Please select the subscription type and the start date.');
      }
    }
  }

  getSubscriptionDetails() {
    if (!this.isLoggedIn)
    {
      this.router.navigate(['/logIn']);
    }
    else if (this.isAdmin)
    {
      alert("You Are Admin , You dont have subscription !!")
    }
    else{
      const dialogRef = this.dialog.open(UserSubscriptionDetailsComponent, {
        width: '700px',
        data: { memberId: this.membreId }
      });
    }
  }
}

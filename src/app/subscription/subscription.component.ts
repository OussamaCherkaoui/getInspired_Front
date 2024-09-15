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

  constructor(private subscriptionService:SubscriptionService,private decodeService:DecodejwtService) {

  }
  ngOnInit() {
    this.decodeService.getIdByUsername().subscribe(data=>{
      this.membreId=data;
    });
  }

  // Fonction appelée lorsqu'on clique sur le bouton "Subscribe"
  subscribe() {
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
        console.log(data);
      });
    } else {
      alert('Veuillez sélectionner le type d\'abonnement et la date de début.');
    }
  }
}

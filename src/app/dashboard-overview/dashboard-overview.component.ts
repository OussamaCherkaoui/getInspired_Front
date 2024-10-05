import {Component, OnInit} from '@angular/core';
import {MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatCalendar, MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {NgChartsModule} from "ng2-charts";
import {MembreService} from "../services/membre.service";
import {SubscriptionService} from "../services/subscription.service";
import {EventService} from "../services/event.service";
import {SpaceService} from "../services/space.service";
import {Chart, registerables} from "chart.js";

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [
    NgChartsModule,
    MatIconModule,
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatCalendar,
    MatDatepickerModule
  ],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.css'
})
export class DashboardOverviewComponent implements OnInit{
  registeredUsers = 0;
  subscriptionsCount = 0;
  upcomingEvents = 0;
  freeSpacesToday = 0;

  constructor(private memberService: MembreService,private subscriptionService: SubscriptionService,private eventService: EventService,private spaceService: SpaceService) {}


  chartData: number[] = [];
  chartLabels: string[] = [];

  selectedDate: Date = new Date();

  ngOnInit(): void {
    this.memberService.countRegistredUser().subscribe(data=>{
      if (data){
        this.registeredUsers=data;
      }
    });
    this.subscriptionService.countSubscriptionConfirmed().subscribe(data=>{
      if (data){
        this.subscriptionsCount=data;
      }
    });
    this.eventService.countEvent().subscribe(data=>{
      if (data){
        this.upcomingEvents=data;
      }
    });
    this.spaceService.countFreeSpaceForToday().subscribe(data=>{
      if (data){
        this.freeSpacesToday=data;
      }
    });
    this.subscriptionService.getSubscriptionCountByType().subscribe(data => {
      this.chartLabels = Object.keys(data);
      this.chartData = Object.values(data);
    });
  }


}

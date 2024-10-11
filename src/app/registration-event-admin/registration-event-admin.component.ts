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
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {Registration} from "../models/registration";
import {EventRegistrationService} from "../services/event-registration.service";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-registration-event-admin',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatIcon,
    MatButton,
    NgIf,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    RouterLink
  ],
  templateUrl: './registration-event-admin.component.html',
  styleUrl: './registration-event-admin.component.css'
})
export class RegistrationEventAdminComponent implements OnInit{
  registrations: Registration[] = [];

  displayedColumns: string[] = ['username', 'eventName', 'confirmed', 'action'];
  eventId!: string | null;

  constructor(private eventRegistrationService: EventRegistrationService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId)
    {
      this.loadAllEvents(this.eventId)
    }
  }

  loadAllEvents(id: string): void {
    this.eventRegistrationService.getAllEventRegistrationByIdEvent(id).subscribe(data=>{
      this.registrations=data;
    });
  }

  confirmRegistration(registration: Registration) {
    this.eventRegistrationService.confirmRegistration(registration.id).subscribe(data=>{
      console.log(data);
      registration.isConfirmed = true;
    });
  }

  cancelRegistration(registration: Registration) {
    this.eventRegistrationService.cancelRegistration(registration.id).subscribe(data=>{
      console.log(data);
      registration.isConfirmed = false;
    });
  }
}

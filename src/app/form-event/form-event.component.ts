import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EventService} from "../services/event.service";
import {NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-form-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './form-event.component.html',
  styleUrl: './form-event.component.css'
})
export class FormEventComponent implements OnInit{
  eventForm!: FormGroup;
  isCreateMode: boolean = true;
  message: string | null = null;
  eventId: string | null | undefined;

  constructor(private fb: FormBuilder,private route:ActivatedRoute, private eventService: EventService) {
    this.eventForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      picture: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.isCreateMode = false;
      this.eventService.getEventById(this.eventId).subscribe(data=>{
        if(data)
        {
          this.eventForm.get('name')?.setValue(data.name);
          this.eventForm.get('description')?.setValue(data.description);
          this.eventForm.get('date')?.setValue(data.date);
          this.eventForm.get('picture')?.setValue(data.picture);
        }
      })
    }
  }


  onSubmit() {
    if (this.eventForm.invalid) {
      return;
    }

    if (this.isCreateMode) {
      this.eventService.saveEvent(this.eventForm.value).subscribe(response => {
        this.message = 'Event created successfully!';
      });
    } else {
      this.eventForm.get('id')?.setValue(this.eventId);
      this.eventService.updateEvent(this.eventForm.value).subscribe(response => {
        this.message = 'Event updated successfully!';
      });
    }
  }
}

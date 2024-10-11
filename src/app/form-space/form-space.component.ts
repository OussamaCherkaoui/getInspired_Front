import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SpaceService} from "../services/space.service";
import {Space} from "../models/space";

@Component({
  selector: 'app-form-space',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './form-space.component.html',
  styleUrl: './form-space.component.css'
})
export class FormSpaceComponent implements OnInit{
  spaceForm: FormGroup;
  spaceId: string | null | undefined;
  isCreateMode: boolean = true;
  message: string="";

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private spaceService: SpaceService) {
    this.spaceForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      picture: ['', [Validators.required]],
      price_per_day: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  onSubmit() {
    if (this.spaceForm.valid) {
      const space:Space=new Space();
      space.name = this.spaceForm.get('name')?.value;
      space.description = this.spaceForm.get('description')?.value;
      space.picture = this.spaceForm.get('picture')?.value;
      space.price_per_day = this.spaceForm.get('price_per_day')?.value;
      if (this.isCreateMode) {
        this.spaceService.saveSpace(space).subscribe(data=>{
          this.message="Space Created with success";
        });
      } else {
        space.id=Number(this.spaceId);
        this.spaceService.updateSpace(space).subscribe(data=>{
          this.message="Space updated with success";
        });
      }
    }
  }

  ngOnInit(): void {
    this.spaceId = this.route.snapshot.paramMap.get('id');
    if (this.spaceId) {
      this.isCreateMode = false;
      this.spaceService.getSpaceById(this.spaceId).subscribe(data=>{
        if(data)
        {
          this.spaceForm.get('name')?.setValue(data.name);
          this.spaceForm.get('description')?.setValue(data.description);
          this.spaceForm.get('picture')?.setValue(data.picture);
          this.spaceForm.get('price_per_day')?.setValue(data.price_per_day);
        }
      })
    }
  }

}

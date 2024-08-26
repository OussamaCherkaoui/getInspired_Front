import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Membre} from "../models/membre";
import {Role} from "../models/role";
import {MembreService} from "../services/membre.service";
import {Router} from "@angular/router";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm: FormGroup;
  membre : Membre = {
    email: '', id: 0, password: '', phone: '', role: Role.MEMBRE, username: ''
  }
  message:  string = '';

  constructor(private fb: FormBuilder,private membreService:MembreService,private router: Router) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]]
    });
  }

  onSubmit() {
    this.membre.username = this.signUpForm.get('username')?.value;
    this.membre.email = this.signUpForm.get('email')?.value;
    this.membre.password = this.signUpForm.get('password')?.value;
    this.membre.phone = this.signUpForm.get('phone')?.value;

    if (this.membre.username && this.membre.email && this.membre.password && this.membre.phone) {
      if (this.signUpForm.valid) {
        this.membreService.registerMembre(this.membre).subscribe(data=>{
          console.log(data);
          this.message='Compte créer avec succées';
        });
      } else {
        console.log('Remplit toutes les champs !!');
      }
    }
  }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigateByUrl("/");
  }
}

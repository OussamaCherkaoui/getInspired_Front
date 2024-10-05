import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../models/user";
import {AuthenticationRequest} from "../models/AuthenticationRequest";
import {DecodejwtService} from "../services/decodejwt.service";
import {UserService} from "../services/user.service";
import {Router, RouterLink} from "@angular/router";
import {Role} from "../models/role";
import {MatCard, MatCardContent, MatCardModule, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatCardContent,
    MatCardTitle,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  user!:User;
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  error:  string = '';
  authRequest: AuthenticationRequest = { username: '', password: '' };

  constructor(private fb: FormBuilder,private srvd:DecodejwtService,private authService: UserService,private router: Router) {}


  login(): void {
    this.authRequest.username=this.form.get('username')?.value!;
    this.authRequest.password=this.form.get('password')?.value!;

    this.authService.login(this.authRequest).subscribe(
      response => {
        if (response && response.token) {
          localStorage.setItem("jwt", response.token);
          this.srvd.getToken();
          this.srvd.getIdByUsername().subscribe(
            id => {
              this.authService.setIdUser(id);
              this.authService.getUserById(id).subscribe(res => {
                this.user = res;
                this.authService.loginActive();
                if (this.user.role === Role.ADMIN) {
                  this.router.navigateByUrl("/admin/dashboard");
                } else if (this.user.role === Role.MEMBRE){
                  this.router.navigateByUrl(`/`);
                }
              });
            }
          );
        } else {
          this.error = "username ou password incorrect";
        }
      },
      error => {
        this.error = "erreur lors d' authentification. Réssayer!!";
      }
    );
  }

  ngOnInit(): void {
  }

}

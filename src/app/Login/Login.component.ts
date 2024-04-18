import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {  Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InscriptionServiceService } from '../services/InscriptionService.service';
import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from '../services/StorageService.service';
@Component({
  selector: 'app-Login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, CardModule, ButtonModule, DividerModule, InputTextModule, PasswordModule],
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  formData = {
    email: '',
    password: '',

  };

  constructor(private inscservice:InscriptionServiceService,private router: Router ) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.formData);
    this.inscservice.login(this.formData).subscribe((data) => {
      console.log(data);
      if (data.userId != null) {
        const user = {
          id: data.userId,
          role: data.userRole
        }
        StorageServiceService.saveToken(data.jwt);
        StorageServiceService.saveUser(user);

        // Redirect based on user role
        if (user.role === 'Admin') {
          // Redirect to admin dashboard
          this.router.navigate(['/comptes']);
        } else if (user.role === 'Client') {
          // Redirect to home page
          this.router.navigate(['/home']);
        } else {
          console.log("Unknown user role");
          // Handle unknown user role, maybe redirect to an error page
        }

      } else {
        console.log("erreur de storage");
      }
    })
  }
  gotosignup() {
    this.router.navigate(['/inscription'])
  }
}

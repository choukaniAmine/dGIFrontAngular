import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import {  Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InscriptionServiceService } from '../services/InscriptionService.service';
import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from '../services/StorageService.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-Login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, CardModule, ButtonModule, DividerModule, InputTextModule, PasswordModule,ToastModule],
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  formData = {
    email: '',
    password: '',

  };

  constructor(private authserve:InscriptionServiceService,private router: Router,private messageService: MessageService ) { }

  ngOnInit() {
  }
  onSubmit() {
    this.authserve.login(this.formData).subscribe((data: any) => {
      if (data.userId != null) {
        const user = {
          id: data.userId,
          role: data.userRole
        };
        StorageServiceService.saveToken(data.jwt);
        StorageServiceService.saveUser(user);

        // Redirect based on user role
        if (user.role === 'Admin') {
          this.messageService.add({ key: 'step1', severity: 'success', summary: 'Connecte', detail: 'welcome Admin' });
          setTimeout(() => {
            this.router.navigate(['/admin/dashboard']);
          }, 1500);

        } else if (user.role === 'Client') {
          this.messageService.add({ key: 'step1', severity: 'success', summary: 'Connecte', detail: this.errorMessage });
          setTimeout(() => {
            this.router.navigate(['/client/homePage']);
          }, 1500);


        }
      } else {
        console.log('Error saving user data');
        // Handle error saving user data, maybe display an error message
      }
    }, (errorResponse: HttpErrorResponse) => {
      // Handle error responses from the server
      if (errorResponse.status === 401) {
        this.errorMessage = 'Incorrect username or password';
      } else if (errorResponse.status === 403) {
        this.errorMessage = 'Account is disabled';
      } else if (errorResponse.status === 404) {
        this.errorMessage = 'User not found';
      } else {
        this.errorMessage = 'An unexpected error occurred';
      }
      // Display error message
      this.messageService.add({ key: 'step1', severity: 'error', summary: 'Error', detail: this.errorMessage });
    });
  }
  gotosignup() {
    this.router.navigate(['/inscription'])
  }
}

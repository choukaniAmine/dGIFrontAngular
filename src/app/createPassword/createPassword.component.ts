import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PasswordModule } from 'primeng/password';
import { InscriptionServiceService } from '../services/InscriptionService.service';

@Component({
  selector: 'app-createPassword',
  standalone: true,
  imports: [ButtonModule, CardModule, FieldsetModule, CommonModule, FormsModule, HttpClientModule, PasswordModule],
  templateUrl: './createPassword.component.html',
  styleUrls: ['./createPassword.component.css']
})
export class CreatePasswordComponent implements OnInit {
  verificationCode!: string
  formatDate = {
    password: '',
    password1: ''
  }
value: any;
inscription:any;
  constructor(private route: ActivatedRoute, private authserv: InscriptionServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.verificationCode = params['code'];
      console.log('Verification code:', this.verificationCode);
      this.verifyCode(this.verificationCode)
      // Now you can use this.verificationCode as needed
    });
  }
  verifyCode(code: string): void {
    this.authserv.verifyCode(code).subscribe(
      response => {
        console.log('Verification response:', response);
        this.inscription=response.inscription;
        // Handle response based on your requirements
      },
      error => {
        console.error('Error occurred:', error);
        // Handle error
      }
    );
  }
  submit(): void {
    // Check if passwords match
    if (this.formatDate.password !== this.formatDate.password1) {

      console.error('Passwords do not match');
      return;
    }


    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Check if the password meets the regex pattern
    if (!passwordRegex.test(this.formatDate.password)) {

      console.error('Password does not meet requirements');
      return;
    }
    const signup={
      password:this.formatDate.password,
      inscription:this.inscription,
    }
    console.log(signup);
this.authserv.creePassword(signup).subscribe(response => {
  console.log('User registered successfully:', response);

}, error => {
  console.error('Error occurred during registration:', error);

});

  }
}

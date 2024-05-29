import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { PasswordModule } from 'primeng/password';
import { InscriptionServiceService } from '../services/InscriptionService.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-ResetPassword',
  standalone: true,
  imports: [ButtonModule, CardModule, FieldsetModule, CommonModule, FormsModule, HttpClientModule, PasswordModule,ToastModule],
  templateUrl: './ResetPassword.component.html',
  styleUrls: ['./ResetPassword.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email!: string
  formatDate = {
    password: '',
    password1: ''
  }

  constructor(private route: ActivatedRoute, private authserv: InscriptionServiceService,private messageService: MessageService,private router:Router ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.email = params['email'];
      console.log('Verification code:', this.email);
    
      // Now you can use this.verificationCode as needed
    });
  }
  submit(): void {
    // Check if passwords match
    if (this.formatDate.password !== this.formatDate.password1) {

      console.error('Passwords do not match');
      this.messageService.add({key: 'reset',severity:'error', summary: 'Error', detail: 'Passwords do not match'});
      return;
    }


    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Check if the password meets the regex pattern
    if (!passwordRegex.test(this.formatDate.password)) {

      console.error('Password does not meet requirements');
      this.messageService.add({key: 'reset',severity:'error', summary: 'Error', detail: 'Password does not meet requirements'});
      return;
    }
    const signup={
      password:this.formatDate.password,
      email:this.email
    }
    console.log(signup);
this.authserv.resetPassword(signup).subscribe(response => {
  console.log('password successfully:', response);
  this.messageService.add({key: 'reset',severity:'success', summary: 'Success', detail: 'Votre mot de passe a été changé'});
  this.router.navigate(["/login"]);
}, error => {
  console.error('Error occurred during registration:', error);

});

  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { AdminServiceService } from '../services/AdminService.service';
import { Router } from '@angular/router';

import { StorageServiceService } from '../services/StorageService.service';
@Component({
  selector: 'app-AdminSidebar',
  standalone: true,
  imports: [CommonModule, ButtonModule, SidebarModule,DialogModule,PasswordModule,FormsModule],
  templateUrl: './AdminSidebar.component.html',
  styleUrls: ['./AdminSidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  @Input() dynamicContent: string | undefined;
  newpassword!: string
  confirmpassword!: string
  ancienpassword!:string;
  userid!:number;
  constructor(private adminService:AdminServiceService,private router: Router) { }

  ngOnInit() {
    if (!StorageServiceService.isAdminLoggedIn()) {
      this.router.navigate(['/error'])
    }
  }
  display: boolean = false;

  showDialog() {
    this.display = true;
  }
  valider() {
    const userString = localStorage.getItem('user');

    // Check if user object exists in local storage
    if (userString) {
      // Parse user object from JSON
      const user = JSON.parse(userString);

      // Access the ID property
      this.userid = user.id;


      // Now you can use userId as needed
    } else {
      // Handle case where user object does not exist in local storage
      console.error('User object not found in local storage');
    }
    // Check if new password and confirm password match
    if (this.newpassword !== this.confirmpassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    // Call API to change password
    this.adminService.changePassword({
      id: this.userid,
      passwordPrec: this.ancienpassword,
      nvPassword: this.newpassword
    }).subscribe(
      (response) => {
        // Handle success response
        alert('Password changed successfully.');
        this.display = false; // Close dialog
      },
      (error) => {
        // Handle error response
        console.error('Error changing password:', error);
        alert('Failed to change password. Please try again.');
      }
    );
  }
  
  logout(): void {
   
    StorageServiceService.clearFromLocalStorage();

   
    this.router.navigate(['/login']); 
  }
}

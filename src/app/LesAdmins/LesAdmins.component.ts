import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/AdminService.service';
import { CommonModule } from '@angular/common';
import {  TagModule } from 'primeng/tag';
import {  TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AdminSidebarComponent } from '../AdminSidebar/AdminSidebar.component';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { StorageServiceService } from '../services/StorageService.service';
@Component({
  selector: 'app-LesAdmins',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule,AdminSidebarComponent,CardModule],
  templateUrl: './LesAdmins.component.html',
  styleUrls: ['./LesAdmins.component.css']
})
export class LesAdminsComponent implements OnInit {
  comptes:any=[];
  constructor(private adminService:AdminServiceService,private router: Router) { }

  ngOnInit() {
    if (!StorageServiceService.isAdminLoggedIn()) {
      this.router.navigate(['/error'])
    }
    else{
    this.getAllComptes();}
  }
  getAllComptes() {
    this.adminService.getAllComptes().subscribe((res) => {
      console.log(res);
      // Filter the comptes array to contain only items where userRole !== 'Admin'
      this.comptes = res.filter((compte: { userRole: string; }) => compte.userRole !== 'Client');
      console.log("lescomptes:", this.comptes);
    });
  }

}

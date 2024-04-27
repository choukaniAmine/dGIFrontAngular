import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/AdminService.service';
import { CommonModule } from '@angular/common';
import {  TagModule } from 'primeng/tag';
import {  TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AdminSidebarComponent } from '../AdminSidebar/AdminSidebar.component';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { StorageServiceService } from '../services/StorageService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-AdminHomePage',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule,AdminSidebarComponent,MessagesModule,CardModule],
  templateUrl: './AdminHomePage.component.html',
  styleUrls: ['./AdminHomePage.component.css']
})
export class AdminHomePageComponent implements OnInit {
  inscription:any=[];
  comptes:any=[];
  lesContribuables: any = [];
  totalinscription:any;
totalcomptes:any;
totalcontribuable:any;
  constructor(private adminService:AdminServiceService,private router: Router) { }

  ngOnInit() {
    if (!StorageServiceService.isAdminLoggedIn()) {
      this.router.navigate(['/error'])
    }
    else{
    this.getAllInscri();
    this.getAllComptes();
    this.getAllContribuable();}
  }
  getAllInscri() {
    this.adminService.getAllInscription().subscribe((res) => {
      console.log(res);
      this.inscription = res.filter((inscription: { email: string }) => 
        !this.comptes.find((compte: { email: string }) => compte.email === inscription.email)
      );
      this.totalinscription=this.inscription.length;
    });

  

  }
  
  
  getAllComptes() {
    this.adminService.getAllComptes().subscribe((res) => {
      console.log(res);
      this.comptes = res.filter((compte: { userRole: string; }) => compte.userRole !== 'Admin');
      console.log("lescomptes:", this.comptes);
      // After fetching comptes, update the inscription array
      this.totalcomptes=this.comptes.length;
      this.getAllInscri();
    });

  }
  getAllContribuable() {
    this.adminService.getAllContribuale().subscribe((res) => {

      this.lesContribuables = res;
      console.log(this.lesContribuables)
      this.totalcontribuable=this.lesContribuables.length;
    })
   
  }
  
}

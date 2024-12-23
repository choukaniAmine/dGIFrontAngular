import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/AdminService.service';
import { CommonModule } from '@angular/common';
import {  TagModule } from 'primeng/tag';
import {  TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AdminSidebarComponent } from '../AdminSidebar/AdminSidebar.component';
import { MessagesModule } from 'primeng/messages';
import { Router } from '@angular/router';
import { StorageServiceService } from '../services/StorageService.service';
@Component({
  selector: 'app-AllInscription',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule,AdminSidebarComponent,MessagesModule],
  templateUrl: './AllInscription.component.html',
  styleUrls: ['./AllInscription.component.css']
})
export class AllInscriptionComponent implements OnInit {
inscription:any=[];
comptes:any=[];

  constructor(private adminService:AdminServiceService,private router: Router) { }

  ngOnInit() {
    if (!StorageServiceService.isAdminLoggedIn()) {
      this.router.navigate(['/error'])
    }
    else{
    this.getAllInscri();
    this.getAllComptes();}
  }
  getAllInscri() {
    this.adminService.getAllInscription().subscribe((res) => {
      console.log(res);
      this.inscription = res.filter((inscription: { email: string }) => 
        !this.comptes.find((compte: { email: string }) => compte.email === inscription.email)

      );
    });
  
  }
  
  
  getAllComptes() {
    this.adminService.getAllComptes().subscribe((res) => {
      console.log(res);
      this.comptes = res.filter((compte: { userRole: string; }) => compte.userRole !== 'Admin');
      console.log("lescomptes:", this.comptes);
      // After fetching comptes, update the inscription array
      this.getAllInscri();
    });
  }
  
getSeverity(enabled: boolean): string {
  return enabled ? 'success' : 'danger';
}
accepterUtilisateur(inscription: any): void {
  
  console.log(inscription);
 this.adminService.acceptCompte(inscription).subscribe((res)=>{
  console.log(res);
  this.ngOnInit();
 })
}
}

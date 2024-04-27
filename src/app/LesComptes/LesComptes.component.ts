import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/AdminService.service';
import { CommonModule } from '@angular/common';
import {  TagModule } from 'primeng/tag';
import {  TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AdminSidebarComponent } from '../AdminSidebar/AdminSidebar.component';
import { StorageServiceService } from '../services/StorageService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-LesComptes',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule,AdminSidebarComponent],
  templateUrl: './LesComptes.component.html',
  styleUrls: ['./LesComptes.component.css']
})
export class LesComptesComponent implements OnInit {
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
      this.comptes = res.filter((compte: { userRole: string; }) => compte.userRole !== 'Admin');
      console.log("lescomptes:", this.comptes);
    });
  }
  getSeverity(enabled: boolean): string {
    return enabled ? 'success' : 'danger';
  }
  bloqueCompte(compte: any) {
    this.adminService.bloqueCompte(compte).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    }, error => {
      console.error(error);
    });

  }
  debloqueCompte(compte: any) {
    this.adminService.debloqueCompte(compte).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    }, error => {
      console.error(error);
    });
  }
}

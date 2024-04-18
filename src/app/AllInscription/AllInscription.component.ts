import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/AdminService.service';
import { CommonModule } from '@angular/common';
import {  TagModule } from 'primeng/tag';
import {  TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AdminSidebarComponent } from '../AdminSidebar/AdminSidebar.component';
@Component({
  selector: 'app-AllInscription',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule,AdminSidebarComponent],
  templateUrl: './AllInscription.component.html',
  styleUrls: ['./AllInscription.component.css']
})
export class AllInscriptionComponent implements OnInit {
inscription:any=[];
  constructor(private adminService:AdminServiceService) { }

  ngOnInit() {
    this.getAllInscri();
  }
getAllInscri(){
  this.adminService.getAllInscription().subscribe((res)=>{
    console.log(res);
    this.inscription=res;
  })
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

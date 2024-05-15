import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/AdminService.service';
import { AdminSidebarComponent } from '../AdminSidebar/AdminSidebar.component';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-LesImpots',
  standalone: true,
  imports:[AdminSidebarComponent,RouterModule,CardModule, TableModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, ToastModule],
  templateUrl: './LesImpots.component.html',
  styleUrls: ['./LesImpots.component.css']
})
export class LesImpotsComponent implements OnInit {
lesimpots:any
  constructor(private AdminService: AdminServiceService,private router:Router) { }

  ngOnInit() {
    this.getAllImpots();
  }
getAllImpots(){
  this.AdminService.getAllImpots().subscribe((data) => { this.lesimpots = data, console.log(this.lesimpots) })
}
submit(){
this.router.navigate(['/admin/ajoutimpot'])
}
}

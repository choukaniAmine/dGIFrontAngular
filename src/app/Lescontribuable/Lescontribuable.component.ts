import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/AdminService.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AdminSidebarComponent } from '../AdminSidebar/AdminSidebar.component';
import { Router } from '@angular/router';
import { StorageServiceService } from '../services/StorageService.service';

@Component({
  selector: 'app-Lescontribuable',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TagModule,AdminSidebarComponent],
  templateUrl: './Lescontribuable.component.html',
  styleUrls: ['./Lescontribuable.component.css']
})
export class LescontribuableComponent implements OnInit {
  lesContribuables: any = []
  constructor(private AdminService: AdminServiceService,private router: Router) { }

  ngOnInit() {
    if (!StorageServiceService.isAdminLoggedIn()) {
      this.router.navigate(['/error'])
    }
    else{
    this.getAllContribuable();}
  }
  getAllContribuable() {
    this.AdminService.getAllContribuale().subscribe((res) => {

      this.lesContribuables = res;
      console.log(this.lesContribuables)
    })
  }
}

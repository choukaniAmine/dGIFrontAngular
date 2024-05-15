import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AdminServiceService } from '../services/AdminService.service';
import { AdminSidebarComponent } from '../AdminSidebar/AdminSidebar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-AjoutImpot',
  standalone: true,
  imports: [CardModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule
  ,ToastModule,AdminSidebarComponent],
  templateUrl: './AjoutImpot.component.html',
  styleUrls: ['./AjoutImpot.component.css']
})
export class AjoutImpotComponent implements OnInit {

  constructor(private AdminService: AdminServiceService,private messageService: MessageService,private router:Router ) { }

  ngOnInit() {
    this.allPeriodes();
  }
  titreImpot: string = ''
  lesPeriodes: any = []
  periode1: any


  allPeriodes() {
    this.AdminService.getAllPeriodes().subscribe((data) => { this.lesPeriodes = data, console.log(this.lesPeriodes) })
  }
  submit() {
    const inputElement = document.querySelector('input[type="text"]');
    const dropdownElement = document.querySelector('p-dropdown');

    // Validate input element
    let isInputValid = true;
    if (inputElement) {
      if (!this.titreImpot) {
        inputElement.classList.add('ng-dirty', 'ng-invalid');
        isInputValid = false;
      } else {
        inputElement.classList.remove('ng-dirty', 'ng-invalid');
      }
    }

    // Validate dropdown element
    let isDropdownValid = true;
    if (dropdownElement) {
      if (!this.periode1) {
        dropdownElement.classList.add('ng-dirty', 'ng-invalid');
        isDropdownValid = false;
      } else {
        dropdownElement.classList.remove('ng-dirty', 'ng-invalid');
      }
    }

    // Save impot DTO if both input and dropdown are valid
    if (isInputValid && isDropdownValid) {
      const impotDto = {
        libelle: this.titreImpot,
        periodicite: this.periode1
      };

      this.AdminService.saveImpot(impotDto).subscribe(() => {
        this.messageService.add({ key: 'step1', severity: 'success', summary: 'Connecte', detail: "Impot Ajouté Avec Success" });
        setTimeout(() => {
          this.router.navigate(['/admin/lesimpots']);
        }, 1500);
      });

     

    }
    
  }
  annuler() {
    this.titreImpot = ''
    this.periode1 = ''

  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { AdminSidebarComponent } from '../AdminSidebar/AdminSidebar.component';
import { AdminServiceService } from '../services/AdminService.service';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-DetailImpot',
  standalone: true,
  imports: [CardModule,AdminSidebarComponent, DialogModule,RouterModule, TableModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, ToastModule],
  templateUrl: './DetailImpot.component.html',
  styleUrls: ['./DetailImpot.component.css']
})
export class DetailImpotComponent implements OnInit {

  detail: any = []
  libelle!: string
  displayDialog: boolean = false;
  impotTitle: string = "";
  formula: string = "";
  constructor(private AdminService: AdminServiceService, private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.getlibelle()
  }

  getlibelle() {
    this.router.params.subscribe(params => {
      // Retrieve the impot object using the libelle parameter
      this.libelle = params['libelle'];
      console.log("C'est le paramètre libelle:", this.libelle);
      this.AdminService.getDetailByImpot(this.libelle).subscribe((data) => { this.detail = data })
    });
  }
  showDialog() {
    this.displayDialog = true;

    this.impotTitle = this.libelle;
  }

  submitFormula() {
    // Regular expression pattern for a valid formula
    const formulaPattern = /^([a-zA-Z]+|\d+)\s*[\+\-\*\/]\s*([a-zA-Z]+|\d+)\s*(?:[\+\-\*\/]\s*([a-zA-Z]+|\d+)\s*)*$/;

    if (!formulaPattern.test(this.formula)) {
      // Formula format is invalid
      console.error('Invalid formula format:', this.formula);
      return;
    }

    // Wrap the formula with {}
    const wrappedFormula = `{${this.formula}}`;

    console.log('Wrapped formula:', wrappedFormula);
    const impotdto = {
      libelle: this.libelle,
      formule: wrappedFormula
    }
    console.log(impotdto)
    this.AdminService.saveformuleImpot(impotdto).subscribe((data) => console.log(data))
  }
}

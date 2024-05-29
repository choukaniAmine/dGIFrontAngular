import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AdminServiceService } from '../services/AdminService.service';
import { AdminSidebarComponent } from '../AdminSidebar/AdminSidebar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeDeDetailImpot } from '../models/TypeDeDetailImpot.enum';
import { NatureRubrique } from '../models/NatureRubrique.enum';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
@Component({
  selector: 'app-AjoutDetailImpot',
  standalone: true,
  imports: [CardModule, InputNumberModule,RadioButtonModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, ToastModule,AdminSidebarComponent,DialogModule],
  templateUrl: './AjoutDetailImpot.component.html',
  styleUrls: ['./AjoutDetailImpot.component.css']
})
export class AjoutDetailImpotComponent implements OnInit {
  typeDetailKeys = Object.keys(TypeDeDetailImpot);
  NatureRebriqueKeys = Object.keys(NatureRubrique)
  selectedType: any;
  selectedType1: any;
  trueValue: boolean = false;
  libelle!: string
  value: String = ''
  value1: String = ''
  typeimpot: any
  isCalculable: boolean = false;
  displayDialog: boolean = false;
 

  lesDetails: any[] = []
  selectedDetails: string[] = [];
  selectedOperations: string[] = [];
  formulaElements: string[] = [];
  formula: string = '';
  selectedDetail: any = null;
  selectedOperation: any = null;
  
 


  operationOptions: any[] = [
    { label: 'Addition', value: ' + ' },
    { label: 'Subtraction', value: ' - ' },
    { label: 'Multiplication', value: ' * ' },
    { label: 'Division', value: ' / ' },
    { label: 'Max', value: 'max(' },
    { label: 'Min', value: 'min(' }
  ];;
  expectingDetail: boolean = true;
  openDialog() {
    if (this.isCalculable) {
      this.displayDialog = true;
    }
  }

 
  constructor(private adminservice: AdminServiceService,private router: ActivatedRoute,private messageService: MessageService,private router1:Router) { }
  ngOnInit(): void {
    this.getlibelle()
    this.getdetail()
  }
 
  getlibelle() {
    this.router.params.subscribe(params => {
      // Retrieve the impot object using the libelle parameter
      this.libelle = params['libelle'];
      //console.log("C'est le paramÃ¨tre libelle:", libelle);
      this.adminservice.getTypeImpot(this.libelle).subscribe((data) => { this.typeimpot = data,console.log(data) })
    });
  }
  submit() {
    if (!this.selectedType  || this.trueValue === null || this.libelle === null || this.value === null || this.typeimpot === null) {
      // Ajoutez la classe aux éléments ou effectuez toute autre action nécessaire
      this.messageService.add({ key: 'step1', severity: 'error', summary: 'error', detail: "Un ou plusieurs champs sont null" });
    }
    
    else {
      // All fields are not null, proceed with the submission
      console.log("All fields are not null. Proceeding with submission.");
      const detail = {
        libelle: this.value,
        typeDetail: this.selectedType,
        
        ordre: this.value1,
        obligatoire: this.trueValue,
        typeImpot: this.typeimpot,
        calculable: this.isCalculable,
        formule:this.formula
      };
      this.adminservice.saveDetailImpot(detail).subscribe((data) => {
      
        this.messageService.add({ key: 'step1', severity: 'success', summary: 'valide', detail: "detail Ajouté" });
        setTimeout(() => {
          this.router1.navigate(['/admin/detail-impot', this.libelle]);
        }, 1500);

      })
    }

  }
  
  getdetail() {
    this.adminservice.getDetailByImpot(this.libelle).subscribe((data) => {
      this.lesDetails = data;
      console.log(data)
    })
  }
  onDetailChange(event: any) {
    
    const selectedDetail = event.value.libelle;
    if (!this.expectingDetail) {
      this.lesDetails = [];
      this.getdetail();
     
      this.selectedDetail = null;
      console.error('Expected an operation, not a detail');
     
      return ;
    }

    
    if (selectedDetail) {
      this.selectedDetails.push(selectedDetail);
      this.formulaElements.push(selectedDetail);
      this.updateFormula();
      this.selectedDetail = null;
      this.lesDetails = [];
      this.getdetail();
      this.expectingDetail = false; // Next should be an operation
    }
  }

  onOperationChange(event: any) {
    if (this.expectingDetail) {
      console.error('Expected a detail, not an operation');
      return;
    }

    const selectedOperation = event.value.value;
    if (selectedOperation) {
      this.selectedOperations.push(selectedOperation);
      this.formulaElements.push(selectedOperation);
      this.updateFormula();
      this.selectedOperation = null;
      this.expectingDetail = true; // Next should be a detail
      this.lesDetails = [];
      this.getdetail();
    }
  }

  updateFormula() {
    this.formula = this.formulaElements.join(' ');
  }
  clearFormula() {
    this.expectingDetail = true
    this.formulaElements.length = 0;

    this.formula = ''
  }
  verif() {
    if (this.formulaElements.length === 0) {
      console.log("The formula is empty.");
      return;
    }
    const lastElement = this.formulaElements[this.formulaElements.length - 1];
    const isLastElementOperation = this.operationOptions.some(op => op.value === lastElement);
    if (isLastElementOperation) {
      console.log("The last element is an operation.");
      // Show an alert or handle the case where the last element is an operation
      alert("The last element cannot be an operation. Please add a detail.");
    } else {
      console.log("The last element is a detail.");
      // Proceed with your logic when the last element is a detail
      this.displayDialog = false;
    }
  }
}

  
  



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
@Component({
  selector: 'app-AjoutDetailImpot',
  standalone: true,
  imports: [CardModule, RadioButtonModule, CommonModule, FormsModule, ButtonModule, InputTextModule, DropdownModule, ToastModule,AdminSidebarComponent,DialogModule],
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
  openDialog() {
    if (this.isCalculable) {
      this.displayDialog = true;
    }
  }

  closeDialog() {

    this.displayDialog = false;
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
    if (!this.selectedType || !this.selectedType1 || this.trueValue === null || this.libelle === null || this.value === null || this.typeimpot === null) {
      // Ajoutez la classe aux éléments ou effectuez toute autre action nécessaire
      this.messageService.add({ key: 'step1', severity: 'error', summary: 'error', detail: "Un ou plusieurs champs sont null" });
    }
    
    else {
      // All fields are not null, proceed with the submission
      console.log("All fields are not null. Proceeding with submission.");
      const detail = {
        libelle: this.value,
        typeDetail: this.selectedType,
        naturerebrique: this.selectedType1,
        ordre: this.value1,
        obligatoire: this.trueValue,
        typeImpot: this.typeimpot
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
    if (selectedDetail) {
      this.selectedDetails.push(selectedDetail);
      this.formulaElements.push(selectedDetail);
      
      this.updateFormula();
      // Refresh the dropdown by setting selectedDetail to null
      this.selectedDetail = null;
      this.lesDetails=[];
      this.getdetail();

    }
  }

  onOperationChange(event: any) {
    const selectedOperation = event.value.value;
    if (selectedOperation) {
      this.selectedOperations.push(selectedOperation);
      this.formulaElements.push(selectedOperation);
      this.selectedOperation = null; // Reset the selected operation after adding
      this.updateFormula();
    }
  }

  updateFormula() {
    // Concatenate formula elements to form the formula
    this.formula = this.formulaElements.join(' ');
  }
}
  
  



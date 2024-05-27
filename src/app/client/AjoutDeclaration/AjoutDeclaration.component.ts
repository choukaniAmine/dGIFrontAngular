import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputText, InputTextModule } from 'primeng/inputtext';


import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { NavbarClientComponent } from '../LayoutClient/navbarClient.component';
import { ClientService } from '../../services/Client.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-AjoutDeclaration',
  standalone: true,
  imports: [InputNumberModule, FormsModule, CommonModule, CardModule, ButtonModule, DropdownModule, InputTextModule, CalendarModule, ToastModule,DialogModule,NavbarClientComponent],
  templateUrl: './AjoutDeclaration.component.html',
  styleUrls: ['./AjoutDeclaration.component.css']
})
export class AjoutDeclarationComponent implements OnInit {
  lesobligations: any
  contribuable: any
  obligation: any;
  lestypes: any
  type: any;
  date: any;
  displayPopup: any;
  hashMapEntries: Map<string, any> = new Map();
  constructor(private clientservice: ClientService, private messageService: MessageService) { }

  ngOnInit() {
    this.getcontribuable();
    
  }
  getcontribuable() {
    const matricule = localStorage.getItem('contribuableMatricule');
    this.clientservice.getContribuableBymatricule(Number(matricule)).subscribe((data) => {
      this.contribuable = data;
      console.log(this.contribuable);
      this.getObligation(); // Call getObligation() after getting the contribuable data
      this.lestypeDeclaration()
    });
  }

  getObligation() {
    if (!this.contribuable) {
      console.error("Contribuable is not defined.");
      return;
    }

    this.clientservice.getObligationById(this.contribuable.idContribuable).subscribe((data) => {
      this.lesobligations = data;
      console.log(this.lesobligations);
    });
  }
  lestypeDeclaration() {
    if (!this.contribuable) {
      console.error("Contribuable is not defined.");
      return;
    }
    this.clientservice.gettypeDeclaration().subscribe((data) => { this.lestypes = data, console.log(this.lestypes) })
  }
  submit() {
    // Extract month and year from the selected date
    if (!this.date || !this.obligation || !this.type) {
      // If any value is null, display a toast message
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields.' });
      return; // Stop further execution of the function
    }
    const moisEffet = this.date.getMonth() + 1; // Adding 1 because months are zero-based
    const anneeEffet = this.date.getFullYear();

    // Create an object with the extracted attributes and other predefined attributes
    const declarationObject = {
      moisEffet: moisEffet,
      anneEffet: anneeEffet,
      idObligation: this.obligation.idObligation,
      type: this.type
    };

    // Now you can use the declarationObject for further processing, such as sending it to a service
    this.clientservice.saveDeclaration(declarationObject).subscribe(
      (data: any) => { // Add type assertion here
        this.hashMapEntries = data;
        console.log(data);
        this.getFormule();
        this.displayPopup = true;
      
      },
      (error) => {
        console.error('Error saving declaration:', error);
      }
    );
  }
  parseEntryKey(key: string): any {
    const libelleIndex = key.indexOf('libelle=');
    if (libelleIndex === -1) {
      return '';
    }
    let libelle = '';
    const startIndex = libelleIndex + 'libelle='.length;
    const endIndex = key.indexOf(',', startIndex);
    if (endIndex === -1) {
      libelle = key.substring(startIndex);
    } else {
      libelle = key.substring(startIndex, endIndex);
    }

    const obligatoireIndex = key.indexOf('obligatoire=true');
    if (obligatoireIndex !== -1) {
      libelle += ' *';
    }

    const natureRebriqueIndex = key.indexOf('naturerebrique=');
    if (natureRebriqueIndex !== -1) {
      const natureStartIndex = natureRebriqueIndex + 'naturerebrique='.length;
      const natureEndIndex = key.indexOf(',', natureStartIndex);
      let natureRebrique = '';
      if (natureEndIndex === -1) {
        natureRebrique = key.substring(natureStartIndex);
      } else {
        natureRebrique = key.substring(natureStartIndex, natureEndIndex);
      }
      if (natureRebrique === 'REVENUS') {
        libelle += ' (r)';
      } else if (natureRebrique === 'PERTE') {
        libelle += ' (p)';
      }
    }

    return libelle;
  }
  submit1() {
    //console.log(this.hashMapEntries);
    const updateRequests = [];

    for (const [key, value] of Object.entries(this.hashMapEntries)) {
      const declarationDto = {
        idDetailDeclaration: value.idDetailDeclaration, // Use the correct property names
        valeur: value.valeur
      };
     // console.log(declarationDto)
      updateRequests.push(this.clientservice.updateDetailDeclaration(declarationDto));
    }

    forkJoin(updateRequests).subscribe(
      responses => {
        console.log('All updates successful', responses);
        this.getDetailType(this.hashMapEntries);

      },
      error => {
        console.error('An error occurred during updates', error);
      }

    );
  }
 
  getDetailType(hashMapEntries: any) {
    let sumRevenus = 0;
    let sumPerte = 0;
    const revenus: any[] = [];
    const perte: any[] = [];
    const values: { [key: string]: number } = {};

    for (const [key, value] of Object.entries(hashMapEntries)) {
      const detailImpot = key.split(',')[3].split('=')[1].trim(); // Extracting naturerebrique
      const entryValue = value as { idDetailDeclaration: number, valeur: string }; // Type assertion
      const valeur = parseFloat(entryValue.valeur); // Assuming 'valeur' contains the numeric value
      if (detailImpot === 'REVENUS') {
        revenus.push(value);
        sumRevenus += valeur;
      } else if (detailImpot === 'PERTE') {
        perte.push(value);
        sumPerte += valeur;
      }
    }
   
    this.clientservice.getFormulaByLibelle(this.obligation.typeImpot.libelle).subscribe((data) =>{ 
    values['r'] = sumRevenus;
    values['p'] = sumPerte;
    console.log(values)





    
    const calculateRequest = {
      "formula": data.formule,
      "values": values

    }
    console.log(calculateRequest)
     this.clientservice.calculateEquation(calculateRequest).subscribe((data) => console.log(data))
  })
  }
  formule:any;
  getFormule() {
    this.clientservice.getFormulaByLibelle(this.obligation.typeImpot.libelle).subscribe((data) => {
      console.log(data);
      this.formule = data.formule;

    });
  }
}

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
  iddeclaration: any
  formule: any
  formule1: string = ''
  result!: number
  nonCalculableEntries: { [key: string]: any } = {}
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

    if (!this.date || !this.obligation || !this.type) {

      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields.' });
      return;
    }
    const moisEffet = this.date.getMonth() + 1;
    const anneeEffet = this.date.getFullYear();


    const declarationObject = {
      moisEffet: moisEffet,
      anneEffet: anneeEffet,
      idObligation: this.obligation.idObligation,
      type: this.type
    };


    this.clientservice.saveDeclaration(declarationObject).subscribe(
      (data: any) => {

        const entriesArray = Object.entries(data).sort((a, b) => {
          const ordreA = this.extractOrdreFromKey(a[0]);
          const ordreB = this.extractOrdreFromKey(b[0]);
          // console.log("ordre", ordreA)
          return ordreA - ordreB;
        });



        this.hashMapEntries = new Map(entriesArray);
        //this.getFormule()
        //console.log(this.hashMapEntries);

        this.displayPopup = true;
      },
      (error) => {
        console.error('Error saving declaration:', error);
      }
    );
  }
  extractCalculable(key: string): boolean {
    const calculableIndex = key.indexOf('calculable=true');
    return calculableIndex !== -1;
  }

  extractOrdreFromKey(key: string): number {
    const ordreMatch = key.match(/ordre=(\d+)/);
    return ordreMatch ? parseInt(ordreMatch[1], 10) : Number.MAX_SAFE_INTEGER;
  }
  keepOriginalOrder = (a: any, b: any): number => {
    return 0;
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



    return libelle;
  }
  identifyNonCalculableEntries() {
    console.log("Identifying non-calculable entries...");
    this.hashMapEntries.forEach((value, key) => {
      if (key.includes('calculable=false')) {
        let libelle = this.extractLibelle(key);
        this.nonCalculableEntries[libelle] = value.valeur;
      }
    });
    console.log("Non-calculable entries identified:", this.nonCalculableEntries);
  }
  extractLibelle(key: string): string {
    let start = key.indexOf('libelle=') + 8;
    let end = key.indexOf(', typeDetail');
    return key.substring(start, end);
  }
  calculateValues() {

    this.identifyNonCalculableEntries()
    this.hashMapEntries.forEach((value, key) => {
      //console.log("hello");
      if (key.includes('calculable=true')) {

        let formula = `{${this.extractFormula(key)}}`; // Add {} around the formula
        let values = this.nonCalculableEntries;
        // console.log(formula);
        //console.log(values);
        this.clientservice.calculateEquation({ formula, values }).subscribe(
          (result: any) => {
            //console.log(result);
            this.hashMapEntries.set(key, { ...value, valeur: result });
            this.updateDetailDeclaration(value, result)
          },
          (error) => {
            console.error('Error calculating value', error);
          }
        );
      } else { this.updateDetailDeclaration(value, value.valeur) }

    });

    console.log("Finished calculateValues.");
  }
  updateDetailDeclaration(value: any, result: any) {
    console.log("value ",value)
    const detailDeclarationDto = {
      idDetailDeclaration: value.idDetailDeclaration,
      valeur: result,
      idDeclaration: value.idDeclaration,
      naturerebrique: value.naturerebrique
    };
    console.log(detailDeclarationDto)
    this.clientservice.updateDetailDeclaration(detailDeclarationDto).subscribe((data) => console.log("succeful update"))

  }
  extractFormula(key: string): string {
    let start = key.indexOf('formule=') + 8;
    let end = key.indexOf(', ordre');
    return key.substring(start, end);
  }

  calculateSingleEntry(entry: any) {
    const key = entry.key;
    const value = entry.value;

    // Update non-calculable entries
    this.updateNonCalculableEntries();

    if (this.extractCalculable(key)) {
      const formula = this.extractFormula(key);
      const values = this.getNonCalculableValues();

      this.clientservice.calculateEquation({ formula, values }).subscribe(
        (result: any) => {
          this.hashMapEntries.set(key, { ...value, valeur: result });
          this.updateDetailDeclaration(value, result);
        },
        (error) => {
          console.error('Error calculating value', error);
        }
      );
    } else {
      this.updateDetailDeclaration(value, value.valeur);
    }
  }
  updateNonCalculableEntries() {
    this.hashMapEntries.forEach((value, key) => {
      if (!this.extractCalculable(key)) {
        this.updateDetailDeclaration(value, value.valeur);
      }
    });
  }
  getNonCalculableValues() {
    const values: { [key: string]: number } = {};
    this.hashMapEntries.forEach((value, key) => {
      if (!this.extractCalculable(key)) {
        const libelle = this.parseEntryKey(key);
        values[libelle] = value.valeur;
      }
    });
    return values;
  }

}

import { CommonModule, formatDate } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Identifiant } from '../models/Identifiant.enum';
import { InscriptionServiceService } from '../services/InscriptionService.service';
import { StepsModule } from 'primeng/steps';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';

import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Console } from 'console';

@Component({
  selector: 'app-Inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, StepsModule,
    FieldsetModule,
    ButtonModule, CardModule, CalendarModule, ReactiveFormsModule,NgxCaptchaModule],
  templateUrl: './Inscription.component.html',

  styleUrls: ['./Inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  siteKey: string;
  lesinscriptions: any = []
  activeIndex = 0;
  valid: boolean = false;
  date!: Date | null;
  date2!: Date | null;
  submitted: boolean = false;
  contribuable: any
  typeIdentifiants = Object.values(Identifiant).filter(value => typeof value === 'string');
  selectedType: Identifiant | null = null;
  inputValue: string = '';
  items = [
    { label: ' contribuable ' },
    { label: 'Step 2' },
    { label: 'Step 3' },
    { label: 'Step 4' }

  ];
  selectType(type: string | Identifiant) {
    this.selectedType = type as Identifiant;
  }


  clearInput() {
    this.inputValue = '';
  }
  formData = {
    email: '',
    password: '',
    name: '',
    
    numeroFiscal: '',
    poste: '',
    typeIdentifiant: this.selectType,
    valeurIdentifiant: '',
    numerodequittance: '',
  }

  constructor(private inscservice:InscriptionServiceService) { this.siteKey = '6Lf62rApAAAAANTrndxnTO0Npv3pBj5uJgQY2nba'}

  ngOnInit() {
  }
  onSubmit() {
    this.inscservice.getContribuableByMatriculeFiscale(Number(this.formData.numeroFiscal)).subscribe((data) => {
      this.contribuable = data;

      const signupRequest = {
        email: this.formData.email,
        password: this.formData.password,
        name: this.formData.name,
        
        numeroFiscal: this.formData.numeroFiscal,
        poste: this.formData.poste,
        typeIdentifiant: this.selectedType,
        valeurIdentifiant: this.inputValue,
        contribuable: this.contribuable
      };
console.log('ili b3aththa:',signupRequest);
      this.inscservice.register(signupRequest).subscribe(response => {
        console.log('User registered successfully:', response);

      }, error => {
        console.error('Error occurred during registration:', error);

      });
    }, (error: any) => {
      console.error('Error occurred while fetching contribuable:', error);

    });
  }



  nextStep() {

    this.submitted = true;

    if (this.validateForm()) {
      this.inscservice.getAllInscription().subscribe((inscriptionList) => {
        this.lesinscriptions = inscriptionList;

        this.inscservice.getContribuableByMatriculeFiscale(Number(this.formData.numeroFiscal)).subscribe(
          (data) => {
            this.contribuable = data;

            // Check if the contribuable already exists in the list
            const contribuableExists = this.lesinscriptions.some((inscription: any) => {
              return inscription.contribuable.idContribuable === this.contribuable.idContribuable;
            });

            if (contribuableExists) {
              alert("Contribuable has already done the sign up");
              return; // Exit the function early if the contribuable exists
            }

            const contribuableDate = new Date(this.contribuable.dateDeMatriculation);
            const contribuableDateOnly = new Date(contribuableDate.getFullYear(), contribuableDate.getMonth(), contribuableDate.getDate());

            // Convert this.date to Date object if it's not null
            let currentDateOnly: Date | null = null;
            if (this.date) {
              const currentDate = new Date(this.date);
              currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            }

            console.log("Contribuable Date:", contribuableDate);
            console.log("Current Date:", currentDateOnly);

            // Compare the dates if currentDate is not null
            if (currentDateOnly && contribuableDateOnly.getTime() === currentDateOnly.getTime()) {
              alert("Contribuable found");
              this.activeIndex++;
              this.submitted = false; // Proceed to the next step if the contribuable is found
            } else {
              console.log(this.contribuable);
              console.log(this.contribuable.dateDeMatriculation);
              console.log(this.date);
              alert("Contribuable not found");
            }
          },
          (error) => {
            console.error("Error fetching contribuable:", error);
            alert("An error occurred while fetching the contribuable");
          }
        );
      });
    }

  }

  validateForm(): boolean {
    if (!this.formData.numeroFiscal) {
      return false;
    }
    if (!this.date) {
      return false;
    }
    if (!this.valid) {
      return false;
    }
    return true;
  }
  handleSuccess(event: any) {
    this.valid = true;
    console.log(this.valid);// Set the valid flag to true when the recaptcha is successfully validated
  }

  // Function to handle recaptcha error
  handleError() {
    this.valid = false; // Set the valid flag to false when there's an error with recaptcha validation
  }

  prevStep() {
    this.activeIndex--;
  }

  submit() {
    // Submit logic
  }
  validateForm1(): boolean {
    if (!this.formData.numerodequittance) {
      return false;
    }
    if (!this.date2) {
      return false;
    }
    if (!this.valid) {
      return false;
    }
    return true;
  }
nextStep1(){
 
  this.submitted = true;
  const dateDeQuittance=this.date2 ? formatDate(this.date2,'yyyy-MM-dd','en-US'):null;
  const request={
    idDeclaration:this.formData.numerodequittance,
  cd :this.contribuable,
   
  }
  console.log(request)
  if(this.validateForm1())
  this.inscservice.checkDeclaration(request).subscribe(response=>{
 const dateFromBackend = response.dateDeclaration.split('T')[0];
 console.log(response);
console.log(dateDeQuittance);
console.log(dateFromBackend);
        if (dateFromBackend === dateDeQuittance) {
          // Les dates correspondent
          console.log('Les dates correspondent.');
          this.activeIndex++;
          this.submitted = false;
        } else {
          // Les dates ne correspondent pas
          alert('Les dates ne correspondent pas.');
        }
      }, error => {
        // Gérer les erreurs ici
        console.error(error);
      });
  }

  
  validateForm2(): boolean {
    if (!this.formData.email) {
      return false;
    }
    if (!this.formData.name) {
      return false;
    }
   
    if (!this.formData.poste) {
      return false;
    }
  if (!this.inputValue) {
      return false;
    }
    if (!this.valid) {
      return false;
    }
    return true;
  }
  nextStep2() {

    const signupRequest = {
      email: this.formData.email,
      password: null,
      name: this.formData.name,
  
      numeroFiscal: this.formData.numeroFiscal,
      poste: this.formData.poste,
      typeIdentifiant: this.selectedType,
      valeurIdentifiant: this.inputValue,
      contribuable: this.contribuable
    };
    console.log(signupRequest)
    this.submitted = true;
    if (this.validateForm2()) {

      this.inscservice.register(signupRequest).subscribe(response => {
        console.log('User registered successfully:', response);

      }, error => {
        console.error('Error occurred during registration:', error);

      });
    } else {
      console.log("cant be clicked");
    }

  }


}

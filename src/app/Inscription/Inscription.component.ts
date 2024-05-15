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
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
  selector: 'app-Inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, StepsModule,
    FieldsetModule,
    ButtonModule, CardModule, CalendarModule, ReactiveFormsModule,NgxCaptchaModule,ToastModule,ConfirmDialogModule],
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

  constructor(private authserve:InscriptionServiceService,private messageService: MessageService, private confirmationService: ConfirmationService) { this.siteKey = '6Lf62rApAAAAANTrndxnTO0Npv3pBj5uJgQY2nba'}

  ngOnInit() {
  }
  /*
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
*/


  nextStep() {

    this.submitted = true;

    if (this.validateForm()) {
      this.authserve.getAllInscription().subscribe((inscriptionList) => {
        this.lesinscriptions = inscriptionList;

        this.authserve.getContribuableByMatriculeFiscale(Number(this.formData.numeroFiscal)).subscribe(
          (data) => {
            this.contribuable = data;

            // Check if the contribuable already exists in the list
            const contribuableExists = this.lesinscriptions.some((inscription: any) => {
              return inscription.contribuable.idContribuable === this.contribuable.idContribuable;
            });

            if (contribuableExists) {
              // alert("Contribuable has already done the sign up");
              this.messageService.add({ key: 'step1', severity: 'error', summary: 'Error', detail: 'contribuable a deja fait linscription' });
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
              //alert("Contribuable found");
              this.messageService.add({ key: 'step1', severity: 'success', summary: 'Success', detail: 'contribuable trouvé !!' });
              //this.activeIndex++;
              setTimeout(() => {
                this.submitted = false;
                this.activeIndex++;
              }, 2000); // Proceed to the next step if the contribuable is found
            } else {
              console.log(this.contribuable);
              console.log(this.contribuable.dateDeMatriculation);
              console.log(this.date);
              //alert("Contribuable not found");
              this.messageService.add({ key: 'step1', severity: 'error', summary: 'Error', detail: 'contribuable introuvable' });
            }
          },
          (error) => {
            //console.error("Error fetching contribuable:", error);
            //alert("An error occurred while fetching the contribuable");
            this.messageService.add({ key: 'step1', severity: 'error', summary: 'Error', detail: 'contribuable introuvable' });
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
    console.log(this.valid);
  }

  handleError() {
    this.valid = false;
  }

  prevStep() {
    this.activeIndex--;
    this.submitted = false;
  }

  //step deux
  nextStep1() {
    this.submitted = true;
    const iddecalaration = this.formData.numerodequittance;
    const dateDeQuittance = this.date2 ? formatDate(this.date2, 'yyyy-MM-dd', 'en-US') : null;
    console.log("contribuable", this.contribuable)
    console.log("iddeclarartion", iddecalaration)
    console.log("datequittance", dateDeQuittance)
    console.log(this.contribuable)
    const request = {
      idDeclaration: iddecalaration,
      cd: this.contribuable
      

    }
    if (this.validateForm1()) {
      this.authserve.checkDeclaration(request).subscribe(
        (response) => {
          console.log(response)
          if (response && response.dateDeclaration) {
            const apiDateOnly = response.dateDeclaration.split('T')[0];
            console.log(apiDateOnly)
            if (apiDateOnly === dateDeQuittance) {
              this.messageService.add({ key: 'step2', severity: 'success', summary: 'Success', detail: 'Verification validé' });
              setTimeout(() => {
                this.submitted = false;
                this.activeIndex++;
              }, 2000);
            } else {
              //console.log('Date does not match');
              this.messageService.add({ key: 'step2', severity: 'error', summary: 'Error', detail: 'Verification non validé' });
            }
          } else {

            // console.log('Date does not match or declaration not found');
            this.messageService.add({ key: 'step2', severity: 'error', summary: 'Error', detail: 'Verification non validé' });
          }
        },
        (error) => {
          console.error('Error:', error);
          this.messageService.add({ key: 'step2', severity: 'error', summary: 'Error', detail: 'Something went wrong' });

        }
      );
    }
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
  confirm() {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const email = emailInput.value.trim();
    if (!email || !emailInput.validity.valid) {
      console.log('Email is invalid');
      this.messageService.add({ key: 'step3', severity: 'error', summary: 'Error', detail: 'Votre email est invalid' });
      return;
    }
    if (this.validateForm2()) {
      this.confirmationService.confirm({
        message: 'Etes vous sur de confirmation de formulaire ?',
        accept: () => {
          this.nextStep2()
        }
      });
    }

  }
  //step trois
  nextStep2() {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const email = emailInput.value.trim();

    // Check if the email is empty or invalid
    if (!email || !emailInput.validity.valid) {
      console.log('Email is invalid');
      this.messageService.add({ key: 'step3', severity: 'error', summary: 'Error', detail: 'Votre email est invalid' });
      return;
    }
    const signupRequest = {
      email: this.formData.email,
      password: null,
      nom: this.formData.name,

      numeroFiscal: this.formData.numeroFiscal,
      poste: this.formData.poste,
      typeIdentifiant: this.selectedType,
      valueIdentifiant: this.inputValue,
      contribuable: this.contribuable
    };
    console.log(signupRequest)
    this.submitted = true;

    if (this.validateForm2()) {

      this.authserve.register(signupRequest).subscribe(response => {
        console.log('User registered successfully:', response);
        this.messageService.add({ key: 'step3', severity: 'success', summary: 'registrer', detail: 'Votre inscription est validé !' });
        setTimeout(() => {
          this.submitted = false;
          this.activeIndex++;
        }, 2000);
      }, error => {
        console.error('Error occurred during registration:', error);
        this.messageService.add({ key: 'step3', severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      });

    } else {
      console.log("cant be clicked");
      this.messageService.add({ key: 'step3', severity: 'error', summary: 'Error', detail: 'votre formulaire est invalide' });
    }

  }
}

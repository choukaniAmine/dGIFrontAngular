import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/Client.service';

import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { NavbarClientComponent } from '../LayoutClient/navbarClient.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { StorageServiceService } from '../../services/StorageService.service';
@Component({
  selector: 'app-LesDeclarations',
  standalone: true,
  imports: [CommonModule,TableModule,NavbarClientComponent, ButtonModule, DialogModule, ConfirmDialogModule],
  templateUrl: './LesDeclarations.component.html',
  styleUrls: ['./LesDeclarations.component.css']
})
export class LesDeclarationsComponent implements OnInit {
  static readonly receiverWalletId: string = "664b1199a58e585682a8ada8";
  compte: any
  contribuable: any;
  declarations: any
  displayDialog: boolean = false;
  selectedObligation: any 
  confirmationVisible: boolean = false;
  payment: any
  constructor(private clientservice:ClientService) { }

  ngOnInit() {
    this.getcontribuable();
    this.getuser();
  }
  getcontribuable() {
    const matricule = localStorage.getItem('contribuableMatricule');
    this.clientservice.getContribuableBymatricule(Number(matricule)).subscribe((data) => {
      this.contribuable = data;
     console.log(this.contribuable);
      this.getLesDeclarationByContribuable(); // Call getObligation() after getting the contribuable data
     
    });
  }
  getLesDeclarationByContribuable(){
    if (!this.contribuable) {
      console.error("Contribuable is not defined.");
      return;
    }
    this.clientservice.getDeclarationByContribuable(this.contribuable.matriculeFiscale).subscribe(
      (data)=>{
        // Filtrer les déclarations avec un montant à payer > 0
        this.declarations = data.filter((declaration: any) => declaration.montantApayer && declaration.montantApayer > 0);
        console.log(this.declarations);
      }
    )
  }
  slm(){
    alert("oooooo");
  }
  showDialog(obligation: any) {
    this.selectedObligation = obligation;
    
    this.displayDialog = true;
    console.log(this.displayDialog)
  }
  showDialog1(obligation: any) {
    this.selectedObligation = obligation;
    this.confirmationVisible = true;
  }
  getuser() {
    const compte = StorageServiceService.getUser();
    const id = compte.id;
    console.log(id);
    this.clientservice.getCompteByid(id).subscribe((data) => {
      console.log(data);
      this.compte = data})

  }
  submit(declaration: any) {
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/client/paimentsuc?idDeclaration=${declaration.idDeclaration}`;
    const failUrl = `${baseUrl}/client/paimentfailed`
    const paymentRequest = {
      "receiverWalletId": LesDeclarationsComponent.receiverWalletId,
      "token": "TND",
      "amount": declaration.montantApayer,
      "type": "immediate",
      "description": "payment description",
      "acceptedPaymentMethods": [
        "wallet",
        "bank_card",
        "e-DINAR"
      ],
      "lifespan": 30,
      "checkoutForm": false,
      "addPaymentFeesToAmount": true,
      "firstName": this.compte.firstName,
      "lastName": this.compte.lastName,
      "phoneNumber": "",
      "email": this.compte.Email,
      "orderId": "1234657",
      "webhook": "https://merchant.tech/api/notification_payment",
      "silentWebhook": true,
      "successUrl": successUrl,
      "failUrl": failUrl,
      "theme": "light"
    };
    this.clientservice.initPaiement(paymentRequest).subscribe((data: any) => {

      this.payment = data;

      // Extract the payUrl from the response
      const payUrl = data.payUrl;

      // Navigate to the payUrl
      window.location.href = payUrl;
    });
  }
}


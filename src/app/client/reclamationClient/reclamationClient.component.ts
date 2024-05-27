import { Component, OnInit } from '@angular/core';
import { NavbarClientComponent } from '../LayoutClient/navbarClient.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InscriptionServiceService } from '../../services/InscriptionService.service';
import { ClientService } from '../../services/Client.service';

@Component({
  selector: 'app-reclamationClient',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, InputTextareaModule, ButtonModule, DropdownModule, RadioButtonModule, NavbarClientComponent],
  templateUrl: './reclamationClient.component.html',
  styleUrls: ['./reclamationClient.component.css']
})
export class ReclamationClientComponent implements OnInit {
  reclamationTitle!: string;
  reclamationDescription!: string;
  showRequiredError: boolean = false;
  contribuable: any
  declarations: any
  selectedDeclaration: any
  selectedChoice: string = 'no'; // Default choice is "No"

  constructor(private authservice: InscriptionServiceService, private clientservice: ClientService) {

  }

  ngOnInit(): void {
    const contribuableMatricule = localStorage.getItem('contribuableMatricule');
    this.authservice.getContribuableByMatriculeFiscale(Number(contribuableMatricule)).subscribe((data) => {
      this.contribuable = data;
      this.clientservice.getDeclarationByContribuable(this.contribuable.matriculeFiscale).subscribe(
        (data) => {
          // Filtrer les déclarations avec un montant à payer > 0
          //console.log(data)
          this.declarations = data
          console.log(this.declarations);
        }
      )
    })
  }

  submitForm() {

    const contribuableMatricule = localStorage.getItem('contribuableMatricule');
    if (!this.reclamationTitle || !this.reclamationDescription) {
      this.showRequiredError = true;
    } else {
      this.authservice.getContribuableByMatriculeFiscale(Number(contribuableMatricule)).subscribe((data) => {
        this.contribuable = data;
        //console.log(this.contribuable)

        if (this.selectedDeclaration == null) {
          const reclamation: any = {

            titre: this.reclamationTitle,
            contenu: this.reclamationDescription,
            contribuable: this.contribuable


          }
          this.clientservice.savereclamation(reclamation).subscribe((data) => console.log(data))
        } else {
          const reclamation: any = {
            contribuable: this.contribuable,
            titre: this.reclamationTitle,
            contenu: this.reclamationDescription,
            idDeclaration: this.selectedDeclaration


          }
          //console.log(reclamation)
          this.clientservice.savereclamation(reclamation).subscribe((data) => console.log(data))
        }


      })
      // console.log("Form submitted successfully!");
      this.showRequiredError = false;
      // console.log("Contribuable Matricule:", contribuableMatricule);

    }
  }
}

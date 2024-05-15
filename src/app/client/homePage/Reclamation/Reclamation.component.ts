import { Component, OnInit } from '@angular/core';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InscriptionServiceService } from '../../../services/InscriptionService.service';
import { ClientService } from '../../../services/Client.service';

@Component({
  selector: 'app-Reclamation',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, InputTextareaModule, ButtonModule],
  templateUrl: './Reclamation.component.html',
  styleUrls: ['./Reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamationTitle!: string;
  reclamationDescription!: string;
  showRequiredError: boolean = false;
  contribuable: any
  constructor(private authservice: InscriptionServiceService, private clientservice: ClientService) {

  }

  ngOnInit(): void {

  }

  submitForm() {

    const contribuableMatricule = localStorage.getItem('contribuableMatricule');
    console.log(contribuableMatricule)
    if (!this.reclamationTitle || !this.reclamationDescription) {
      this.showRequiredError = true;
    } else {
      this.authservice.getContribuableByMatriculeFiscale(Number(contribuableMatricule)).subscribe((data) => {
        this.contribuable = data;
        console.log(this.contribuable)
        const reclamation: any = {

          titre: this.reclamationTitle,
          contenu: this.reclamationDescription,

          contribuable: this.contribuable
        };
        this.clientservice.savereclamation(reclamation).subscribe((data) => console.log(data))
      })
      // console.log("Form submitted successfully!");
      this.showRequiredError = false;
      // console.log("Contribuable Matricule:", contribuableMatricule);

    }
  }
}


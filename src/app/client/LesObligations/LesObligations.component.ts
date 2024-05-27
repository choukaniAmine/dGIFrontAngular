import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/Client.service';
import { TreeTableModule } from 'primeng/treetable';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { NavbarClientComponent } from '../LayoutClient/navbarClient.component';
@Component({
  selector: 'app-LesObligations',
  standalone: true,
  imports: [TreeTableModule,CommonModule,TableModule,NavbarClientComponent],
  templateUrl: './LesObligations.component.html',
  styleUrls: ['./LesObligations.component.css']
})
export class LesObligationsComponent implements OnInit {
  lesobligations: any
  contribuable: any
 
  

  constructor(private clientservice: ClientService) { }

  ngOnInit() {
    this.getcontribuable();
    
  }
  getcontribuable() {
    const matricule = localStorage.getItem('contribuableMatricule');
    this.clientservice.getContribuableBymatricule(Number(matricule)).subscribe((data) => {
      this.contribuable = data;
     
      this.getObligation(); // Call getObligation() after getting the contribuable data
     
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

}

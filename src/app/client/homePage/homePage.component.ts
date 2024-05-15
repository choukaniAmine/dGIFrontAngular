import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/Client.service';
import { CardModule } from 'primeng/card';
import { StorageServiceService } from '../../services/StorageService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homePage',
  standalone: true,
  imports:[CardModule],
  templateUrl: './homePage.component.html',
  styleUrls: ['./homePage.component.css']
})
export class HomePageComponent implements OnInit {
userid!:number;
contribuable:any;
  constructor(private clientService:ClientService , private router:Router) { }

  ngOnInit() {
    this.getcontribuable();
  }
getcontribuable(){
  const userString = localStorage.getItem('user');

  // Check if user object exists in local storage
  if (userString) {
    // Parse user object from JSON
    const user = JSON.parse(userString);

    // Access the ID property
    this.userid = user.id;


    // Now you can use userId as needed
  } else {
    // Handle case where user object does not exist in local storage
    console.error('User object not found in local storage');
  }
 this.clientService.getContribuableByIdCompte(this.userid).subscribe((res) =>{
  this.contribuable=res;
  const dateMatriculation = new Date(this.contribuable.dateDeMatriculation);
        const day = dateMatriculation.getDate();
        const month = dateMatriculation.getMonth() + 1; // Months are zero-indexed, so add 1
        const year = dateMatriculation.getFullYear();
        this.contribuable.dateDeMatriculation = `${day}/${month}/${year}`;
  console.log(this.contribuable);
 })
}
logout(): void {

  StorageServiceService.clearFromLocalStorage();
}
contribuablePage() {
  const contribuableMatricule = this.contribuable.matriculeFiscale ;

console.log(contribuableMatricule)
  localStorage.setItem('contribuableMatricule', contribuableMatricule);
  this.router.navigate(['/navbarclient']);
}
}

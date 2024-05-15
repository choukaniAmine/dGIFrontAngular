import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from '../../services/StorageService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarClient',
  standalone:true,
  templateUrl: './navbarClient.component.html',
  styleUrls: ['./navbarClient.component.css']
})
export class NavbarClientComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  logout(): void {
   
    StorageServiceService.clearFromLocalStorage();

   
    this.router.navigate(['/login']); 
  }
}

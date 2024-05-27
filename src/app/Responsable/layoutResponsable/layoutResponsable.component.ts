import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from '../../services/StorageService.service';

@Component({
  selector: 'app-layoutResponsable',
  standalone: true,
  templateUrl: './layoutResponsable.component.html',
  styleUrls: ['./layoutResponsable.component.css']
})
export class LayoutResponsableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  logout(): void {
    StorageServiceService.clearFromLocalStorage();
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-responsable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboardResponsable.component.html',
  styleUrls: ['./dashboardResponsable.component.css']
})
export class DashboardResponsableComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}

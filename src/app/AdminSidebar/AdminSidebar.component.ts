import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-AdminSidebar',
  standalone: true,
  imports: [CommonModule, ButtonModule, SidebarModule],
  templateUrl: './AdminSidebar.component.html',
  styleUrls: ['./AdminSidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  @Input() dynamicContent: string | undefined;
  constructor() { }

  ngOnInit() {
  }

}

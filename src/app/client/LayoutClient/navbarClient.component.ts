import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageServiceService } from '../../services/StorageService.service';

import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { WebSocketServiceService } from '../../services/WebSocketService.service';
import { ClientService } from '../../services/Client.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbarClient',
  standalone: true,
  imports: [CommonModule, MenubarModule, OverlayPanelModule, ButtonModule],
  templateUrl: './navbarClient.component.html',
  styleUrls: ['./navbarClient.component.css']
})
export class NavbarClientComponent implements OnInit {
  spanpop: boolean = false;
  popup: boolean = false;
  lesnotifications: any;
  @ViewChild('op')
  op!: OverlayPanel;
  ngOnInit(): void {
    // Retrieve the value of spanpop from localStorage when the component initializes
    const storedSpanpop = localStorage.getItem('spanpop');
    this.spanpop = storedSpanpop ? JSON.parse(storedSpanpop) : false;
  
    this.getnotification();
    const connexion = this.WebSocketService.connect();
    const id = localStorage.getItem("contribuableMatricule");
    connexion.connect({ userId: id }, () => {
      connexion.subscribe('/user/queue/notification', (data: any) => {
        // Add the new notification to the list
        const newNotification = JSON.parse(data.body);
        this.spanpop = true; // Set spanpop to true
        this.lesnotifications.unshift(newNotification);
        // Add new notification to the beginning of the array
        // Store the updated value of spanpop in localStorage
        localStorage.setItem('spanpop', JSON.stringify(true));
      });
    });
  }
  
  sortNotificationsByDate(): void {
    this.lesnotifications.sort((a: { dateReponse: string; }, b: { dateReponse: string; }) => {
      const dateA = new Date(a.dateReponse.split('.')[0]); // Extract date part and convert to Date object
      const dateB = new Date(b.dateReponse.split('.')[0]); // Extract date part and convert to Date object
      return dateB.getTime() - dateA.getTime(); // Sort in descending order by date
    });
  }

  constructor(private WebSocketService: WebSocketServiceService, private clientService: ClientService,private router:Router) {

  }

  getnotification(): void {
    const id = Number(localStorage.getItem("contribuableMatricule"));
    this.clientService.getNotification(id).subscribe(
      (data: any) => {
        this.lesnotifications = data.filter((notification: { deleted: boolean; }) => !notification.deleted);
        this.sortNotificationsByDate();
        //console.log(this.lesnotifications);
      },
      (error) => {
        // Handle error
      }
    );
  }

  toggleBellAndSpan(event: any): void {
    // Your existing op.toggle($event) functionality
    this.op.toggle(event);

    // Set spanpop to false
    this.spanpop=false;
    localStorage.removeItem('spanpop');
  }
  markAsRead(notification: any, index: number): void {
    this.clientService.updateNotification(notification.idNotification).subscribe(
      () => {
        // Update the 'checked' property locally
        this.lesnotifications[index].checked = true;
      },
      (error) => {
        // Handle error
      }
    );
  }

  deleteNotification(id: number) {

    this.clientService.updatedeleted(id).subscribe(() => {
      this.lesnotifications = this.lesnotifications.filter((notification: { idNotification: number; }) => notification.idNotification !== id);
    }, error => {
      // Handle error if needed
    });
  }
  logout(): void {
   
    StorageServiceService.clearFromLocalStorage();

   
    this.router.navigate(['/login']); 
  }
}

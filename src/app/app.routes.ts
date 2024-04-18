import { Routes } from '@angular/router';
import { InscriptionComponent } from './Inscription/Inscription.component';
import { LoginComponent } from './Login/Login.component';
import { AllInscriptionComponent } from './AllInscription/AllInscription.component';
import { CreatePasswordComponent } from './createPassword/createPassword.component';
import { AdminSidebarComponent } from './AdminSidebar/AdminSidebar.component';

export const routes: Routes = [
    { path: 'inscription', component: InscriptionComponent },
    { path: 'login', component: LoginComponent },
    { path: 'comptes', component: AllInscriptionComponent },
    { path: 'createpassword/:code', component: CreatePasswordComponent },
    {path:'sidebar',component:AdminSidebarComponent},
];

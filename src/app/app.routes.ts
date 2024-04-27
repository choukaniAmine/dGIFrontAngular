import { Routes } from '@angular/router';
import { InscriptionComponent } from './Inscription/Inscription.component';
import { LoginComponent } from './Login/Login.component';
import { AllInscriptionComponent } from './AllInscription/AllInscription.component';
import { CreatePasswordComponent } from './createPassword/createPassword.component';
import { AdminSidebarComponent } from './AdminSidebar/AdminSidebar.component';
import { LesComptesComponent } from './LesComptes/LesComptes.component';
import { LescontribuableComponent } from './Lescontribuable/Lescontribuable.component';
import { LesAdminsComponent } from './LesAdmins/LesAdmins.component';
import { AdminHomePageComponent } from './AdminHomePage/AdminHomePage.component';
import { ErreurPageComponent } from './ErreurPage/ErreurPage.component';
import { HomePageComponent } from './client/homePage/homePage.component';

export const routes: Routes = [
    {path:'sidebar',component:AdminSidebarComponent},
    { path: 'inscription', component: InscriptionComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin/lesinscriptions', component: AllInscriptionComponent },
    { path: 'admin/createpassword/:code', component: CreatePasswordComponent },
    {path:"admin/lescomptes",component:LesComptesComponent},
    {path:"admin/lescontribuable",component:LescontribuableComponent},
    {path:"admin/lesadmins",component:LesAdminsComponent},
    {path:"admin/dashboard",component:AdminHomePageComponent},
    {path:"error",component:ErreurPageComponent},
    {path: "client/homePage",component:HomePageComponent},
];

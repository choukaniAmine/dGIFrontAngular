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
import { ReclamationComponent } from './client/homePage/Reclamation/Reclamation.component';
import { AjoutImpotComponent } from './AjoutImpot/AjoutImpot.component';
import { LesImpotsComponent } from './LesImpots/LesImpots.component';
import { DetailImpotComponent } from './DetailImpot/DetailImpot.component';
import { AjoutDetailImpotComponent } from './AjoutDetailImpot/AjoutDetailImpot.component';
import { NavbarClientComponent } from './client/LayoutClient/navbarClient.component';
import { AjoutDeclarationComponent } from './client/AjoutDeclaration/AjoutDeclaration.component';

export const routes: Routes = [
    {path:'sidebar',component:AdminSidebarComponent},
    {path:'navbarclient',component:NavbarClientComponent},
    { path: 'inscription', component: InscriptionComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin/lesinscriptions', component: AllInscriptionComponent },
    { path: 'admin/createpassword/:code', component: CreatePasswordComponent },
    {path:"admin/lescomptes",component:LesComptesComponent},
    {path:"admin/lescontribuable",component:LescontribuableComponent},
    {path:"admin/lesadmins",component:LesAdminsComponent},
    {path:"admin/dashboard",component:AdminHomePageComponent},
    {path:"error",component:ErreurPageComponent},
    {path:"admin/ajoutimpot",component:AjoutImpotComponent},
    {path:"admin/lesimpots",component:LesImpotsComponent},
    {path:"admin/detailimpot/:libelle",component:DetailImpotComponent},
    {path:"admin/ajoutdetail/:libelle",component:AjoutDetailImpotComponent},
    {path: "client/homePage",component:HomePageComponent},
    {path:"client/reclamation",component:ReclamationComponent},
{path :"client/ajoutdeclaration",component:AjoutDeclarationComponent}
];

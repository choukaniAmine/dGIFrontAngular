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

import { AjoutImpotComponent } from './AjoutImpot/AjoutImpot.component';
import { LesImpotsComponent } from './LesImpots/LesImpots.component';
import { DetailImpotComponent } from './DetailImpot/DetailImpot.component';
import { AjoutDetailImpotComponent } from './AjoutDetailImpot/AjoutDetailImpot.component';
import { NavbarClientComponent } from './client/LayoutClient/navbarClient.component';
import { AjoutDeclarationComponent } from './client/AjoutDeclaration/AjoutDeclaration.component';
import { LesObligationsComponent } from './client/LesObligations/LesObligations.component';
import { LesDeclarationsComponent } from './client/LesDeclarations/LesDeclarations.component';
import { PaymentSuccessComponent } from './client/PaymentSuccess/PaymentSuccess.component';
import { PayementFailedComponent } from './client/PayementFailed/PayementFailed.component';
import { ReclamationClientComponent } from './client/reclamationClient/reclamationClient.component';
import { DashboardResponsableComponent } from './Responsable/dashboardResponsable/dashboardResponsable.component';
import { TousLesReclamationsComponent } from './Responsable/TousLesReclamations/TousLesReclamations.component';

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

{path :"client/ajoutdeclaration",component:AjoutDeclarationComponent},
{path:"client/mesobligations",component:LesObligationsComponent},
{path:"client/mesdeclarations",component:LesDeclarationsComponent},
{path:"client/paimentsuc",component:PaymentSuccessComponent},
{path:"client/paimentfailed",component:PayementFailedComponent},
{path:"client/reclamation",component:ReclamationClientComponent},
{ path:"responsable/dashboard-responsable", component:DashboardResponsableComponent},
{ path:"responsable/tous-les-reclamations", component:TousLesReclamationsComponent },
];

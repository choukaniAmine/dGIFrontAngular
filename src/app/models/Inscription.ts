import { Contribuable } from "./Contribuable";
import { Identifiant } from "./Identifiant.enum";
import { UserRole } from "./UserRole.enum";

export interface Inscription {
    idInscription: number;
  email: string;
  typeIdentifiant: Identifiant;
  valeurIdentifiant: string;
  name: string;
  password: string;
  nonLocked: boolean;
  poste: string;
  userRole: UserRole;
  
}

import { Enseignement } from "./enseignement.model";

export class Enseignant{
  _id: String;
  nom: String;
  prenom: String;
  statut: String;
  UC: Number;
  enseignements: Array<Enseignement>;
}

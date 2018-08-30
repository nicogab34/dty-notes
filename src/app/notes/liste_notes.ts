import { Note } from '../note_de_frais';

const d : Date= new Date();

export const liste_notes: Note[] = [
  { id: 1, date:'120218', intitule: 'Taxi', montant: 20, devise: 'euros', commentaire:'com1', emetteur:'nicogab',etat:'non traitee',commentairegestion:'com5',updated_at:d},
  { id: 2, date:'130218', intitule: 'Hotel', montant: 50, devise: 'euros', commentaire:'com2', emetteur:'nicogab',etat:'non traitee',commentairegestion:'com5',updated_at:d},
  { id: 3, date:'160218', intitule: 'Taxi', montant: 20, devise: 'euros', commentaire:'com3', emetteur:'nicogab',etat:'non traitee',commentairegestion:'com5',updated_at:d},
  { id: 4, date:'160218', intitule: 'Resto', montant: 20, devise: 'euros', commentaire:'com4', emetteur:'nicogab',etat:'non traitee',commentairegestion:'com5',updated_at:d}
];
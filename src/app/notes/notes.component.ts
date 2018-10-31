import { Component, OnInit, Input} from '@angular/core';
import { Note } from '../note_de_frais';
import { noteService } from '../notes.service';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { preNote } from '../prenote';
import { User } from '../user';
import { userService } from '../users.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css', '../template.css']
})
export class NotesComponent implements OnInit {

  details: UserDetails;
  selectedNote: Note;
  notes : Note[] = [];
  contenu:String;
  utilisateurs: User[];
  afficheprofil=false;
  affichenotes=false;
  nouvellenote=false;

  @Input() date:string = "";
  @Input() intitule:string = "";
  @Input() montant: number= 0;
  @Input() devise: string= "";
  @Input() commentaire:string = "";
  emetteur:string = "";
  emetteurID:string = "";
  gestionnaire:string= "";
  etat:string="encours";
  commentairegestion:string="";
  updated_at:Date=new Date;

  largeurecran = window.innerWidth;

  constructor(private auth: AuthenticationService, private noteService: noteService, private userService: userService) {}

  ngOnInit() {
    this.getnotes();
    this.getusers();
    this.getutilisateurs();
  }

  getnotes(): void {
    var aux: Note[] = [];
    this.notes = [];
    this.noteService.getnotes()
    .subscribe(notes => {aux = notes});
    console.log(aux.length)
    this.auth.profile().subscribe(user => {
      for (let i=0;i<aux.length;i++){
        if (user.profile === "Utilisateur" && aux[i].emetteurID === user._id){
          this.notes.push(aux[i]);
        }
        else if (user.profile === "Gestionnaire" && aux[i].gestionnaire === user._id){
          this.notes.push(aux[i]);
        }
      }
    }, (err) => {
      console.error(err);
    });
  }

  getusers(){
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }
  add(): void {
    this.emetteur = this.details.name;
    this.emetteurID = this.details._id;
    this.etat = "encours";
    this.commentairegestion = "";
    this.gestionnaire=this.details.gestionnaireID;
    let newnote : preNote  = {
      date : this.date,
      intitule : this.intitule,
      montant : this.montant,
      devise: this.devise,
      commentaire: this.commentaire,
      emetteur: this.emetteur,
      emetteurID: this.emetteurID,
      gestionnaire : this.gestionnaire,
      etat : this.etat,
      commentairegestion:this.commentairegestion,
      updated_at:this.updated_at};

    if (!newnote.intitule) { return; }
    this.noteService.addnote(newnote)
      .subscribe(note => {
        this.notes.push(note);
        this.getnotes();
        this.nouvellenote = undefined;
      });
  }

  maj(): void {
    this.selectedNote.etat = "encours";
    this.noteService.updatenote(this.selectedNote)
      .subscribe(note => {
        this.selectedNote = undefined;
        this.getnotes();
      });
  }

  delete(note: Note): void {
    this.notes = this.notes.filter(h => h !== note);
    this.noteService.deletenote(note).subscribe(note => {
      this.selectedNote = undefined;
      this.getnotes();
    });
  }
  getutilisateurs(): void {
    this.utilisateurs = [];
    var utilisateurs2 : User[];
    this.userService.getusers()
    .subscribe(users => {
      utilisateurs2 = users;
    });
    this.auth.profile().subscribe(user => {
      for (var i=0;i<utilisateurs2.length;i++){
        if (utilisateurs2[i]._id === user._id && utilisateurs2[i].profile === "Utilisateur"){
          this.utilisateurs.push(utilisateurs2[i])
        }
      };
    }, (err) => {
      console.error(err);
    });
  }
  selectnote(note : Note){
    this.selectedNote = note;
  }
  retour(){
    this.selectedNote = undefined;
    this.nouvellenote = false;
  }
  valider(){
    var nouvellenote = this.selectedNote;
    nouvellenote.etat = "validee";
    this.noteService.updatenote(nouvellenote)
    .subscribe();
  }
  refuser(){
    var nouvellenote = this.selectedNote;
    nouvellenote.etat = "refusee";
    this.noteService.updatenote(nouvellenote)
    .subscribe();
  }
  changeaffichenotes(){
    this.affichenotes = !this.affichenotes;
  }
  changenouvellenote(){
    this.nouvellenote = !this.nouvellenote;
  }
}

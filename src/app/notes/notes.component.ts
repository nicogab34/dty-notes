import { Component, OnInit } from '@angular/core';
import { Note } from '../note_de_frais';
import { liste_notes } from './liste_notes';
import { noteService } from '../notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes : Note[];

  selectedNote: Note;

  constructor(private noteService: noteService) {}

  ngOnInit() {
    this.getnotes();
  }

  onSelect(note: Note): void {
    this.selectedNote = note;
  }

  getnotes(): void {
    this.noteService.getnotes()
    .subscribe(notes => this.notes = notes);
  }

  add(date:string,intitule:string,montant:number,commentaire:string,emetteur:string,etat:string,commentairegestion:string,updated_at: Date): void {
    date = date.trim();
    intitule = intitule.trim();
    commentaire = commentaire.trim();
    emetteur = emetteur.trim();
    etat = etat.trim();
    commentairegestion = commentairegestion.trim()
    if (!intitule) { return; }
    this.noteService.addnote({ date,intitule,montant,commentaire,emetteur,etat,commentairegestion,updated_at } as Note)
      .subscribe(note => {
        this.notes.push(note);
        this.getnotes();
      });
  }

  delete(note: Note): void {
    this.notes = this.notes.filter(h => h !== note);
    this.noteService.deletenote(note).subscribe();
  }
}

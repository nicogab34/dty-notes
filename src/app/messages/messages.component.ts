import { Component, OnInit, Input} from '@angular/core';
import { User } from '../user';
import { MessageService } from '../message.service';
import { Message } from '../message';
import { userService } from '../users.service';
import { AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css','../template.css']
})
export class MessagesComponent implements OnInit {

  details: User;

  messages : Message[];
  utilisateurs: User[];
  selectedconv: Message[];
  selectedid:string;
  contenu: string;
  affichemessages=false;
  largeurecran = window.innerWidth;

  constructor(private messageService: MessageService, private userService: userService, private auth: AuthenticationService) { }

  ngOnInit() {
    this.getusers();
    this.getmessages();
    this.getutilisateurs();
  }

  getusers(){
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  getmessages(): void{
    this.messageService.getmessages()
    .subscribe(messages => {this.messages = messages;});
    this.auth.profile().subscribe(user => {
      if (user.profile === "Utilisateur"){
        this.selectconvutil(user.gestionnaireID);
      }
    }, (err) => {
      console.error(err);
    });
  }

  nouveaumessage(): void{
    const contenu = this.contenu.trim();
    var emetteurID =this.details._id;
    var destinataireID :string;
    var utilisateurID :string;
    var gestionnaireID :string;
    if (this.details.profile === "Gestionnaire"){
      destinataireID = this.selectedid;
      utilisateurID = this.selectedid;
      gestionnaireID = this.details._id;
    }
    else{
      destinataireID = this.details.gestionnaireID;
      gestionnaireID = this.details.gestionnaireID;
      utilisateurID = this.details._id;
    }
    
    const a = this.details._id;
    console.log(a);
    const date= Date.now();
    if (!this.contenu) { return; }
    this.messageService.addmessage({emetteurID, destinataireID, utilisateurID, gestionnaireID, contenu, date} as Message)
      .subscribe(message => {
        this.messages.push(message);
        this.getmessages();
      });
    this.contenu = undefined;
  }
  getutilisateurs(): void {
    var aux1 : User[];
    var aux2 : User[] = [];
    this.userService.getusers()
    .subscribe(users => {
      aux1 = users;
    });
    this.auth.profile().subscribe(user => {
      for (var i=0;i<aux1.length;i++){
        if (aux1[i].gestionnaireID === user._id && aux1[i].profile === "Utilisateur"){
          aux2.push(aux1[i]);
        }
      };
      this.utilisateurs=aux2;
    }, (err) => {
      console.error(err);
    });
  }

  selectconvgest(id:string){
    this.selectedconv = [];
    this.selectedid = id;
    for (let i=0;i<this.messages.length;i++){
      if (this.messages[i].utilisateurID === id){
        this.selectedconv.push(this.messages[i]);
      }
    }
  }
  selectconvutil(id:string){
    this.selectedconv = [];
    this.selectedid = id;
    for (let i=0;i<this.messages.length;i++){
      if (this.messages[i].gestionnaireID === id && this.messages[i].utilisateurID === this.details._id){
        this.selectedconv.push(this.messages[i]);
      }
    }
  }
  changeaffichemessages(){
    this.affichemessages = !this.affichemessages;
  }
}

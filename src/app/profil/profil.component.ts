import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { User } from '../user';
import { userService } from '../users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css','../template.css']
})
export class ProfilComponent implements OnInit {

  details: UserDetails;
  utilisateurs: User[];
  afficheprofil=false;
  largeurecran = window.innerWidth;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.getusers();
  }

  getusers(){
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  changeafficheprofil(){
    this.afficheprofil=!this.afficheprofil;
  }

}

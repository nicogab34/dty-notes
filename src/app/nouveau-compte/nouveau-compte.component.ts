import { Component, OnInit, Input} from '@angular/core';
import { User } from '../user';
import { userService } from '../users.service';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { ComptesComponent } from '../comptes/comptes.component';

@Component({
  selector: 'app-nouveau-compte',
  templateUrl: './nouveau-compte.component.html',
  styleUrls: ['./nouveau-compte.component.css', '../template.css']
})
export class NouveauCompteComponent implements OnInit {

  profiles = ['Gestionnaire', 'Utilisateur','Administrateur'];
  
  credentials: TokenPayload = {
    email: '',
    name: '',
    profile: 'Gestionnaire',
    password: '',
    gestionnaireID:'-1',
  };

  users : User[];

  gestionnaires : User[];

  affiche=false;
  largeurecran = window.innerWidth;

  constructor(private userService: userService, private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.getusers();
    this.getgestionnaires();
  }

  getusers(): void {
    this.userService.getusers()
    .subscribe(users => {console.log(typeof(users));
      this.users = users;
    });
  }

  getgestionnaires(): void {
    this.userService.getusers()
    .subscribe(users => {
      function isGestionnaire(user : User){
        return user.profile === 'Gestionnaire';
      }
      this.gestionnaires = users.filter(isGestionnaire);
    });
  }

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/espace-travail');
    }, (err) => {
      console.error(err);
    });
    this.credentials.email= '';
    this.credentials.name= '';
    this.credentials.profile= 'Gestionnaire';
    this.credentials.password= '';
    this.credentials.gestionnaireID='-1';
  }

  changeaffiche(){
    this.affiche=!this.affiche;
  }

}



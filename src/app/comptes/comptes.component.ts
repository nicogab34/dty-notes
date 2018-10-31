import { Component, OnInit, Input} from '@angular/core';
import { User } from '../user';
import { userService } from '../users.service';
import { AuthenticationService} from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.component.html',
  styleUrls: ['./comptes.component.css', '../template.css']
})
export class ComptesComponent implements OnInit {

  profils = ['Gestionnaire', 'Utilisateur','Administrateur', undefined];

  users :User[];
  affiche=false;
  largeurecran = window.innerWidth;

  constructor(private userService: userService, private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.getusers();
  }

  getusers(): void {
    this.userService.getusers()
    .subscribe(users => {console.log(typeof(users));
      this.users = users;
    });
  }
  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteuser(user).subscribe();
  }

  changeaffiche(){
    this.affiche=!this.affiche;
  }
}

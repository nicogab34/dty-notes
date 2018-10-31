import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../authentication.service';
import { User } from '../user';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-espace-travail',
  templateUrl: './espace-travail.component.html',
  styleUrls: ['./espace-travail.component.css']
})
export class EspaceTravailComponent implements OnInit {

  details : User;

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
}

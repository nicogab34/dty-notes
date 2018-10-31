import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { userService } from '../users.service';
import {AppModule} from '../app.module';
import {FormControl, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  
  hide = true;

  users : User[];

  constructor(private auth: AuthenticationService, private router: Router, private userService: userService) {}

  ngOnInit() {
    this.getusers();
  }

  getusers(): void {
    this.userService.getusers()
    .subscribe(users => {console.log(typeof(users));
      this.users = users;
    });
  }

  path(profile : string){
    if (profile === "Administrateur"){
      return '/accounts'
    }
    else{
      return '/profile'
    }
  }

  login() {
    const credentials: TokenPayload = {
      email: this.email.value,
      password: this.password.value
    };
    for (var i=0;i<this.users.length;i++){
      if (this.users[i].email === credentials.email){
        const profile = this.users[i].profile;
        this.auth.login(credentials).subscribe(() => {
          this.router.navigateByUrl('/espace-travail');
        }, (err) => {
          console.error(err);
        }); 
      }
    }
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
}

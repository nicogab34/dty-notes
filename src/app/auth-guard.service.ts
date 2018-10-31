import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(route : ActivatedRouteSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if (route.url[route.url.length-1].path === "profile" && (!this.auth.isLoggedIn())){
      this.router.navigateByUrl('/');
      return false;
    }
    else if (route.url[route.url.length-1].path === "accounts" && (!this.auth.isAdmin())){
      this.router.navigateByUrl('/profile');
      return false;
    }
    return true;
  }

}

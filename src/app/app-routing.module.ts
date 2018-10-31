import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspaceTravailComponent } from './espace-travail/espace-travail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
 
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'espace-travail', component: EspaceTravailComponent, canActivate: [AuthGuardService] },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
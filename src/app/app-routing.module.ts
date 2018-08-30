import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent }      from './notes/notes.component';
import { IdentificationComponent }  from './identification/identification.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/identification', pathMatch: 'full' },
  { path: 'identification', component: IdentificationComponent },
  { path: 'notes', component: NotesComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
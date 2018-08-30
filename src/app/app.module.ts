import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IdentificationComponent } from './identification/identification.component';
import { NotesComponent } from './notes/notes.component';
import { AppRoutingModule } from './/app-routing.module';

import{HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    IdentificationComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

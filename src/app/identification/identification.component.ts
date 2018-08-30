import { Component, OnInit, Input } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})

export class IdentificationComponent implements OnInit {

  @Input() id :number;
  @Input() mdp :string;

  constructor() { }

  ngOnInit() {
  }

  identification(id,mdp) {
    
  }

}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MultiselectComponent} from "./shared/components/multiselect/multiselect.component";
import {HeaderComponent} from "./shared/components/header/header.component";

@Component({
  selector: 'rman-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent {
  title = 'rentman-test-assignment';
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MultiselectComponent} from "./shared/components/multiselect/multiselect.component";

@Component({
  selector: 'app-root',
    imports: [RouterOutlet, MultiselectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rentman-test-assignment';
}

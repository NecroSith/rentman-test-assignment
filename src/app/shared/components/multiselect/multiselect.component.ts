import {Component, Input} from '@angular/core';
import {StructuredTree} from "../../models/multiselect.model";

@Component({
  selector: 'rman-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.scss',
  standalone: false,
})
export class MultiselectComponent  {
  @Input() data: StructuredTree | undefined;

  constructor() {}
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FiltersService} from "./shared/services/api/filters.service";
import {StructuredTree} from "./shared/models/multiselect.model";

@Component({
  selector: 'rman-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rentman-test-assignment';
  data: StructuredTree | undefined;

  private destroyed$ = new Subject<void>();
  constructor(private readonly apiService: FiltersService) {
  }

  ngOnInit() {
    this.loadMultiselectData();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private loadMultiselectData() {
    this.apiService.loadMultiselectData()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(msData => {
          this.data = this.apiService.getStructuredTree(msData);
          console.log(this.data);
        });
  }
}

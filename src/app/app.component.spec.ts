import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import {ProductsModule} from "./modules/products/products.module";
import {RouterModule} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
          RouterModule,
          SharedModule,
          ProductsModule
      ],
      providers: [
          provideHttpClient()
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render content panel', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.textContent).toContain('Content');
  });
});

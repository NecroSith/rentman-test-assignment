import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiselectComponent } from './multiselect.component';
import {SharedModule} from "../../shared.module";
import {HttpClientTestingModule, provideHttpClientTesting} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";

describe('MultiselectComponent', () => {
  let component: MultiselectComponent;
  let fixture: ComponentFixture<MultiselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiselectComponent],
      imports: [
          CommonModule,
          SharedModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

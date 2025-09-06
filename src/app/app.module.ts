import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        SharedModule,
        RouterModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
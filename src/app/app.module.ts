import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        SharedModule,
        RouterModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
})

export class AppModule {}
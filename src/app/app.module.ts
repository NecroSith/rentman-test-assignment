import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {SharedModule} from "./shared/shared.module";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {provideHttpClient} from "@angular/common/http";
import {ProductsModule} from "./modules/products/products.module";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        SharedModule,
        RouterModule,
        ProductsModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        provideHttpClient()
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}
import {NgModule} from "@angular/core";
import {MultiselectComponent} from "./components/multiselect/multiselect.component";
import {HeaderComponent} from "./components/header/header.component";
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        MultiselectComponent,
        HeaderComponent
    ],
    exports: [
        MultiselectComponent,
        HeaderComponent
    ],
    providers: [
        HttpClient
    ],
    imports: [
        CommonModule
    ]
})

export class SharedModule {}
import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {FiltersPanelComponent} from "./components/filters-panel/filters-panel.component";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        FiltersPanelComponent
    ],
    exports: [
        FiltersPanelComponent
    ]
})

export class ProductsModule {}
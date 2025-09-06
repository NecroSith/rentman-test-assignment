import {NgModule} from "@angular/core";
import {MultiselectComponent} from "./components/multiselect/multiselect.component";
import {HeaderComponent} from "./components/header/header.component";

@NgModule({
   imports: [
       MultiselectComponent,
       HeaderComponent
   ],
    exports: [
        MultiselectComponent,
        HeaderComponent
    ]
})

export class SharedModule {}
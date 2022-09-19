import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {PgSelectComponent} from './shared/components/pg-select/pg-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchPipe} from './shared/pipes/search.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {PgMultiSelectComponent} from './shared/components/pg-multi-select/pg-multi-select.component';
import {MatChipsModule} from '@angular/material/chips';
import {FrontRootService} from '@btcasino/front-root';

@NgModule({
    declarations: [
        AppComponent,
        PgSelectComponent,
        PgMultiSelectComponent,
        SearchPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule,
        MatSelectModule,
        FormsModule,
        MatInputModule,
        MatMenuModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatIconModule,
        MatChipsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

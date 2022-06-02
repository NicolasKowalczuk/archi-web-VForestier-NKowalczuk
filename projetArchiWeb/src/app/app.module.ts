import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCommonModule } from "@angular/material/core";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnseignantCreateComponent } from './enseignants/enseignant-create/enseignant-create.component';
import { HeaderComponent } from './header/header.component';
import { EnseignantListComponent } from './enseignants/enseignant-list/enseignant-list.component';
import { EnseignantsService } from './enseignants/enseignants.service';
import { EnseignantEditComponent } from './enseignants/enseignant-edit/enseignant-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    EnseignantCreateComponent,
    HeaderComponent,
    EnseignantListComponent,
    EnseignantEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDividerModule,
    MatSelectModule,
    MatChipsModule,
    MatFormFieldModule,
    MatCommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule
  ],
  providers: [EnseignantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

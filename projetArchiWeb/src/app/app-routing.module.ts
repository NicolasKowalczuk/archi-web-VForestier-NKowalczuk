import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnseignantCreateComponent } from './enseignants/enseignant-create/enseignant-create.component';
import { EnseignantEditComponent } from './enseignants/enseignant-edit/enseignant-edit.component';
import { EnseignantListComponent } from './enseignants/enseignant-list/enseignant-list.component';

const routes: Routes = [
  { path: "add-enseignant", component: EnseignantCreateComponent },
  { path: "list-enseignant", component: EnseignantListComponent },
  { path: "edit-enseignant/:id", component: EnseignantEditComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnseignantComponent } from './enseignant/enseignant.component';

const routes: Routes = [
  { path: 'enseignant', component: EnseignantComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

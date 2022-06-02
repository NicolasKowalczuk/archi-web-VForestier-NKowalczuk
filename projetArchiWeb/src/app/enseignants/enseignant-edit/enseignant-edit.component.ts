import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { EnseignantsService } from '../enseignants.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-enseignant',
  templateUrl: './enseignant-edit.component.html',
  styleUrls: ['./enseignant-edit.component.css'],
})
export class EnseignantEditComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetEnseignantForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  enseignantForm: FormGroup;
  statusinArray: String[] = ['EC', 'PRAG', 'PAST', 'Vacataire', 'CDE', 'ATER'];
  ngOnInit() {
    this.updateBookForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private enseignantApi: EnseignantsService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.enseignantApi.GetEnseignant(id).subscribe((data) => {
      this.enseignantForm = this.fb.group({
        nom: [data.nom, [Validators.required]],
        prenom: [data.prenom, [Validators.required]],
        statut: [data.statut, [Validators.required]],
        UC: [data.UC, [Validators.required]],
      });
    });
  }
  /* Reactive book form */
  updateBookForm() {
    this.enseignantForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      statut: ['', [Validators.required]],
      UC: ['', [Validators.required]],
    });
  }


  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.enseignantForm.controls[controlName].hasError(errorName);
  };
  /* Update book */
  updateEnseignantForm() {
    console.log(this.enseignantForm.value);
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.enseignantApi
        .UpdateEnseignant(id, this.enseignantForm.value)
        .subscribe((res) => {
          this.ngZone.run(() => this.router.navigateByUrl('/list-enseignant'));
        });
    }
  }
}

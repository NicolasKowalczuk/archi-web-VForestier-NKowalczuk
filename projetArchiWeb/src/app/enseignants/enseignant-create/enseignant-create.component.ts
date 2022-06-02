import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EnseignantsService } from "../enseignants.service";

@Component({
  selector: 'app-enseignant-create',
  templateUrl: './enseignant-create.component.html',
  styleUrls: ['./enseignant-create.component.css']
})
export class EnseignantCreateComponent implements OnInit{

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('resetStudentForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  enseignantForm: FormGroup;
  statusinArray: String[] = ['EC', 'PRAG', 'PAST', 'Vacataire', 'CDE', 'ATER'];
  ngOnInit() {
    this.submitBookForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private enseignantApi: EnseignantsService,
  ) {
  }
  /* Reactive book form */
  submitBookForm() {
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
  /* Submit book */
  submitEnseignantForm() {
    if (this.enseignantForm.valid) {

      this.enseignantApi.AddEnseignant(this.enseignantForm.value).subscribe((res) => {
        this.ngZone.run(() => this.router.navigateByUrl('/list-enseignant'));
      });
    }
  }
}

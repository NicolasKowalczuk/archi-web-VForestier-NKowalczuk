import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Enseignement } from "../../model/enseignement.model";

@Component({
    selector: 'course-dialog',
    templateUrl: './enseignement-dialog.component.html',
    styleUrls: ['./enseignement-dialog.component.css']
})
export class EnseignementDialogComponent implements OnInit {

    form: FormGroup;
    enseignement: Enseignement;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EnseignementDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.enseignement = data;
    }

    ngOnInit() {
        this.form = this.fb.group({
            nbCM: this.enseignement.nbCM,
            nbTD: this.enseignement.nbTD,
            nbTP: this.enseignement.nbTP
        });
    }

    save() {
      if(!(this.form.value.nbCM > 0 && (this.form.value.nbTD === 0 && this.form.value.nbTP === 0))){
        this.dialogRef.close(this.form.value);
      }
    }

    test(){
      console.log("test")
    }
    close() {
        this.dialogRef.close();
    }
}

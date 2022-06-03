import { Component, Inject, NgZone, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { EnseignantsService } from "../enseignants.service";
import { Enseignement } from "../model/enseignement.model";
import { Module } from "../model/module.model";
import { ModulesService } from "../modules.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { EnseignementDialogComponent } from "./dialog/enseignement-dialog.component";

@Component({
  selector: 'app-enseignant-enseignements',
  templateUrl: './enseignant-enseignements.component.html',
  styleUrls: ['./enseignant-enseignements.component.css'],
})
export class EnseignementComponent {

  ModuleData: any = [];
  EnseignementData: Enseignement[] = [];
  dataSourceModule: MatTableDataSource<Module>;
  currentEnseignant;

  @ViewChild(MatPaginator) paginatorModule: MatPaginator;
  displayedColumnsModule: string[] = [
    'formation',
    'semestre',
    'intitule',
    'statut',
    'action'
  ];

  @ViewChild('tableEnseignement') tableEnseignement: MatTable<Enseignement>;
  displayedColumnsEnseignement: string[] = [
    'intituleModule',
    'nbCM',
    'nbTD',
    'nbTP',
    'generatedUC',
    'action'
  ];



  constructor(
    private modulesApi: ModulesService,
    private enseignantApi: EnseignantsService,
    private actRoute: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router,
    private dialog: MatDialog
    ) {

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.enseignantApi.GetEnseignant(id).subscribe((data) => {
      this.currentEnseignant = data;

      if(this.currentEnseignant.enseignements.length > 0){
        this.EnseignementData = this.currentEnseignant.enseignements;
        this.tableEnseignement.renderRows();
      }
    });

    this.modulesApi.GetModules().subscribe((data) => {
      this.ModuleData = data;
      this.dataSourceModule = new MatTableDataSource<Module>(this.ModuleData);
      setTimeout(() => {
        this.dataSourceModule.paginator = this.paginatorModule;
      }, 0);
    });
  }
  ngOnInit() {}

  CreateEnseignement(module){
    let enseignement: Enseignement = {
      module: module,
      nbCM: 0,
      nbTD: 0,
      nbTP: 0
    }
    return enseignement;
  }

  addDataEnseignement(module) {
    console.log(this.findEnseignementByModule(module));
    if(this.findEnseignementByModule(module) == undefined){
      this.EnseignementData.push(this.CreateEnseignement(module));
      this.tableEnseignement.renderRows();
    }
    else{
      alert("Module déjà attribué à l'enseignant");
    }
  }

  findEnseignementByModule(module){
    return this.EnseignementData.find((element) =>{
        return element.module._id === module._id;
    });
  }

  findIndexEnseignement(enseignement){
    const indexOfEnseignement = this.EnseignementData.findIndex((element) => {
      return element.module._id === enseignement.module._id;
    });
    return indexOfEnseignement;
  }

  updateEnseignant() {
    this.currentEnseignant.enseignements = this.EnseignementData;
    this.enseignantApi
        .UpdateEnseignant(this.currentEnseignant._id, this.currentEnseignant)
        .subscribe((res) => {
          this.ngZone.run(() => this.router.navigateByUrl('/list-enseignant'));
        });
  }

  deleteEnseignement(enseignement){
    const indexOfEnseignement = this.findIndexEnseignement(enseignement);

    this.EnseignementData.splice(indexOfEnseignement, 1);
    this.tableEnseignement.renderRows();
  }

  openDialog(enseignement) {

    const dialogConfig = new MatDialogConfig();
    const indexOfEnseignement = this.findIndexEnseignement(enseignement);

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = enseignement;

    const dialogRef = this.dialog.open(EnseignementDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          enseignement.nbCM = data.nbCM;
          enseignement.nbTD = data.nbTD;
          enseignement.nbTP = data.nbTP;

          this.EnseignementData[indexOfEnseignement] = enseignement;
        }
    );

    this.tableEnseignement.renderRows();
  }

  calculUC(enseignement){
    const statutEnseignant = this.currentEnseignant.statut;

    const module = enseignement.module;

    const UC_CM = enseignement.nbCM * module['h/CM'] * 1.5;
    const UC_TD = enseignement.nbTD * module['h/TD'];
    let UC_TP = enseignement.nbTP * module['h/TP'];
    if(statutEnseignant === "ATER"){
      UC_TP = UC_TP * 0.75;
    }

    const totalUC = UC_CM + UC_TD + UC_TP;

    return totalUC;
  }
}






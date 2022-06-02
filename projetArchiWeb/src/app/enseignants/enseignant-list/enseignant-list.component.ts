import { Enseignant } from '../model/enseignant.model';
import { EnseignantsService } from '../enseignants.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-enseignant-list',
  templateUrl: './enseignant-list.component.html',
  styleUrls: ['./enseignant-list.component.css'],
})
export class EnseignantListComponent implements OnInit {
  EnseignantData: any = [];
  dataSource: MatTableDataSource<Enseignant>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'nom',
    'prenom',
    'statut',
    'UC',
    'action',
  ];
  constructor(private enseignantApi: EnseignantsService) {
    this.enseignantApi.GetEnseignants().subscribe((data) => {
      this.EnseignantData = data;
      this.dataSource = new MatTableDataSource<Enseignant>(this.EnseignantData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }
  ngOnInit() {}
  deleteEnseignant(index: number, e) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.enseignantApi.DeleteEnseignant(e._id).subscribe();
    }
  }
}

